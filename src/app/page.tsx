import Image from "next/image"
import Link from "next/link"
import { TrendingUp, TrendingDown, Star, Calculator, Shield, Landmark, PiggyBank, CreditCard, Home, ChevronRight, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdUnit } from "@/components/ads/AdUnit"
import { marketIndices, topGainers, topLosers, mutualFunds, ipoList, newsArticles, goldRates, sectors } from "@/lib/mock-data"

function formatINR(value: number) {
  return value.toLocaleString("en-IN", { maximumFractionDigits: 2 })
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={12} className={s <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300"} />
      ))}
    </div>
  )
}

export default function HomePage() {
  const featured = newsArticles[0]
  const headlines = newsArticles.slice(1, 5)
  const latestNews = newsArticles.slice(0, 9)

  const personalFinanceTopics = [
    { icon: PiggyBank, label: "Savings", desc: "Best savings accounts & FDs", href: "/personal-finance/savings" },
    { icon: Shield, label: "Tax Saving", desc: "ELSS, PPF, NPS & more", href: "/tax" },
    { icon: Home, label: "Retirement", desc: "Plan your financial freedom", href: "/personal-finance/retirement" },
    { icon: Landmark, label: "Home Loans", desc: "Compare rates & EMI", href: "/personal-finance/home-loans" },
    { icon: CreditCard, label: "Credit Cards", desc: "Best rewards & cashback", href: "/personal-finance/credit-cards" },
    { icon: Shield, label: "Insurance", desc: "Life, health & term plans", href: "/insurance" },
  ]

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-12">

      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Link href={`/news/${featured.slug}`} className="group block rounded-xl overflow-hidden relative">
            <div className="relative h-72 lg:h-96 w-full bg-gray-200">
              <Image src={featured.coverImage} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <span className="text-xs font-bold bg-red-600 text-white px-2 py-1 rounded mb-2 inline-block">FEATURED</span>
                <h1 className="text-white text-xl lg:text-2xl font-bold leading-tight group-hover:text-amber-300 transition-colors">
                  {featured.title}
                </h1>
                <p className="text-gray-300 text-sm mt-2 line-clamp-2">{featured.excerpt}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                  <span>{featured.author}</span><span>·</span>
                  <span>{featured.date}</span><span>·</span>
                  <span>{featured.readTime} read</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Top Headlines</h2>
          {headlines.map((article) => (
            <Link key={article.slug} href={`/news/${article.slug}`} className="group flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
              <div className="relative w-20 h-16 rounded-md overflow-hidden bg-gray-200 shrink-0">
                <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
              </div>
              <div>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded font-medium mb-1 inline-block">{article.category}</span>
                <p className="text-sm font-semibold leading-snug group-hover:text-[#1E40AF] transition-colors line-clamp-2">{article.title}</p>
                <p className="text-xs text-gray-400 mt-1">{article.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Market Overview */}
      <section className="bg-[#0F172A] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-lg">Market Overview</h2>
          <Link href="/markets" className="text-blue-400 text-sm font-medium hover:underline flex items-center gap-1">View All <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {marketIndices.map((idx) => (
            <div key={idx.name} className="bg-gray-800/50 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-400 mb-1">{idx.name}</div>
              <div className="text-white font-bold text-base">{formatINR(idx.value)}</div>
              <div className={`flex items-center justify-center gap-0.5 text-xs font-semibold mt-1 ${idx.changePercent >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {idx.changePercent >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {idx.changePercent >= 0 ? "+" : ""}{idx.changePercent.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </section>

      <AdUnit slot="3456789012" className="w-full rounded-xl" />

      {/* Top Movers */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Top Movers</h2>
          <Link href="/markets" className="text-[#1E40AF] text-sm font-medium hover:underline flex items-center gap-1">View All <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2"><TrendingUp className="text-emerald-500" size={16} /> Top Gainers</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left px-4 py-2 text-gray-500 font-medium">Stock</th>
                  <th className="text-right px-4 py-2 text-gray-500 font-medium">Price</th>
                  <th className="text-right px-4 py-2 text-gray-500 font-medium">Change</th>
                </tr></thead>
                <tbody>
                  {topGainers.map((s) => (
                    <tr key={s.symbol} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                      <td className="px-4 py-2.5"><div className="font-semibold text-xs">{s.symbol}</div><div className="text-xs text-gray-500">{s.name}</div></td>
                      <td className="px-4 py-2.5 text-right font-medium">₹{formatINR(s.price)}</td>
                      <td className="px-4 py-2.5 text-right"><span className="text-emerald-600 font-semibold text-xs">+{s.changePercent.toFixed(2)}%</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2"><TrendingDown className="text-red-500" size={16} /> Top Losers</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left px-4 py-2 text-gray-500 font-medium">Stock</th>
                  <th className="text-right px-4 py-2 text-gray-500 font-medium">Price</th>
                  <th className="text-right px-4 py-2 text-gray-500 font-medium">Change</th>
                </tr></thead>
                <tbody>
                  {topLosers.map((s) => (
                    <tr key={s.symbol} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                      <td className="px-4 py-2.5"><div className="font-semibold text-xs">{s.symbol}</div><div className="text-xs text-gray-500">{s.name}</div></td>
                      <td className="px-4 py-2.5 text-right font-medium">₹{formatINR(s.price)}</td>
                      <td className="px-4 py-2.5 text-right"><span className="text-red-600 font-semibold text-xs">{s.changePercent.toFixed(2)}%</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sectors */}
      <section>
        <h2 className="text-xl font-bold mb-4">Sector Performance</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {sectors.map((s) => (
            <div key={s.name} className={`rounded-xl p-3 text-center cursor-pointer ${s.change >= 0 ? "bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800" : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"}`}>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{s.name}</div>
              <div className={`text-sm font-bold mt-1 ${s.change >= 0 ? "text-emerald-600" : "text-red-600"}`}>{s.change >= 0 ? "+" : ""}{s.change.toFixed(2)}%</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mutual Funds */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Mutual Fund Centre</h2>
          <Link href="/mutual-funds" className="text-[#1E40AF] text-sm font-medium hover:underline flex items-center gap-1">View All Funds <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {mutualFunds.slice(0, 4).map((fund) => (
            <Card key={fund.name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <span className="text-xs border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded mb-2 inline-block">{fund.category}</span>
                <h3 className="text-sm font-semibold leading-snug mb-1 line-clamp-2">{fund.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{fund.amc}</p>
                <div className="flex items-center justify-between mb-3">
                  <div><div className="text-xs text-gray-500">1Y Returns</div><div className="text-xl font-bold text-emerald-600">+{fund.returns1Y}%</div></div>
                  <div className="text-right"><div className="text-xs text-gray-500">Min SIP</div><div className="text-sm font-semibold">₹{fund.minSip}/mo</div></div>
                </div>
                <StarRating rating={fund.rating} />
                <Button size="sm" className="w-full mt-3">Invest Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <AdUnit slot="4567890123" className="w-full rounded-xl" />

      {/* IPO Centre */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">IPO Centre</h2>
          <Link href="/ipo" className="text-[#1E40AF] text-sm font-medium hover:underline flex items-center gap-1">IPO Calendar <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ipoList.slice(0, 3).map((ipo) => (
            <Card key={ipo.company} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm leading-tight">{ipo.company}</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 ${ipo.status === "OPEN" ? "bg-emerald-100 text-emerald-800" : ipo.status === "UPCOMING" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"}`}>{ipo.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                  <div><div className="text-gray-500">Price Band</div><div className="font-semibold">₹{ipo.priceMin}–{ipo.priceMax}</div></div>
                  <div><div className="text-gray-500">Issue Size</div><div className="font-semibold">{ipo.issueSize}</div></div>
                  <div><div className="text-gray-500">Open Date</div><div className="font-semibold">{ipo.openDate}</div></div>
                  <div><div className="text-gray-500">GMP</div><div className={`font-semibold ${ipo.gmp > 0 ? "text-emerald-600" : "text-gray-500"}`}>{ipo.gmp > 0 ? `+₹${ipo.gmp}` : "N/A"}</div></div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Calculators */}
      <section className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Financial Calculators</h2>
          <Link href="/calculators" className="text-[#1E40AF] text-sm font-medium hover:underline flex items-center gap-1">All Tools <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "SIP Calculator", desc: "Plan your SIP returns", href: "/calculators/sip", color: "bg-blue-600" },
            { label: "EMI Calculator", desc: "Calculate loan EMI", href: "/calculators/emi", color: "bg-emerald-600" },
            { label: "Lumpsum Calculator", desc: "One-time investment returns", href: "/calculators/lumpsum", color: "bg-amber-600" },
            { label: "Retirement Planner", desc: "Plan your retirement corpus", href: "/calculators/retirement", color: "bg-purple-600" },
          ].map((calc) => (
            <Link key={calc.label} href={calc.href} className="group bg-white dark:bg-gray-800 rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700">
              <div className={`${calc.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}><Calculator size={20} className="text-white" /></div>
              <h3 className="font-semibold text-sm mb-1 group-hover:text-[#1E40AF] transition-colors">{calc.label}</h3>
              <p className="text-xs text-gray-500">{calc.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Personal Finance */}
      <section>
        <h2 className="text-xl font-bold mb-5">Personal Finance</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {personalFinanceTopics.map((topic) => (
            <Link key={topic.label} href={topic.href} className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-[#1E40AF] hover:shadow-sm transition-all text-center">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <topic.icon size={20} className="text-[#1E40AF]" />
              </div>
              <h3 className="font-semibold text-sm mb-1 group-hover:text-[#1E40AF] transition-colors">{topic.label}</h3>
              <p className="text-xs text-gray-500">{topic.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Latest News</h2>
          <Link href="/news" className="text-[#1E40AF] text-sm font-medium hover:underline flex items-center gap-1">All News <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestNews.map((article) => (
            <Link key={article.slug} href={`/news/${article.slug}`} className="group">
              <div className="relative h-44 rounded-xl overflow-hidden bg-gray-200 mb-3">
                <Image src={article.coverImage} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded font-medium mb-2 inline-block">{article.category}</span>
              <h3 className="font-semibold text-sm leading-snug group-hover:text-[#1E40AF] transition-colors line-clamp-2">{article.title}</h3>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                <span>{article.author}</span><span>·</span><span>{article.date}</span><span>·</span><span>{article.readTime} read</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <AdUnit slot="5678901234" className="w-full rounded-xl" />

      {/* Gold Rates */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold">Gold & Silver Rates Today</h2>
          <Link href="/gold" className="text-[#1E40AF] text-sm font-medium hover:underline flex items-center gap-1">View All Cities <ChevronRight size={14} /></Link>
        </div>
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">City</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Gold 24K (10g)</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Gold 22K (10g)</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Silver (1kg)</th>
              </tr></thead>
              <tbody>
                {goldRates.map((row) => (
                  <tr key={row.city} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3 font-medium">{row.city}</td>
                    <td className="px-4 py-3 text-right font-semibold text-amber-600">₹{formatINR(row.gold24k)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-amber-500">₹{formatINR(row.gold22k)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-600">₹{formatINR(row.silver)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      {/* Newsletter */}
      <section className="bg-[#1E40AF] rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Get Market Intelligence in Your Inbox</h2>
        <p className="text-blue-200 mb-6">Join 50,000+ investors who receive our daily market brief, IPO alerts, and weekly wealth digest.</p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input type="email" placeholder="Enter your email address" className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-sm focus:outline-none" />
          <button type="submit" className="bg-[#F59E0B] hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors shrink-0">Subscribe Free</button>
        </form>
        <p className="text-xs text-blue-300 mt-3">No spam. Unsubscribe anytime.</p>
      </section>

      {/* Premium */}
      <section className="border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 rounded-2xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-bold bg-amber-500 text-white px-3 py-1 rounded-full mb-3 inline-block">WealthWire Pro</span>
            <h2 className="text-2xl font-bold mb-4">Unlock Premium Market Intelligence</h2>
            <ul className="space-y-2 text-sm">
              {["Ad-free experience", "Unlimited watchlists & portfolio tracking", "Weekly market outlook reports", "AI-powered investment insights", "Exclusive IPO research notes", "Priority email support"].map((f) => (
                <li key={f} className="flex items-center gap-2"><span className="text-emerald-500 font-bold">✓</span> {f}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-md">
            <div className="text-4xl font-extrabold text-[#1E40AF] mb-1">₹499<span className="text-base font-normal text-gray-500">/month</span></div>
            <div className="text-sm text-gray-500 mb-5">or ₹4,499/year (save 25%)</div>
            <Button size="lg" className="w-full mb-3">Start 7-Day Free Trial</Button>
            <Link href="/premium" className="text-sm text-[#1E40AF] hover:underline flex items-center justify-center gap-1 mt-2">
              Compare Plans <ArrowRight size={14} />
            </Link>
            <p className="text-xs text-gray-400 mt-3">No credit card required for trial</p>
          </div>
        </div>
      </section>

    </div>
  )
}
