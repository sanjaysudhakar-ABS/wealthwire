import { Metadata } from "next"
import Link from "next/link"
import { Calculator, TrendingUp, Home, PiggyBank, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "Financial Calculators – SIP, EMI, Retirement | WealthWire",
  description: "Free financial calculators: SIP, EMI, lumpsum, and retirement planners built for Indian investors, with guides and worked examples.",
}

const calculators = [
  { icon: TrendingUp, label: "SIP Calculator", desc: "Calculate returns on your monthly SIP investments. Plan your wealth creation journey.", href: "/calculators/sip", color: "bg-blue-600", example: "₹10,000/month → ₹23.2 Lakh in 10 years @12%" },
  { icon: Home, label: "EMI Calculator", desc: "Calculate monthly EMI for home loan, personal loan, or car loan.", href: "/calculators/emi", color: "bg-emerald-600", example: "₹50L home loan @8.5% for 20 years = ₹43,391/month" },
  { icon: PiggyBank, label: "Lumpsum Calculator", desc: "Calculate returns on a one-time lump sum investment.", href: "/calculators/lumpsum", color: "bg-amber-600", example: "₹1 Lakh → ₹3.1 Lakh in 10 years @12%" },
  { icon: BarChart3, label: "Retirement Calculator", desc: "Plan your retirement corpus based on your current age and savings.", href: "/calculators/retirement", color: "bg-purple-600", example: "₹5 Crore corpus needed for comfortable retirement" },
]

export default function CalculatorsPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Financial Calculators</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Free calculators with plain-language guides, formulas, and FAQs — built for Indian investors planning SIPs, loans, and retirement.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {calculators.map((calc) => (
          <Link key={calc.label} href={calc.href} className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-[#1E40AF] hover:shadow-lg transition-all">
            <div className={`${calc.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
              <calc.icon size={22} className="text-white" />
            </div>
            <h2 className="font-bold text-base mb-2 group-hover:text-[#1E40AF] transition-colors">{calc.label}</h2>
            <p className="text-sm text-gray-500 mb-3">{calc.desc}</p>
            <p className="text-xs bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg p-2 italic">{calc.example}</p>
            <div className="mt-3 text-[#1E40AF] text-sm font-semibold group-hover:underline">Calculate →</div>
          </Link>
        ))}
      </div>
      <div className="mt-12 max-w-3xl mx-auto text-center text-sm text-gray-500">
        <Calculator className="inline-block mb-2 text-[#1E40AF]" size={20} />
        <p>
          Looking for tax or insurance guidance too? Read our{" "}
          <Link href="/tax" className="text-[#1E40AF] hover:underline">tax-saving guide</Link>
          {" "}and{" "}
          <Link href="/personal-finance" className="text-[#1E40AF] hover:underline">personal finance hub</Link>.
        </p>
      </div>
    </div>
  )
}
