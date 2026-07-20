import { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { AdUnit } from "@/components/ads/AdUnit"
import { ipoList } from "@/lib/mock-data"

export const metadata: Metadata = { title: "IPO 2024 Calendar – Upcoming, Open & Listed IPOs | WealthWire", description: "Latest IPO news, GMP, subscription data, and listing gains. Complete IPO calendar for Indian markets." }

export default function IPOPage() {
  const open = ipoList.filter(i => i.status === "OPEN")
  const upcoming = ipoList.filter(i => i.status === "UPCOMING")
  const listed = ipoList.filter(i => i.status === "LISTED")

  const IPOTable = ({ ipos, title }: { ipos: typeof ipoList; title: string }) => (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full inline-block ${title === "Open IPOs" ? "bg-emerald-500" : title === "Upcoming IPOs" ? "bg-blue-500" : "bg-gray-400"}`}></span>
        {title}
        <span className="text-sm font-normal text-gray-500">({ipos.length})</span>
      </h2>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-4 py-3 font-medium text-gray-500">Company</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Price Band</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Issue Size</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Open Date</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Close Date</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">GMP</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500">Subscription</th>
                <th className="text-center px-4 py-3 font-medium text-gray-500">Action</th>
              </tr></thead>
              <tbody>
                {ipos.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-8 text-gray-400">No IPOs in this category</td></tr>
                ) : ipos.map((ipo) => (
                  <tr key={ipo.company} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3"><div className="font-semibold text-sm">{ipo.company}</div>{ipo.symbol && <div className="text-xs text-gray-500">{ipo.symbol}</div>}</td>
                    <td className="px-4 py-3 text-right font-medium">₹{ipo.priceMin}–{ipo.priceMax}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{ipo.issueSize}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{ipo.openDate}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{ipo.closeDate}</td>
                    <td className="px-4 py-3 text-right"><span className={`font-semibold ${ipo.gmp > 0 ? "text-emerald-600" : "text-gray-400"}`}>{ipo.gmp > 0 ? `+₹${ipo.gmp}` : "–"}</span></td>
                    <td className="px-4 py-3 text-right">{ipo.subscriptionTimes > 0 ? <span className="font-semibold text-[#1E40AF]">{ipo.subscriptionTimes}x</span> : <span className="text-gray-400">–</span>}</td>
                    <td className="px-4 py-3 text-center"><button className="text-xs bg-[#1E40AF] text-white px-3 py-1.5 rounded-lg font-medium hover:bg-blue-800 transition-colors">{ipo.status === "OPEN" ? "Apply Now" : "View Details"}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-1">IPO Calendar 2024</h1>
        <p className="text-gray-500 dark:text-gray-400">Track upcoming, open, and recently listed IPOs with GMP and subscription data</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[{ label: "Open Now", value: open.length, color: "text-emerald-600 bg-emerald-50" }, { label: "Upcoming", value: upcoming.length, color: "text-blue-600 bg-blue-50" }, { label: "Recently Listed", value: listed.length, color: "text-gray-600 bg-gray-50" }, { label: "Total 2024 IPOs", value: "247", color: "text-[#1E40AF] bg-blue-50" }].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-xl p-4 text-center dark:bg-opacity-20`}>
            <div className={`text-3xl font-extrabold ${stat.color.split(" ")[0]}`}>{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <AdUnit slot="ipo-banner" className="w-full rounded-xl" />
      <IPOTable ipos={open} title="Open IPOs" />
      <IPOTable ipos={upcoming} title="Upcoming IPOs" />
      <IPOTable ipos={listed} title="Recently Listed" />
    </div>
  )
}
