import Image from "next/image"
import Link from "next/link"
import { TrendingUp, TrendingDown, Star, Calculator, Shield, Landmark, PiggyBank, CreditCard, Home, ChevronRight, ArrowRight, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdSlot } from "@/components/ads/AdSlot"
import { mutualFunds, ipoList, sectors } from "@/lib/mock-data"
import { getAllMarketData } from "@/lib/market-api"
import { getHomepageArticles } from "@/lib/articles"

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

export const revalidate = 3600

export default async function HomePage() {
  const [{ indices: marketIndices, gainers: topGainers, losers: topLosers, goldRates }, { hero, headlines, latest }] =
    await Promise.all([getAllMarketData(), getHomepageArticles()])

  const personalFinanceTopics = [
    { icon: PiggyBank, label: "Savings", desc: "Best savings accounts & FDs", href: "/personal-finance/savings" },
    { icon: Shield, label: "Tax Saving", desc: "ELSS, PPF, NPS & more", href: "/tax" },
    { icon: Home, label: "Retirement", desc: "Plan your financial freedom", href: "/personal-finance/retirement" },
    { icon: Landmark, label: "Home Loans", desc: "Compare rates & EMI", href: "/personal-finance/home-loans" },
    { icon: CreditCard, label: "Credit Cards", desc: "Best rewards & cashback", href: "/personal-finance/credit-cards" },
    { icon: Shield, label: "Insurance", desc: "Life, health & term plans", href: "/insurance" },
  ]

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-14">

      {/* Hero — latest published stories from the content pipeline */}
      {hero && (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Link href={`/news/${hero.slug}`} className="group block overflow-hidden rounded-2xl relative shadow-sm ring-1 ring-gray-200/60 dark:ring-gray-800">
              <div className="relative h-72 lg:h-[26rem] w-full bg-gray-200 dark:bg-gray-800">
                <Image src={hero.coverImage} alt={hero.title} fill priority className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 p-6 lg:p-8">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">{hero.category}</span>
                    {hero.featured && (
                      <span className="flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                        <Sparkles size={11} /> Featured
                      </span>
                    )}
                  </div>
                  <h1 className="text-white text-2xl lg:text-3xl font-bold leading-tight tracking-tight group-hover:text-amber-200 transition-colors">
                    {hero.title}
                  </h1>
                  {hero.excerpt && <p className="mt-2 hidden text-sm text-gray-300 sm:block line-clamp-2 max-w-2xl">{hero.excerpt}</p>}
                  <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                    <span>{hero.author}</span><span>·</span>
                    <span>{hero.date}</span><span>·</span>
                    <span>{hero.readTime} read</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="mb-1 text-xs font-bold uppercase tracking-[0.15em] text-gray-400">Top Headlines</h2>
            {headlines.map((article) => (
              <Link key={article.slug} href={`/news/${article.slug}`} className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
                  <Image src={article.coverImage} alt={article.title} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">{article.category}</span>
                  <p className="mt-0.5 text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#1E40AF] dark:group-hover:text-blue-400 transition-colors">{article.title}</p>
                  <p className="mt-1 text-xs text-gray-400">{article.date}</p>
                </div>
              </Link>
            ))}
            <Link href="/news" className="mt-auto flex items-center justify-center gap-1 rounded-xl border border-dashed border-gray-300 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:border-[#1E40AF] hover:text-[#1E40AF] dark:border-gray-700">
              All stories <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      )}

      {/* Market Overview */}
      <section className="rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1e293b] p-6 lg:p-8 shadow-lg">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white tracking-tight">Market Overview</h2>
          <Link href="/markets" className="flex items-center gap-1 text-sm font-medium text-blue-400 hover:underline">View All <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {marketIndices.map((idx) => (
            <div key={idx.name} className="rounded-2xl bg-white/5 p-4 text-center ring-1 ring-white/10 backdrop-blur transition-colors hover:bg-white/10">
              <div className="mb-1 text-xs text-gray-400">{idx.name}</div>
              <div className="text-base font-bold text-white">{formatINR(idx.value)}</div>
              <div className={`mt-1 flex items-center justify-center gap-0.5 text-xs font-semibold ${idx.changePercent >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {idx.changePercent >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {idx.changePercent >= 0 ? "+" : ""}{idx.changePercent.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </section>

      <AdSlot slot="HEADER_BANNER" />

      {/* Latest News — from the automated content pipeline */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="section-title">Latest News</h2>
          <Link href="/news" className="flex items-center gap-1 text-sm font-medium text-[#1E40AF] hover:underline dark:text-blue-400">All News <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((article) => (
            <Link key={article.slug} href={`/news/${article.slug}`} className="group">
              <div className="relative mb-3 h-48 overflow-hidden rounded-2xl bg-gray-200 shadow-sm ring-1 ring-gray-200/60 dark:bg-gray-800 dark:ring-gray-800">
                <Image src={article.coverImage} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-bold text-gray-800 backdrop-blur dark:bg-black/60 dark:text-gray-200">{article.category}</span>
              </div>
              <h3 className="text-[15px] font-semibold leading-snug tracking-tight line-clamp-2 transition-colors group-hover:text-[#1E40AF] dark:group-hover:text-blue-400">{article.title}</h3>
              {article.excerpt && <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>}
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                <span>{article.date}</span><span>·</span><span>{article.readTime} read</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Movers */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="section-title">Top Movers</h2>
          <Link href="/markets" className="flex items-center gap-1 text-sm font-medium text-[#1E40AF] hover:underline dark:text-blue-400">View All <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card className="rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base"><TrendingUp className="text-emerald-500" size={16} /> Top Gainers</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Stock</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-500">Price</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-500">Change</th>
                </tr></thead>
                <tbody>
                  {topGainers.map((s) => (
                    <tr key={s.symbol} className="border-b border-gray-50 hover:bg-gray-50 dark:border-gray-800/50 dark:hover:bg-gray-800/30">
                      <td className="px-4 py-2.5"><div className="text-xs font-semibold">{s.symbol}</div><div className="text-xs text-gray-500">{s.name}</div></td>
                      <td className="px-4 py-2.5 text-right font-medium">₹{formatINR(s.price)}</td>
                      <td className="px-4 py-2.5 text-right"><span className="text-xs font-semibold text-emerald-600">+{s.changePercent.toFixed(2)}%</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base"><TrendingDown className="text-red-500" size={16} /> Top Losers</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="px-4 py-2 text-left font-medium text-gray-500">Stock</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-500">Price</th>
                  <th className="px-4 py-2 text-right font-medium text-gray-500">Change</th>
                </tr></thead>
                <tbody>
                  {topLosers.map((s) => (
                    <tr key={s.symbol} className="border-b border-gray-50 hover:bg-gray-50 dark:border-gray-800/50 dark:hover:bg-gray-800/30">
                      <td className="px-4 py-2.5"><div className="text-xs font-semibold">{s.symbol}</div><div className="text-xs text-gray-500">{s.name}</div></td>
                      <td className="px-4 py-2.5 text-right font-medium">₹{formatINR(s.price)}</td>
                      <td className="px-4 py-2.5 text-right"><span className="text-xs font-semibold text-red-600">{s.changePercent.toFixed(2)}%</span></td>
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
        <h2 className="section-title mb-6">Sector Performance</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {sectors.map((s) => (
            <div key={s.name} className={`rounded-2xl p-3 text-center ring-1 transition-transform hover:-translate-y-0.5 ${s.change >= 0 ? "bg-emerald-50 ring-emerald-200 dark:bg-emerald-900/20 dark:ring-emerald-800" : "bg-red-50 ring-red-200 dark:bg-red-900/20 dark:ring-red-800"}`}>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{s.name}</div>
              <div className={`mt-1 text-sm font-bold ${s.change >= 0 ? "text-emerald-600" : "text-red-600"}`}>{s.change >= 0 ? "+" : ""}{s.change.toFixed(2)}%</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mutual Funds */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="section-title">Mutual Fund Centre</h2>
          <Link href="/mutual-funds" className="flex items-center gap-1 text-sm font-medium text-[#1E40AF] hover:underline dark:text-blue-400">View All Funds <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mutualFunds.slice(0, 4).map((fund) => (
            <Card key={fund.name} className="rounded-2xl transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <span className="mb-2 inline-block rounded-full border border-gray-200 px-2 py-0.5 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-400">{fund.category}</span>
                <h3 className="mb-1 text-sm font-semibold leading-snug line-clamp-2">{fund.name}</h3>
                <p className="mb-3 text-xs text-gray-500">{fund.amc}</p>
                <div className="mb-3 flex items-center justify-between">
                  <div><div className="text-xs text-gray-500">1Y Returns</div><div className="text-xl font-bold text-emerald-600">+{fund.returns1Y}%</div></div>
                  <div className="text-right"><div className="text-xs text-gray-500">Min SIP</div><div className="text-sm font-semibold">₹{fund.minSip}/mo</div></div>
                </div>
                <StarRating rating={fund.rating} />
                <Button size="sm" className="mt-3 w-full rounded-full">Invest Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <AdSlot slot="IN_ARTICLE_MIDDLE" />

      {/* IPO Centre */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="section-title">IPO Centre</h2>
          <Link href="/ipo" className="flex items-center gap-1 text-sm font-medium text-[#1E40AF] hover:underline dark:text-blue-400">IPO Calendar <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ipoList.slice(0, 3).map((ipo) => (
            <Card key={ipo.company} className="rounded-2xl transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-sm font-semibold leading-tight">{ipo.company}</h3>
                  <span className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${ipo.status === "OPEN" ? "bg-emerald-100 text-emerald-800" : ipo.status === "UPCOMING" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-700"}`}>{ipo.status}</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div><div className="text-gray-500">Price Band</div><div className="font-semibold">₹{ipo.priceMin}–{ipo.priceMax}</div></div>
                  <div><div className="text-gray-500">Issue Size</div><div className="font-semibold">{ipo.issueSize}</div></div>
                  <div><div className="text-gray-500">Open Date</div><div className="font-semibold">{ipo.openDate}</div></div>
                  <div><div className="text-gray-500">GMP</div><div className={`font-semibold ${ipo.gmp > 0 ? "text-emerald-600" : "text-gray-500"}`}>{ipo.gmp > 0 ? `+₹${ipo.gmp}` : "N/A"}</div></div>
                </div>
                <Button variant="outline" size="sm" className="mt-3 w-full rounded-full">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Calculators */}
      <section className="rounded-3xl bg-surface p-6 lg:p-8 ring-1 ring-border-soft">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="section-title">Financial Calculators</h2>
          <Link href="/calculators" className="flex items-center gap-1 text-sm font-medium text-[#1E40AF] hover:underline dark:text-blue-400">All Tools <ChevronRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "SIP Calculator", desc: "Plan your SIP returns", href: "/calculators/sip", color: "bg-blue-600" },
            { label: "EMI Calculator", desc: "Calculate loan EMI", href: "/calculators/emi", color: "bg-emerald-600" },
            { label: "Lumpsum Calculator", desc: "One-time investment returns", href: "/calculators/lumpsum", color: "bg-amber-600" },
            { label: "Retirement Planner", desc: "Plan your retirement corpus", href: "/calculators/retirement", color: "bg-purple-600" },
          ].map((calc) => (
            <Link key={calc.label} href={calc.href} className="group rounded-2xl border border-gray-100 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
              <div className={`${calc.color} mb-3 flex h-10 w-10 items-center justify-center rounded-xl`}><Calculator size={20} className="text-white" /></div>
              <h3 className="mb-1 text-sm font-semibold transition-colors group-hover:text-[#1E40AF] dark:group-hover:text-blue-400">{calc.label}</h3>
              <p className="text-xs text-gray-500">{calc.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Personal Finance */}
      <section>
        <h2 className="section-title mb-6">Personal Finance</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {personalFinanceTopics.map((topic) => (
            <Link key={topic.label} href={topic.href} className="group rounded-2xl border border-gray-200 bg-white p-4 text-center transition-all hover:-translate-y-0.5 hover:border-[#1E40AF] hover:shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <topic.icon size={20} className="text-[#1E40AF] dark:text-blue-400" />
              </div>
              <h3 className="mb-1 text-sm font-semibold transition-colors group-hover:text-[#1E40AF] dark:group-hover:text-blue-400">{topic.label}</h3>
              <p className="text-xs text-gray-500">{topic.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot slot="IN_ARTICLE_BOTTOM" />

      {/* Gold Rates */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="section-title">Gold &amp; Silver Rates Today</h2>
          <Link href="/gold" className="flex items-center gap-1 text-sm font-medium text-[#1E40AF] hover:underline dark:text-blue-400">View All Cities <ChevronRight size={14} /></Link>
        </div>
        <Card className="rounded-2xl">
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-400">City</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">Gold 24K (10g)</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">Gold 22K (10g)</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-gray-400">Silver (1kg)</th>
              </tr></thead>
              <tbody>
                {goldRates.map((row) => (
                  <tr key={row.city} className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/30">
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
      <section className="rounded-3xl bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] p-8 lg:p-10 text-center text-white shadow-lg">
        <h2 className="mb-2 text-2xl font-bold tracking-tight">Get Market Intelligence in Your Inbox</h2>
        <p className="mb-6 text-blue-100">Daily market brief, IPO alerts, and a weekly wealth digest. Free, forever.</p>
        <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <input type="email" placeholder="Enter your email address" className="flex-1 rounded-full px-5 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400" />
          <button type="submit" className="shrink-0 rounded-full bg-[#F59E0B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-600">Subscribe Free</button>
        </form>
        <p className="mt-3 text-xs text-blue-200">No spam. Unsubscribe anytime.</p>
      </section>

      {/* Premium */}
      <section className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-8 dark:border-amber-900 dark:from-amber-950/30 dark:to-orange-950/20">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="mb-3 inline-block rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">WealthWire Pro</span>
            <h2 className="mb-4 text-2xl font-bold tracking-tight">Unlock Premium Market Intelligence</h2>
            <ul className="space-y-2 text-sm">
              {["Ad-free experience", "Unlimited watchlists & portfolio tracking", "Weekly market outlook reports", "AI-powered investment insights", "Exclusive IPO research notes", "Priority email support"].map((f) => (
                <li key={f} className="flex items-center gap-2"><span className="font-bold text-emerald-500">✓</span> {f}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-6 text-center shadow-md dark:bg-gray-900">
            <div className="mb-1 text-4xl font-extrabold text-[#1E40AF] dark:text-blue-400">₹499<span className="text-base font-normal text-gray-500">/month</span></div>
            <div className="mb-5 text-sm text-gray-500">or ₹4,499/year (save 25%)</div>
            <Button size="lg" className="mb-3 w-full rounded-full">Start 7-Day Free Trial</Button>
            <Link href="/premium" className="mt-2 flex items-center justify-center gap-1 text-sm text-[#1E40AF] hover:underline dark:text-blue-400">
              Compare Plans <ArrowRight size={14} />
            </Link>
            <p className="mt-3 text-xs text-gray-400">No credit card required for trial</p>
          </div>
        </div>
      </section>

    </div>
  )
}
