import Anthropic from "@anthropic-ai/sdk"
import { XMLParser } from "fast-xml-parser"
import prisma from "./prisma"

const FINNHUB_KEY = process.env.FINNHUB_API_KEY
const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY

// ── Part A: Finnhub news headlines ──────────────────────────────────────────

type FinnhubArticle = {
  headline: string
  summary: string
  url: string
  source: string
  datetime: number
  category: string
  image: string
}

export async function syncNewsHeadlines() {
  if (!FINNHUB_KEY) throw new Error("FINNHUB_API_KEY not set")

  const categories = ["general", "forex", "crypto", "merger"]
  const seen = new Set<string>()
  const saved: string[] = []

  for (const cat of categories) {
    const res = await fetch(
      `https://finnhub.io/api/v1/news?category=${cat}&token=${FINNHUB_KEY}`,
      { next: { revalidate: 0 } }
    )
    if (!res.ok) continue
    const articles: FinnhubArticle[] = await res.json()

    for (const a of articles.slice(0, 8)) {
      if (!a.headline || !a.summary || seen.has(a.headline)) continue
      seen.add(a.headline)

      const slug = slugify(a.headline)
      const existing = await prisma.article.findUnique({ where: { slug } })
      if (existing) continue

      const category = mapFinnhubCategory(cat)

      await prisma.article.create({
        data: {
          title: a.headline,
          slug,
          excerpt: a.summary.slice(0, 300),
          content: buildNewsContent(a),
          coverImage: a.image || null,
          status: "PUBLISHED",
          publishedAt: new Date(a.datetime * 1000),
          featured: false,
        },
      })

      // Upsert category and link
      const dbCat = await prisma.category.upsert({
        where: { slug: slugify(category) },
        create: { name: category, slug: slugify(category) },
        update: {},
      })
      await prisma.article.update({
        where: { slug },
        data: { categoryId: dbCat.id },
      })

      saved.push(a.headline)
    }
  }

  return saved
}

// ── Part B: Claude AI long-form articles ────────────────────────────────────

const ARTICLE_TOPICS = [
  { title: "Nifty 50 Weekly Market Recap: Key Movers and What's Next", category: "Markets" },
  { title: "Best SIP Funds to Start in 2026: Our Top Picks by Category", category: "Mutual Funds" },
  { title: "How to Read an IPO Prospectus: A Beginner's Guide", category: "IPO" },
  { title: "Section 80C Tax Saving: Complete Guide for FY 2026-27", category: "Tax" },
  { title: "Gold vs Equity: Which Asset Class Wins Over 10 Years?", category: "Gold" },
  { title: "RBI Policy Impact: What Rising Repo Rates Mean for Your Loans", category: "Economy" },
  { title: "How to Build a ₹1 Crore Portfolio Starting with ₹5,000/Month", category: "Personal Finance" },
  { title: "Bank Nifty Options Trading: Strategies for Indian Retail Investors", category: "Markets" },
  { title: "Smallcap vs Midcap Funds: Which Suits Your Risk Profile?", category: "Mutual Funds" },
  { title: "ELSS vs PPF vs NPS: Best Tax-Saving Investments Compared", category: "Tax" },
  { title: "FII vs DII Flows: How Foreign & Domestic Investors Move Markets", category: "Markets" },
  { title: "Step-Up SIP: Why Increasing Your SIP by 10% Each Year is Powerful", category: "Personal Finance" },
]

export async function generateAIArticle() {
  if (!ANTHROPIC_KEY) throw new Error("ANTHROPIC_API_KEY not set")

  const client = new Anthropic({ apiKey: ANTHROPIC_KEY })

  // Pick a topic not yet published
  const published = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    select: { title: true },
  })
  const publishedTitles = new Set(published.map(a => a.title))

  const topic = ARTICLE_TOPICS.find(t => !publishedTitles.has(t.title))
    ?? ARTICLE_TOPICS[Math.floor(published.length % ARTICLE_TOPICS.length)]

  const prompt = `You are a senior financial journalist at WealthWire, India's leading financial media platform.
Write a comprehensive, SEO-optimized article for Indian retail investors.

Title: "${topic.title}"
Category: ${topic.category}
Target audience: Indian retail investors aged 25-45, English-speaking
Tone: Professional but accessible, no jargon without explanation
Length: 800-1200 words

Requirements:
- Include an engaging introduction that hooks the reader
- Use H2 and H3 subheadings (markdown format: ## and ###)
- Include specific Indian context (SEBI, NSE/BSE, INR amounts, Indian funds/stocks where relevant)
- Add a practical "Key Takeaways" section at the end with 3-5 bullet points
- Include a disclaimer at the very end: "Disclaimer: This article is for educational purposes only and does not constitute investment advice. WealthWire is not SEBI registered. Please consult a qualified financial advisor before making investment decisions."
- Write in clean markdown

Write only the article content, starting with the first paragraph (not the title).`

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  })

  const content = message.content[0].type === "text" ? message.content[0].text : ""
  if (!content) throw new Error("Empty response from Claude")

  const slug = slugify(topic.title)
  const excerpt = content.split("\n").find(l => l.trim().length > 50)?.trim().slice(0, 200) ?? ""

  const existing = await prisma.article.findUnique({ where: { slug } })
  if (existing) {
    await prisma.article.update({
      where: { slug },
      data: { content, status: "PUBLISHED", publishedAt: new Date() },
    })
    return { title: topic.title, slug, action: "updated" }
  }

  const dbCat = await prisma.category.upsert({
    where: { slug: slugify(topic.category) },
    create: { name: topic.category, slug: slugify(topic.category) },
    update: {},
  })

  await prisma.article.create({
    data: {
      title: topic.title,
      slug,
      excerpt,
      content,
      status: "PUBLISHED",
      publishedAt: new Date(),
      featured: true,
      categoryId: dbCat.id,
    },
  })

  return { title: topic.title, slug, action: "created" }
}

// ── Part C: Coinpedia RSS crypto feed ───────────────────────────────────────

const COINPEDIA_FEED = "https://coinpedia.org/feed/"

type RssItem = {
  title?: string
  link?: string
  pubDate?: string
  description?: string
  "content:encoded"?: string
  category?: string | string[]
  "media:content"?: { "@_url"?: string } | Array<{ "@_url"?: string }>
  enclosure?: { "@_url"?: string }
}

const rssParser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" })

// Strip HTML tags and the WordPress "The post … appeared first on …" boilerplate
// to produce a clean plain-text excerpt.
function cleanExcerpt(html: string): string {
  return html
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/The post [\s\S]*?appeared first on[\s\S]*$/i, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&#8217;|&#8216;/g, "'")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8230;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

// First <img> src inside the content, used as the cover image.
function firstImage(item: RssItem): string | null {
  const media = item["media:content"]
  if (Array.isArray(media) && media[0]?.["@_url"]) return media[0]["@_url"]!
  if (media && !Array.isArray(media) && media["@_url"]) return media["@_url"]!
  if (item.enclosure?.["@_url"]) return item.enclosure["@_url"]!
  const m = (item["content:encoded"] ?? item.description ?? "").match(/<img[^>]+src=["']([^"']+)["']/i)
  return m?.[1] ?? null
}

/**
 * Ingest Coinpedia's RSS feed as Crypto news. Follows the same
 * excerpt + attribution + link-back model as the Finnhub sync: we store the
 * summary and link readers to the original article, never republishing the
 * full piece.
 */
export async function syncCoinpediaFeed() {
  const res = await fetch(COINPEDIA_FEED, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; WealthWireBot/1.0; +https://abscorp.xyz)",
      Accept: "application/rss+xml, application/xml, text/xml",
    },
    next: { revalidate: 0 },
  })
  if (!res.ok) throw new Error(`Coinpedia feed HTTP ${res.status}`)

  const xml = await res.text()
  const parsed = rssParser.parse(xml)
  const items: RssItem[] = parsed?.rss?.channel?.item ?? []
  if (!Array.isArray(items) || items.length === 0) return []

  const saved: string[] = []
  const dbCat = await prisma.category.upsert({
    where: { slug: slugify("Crypto") },
    create: { name: "Crypto", slug: slugify("Crypto") },
    update: {},
  })

  for (const item of items.slice(0, 15)) {
    const title = typeof item.title === "string" ? item.title.trim() : ""
    const link = typeof item.link === "string" ? item.link.trim() : ""
    if (!title || !link) continue

    const slug = slugify(title)
    const existing = await prisma.article.findUnique({ where: { slug } })
    if (existing) continue

    const excerpt = cleanExcerpt(item.description ?? "").slice(0, 300)
    const published = item.pubDate ? new Date(item.pubDate) : new Date()

    await prisma.article.create({
      data: {
        title,
        slug,
        excerpt,
        content: `${excerpt}\n\n**Source:** [Coinpedia](${link})\n\n*This summary was sourced from Coinpedia. WealthWire aggregates crypto news for informational purposes only. This does not constitute investment advice.*`,
        coverImage: firstImage(item),
        status: "PUBLISHED",
        publishedAt: isNaN(published.getTime()) ? new Date() : published,
        featured: false,
        categoryId: dbCat.id,
      },
    })
    saved.push(title)
  }

  return saved
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80)
}

function mapFinnhubCategory(cat: string): string {
  const map: Record<string, string> = {
    general: "Markets",
    forex: "Economy",
    crypto: "Markets",
    merger: "Markets",
  }
  return map[cat] ?? "Markets"
}

function buildNewsContent(a: FinnhubArticle): string {
  return `${a.summary}

**Source:** [${a.source}](${a.url})

*This article was sourced from ${a.source}. WealthWire aggregates financial news for informational purposes only. This does not constitute investment advice.*`
}
