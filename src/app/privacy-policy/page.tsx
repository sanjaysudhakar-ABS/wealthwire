import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | WealthWire India",
  description: "WealthWire India privacy policy — how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">Last updated: June 2026</p>

      <div className="space-y-10 text-gray-700 dark:text-gray-300">

        <section>
          <p>
            WealthWire India (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website at wealthwireindia.com. Please read it carefully.
            By using our site, you agree to the practices described here.
          </p>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">1. Information We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#0F172A] dark:text-white mb-2">Information You Provide</h3>
              <p>
                When you contact us via our contact form, we collect your name, email address, and
                the contents of your message. We do not require account registration to use our site.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#0F172A] dark:text-white mb-2">Automatically Collected Information</h3>
              <p>
                When you visit our site, we automatically collect certain information about your
                device, including your IP address, browser type, operating system, referring URLs,
                pages viewed, and the dates and times of your visits. This information is collected
                through cookies and similar tracking technologies.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To respond to your enquiries and messages</li>
            <li>To improve, personalise, and expand our website and content</li>
            <li>To understand and analyse how you use our site (analytics)</li>
            <li>To display relevant advertisements via Google AdSense</li>
            <li>To detect, prevent, and address technical issues or security threats</li>
            <li>To comply with applicable laws and regulations</li>
          </ul>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">3. Cookies and Tracking Technologies</h2>
          <div className="space-y-4">
            <p>
              We use cookies — small text files placed on your device — and similar tracking
              technologies to enhance your experience and to collect usage data. Cookies help us
              remember your preferences, understand traffic patterns, and serve relevant content and
              advertisements.
            </p>
            <div>
              <h3 className="font-semibold text-[#0F172A] dark:text-white mb-2">Types of Cookies We Use</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Essential cookies:</strong> Required for the site to function correctly.</li>
                <li><strong>Analytics cookies:</strong> Used by Google Analytics to understand how visitors interact with our site.</li>
                <li><strong>Advertising cookies:</strong> Used by Google AdSense to serve personalised advertisements based on your browsing history and interests.</li>
                <li><strong>Preference cookies:</strong> Store your settings such as dark/light mode.</li>
              </ul>
            </div>
            <p>
              You can control or delete cookies through your browser settings. Note that disabling
              cookies may affect the functionality of some parts of our site.
            </p>
          </div>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">4. Third-Party Services</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#0F172A] dark:text-white mb-2">Google AdSense</h3>
              <p>
                We use Google AdSense to display advertisements on our site. Google AdSense uses
                cookies to serve ads based on your prior visits to our website and other websites
                across the internet. Google&rsquo;s use of advertising cookies enables it and its
                partners to serve ads to you based on your visit to our site and/or other sites on
                the internet. You may opt out of personalised advertising by visiting{" "}
                <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#1E40AF] hover:underline">
                  Google Ad Settings
                </a>
                . Alternatively, you can opt out of a third-party vendor&rsquo;s use of cookies for
                personalised advertising by visiting{" "}
                <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#1E40AF] hover:underline">
                  www.aboutads.info/choices
                </a>
                .
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#0F172A] dark:text-white mb-2">Google Analytics</h3>
              <p>
                We use Google Analytics to analyse website traffic and user behaviour. Google
                Analytics collects data such as pages visited, time spent on site, and geographic
                location of visitors. This data is aggregated and anonymised. You can opt out of
                Google Analytics tracking by installing the{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#1E40AF] hover:underline">
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">5. Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share information with third-party
            service providers (such as Google) only to the extent necessary to operate our site and
            deliver services. We may also disclose information if required by law, regulation, or
            valid legal process.
          </p>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">6. Data Retention</h2>
          <p>
            We retain contact form submissions for up to 12 months, after which they are deleted.
            Analytics and advertising data is retained in accordance with Google&rsquo;s own data
            retention policies. We do not store sensitive financial information.
          </p>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">7. Your Rights</h2>
          <p className="mb-3">
            Depending on your jurisdiction, you may have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to or restrict certain processing of your data</li>
            <li>Withdraw consent at any time where processing is based on consent</li>
          </ul>
          <p className="mt-3">
            To exercise these rights, contact us at editorial@wealthwireindia.com.
          </p>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">8. Children&rsquo;s Privacy</h2>
          <p>
            Our site is not directed at children under the age of 13. We do not knowingly collect
            personal information from children under 13. If you believe we have inadvertently
            collected such information, please contact us immediately and we will delete it.
          </p>
        </section>

        <section className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white mb-4">9. Contact Information</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="mt-3 space-y-1">
            <p><strong>Email:</strong> editorial@wealthwireindia.com</p>
            <p><strong>Address:</strong> Mumbai, Maharashtra, India</p>
          </div>
          <p className="mt-3">
            Or use our <Link href="/contact" className="text-[#1E40AF] hover:underline">Contact Page</Link>.
          </p>
        </section>

      </div>
    </div>
  )
}
