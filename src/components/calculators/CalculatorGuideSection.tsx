import Link from "next/link"
import type { CalculatorGuide } from "@/lib/calculator-guides"

/** Educational section rendered below calculator widgets for content depth. */
export function CalculatorGuideSection({
  title,
  guide,
}: {
  title: string
  guide: CalculatorGuide
}) {
  return (
    <section className="mt-12 max-w-4xl space-y-10 border-t border-gray-200 pt-10 dark:border-gray-800">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">How the {title} works</h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          {guide.howItWorks.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E40AF]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {guide.formula && (
          <p className="mt-4 rounded-xl bg-gray-50 p-4 font-mono text-sm text-gray-700 dark:bg-gray-900 dark:text-gray-300">
            {guide.formula}
          </p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-3">{guide.example.title}</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{guide.example.body}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Practical tips</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {guide.tips.map((tip) => (
            <li key={tip} className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Frequently asked questions</h2>
        <dl className="space-y-5">
          {guide.faqs.map((faq) => (
            <div key={faq.q}>
              <dt className="font-semibold text-gray-900 dark:text-white">{faq.q}</dt>
              <dd className="mt-1 text-gray-600 dark:text-gray-400">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-3">Related tools &amp; guides</h2>
        <div className="flex flex-wrap gap-3">
          {guide.related.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-[#1E40AF] hover:border-[#1E40AF] dark:border-gray-700 dark:text-blue-400"
            >
              {r.label}
            </Link>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Disclaimer: Calculator outputs are educational estimates only and do not constitute investment, tax, or loan advice.
        WealthWire is not SEBI registered. Verify figures with your bank, AMC, or a qualified adviser before acting.
      </p>
    </section>
  )
}
