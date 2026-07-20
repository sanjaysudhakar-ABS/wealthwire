import { Metadata } from "next"
import Link from "next/link"
import { Star, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AdUnit } from "@/components/ads/AdUnit"
import { mutualFunds } from "@/lib/mock-data"

export const metadata: Metadata = { title: "Best Mutual Funds 2024 – SIP, ELSS, Index Funds | WealthWire", description: "Top performing mutual funds in India. Compare SIP returns, NAV, expense ratio, and ratings." }

const categories = ["All", "Large Cap", "Mid Cap", "Small Cap", "Flexi Cap", "ELSS", "Index", "Debt"]

export default function MutualFundsPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-[#1E40AF] rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Mutual Fund Centre</h1>
        <p className="text-blue-200">Discover top-performing funds. Compare returns, ratings, and start SIP in minutes.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat, i) => (
          <button key={cat} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${i === 0 ? "bg-[#1E40AF] text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"}`}>{cat}</button>
        ))}
      </div>

      <AdUnit slot="mf-top" className="w-full rounded-xl" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mutualFunds.map((fund) => (
          <Card key={fund.name} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs border border-gray-200 dark:border-gray-700 px-2 py-0.5 rounded text-gray-600 dark:text-gray-400 mb-1 inline-block">{fund.category}</span>
                  <h3 className="font-semibold text-sm leading-snug">{fund.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{fund.amc}</p>
                </div>
                <div className="flex gap-0.5 shrink-0 ml-2">
                  {[1,2,3,4,5].map(s => <Star key={s} size={11} className={s <= fund.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"} />)}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
                <div><div className="text-xs text-gray-500">1Y</div><div className="font-bold text-sm text-emerald-600">+{fund.returns1Y}%</div></div>
                <div><div className="text-xs text-gray-500">3Y</div><div className="font-bold text-sm text-emerald-600">+{fund.returns3Y}%</div></div>
                <div><div className="text-xs text-gray-500">5Y</div><div className="font-bold text-sm text-emerald-600">+{fund.returns5Y}%</div></div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>NAV: <strong className="text-gray-900 dark:text-gray-100">₹{fund.nav.toFixed(2)}</strong></span>
                <span>Risk: <strong className={fund.riskRating === "Very High" ? "text-red-600" : fund.riskRating === "High" ? "text-amber-600" : "text-green-600"}>{fund.riskRating}</strong></span>
                <span>SIP: <strong className="text-gray-900 dark:text-gray-100">₹{fund.minSip}</strong></span>
              </div>
              <button className="w-full bg-[#1E40AF] hover:bg-blue-800 text-white text-sm font-semibold py-2 rounded-lg transition-colors">Start SIP</button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">Quick SIP Calculator</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Monthly SIP (₹)</label><input type="number" defaultValue="10000" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]" /></div>
          <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Expected Returns (%)</label><input type="number" defaultValue="12" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]" /></div>
          <div><label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Time Period (Years)</label><input type="number" defaultValue="10" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]" /></div>
        </div>
        <Link href="/calculators/sip" className="mt-4 inline-flex items-center gap-2 text-[#1E40AF] font-semibold text-sm hover:underline">
          Use Full SIP Calculator <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  )
}
