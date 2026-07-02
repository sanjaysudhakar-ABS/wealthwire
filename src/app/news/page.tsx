import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { AdUnit } from "@/components/ads/AdUnit"
import { newsArticles as mockArticles } from "@/lib/mock-data"
import prisma from "@/lib/prisma"

export const revalidate = 3600

export const metadata: Metadata = { title: "Financial News India – Markets, Economy, Business | WealthWire India", description: "Latest Indian financial news covering stock markets, economy, IPO, mutual funds, and personal finance." }

const categories = ["All", "Markets", "Mutual Funds", "IPO", "Tax", "Economy", "Gold", "Personal Finance"]

type ArticleCard = {
  slug: string
  title: string
  excerpt: string | null
  coverImage: string | null
  category: string
  author: string
  date: string
  readTime: string
}

async function getArticles(): Promise<ArticleCard[]> {
  try {
    const rows = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 24,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        publishedAt: true,
        featured: true,
        category: { select: { name: true } },
      },
    })

    if (rows.length === 0) return fallbackArticles()

    return rows.map(r => ({
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      coverImage: r.coverImage,
      category: r.category?.name ?? "Markets",
      author: "WealthWire India",
      date: r.publishedAt?.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) ?? "",
      readTime: estimateReadTime(r.excerpt ?? ""),
    }))
  } catch {
    return fallbackArticles()
  }
}

function fallbackArticles(): ArticleCard[] {
  return mockArticles.map(a => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    coverImage: a.coverImage,
    category: a.category,
    author: a.author,
    date: a.date,
    readTime: a.readTime,
  }))
}

function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).length
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} min`
}

const PLACEHOLDER = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800"

export default async function NewsPage() {
  const articles = await getArticles()
  const featured = articles.find(a => a.coverImage) ?? articles[0]
  const rest = articles.filter(a => a !== featured)

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Financial News</h1>
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((cat, i) => (
          <span key={cat} className={`px-4 py-1.5 rounded-full text-sm font-medium ${i === 0 ? "bg-[#1E40AF] text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"}`}>{cat}</span>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          {/* Featured */}
          {featured && (
            <Link href={`/news/${featured.slug}`} className="group block rounded-xl overflow-hidden relative mb-6">
              <div className="relative h-64 w-full bg-gray-200">
                <Image src={featured.coverImage ?? PLACEHOLDER} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <span className="text-xs font-bold bg-red-600 text-white px-2 py-1 rounded mb-2 inline-block">FEATURED</span>
                  <h2 className="text-white text-xl font-bold leading-tight group-hover:text-amber-300 transition-colors">{featured.title}</h2>
                  {featured.excerpt && <p className="text-gray-300 text-sm mt-1 line-clamp-2">{featured.excerpt}</p>}
                </div>
              </div>
            </Link>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rest.map((article) => (
              <Link key={article.slug} href={`/news/${article.slug}`} className="group">
                <div className="relative h-48 rounded-xl overflow-hidden bg-gray-200 mb-3">
                  <Image src={article.coverImage ?? PLACEHOLDER} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded font-medium mb-2 inline-block">{article.category}</span>
                <h3 className="font-bold text-base leading-snug group-hover:text-[#1E40AF] transition-colors line-clamp-2 mb-2">{article.title}</h3>
                {article.excerpt && <p className="text-sm text-gray-500 line-clamp-2 mb-2">{article.excerpt}</p>}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{article.author}</span><span>·</span><span>{article.date}</span><span>·</span><span>{article.readTime} read</span>
                </div>
              </Link>
            ))}
          </div>

          <AdUnit slot="news-in-feed" className="w-full rounded-xl" />
        </div>

        <div className="space-y-6">
          <AdUnit slot="news-sidebar" className="w-full rounded-xl" />
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <h3 className="font-bold mb-4">Trending Topics</h3>
            <ul className="space-y-3">
              {["Nifty 50 Analysis", "Budget 2026", "IPO GMP Today", "Gold Price Today", "SIP Returns", "Tax Saving ELSS"].map((topic, i) => (
                <li key={topic} className="flex items-center gap-3 text-sm"><span className="text-2xl font-extrabold text-gray-200 dark:text-gray-700 w-6">{i + 1}</span><span className="hover:text-[#1E40AF] transition-colors cursor-pointer">{topic}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
