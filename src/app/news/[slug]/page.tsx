import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { AdUnit } from "@/components/ads/AdUnit"
import { newsArticles } from "@/lib/mock-data"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = newsArticles.find(a => a.slug === slug) || newsArticles[0]
  return { title: article.title, description: article.excerpt }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = newsArticles.find(a => a.slug === slug) || newsArticles[0]
  const related = newsArticles.filter(a => a.slug !== article.slug && a.category === article.category).slice(0, 3)

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
          <h1 className="text-3xl font-extrabold leading-tight mb-4">{article.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold">{article.author[0]}</div>
            <div><div className="font-medium text-gray-900 dark:text-gray-100">{article.author}</div><div className="text-xs">{article.date} · {article.readTime} read</div></div>
          </div>
          <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-8">
            <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
          </div>
          <AdUnit slot="in-article-top" className="w-full rounded-xl mb-6" />
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p className="text-lg font-medium">{article.excerpt}</p>
            <p>Indian financial markets have been witnessing significant activity in recent months. Investors are closely monitoring both domestic and global cues to make informed investment decisions. The interplay of factors such as foreign institutional investor flows, domestic economic data, and global macroeconomic developments continues to shape market sentiment.</p>
            <p>Experts suggest that retail investors should focus on their long-term financial goals rather than reacting to short-term market volatility. A well-diversified portfolio across asset classes — equities, debt, gold, and real estate — remains the cornerstone of sound financial planning.</p>
            <h2 className="text-xl font-bold mt-6 mb-3">Key Takeaways for Investors</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Stay invested through market cycles and avoid panic selling during corrections</li>
              <li>Continue SIP investments regardless of market conditions — time in the market beats timing the market</li>
              <li>Review and rebalance your portfolio at least once a year</li>
              <li>Ensure adequate insurance coverage before making investments</li>
            </ul>
          </div>
          <AdUnit slot="in-article-middle" className="w-full rounded-xl my-8" />
          <div className="flex gap-3 mb-8">
            {["twitter", "linkedin", "whatsapp"].map((platform) => (
              <button key={platform} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors capitalize">{platform}</button>
            ))}
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-[#1E40AF] flex items-center justify-center text-white font-bold text-lg shrink-0">{article.author[0]}</div>
            <div><div className="font-bold">{article.author}</div><div className="text-sm text-gray-500 mt-1">Senior Financial Journalist at WealthWire India. Covers stock markets, mutual funds, and personal finance.</div></div>
          </div>
          {related.length > 0 && (
            <div>
              <h3 className="text-xl font-bold mb-4">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map(r => (
                  <Link key={r.slug} href={`/news/${r.slug}`} className="group">
                    <div className="relative h-32 rounded-xl overflow-hidden mb-2">
                      <Image src={r.coverImage} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-sm font-semibold group-hover:text-[#1E40AF] transition-colors line-clamp-2">{r.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
        <aside className="space-y-6">
          <AdUnit slot="article-sidebar" className="w-full rounded-xl" />
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <h3 className="font-bold mb-4">Latest News</h3>
            {newsArticles.slice(0, 5).map(a => (
              <Link key={a.slug} href={`/news/${a.slug}`} className="flex gap-3 mb-4 group">
                <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-200 shrink-0">
                  <Image src={a.coverImage} alt={a.title} fill className="object-cover" />
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
