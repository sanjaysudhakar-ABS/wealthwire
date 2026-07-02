import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Disclaimer | WealthWire India",
  description: "Important disclaimers for WealthWire India — investment, affiliate, advertiser, and accuracy disclosures.",
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-2">Disclaimer</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">Last updated: June 2026</p>

      <div className="space-y-10 text-gray-700 dark:text-gray-300">

        <section>
          <p>
            Please read the following disclaimers carefully before using WealthWire India
            (wealthwireindia.com). By using our site, you acknowledge and accept the terms set out below.
          </p>
        </section>

        {/* Investment Disclaimer */}
        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">Investment Disclaimer</h2>
          <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 p-5 mb-4">
            <p className="font-bold text-red-800 dark:text-red-400 mb-2">
              WealthWire India is NOT registered with SEBI.
            </p>
            <p className="text-red-700 dark:text-red-300">
              We are not a SEBI-registered investment adviser, research analyst, or stockbroker.
            </p>
          </div>
          <div className="space-y-3">
            <p>
              All articles, market commentary, stock analysis, mutual fund reviews, IPO assessments,
              and any other financial content published on WealthWire India are strictly for
              educational and informational purposes only. Nothing published on this platform
              constitutes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Investment advice or a recommendation to buy or sell any security</li>
              <li>A solicitation for funds or financial products</li>
              <li>Research analysis within the meaning of SEBI (Research Analysts) Regulations, 2014</li>
              <li>Portfolio management or advisory services</li>
            </ul>
            <p>
              WealthWire India and its contributors are not responsible for any trading or investment
              losses incurred as a result of information published on this platform. Markets involve
              significant risk, and the value of investments can fall as well as rise. Past
              performance is not indicative of future results. Always consult a SEBI-registered
              investment adviser before making investment decisions.
            </p>
          </div>
        </section>

        {/* Affiliate Disclosure */}
        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">Affiliate Disclosure</h2>
          <p>
            WealthWire India participates in affiliate marketing programmes. This means we may earn
            a commission when you click on certain links and open a demat account, subscribe to a
            financial product, or complete another qualifying action with one of our broker or
            financial product partners. These commissions help fund our editorial operations and
            allow us to keep our content freely accessible.
          </p>
          <p className="mt-3">
            Affiliate relationships do not influence our editorial coverage. Our reviews and
            recommendations are based on independent analysis. We clearly identify sponsored content
            where applicable. If you have questions about a specific link or partnership, please
            contact us at info@abscorp.xyz.
          </p>
        </section>

        {/* Advertiser Disclosure */}
        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">Advertiser Disclosure</h2>
          <p>
            WealthWire India displays advertisements served by Google AdSense. These advertisements
            are selected and served by Google LLC and its advertising partners based on your browsing
            history, interests, and other factors. The presence of an advertisement on our site does
            not constitute an endorsement of the advertised product or service by WealthWire India.
          </p>
          <p className="mt-3">
            We do not control which specific ads appear and are not responsible for the content,
            accuracy, or claims made in third-party advertisements. For information on how Google
            uses data to serve ads, please review{" "}
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-[#1E40AF] hover:underline">
              Google&rsquo;s advertising policies
            </a>
            . You can manage your ad personalisation preferences via{" "}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#1E40AF] hover:underline">
              Google Ad Settings
            </a>
            .
          </p>
        </section>

        {/* Accuracy Disclaimer */}
        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">Accuracy Disclaimer</h2>
          <p>
            While we strive to provide accurate and timely financial information, WealthWire India
            makes no warranties or representations, express or implied, regarding the accuracy,
            completeness, reliability, or timeliness of any content on this site.
          </p>
          <p className="mt-3">
            <strong>Market data displayed on our platform may not be real-time.</strong> Stock
            prices, indices, NAVs, gold rates, and other market data may be delayed by 15 minutes
            or more depending on the data source. This data should not be used as the sole basis for
            trading or investment decisions. Always verify prices with your broker or official
            exchange sources before executing trades.
          </p>
          <p className="mt-3">
            Tax information, regulatory details, and financial regulations referenced on our site
            are subject to change. Please verify all such information with a qualified professional
            or official government sources before acting on it.
          </p>
        </section>

        {/* Copyright */}
        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">Copyright Notice</h2>
          <p>
            &copy; {new Date().getFullYear()} WealthWire India. All rights reserved. The content,
            design, logos, and trademarks of WealthWire India are protected by Indian and
            international copyright and intellectual property laws. Unauthorised reproduction,
            distribution, or modification of any content from this site is strictly prohibited
            without prior written consent.
          </p>
          <p className="mt-3">
            For content licensing or syndication enquiries, please{" "}
            <Link href="/contact" className="text-[#1E40AF] hover:underline">contact us</Link>.
          </p>
        </section>

      </div>
    </div>
  )
}
