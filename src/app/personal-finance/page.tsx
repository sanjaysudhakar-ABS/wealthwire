import type { Metadata } from "next"
import Link from "next/link"
import { PiggyBank, Shield, Home, Landmark, CreditCard, Umbrella } from "lucide-react"

export const metadata: Metadata = {
  title: "Personal Finance Guides for Indian Households",
  description: "Practical personal finance guides covering savings, retirement, home loans, credit cards, tax, and insurance for Indian retail investors.",
}

const topics = [
  { icon: PiggyBank, label: "Savings & Emergency Funds", desc: "How much cash to keep and where to park it", href: "/personal-finance/savings" },
  { icon: Shield, label: "Tax Saving", desc: "80C, 80D, NPS and regime choice", href: "/tax" },
  { icon: Home, label: "Retirement Planning", desc: "Corpus targets, EPF, NPS and SIPs", href: "/personal-finance/retirement" },
  { icon: Landmark, label: "Home Loans", desc: "EMI affordability, rates and prepayment", href: "/personal-finance/home-loans" },
  { icon: CreditCard, label: "Credit Cards", desc: "Rewards, pitfalls and healthy usage", href: "/personal-finance/credit-cards" },
  { icon: Umbrella, label: "Insurance", desc: "Term and health cover essentials", href: "/insurance" },
]

export default function PersonalFinanceHubPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <div className="max-w-3xl mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Personal Finance</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Clear, India-focused guides to help you budget, protect, and invest — without product pushing.
          Start with an emergency fund and insurance, then automate investing toward specific goals.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {topics.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-[#1E40AF] hover:shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
              <t.icon size={22} className="text-[#1E40AF] dark:text-blue-400" />
            </div>
            <h2 className="text-lg font-semibold group-hover:text-[#1E40AF] dark:group-hover:text-blue-400">{t.label}</h2>
            <p className="mt-1 text-sm text-gray-500">{t.desc}</p>
          </Link>
        ))}
      </div>

      <section className="max-w-3xl space-y-4 text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">A simple order of operations</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Build 3–6 months of essential expenses in liquid form.</li>
          <li>Buy adequate term life (if you have dependents) and health insurance.</li>
          <li>Clear high-interest debt (credit cards, personal loans) aggressively.</li>
          <li>Invest via SIPs into diversified funds mapped to goals and timelines.</li>
          <li>Review annually — salary hikes, new goals, and tax regime changes.</li>
        </ol>
        <p className="text-xs text-gray-500 pt-4">
          Educational content only. WealthWire is not SEBI registered and does not provide personalised financial advice.
        </p>
      </section>
    </div>
  )
}
