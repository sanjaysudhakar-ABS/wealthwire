import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Use | WealthWire",
  description: "Terms of use for WealthWire — the rules governing your use of our financial media platform.",
}

export default function TermsOfUsePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-2">Terms of Use</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">Last updated: June 2026</p>

      <div className="space-y-10 text-gray-700 dark:text-gray-300">

        <section>
          <p>
            Please read these Terms of Use carefully before using the WealthWire website
            (abscorp.xyz), operated by Athena Business Solutions. By accessing or using our site, you agree
            to be bound by these terms. If you do not agree, please do not use our site.
          </p>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing our website, you confirm that you are at least 18 years of age, have read
            and understood these Terms of Use, and agree to be legally bound by them. We reserve the
            right to update these terms at any time. Continued use of the site following any changes
            constitutes your acceptance of the revised terms.
          </p>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">2. Use of Service</h2>
          <div className="space-y-3">
            <p>You agree to use WealthWire only for lawful purposes and in a manner that does not infringe the rights of others. You must not:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Reproduce, distribute, or republish our content without prior written permission</li>
              <li>Use automated tools (bots, scrapers) to access or extract content from our site</li>
              <li>Attempt to gain unauthorised access to any part of our systems</li>
              <li>Transmit any material that is defamatory, offensive, or in violation of applicable law</li>
              <li>Use our site to send unsolicited commercial communications</li>
            </ul>
          </div>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">3. Intellectual Property</h2>
          <p>
            All content on WealthWire — including articles, analysis, graphics, logos, data
            presentations, and code — is the intellectual property of WealthWire or its
            licensors and is protected by Indian and international copyright law. You may share our
            content links freely, but reproduction of full articles or substantial portions thereof
            without attribution and prior written consent is prohibited.
          </p>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">4. Investment Disclaimer</h2>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 p-5">
            <p className="font-semibold text-amber-800 dark:text-amber-400 mb-2">This is not financial advice.</p>
            <p className="text-amber-700 dark:text-amber-300">
              WealthWire is NOT registered with the Securities and Exchange Board of India
              (SEBI). All content published on this platform — including market commentary, stock
              mentions, mutual fund analysis, IPO reviews, and any other financial content — is
              strictly for educational and informational purposes only. Nothing on this site
              constitutes investment advice, a solicitation to buy or sell any security, or a
              recommendation of any investment product. Past performance is not indicative of future
              results. You should always consult a SEBI-registered investment adviser before making
              any investment decision.
            </p>
          </div>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">5. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, WealthWire and its owners,
            editors, employees, and contributors shall not be liable for any direct, indirect,
            incidental, consequential, or punitive damages arising out of your access to or use of
            our site, reliance on any content published herein, or any trading or investment
            decisions made based on information found on our platform. You use this site entirely
            at your own risk.
          </p>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">6. Third-Party Links</h2>
          <p>
            Our site may contain links to third-party websites, including broker platforms, financial
            product providers, and other media outlets. These links are provided for convenience only.
            We do not endorse, control, or take responsibility for the content, privacy practices, or
            accuracy of any third-party site. Visiting third-party sites is at your own risk.
          </p>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">7. Governing Law</h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance with the laws of
            India. Any disputes arising in connection with these terms shall be subject to the
            exclusive jurisdiction of the courts of Chennai, Tamil Nadu, India.
          </p>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Use at any time. Changes will be posted on
            this page with an updated &ldquo;Last updated&rdquo; date. It is your responsibility to
            review these terms periodically. Your continued use of the site after any changes
            constitutes your acceptance of the new terms.
          </p>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">9. Contact</h2>
          <p>
            If you have any questions about these Terms of Use, please contact us at{" "}
            <a href="mailto:info@abscorp.xyz" className="text-[#1E40AF] hover:underline">
              info@abscorp.xyz
            </a>{" "}
            or via our{" "}
            <Link href="/contact" className="text-[#1E40AF] hover:underline">Contact Page</Link>.
          </p>
        </section>

      </div>
    </div>
  )
}
