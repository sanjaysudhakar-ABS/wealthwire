import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-gray-300 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold mb-2">
              <span className="text-[#1E40AF]">WealthWire</span>
              <span className="text-[#F59E0B]">India</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">Market Intelligence. Wealth Creation.</p>
            <div className="flex gap-3">
              <a href="#" className="hover:text-white">🐦</a>
              <a href="#" className="hover:text-white">💼</a>
              <a href="#" className="hover:text-white">▶</a>
              <a href="#" className="hover:text-white">📱</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Advertise", href: "/contact" },
                { label: "Careers", href: "/about" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Use", href: "/terms-of-use" },
                { label: "Disclaimer", href: "/disclaimer" },
                { label: "Sitemap", href: "/sitemap.xml" },
              ].map(l => (
                <li key={l.label}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Markets</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Stocks", href: "/markets" },
                { label: "Mutual Funds", href: "/mutual-funds" },
                { label: "IPO", href: "/ipo" },
                { label: "Gold Rates", href: "/markets" },
                { label: "News", href: "/news" },
                { label: "Calculators", href: "/calculators" },
              ].map(l => (
                <li key={l.label}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Tools</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "SIP Calculator", href: "/calculators/sip" },
                { label: "EMI Calculator", href: "/calculators/emi" },
                { label: "Retirement Planner", href: "/calculators/retirement" },
                { label: "CAGR Calculator", href: "/calculators" },
              ].map(l => (
                <li key={l.label}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between gap-2 text-xs text-gray-500">
          <p>WealthWire is not SEBI registered. Content is for educational purposes only.</p>
          <p>© {new Date().getFullYear()} WealthWire, a service of Athena Business Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
