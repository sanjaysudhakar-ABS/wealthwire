import Link from "next/link"

type Section = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export function GuidePage({
  title,
  intro,
  sections,
  related,
}: {
  title: string
  intro: string
  sections: Section[]
  related?: { label: string; href: string }[]
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{title}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">{intro}</p>

      <div className="space-y-10">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-2xl font-bold tracking-tight mb-3">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">{p}</p>
            ))}
            {s.bullets && (
              <ul className="mt-3 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-gray-700 dark:text-gray-300">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E40AF]" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {related && related.length > 0 && (
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <h2 className="text-lg font-bold mb-3">Continue reading</h2>
          <div className="flex flex-wrap gap-3">
            {related.map((r) => (
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
      )}

      <p className="mt-10 text-xs text-gray-500">
        Disclaimer: This guide is for educational purposes only and is not investment, tax, or insurance advice.
        WealthWire is not SEBI registered. Consult a qualified professional before making financial decisions.
      </p>
    </div>
  )
}
