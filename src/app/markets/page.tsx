import { Metadata } from "next"
import Link from "next/link"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdUnit } from "@/components/ads/AdUnit"
import { marketIndices, topGainers, topLosers, sectors } from "@/lib/mock-data"

export const metadata: Metadata = { title: "Stock Market Today – Nifty, Sensex Live | WealthWire India", description: "Live Nifty 50, Sensex, Bank Nifty data. Top gainers, losers, sector performance and market news." }

function formatINR(v: number) { return v.toLocaleString("en-IN", { maximumFractionDigits: 2 }) }

const mostActive = [
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2891.45, change: 0.87, volume: "3.2 Cr" },
  { symbol: "TCS", name: "Tata Consultancy Services", price: 4123.20, change: 1.23, volume: "2.8 Cr" },
  { symbol: "HDFCBANK", name: "HDFC Bank", price: 1712.65, change: -0.54, volume: "2.5 Cr" },
  { symbol: "ICICIBANK", name: "ICICI Bank", price: 1189.30, change: 0.92, volume: "2.3 Cr" },
  { symbol: "BAJAJFINSV", name: "Bajaj Finserv", price: 1876.45, change: 1.45, volume: "1.9 Cr" },
]

export default function MarketsPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Indian Stock Market</h1>
        <p className="text-gray-500 dark:text-gray-400">Live market data, top movers, and sector performance</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {marketIndices.map((idx) => (
          <div key={idx.name} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center shadow-sm">
            <div className="text-xs text-gray-500 mb-1">{idx.name}</div>
            <div className="font-bold text-lg">{formatINR(idx.value)}</div>
            <div className={`flex items-center justify-center gap-0.5 text-xs font-semibold mt-1 ${idx.changePercent >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {idx.changePercent >= 0 ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
              {idx.changePercent >= 0 ? "+" : ""}{idx.changePercent.toFixed(2)}%
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{idx.change >= 0 ? "+" : ""}{formatINR(idx.change)}</div>
          </div>
        ))}
      </div>

      <AdUnit slot="markets-top" className="w-full rounded-xl" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <div className="border-b border-gray-100 dark:border-gray-800 px-4">
            <div className="flex gap-4">
              {["Top Gainers", "Top Losers", "Most Active"].map((tab, i) => (
                <button key={tab} className={`py-3 text-sm font-semibold border-b-2 transition-colors ${i === 0 ? "border-[#1E40AF] text-[#1E40AF]" : "border-transparent text-gray-500 hover:text-gray-900"}`}>{tab}</button>
              ))}
            </div>
          </div>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 dark:bg-gray-800/50">
                <th className="text-left px-4 py-3 font-medium text-gray-500">#</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Stock</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Price (₹)</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Change</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">52W High</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">52W Low</th>
              </tr></thead>
              <tbody>
                {topGainers.map((s, i) => (
                  <tr key={s.symbol} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                    <td className="px-4 py-3"><div className="font-semibold text-xs">{s.symbol}</div><div className="text-xs text-gray-500">{s.name}</div></td>
                    <td className="px-4 py-3 text-right font-semibold">{formatINR(s.price)}</td>
                    <td className="px-4 py-3 text-right"><span className="text-emerald-600 font-semibold text-xs">+{s.changePercent.toFixed(2)}%</span></td>
                    <td className="px-4 py-3 text-right text-xs text-gray-500">{formatINR(s.price * 1.12)}</td>
                    <td className="px-4 py-3 text-right text-xs text-gray-500">{formatINR(s.price * 0.78)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Sector Heatmap</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {sectors.map((s) => (
                <div key={s.name} className={`rounded-lg p-2 text-center text-xs font-semibold ${s.change >= 0 ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"}`}>
                  <div>{s.name}</div>
                  <div className="font-bold mt-0.5">{s.change >= 0 ? "+" : ""}{s.change.toFixed(2)}%</div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Most Active</CardTitle></CardHeader>
            <CardContent className="p-0">
              {mostActive.map((s) => (
                <div key={s.symbol} className="flex items-center justify-between px-4 py-2.5 border-b border-gray-50 dark:border-gray-800/50 last:border-0">
                  <div><div className="text-xs font-semibold">{s.symbol}</div><div className="text-xs text-gray-500">{s.volume} shares</div></div>
                  <div className="text-right"><div className="text-sm font-semibold">₹{formatINR(s.price)}</div><div className={`text-xs font-semibold ${s.change >= 0 ? "text-emerald-600" : "text-red-600"}`}>{s.change >= 0 ? "+" : ""}{s.change.toFixed(2)}%</div></div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
