import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { SafeImage } from "@/components/ui/SafeImage"
import { AdSlot } from "@/components/ads/AdSlot"
import { newsArticles as mockArticles } from "@/lib/mock-data"
import prisma from "@/lib/prisma"

export const revalidate = 3600

const PLACEHOLDER = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800"

// Synced news articles embed their origin as "**Source:** [name](url)".
// Pull it out so the page can render a prominent link to the original.
function extractSource(content: string | null) {
  if (!content) return { source: null, body: content }
  const m = content.match(/\*\*Source:\*\*\s*\[([^\]]+)\]\(([^)]+)\)/)
  if (!m) return { source: null, body: content }
  return {
    source: { name: m[1], url: m[2] },
    body: content.replace(m[0], "").trim(),
  }
}

async function getArticle(slug: string) {
  try {
    const row = await prisma.article.findUnique({
      where: { slug, status: "PUBLISHED" },
      include: { category: true },
    })
    if (row) {
      const { source, body } = extractSource(row.content)
      return {
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt ?? "",
        content: body,
        source,
        coverImage: row.coverImage ?? PLACEHOLDER,
        category: row.category?.name ?? "Markets",
        author: source?.name ?? "WealthWire",
        date: row.publishedAt?.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) ?? "",
        isAI: true,
      }
    }
  } catch { /* fallthrough */ }

  const mock = mockArticles.find(a => a.slug === slug)
  if (mock) return { ...mock, content: null, source: null, isAI: false }
  return null
}

async function getRelated(slug: string, category: string) {
  try {
    const rows = await prisma.article.findMany({
      where: { status: "PUBLISHED", slug: { not: slug }, category: { name: category } },
      take: 3,
      orderBy: { publishedAt: "desc" },
      select: { slug: true, title: true, coverImage: true },
    })
    if (rows.length > 0) return rows.map(r => ({ slug: r.slug, title: r.title, coverImage: r.coverImage ?? PLACEHOLDER }))
  } catch { /* fallthrough */ }

  return mockArticles
    .filter(a => a.slug !== slug && a.category === category)
    .slice(0, 3)
    .map(a => ({ slug: a.slug, title: a.title, coverImage: a.coverImage }))
}

async function getLatestArticles() {
  try {
    const rows = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      take: 5,
      orderBy: { publishedAt: "desc" },
      select: { slug: true, title: true, coverImage: true },
    })
    if (rows.length > 0) return rows.map(r => ({ slug: r.slug, title: r.title, coverImage: r.coverImage ?? PLACEHOLDER }))
  } catch { /* fallthrough */ }
  return mockArticles.slice(0, 5).map(a => ({ slug: a.slug, title: a.title, coverImage: a.coverImage }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: "Article Not Found" }
  return { title: article.title, description: article.excerpt }
}

// Render inline markdown: [links](url), **bold**, *italic*
function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g
  let last = 0
  let key = 0
  let m: RegExpExecArray | null
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    if (m[1] !== undefined) {
      nodes.push(<a key={key++} href={m[2]} target="_blank" rel="noopener noreferrer">{m[1]}</a>)
    } else if (m[3] !== undefined) {
      nodes.push(<strong key={key++}>{m[3]}</strong>)
    } else {
      nodes.push(<em key={key++}>{m[4]}</em>)
    }
    last = m.index + m[0].length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

// Render markdown-ish content (headings, lists, paragraphs + inline marks)
function renderContent(content: string) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let key = 0

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    if (trimmed.startsWith("### ")) {
      elements.push(<h3 key={key++}>{renderInline(trimmed.slice(4))}</h3>)
    } else if (trimmed.startsWith("## ")) {
      elements.push(<h2 key={key++}>{renderInline(trimmed.slice(3))}</h2>)
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      elements.push(<li key={key++}>{renderInline(trimmed.slice(2))}</li>)
    } else {
      elements.push(<p key={key++}>{renderInline(trimmed)}</p>)
    }
  }
  return elements
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [article, latestArticles] = await Promise.all([getArticle(slug), getLatestArticles()])

  if (!article) notFound()

  const related = await getRelated(slug, article.category)

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2">
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#1E40AF]">Home</Link><span>/</span>
            <Link href="/news" className="hover:text-[#1E40AF]">News</Link><span>/</span>
            <span className="text-gray-900 dark:text-gray-100">{article.category}</span>
          </nav>
          <span className="text-xs bg-[#1E40AF] text-white px-3 py-1 rounded-full font-medium mb-4 inline-block">{article.category}</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-4">
            {article.source ? (
              <a href={article.source.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#1E40AF] dark:hover:text-blue-400">
                {article.title}
              </a>
            ) : article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#1E40AF] flex items-center justify-center text-white text-xs font-bold">W</div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">{article.author}</div>
              <div className="text-xs">{article.date}</div>
            </div>
          </div>
          <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-8">
            <SafeImage src={article.coverImage} alt={article.title} fill className="object-cover" />
          </div>
          <AdSlot slot="IN_ARTICLE_TOP" className="mb-6" />
          <div className="prose-article">
            {article.content
              ? renderContent(article.content)
              : (
                <>
                  <p className="text-lg font-medium">{article.excerpt}</p>
                  <p>Indian financial markets have been witnessing significant activity. Investors are closely monitoring domestic and global cues to make informed investment decisions.</p>
                  <p>Experts suggest retail investors focus on long-term financial goals rather than reacting to short-term market volatility. A well-diversified portfolio across equities, debt, gold, and real estate remains the cornerstone of sound financial planning.</p>
                  <h2 className="text-xl font-bold mt-6 mb-3">Key Takeaways for Investors</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Stay invested through market cycles and avoid panic selling</li>
                    <li>Continue SIP investments regardless of market conditions</li>
                    <li>Review and rebalance your portfolio at least once a year</li>
                    <li>Ensure adequate insurance coverage before making investments</li>
                  </ul>
                </>
              )
            }
          </div>
          {article.source && (
            <a
              href={article.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-5 transition-colors hover:border-[#1E40AF] hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950/40 dark:hover:bg-blue-950/70"
            >
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">Original story</div>
                <div className="mt-0.5 font-semibold text-gray-900 dark:text-white">Read the full story at {article.source.name}</div>
              </div>
              <span className="shrink-0 rounded-full bg-[#1E40AF] px-4 py-2 text-sm font-semibold text-white">Read →</span>
            </a>
          )}
          <AdSlot slot="IN_ARTICLE_MIDDLE" className="my-8" />
          <div className="flex gap-3 mb-8">
            {["Twitter", "LinkedIn", "WhatsApp"].map((platform) => (
              <button key={platform} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">{platform}</button>
            ))}
          </div>
          {related.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map(r => (
                  <Link key={r.slug} href={`/news/${r.slug}`} className="group">
                    <div className="relative h-32 rounded-xl overflow-hidden mb-2">
                      <SafeImage src={r.coverImage} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-sm font-semibold group-hover:text-[#1E40AF] transition-colors line-clamp-2">{r.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
        <aside className="space-y-6">
          <AdSlot slot="SIDEBAR" />
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <h3 className="font-bold mb-4">Latest News</h3>
            {latestArticles.map(a => (
              <Link key={a.slug} href={`/news/${a.slug}`} className="flex gap-3 mb-4 group">
                <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                  <SafeImage src={a.coverImage} alt={a.title} fill className="object-cover" />
                </div>
                <p className="text-xs font-medium leading-snug group-hover:text-[#1E40AF] transition-colors line-clamp-3">{a.title}</p>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
