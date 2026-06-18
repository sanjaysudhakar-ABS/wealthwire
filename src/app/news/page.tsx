import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { AdUnit } from "@/components/ads/AdUnit"
import { newsArticles } from "@/lib/mock-data"

export const metadata: Metadata = { title: "Financial News India – Markets, Economy, Business | WealthWire India", description: "Latest Indian financial news covering stock markets, economy, IPO, mutual funds, and personal finance." }

const categories = ["All", "Markets", "Mutual Funds", "IPO", "Tax", "Economy", "Gold", "Personal Finance"]

export default function NewsPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Financial News</h1>
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((cat, i) => (
          <button key={cat} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${i === 0 ? "bg-[#1E40AF] text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"}`}>{cat}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {newsArticles.map((article) => (
              <Link key={article.slug} href={`/news/${article.slug}`} className="group">
                <div className="relative h-48 rounded-xl overflow-hidden bg-gray-200 mb-3">
                  <Image src={article.coverImage} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded font-medium mb-2 inline-block">{article.category}</span>
                <h2 className="font-bold text-base leading-snug group-hover:text-[#1E40AF] transition-colors line-clamp-2 mb-2">{article.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-2 mb-2">{article.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{article.author}</span><span>·</span><span>{article.date}</span><span>·</span><span>{article.readTime} read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <AdUnit slot="news-sidebar" className="w-full rounded-xl" />
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
            <h3 className="font-bold mb-4">Trending Topics</h3>
            <ul className="space-y-3">
              {["Nifty 50 Analysis", "Budget 2025", "IPO GMP Today", "Gold Price Today", "SIP Returns", "Tax Saving ELSS"].map((topic, i) => (
                <li key={topic} className="flex items-center gap-3 text-sm"><span className="text-2xl font-extrabold text-gray-200 dark:text-gray-700 w-6">{i + 1}</span><Link href="#" className="hover:text-[#1E40AF] transition-colors">{topic}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
