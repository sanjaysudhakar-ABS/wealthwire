import { Metadata } from "next"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = { title: "Open Free Demat Account – Best Brokers 2024 | WealthWire", description: "Compare India's best discount brokers. Open a free demat account with Zerodha, Upstox, Groww or Angel One." }

const brokers = [
  { name: "Zerodha", desc: "India's largest stockbroker by active clients", brokerage: "₹0 equity delivery, ₹20/order F&O", features: ["Free equity delivery", "₹20 flat F&O", "Kite platform", "Coin for mutual funds", "Console for reports"], cta: "Open with Zerodha", color: "border-blue-200 bg-blue-50 dark:bg-blue-900/10", badge: "Most Popular" },
  { name: "Upstox", desc: "Backed by Tiger Global, Ratan Tata", brokerage: "₹0 equity delivery, ₹20/order F&O", features: ["Zero brokerage delivery", "Advanced charts", "Options analytics", "Margin trading", "API available"], cta: "Open with Upstox", color: "border-purple-200 bg-purple-50 dark:bg-purple-900/10", badge: "Best for Beginners" },
  { name: "Groww", desc: "Simplest app for stocks & mutual funds", brokerage: "₹0 equity delivery, ₹20/order", features: ["Clean, simple UI", "Direct mutual funds", "US stocks available", "Gold investment", "Zero commission MF"], cta: "Open with Groww", color: "border-green-200 bg-green-50 dark:bg-green-900/10", badge: "Best App" },
  { name: "Angel One", desc: "Full-service broker with smart analytics", brokerage: "₹0 equity delivery, ₹20/order", features: ["ARQ Prime advisory", "SmartAPI", "Margin funding", "Research reports", "3-in-1 account option"], cta: "Open with Angel One", color: "border-amber-200 bg-amber-50 dark:bg-amber-900/10", badge: "Best Research" },
]

export default function OpenDematPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Open Free Demat Account</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Compare India&apos;s best discount brokers. All offer ₹0 account opening fee and free equity delivery trades.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {brokers.map((broker) => (
          <div key={broker.name} className={`relative rounded-2xl border-2 p-5 ${broker.color}`}>
            {broker.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold bg-[#1E40AF] text-white px-3 py-1 rounded-full whitespace-nowrap">{broker.badge}</span>}
            <div className="pt-2">
              <h3 className="text-xl font-extrabold mb-1">{broker.name}</h3>
              <p className="text-xs text-gray-500 mb-3">{broker.desc}</p>
              <div className="bg-white dark:bg-gray-900 rounded-lg px-3 py-2 text-xs text-gray-600 dark:text-gray-400 mb-4 font-medium">{broker.brokerage}</div>
              <ul className="space-y-2 mb-5">
                {broker.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300"><CheckCircle size={13} className="text-emerald-500 shrink-0" />{f}</li>
                ))}
              </ul>
              <button className="w-full bg-[#1E40AF] hover:bg-blue-800 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">{broker.cta}</button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-center text-gray-400 border-t border-gray-200 dark:border-gray-800 pt-6">
        <strong>Disclosure:</strong> WealthWire may earn a commission when you open an account through the links above. This does not affect our editorial independence. We recommend brokers based on features, reliability, and user experience.
      </p>
    </div>
  )
}
