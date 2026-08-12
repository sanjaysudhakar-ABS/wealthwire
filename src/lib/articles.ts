import prisma from "./prisma"
import { newsArticles as mockArticles } from "./mock-data"

export const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800"

/** Minimum word count for a PUBLISHED article to appear in public listings. */
export const MIN_ARTICLE_WORDS = 250

export type ArticleCard = {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  category: string
  author: string
  date: string
  readTime: string
  featured: boolean
}

export function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).filter(Boolean).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min`
}

/** True when content is a short aggregator stub or otherwise too thin for AdSense. */
export function isThinContent(content: string | null | undefined): boolean {
  if (!content) return true
  const words = content.split(/\s+/).filter(Boolean).length
  if (words < MIN_ARTICLE_WORDS) return true
  // Known stub footer from Finnhub / Coinpedia ingest
  if (
    content.includes("WealthWire aggregates") &&
    words < 400
  ) {
    return true
  }
  return false
}

type ArticleRow = {
  slug: string
  title: string
  excerpt: string | null
  content: string | null
  coverImage: string | null
  publishedAt: Date | null
  featured: boolean
  category: { name: string } | null
}

function toCard(r: ArticleRow): ArticleCard {
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt ?? "",
    coverImage: r.coverImage ?? PLACEHOLDER_IMAGE,
    category: r.category?.name ?? "Markets",
    author: "WealthWire",
    date: r.publishedAt?.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) ?? "",
    readTime: estimateReadTime(r.content ?? r.excerpt ?? ""),
    featured: r.featured,
  }
}

function mockCards(): ArticleCard[] {
  return mockArticles.map(a => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    coverImage: a.coverImage,
    category: a.category,
    author: a.author,
    date: a.date,
    readTime: a.readTime,
    featured: false,
  }))
}

const cardSelect = {
  slug: true,
  title: true,
  excerpt: true,
  content: true,
  coverImage: true,
  publishedAt: true,
  featured: true,
  category: { select: { name: true } },
} as const

/**
 * Latest published articles with substantial body copy.
 * Thin aggregator stubs are excluded even if status is PUBLISHED (legacy rows).
 * Falls back to mock evergreen cards when the database is empty or unreachable.
 */
export async function getLatestArticles(limit = 12, category?: string): Promise<ArticleCard[]> {
  try {
    // Over-fetch then filter thin stubs so listings stay dense enough.
    const rows = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        ...(category ? { category: { name: category } } : {}),
      },
      orderBy: { publishedAt: "desc" },
      take: Math.max(limit * 4, 40),
      select: cardSelect,
    })
    const substantial = rows.filter(r => !isThinContent(r.content)).map(toCard)
    if (substantial.length > 0) return substantial.slice(0, limit)
  } catch { /* fall through to mock */ }
  const mocks = mockCards()
  return (category ? mocks.filter(a => a.category === category) : mocks).slice(0, limit)
}

/** Articles arranged for the homepage: one hero, a headline rail, and a grid.
 *  Prefers an article flagged `featured` (AI long-forms) with a cover image as hero. */
export async function getHomepageArticles() {
  const articles = await getLatestArticles(13)
  const hero =
    articles.find(a => a.featured && a.coverImage !== PLACEHOLDER_IMAGE) ??
    articles.find(a => a.featured) ??
    articles[0]
  const rest = articles.filter(a => a !== hero)
  return {
    hero,
    headlines: rest.slice(0, 4),
    latest: rest.slice(4, 13),
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const rows = await prisma.category.findMany({
      where: { articles: { some: { status: "PUBLISHED" } } },
      orderBy: { name: "asc" },
      select: { name: true },
    })
    if (rows.length > 0) return rows.map(r => r.name)
  } catch { /* fall through */ }
  return ["Markets", "Mutual Funds", "IPO", "Tax", "Economy", "Gold", "Personal Finance"]
}
