import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us | WealthWire",
  description: "Learn about WealthWire — an independent financial media platform democratising access to financial information for Indian retail investors.",
}

const coverageAreas = [
  { title: "Markets", desc: "Real-time Nifty, Sensex, and stock market coverage with analysis." },
  { title: "Mutual Funds", desc: "NAV tracking, fund comparisons, and SIP guidance." },
  { title: "IPO", desc: "GMP, subscription status, allotment, and listing day analysis." },
  { title: "Personal Finance", desc: "Budgeting, savings, and financial planning for every life stage." },
  { title: "Tax Planning", desc: "Income tax, capital gains, and deduction guides for Indian investors." },
  { title: "Gold Rates", desc: "Daily gold and silver prices across major Indian cities." },
]

const team = [
  {
    name: "WealthWire Desk",
    role: "Editorial",
    bio: "Our desk publishes educational explainers on Indian markets, mutual funds, tax basics, and personal finance. We prioritise clarity over hype.",
    initials: "WW",
  },
  {
    name: "Athena Business Solutions",
    role: "Publisher",
    bio: "WealthWire is a service of Athena Business Solutions. We build tools and guides that help retail investors learn how markets and products work.",
    initials: "ABS",
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="text-center py-16 mb-8">
        <h1 className="text-4xl font-bold text-[#0F172A] dark:text-white mb-4">
          Market Intelligence.{" "}
          <span className="text-[#1E40AF]">Wealth Creation.</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          WealthWire is your trusted source for independent financial news, market data,
          and investment education — built for the Indian retail investor.
        </p>
      </section>

      {/* Who We Are */}
      <section className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
        <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-4">Who We Are</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <p>
            WealthWire, a service of Athena Business Solutions, is an independent financial media platform
            founded with a singular mission: to democratise access to high-quality financial information for
            Indian retail investors. For too long, actionable market intelligence was the preserve of
            institutional investors and the affluent. We are changing that.
          </p>
          <p>
            We cover Indian equity markets, mutual funds, IPOs, personal finance, and more — with
            plain-language analysis that empowers every investor, from first-time savers to seasoned
            traders, to make more informed decisions.
          </p>
          <p>
            We are editorially independent. Our journalism is not influenced by advertisers or
            financial product manufacturers. We call markets as we see them.
          </p>
        </div>
      </section>

      {/* What We Cover */}
      <section className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
        <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-6">What We Cover</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {coverageAreas.map((area) => (
            <div
              key={area.title}
              className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-800/50"
            >
              <h3 className="font-semibold text-[#1E40AF] dark:text-blue-400 mb-2">{area.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Team */}
      <section className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
        <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-6">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#1E40AF] text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">
                {member.initials}
              </div>
              <h3 className="font-semibold text-[#0F172A] dark:text-white">{member.name}</h3>
              <p className="text-sm text-[#F59E0B] font-medium mb-2">{member.role}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8">
        <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 p-6">
          <h2 className="text-lg font-bold text-amber-800 dark:text-amber-400 mb-2">Important Disclaimer</h2>
          <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed">
            WealthWire is not registered with SEBI (Securities and Exchange Board of India).
            All content published on this platform is for educational and informational purposes only
            and should not be construed as investment advice, a solicitation to buy or sell securities,
            or a recommendation of any financial product. Please consult a SEBI-registered investment
            adviser before making any investment decisions.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8 text-center">
        <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-3">Get in Touch</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Have a story tip, partnership enquiry, or feedback? We would love to hear from you.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-[#1E40AF] hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Contact Us
        </Link>
      </section>
    </div>
  )
}
