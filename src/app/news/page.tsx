import { Metadata } from "next"
import { SafeImage } from "@/components/ui/SafeImage"
import Link from "next/link"
import { AdSlot } from "@/components/ads/AdSlot"
import { getLatestArticles, getCategories } from "@/lib/articles"

export const metadata: Metadata = { title: "Financial News India – Markets, Economy, Business | WealthWire", description: "Latest Indian financial news covering stock markets, economy, IPO, mutual funds, and personal finance." }

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams
  const [articles, categories] = await Promise.all([
    getLatestArticles(24, category),
    getCategories(),
  ])
  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Financial News</h1>
      <p className="text-gray-500 mb-6">Markets, IPOs, mutual funds, and personal finance — updated around the clock.</p>

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/news"
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${!category ? "bg-[#1E40AF] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"}`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/news?category=${encodeURIComponent(cat)}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${category === cat ? "bg-[#1E40AF] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"}`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {articles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-16 text-center text-gray-500 dark:border-gray-700">
          No articles in this category yet — check back soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-8 lg:col-span-3">
            {/* Featured */}
            {featured && (
              <Link href={`/news/${featured.slug}`} className="group relative mb-6 block overflow-hidden rounded-2xl shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800">
                <div className="relative h-64 sm:h-80 w-full bg-gray-200 dark:bg-gray-800">
                  <SafeImage src={featured.coverImage} alt={featured.title} fill priority className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <span className="mb-2 inline-block rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">{featured.category}</span>
                    <h2 className="text-xl sm:text-2xl font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-amber-200">{featured.title}</h2>
                    {featured.excerpt && <p className="mt-1 hidden text-sm text-gray-300 sm:block line-clamp-2">{featured.excerpt}</p>}
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                      <span>{featured.date}</span><span>·</span><span>{featured.readTime} read</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              {rest.map((article) => (
                <Link key={article.slug} href={`/news/${article.slug}`} className="group">
                  <div className="relative mb-3 h-48 overflow-hidden rounded-2xl bg-gray-200 shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-800 dark:ring-gray-800">
                    <SafeImage src={article.coverImage} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-bold text-gray-800 backdrop-blur dark:bg-black/60 dark:text-gray-200">{article.category}</span>
                  </div>
                  <h3 className="mb-1.5 text-base font-bold leading-snug tracking-tight line-clamp-2 transition-colors group-hover:text-[#1E40AF] dark:group-hover:text-blue-400">{article.title}</h3>
                  {article.excerpt && <p className="mb-2 text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>}
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{article.author}</span><span>·</span><span>{article.date}</span><span>·</span><span>{article.readTime} read</span>
                  </div>
                </Link>
              ))}
            </div>

            <AdSlot slot="IN_ARTICLE_BOTTOM" />
          </div>

          <aside className="space-y-6">
            <AdSlot slot="SIDEBAR" />
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-4 font-bold tracking-tight">Trending Topics</h3>
              <ul className="space-y-3">
                {["Nifty 50 Analysis", "Budget 2026", "IPO GMP Today", "Gold Price Today", "SIP Returns", "Tax Saving ELSS"].map((topic, i) => (
                  <li key={topic} className="flex items-center gap-3 text-sm">
                    <span className="w-6 text-2xl font-extrabold text-gray-200 dark:text-gray-700">{i + 1}</span>
                    <span className="cursor-pointer transition-colors hover:text-[#1E40AF] dark:hover:text-blue-400">{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
