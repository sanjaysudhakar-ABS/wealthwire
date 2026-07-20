import Anthropic from "@anthropic-ai/sdk"
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
