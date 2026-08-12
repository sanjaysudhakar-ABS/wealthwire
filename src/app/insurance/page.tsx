import type { Metadata } from "next"
import { GuidePage } from "@/components/content/GuidePage"

export const metadata: Metadata = {
  title: "Insurance Basics for Indian Families",
  description: "Term life, health insurance, and what to avoid — a plain-language insurance guide for Indian households building a financial plan.",
}

export default function InsurancePage() {
  return (
    <GuidePage
      title="Insurance Basics: Protect the Plan Before You Grow It"
      intro="Insurance is not an investment. Its job is to protect your family’s cash flow if something goes wrong. Get cover right first, then invest aggressively for goals."
      sections={[
        {
          heading: "Term life insurance",
          paragraphs: [
            "If others depend on your income, term life insurance is usually the cleanest solution: high cover, low premium, no complicated investment wrapper. A common starting heuristic is cover of 10–15× annual income, adjusted for debts, spouse income, and existing assets.",
            "Buy early when you are healthy. Disclose medical history honestly — claim rejection later is far costlier than a higher premium today.",
          ],
        },
        {
          heading: "Health insurance",
          paragraphs: [
            "Employer group cover is helpful but often insufficient and ends when you leave the job. Maintain a personal family floater sized for your city hospitals. Look at room-rent limits, restoration benefits, waiting periods, and network hospitals — not just the headline sum insured.",
          ],
        },
        {
          heading: "What to be careful with",
          paragraphs: [
            "ULIPs and traditional endowment plans mix insurance and investment, often with high costs and low transparency. If you want market-linked returns, term cover + mutual funds is usually clearer. Always read exclusion lists and claim settlement ratios from reputable public disclosures.",
          ],
          bullets: [
            "Do not treat insurance as a tax-saving product first.",
            "Avoid agents pushing premium sizes you cannot sustain for 20–30 years.",
            "Keep nominees updated after marriage, childbirth, or divorce.",
          ],
        },
      ]}
      related={[
        { label: "Tax Saving Guide", href: "/tax" },
        { label: "Personal Finance Hub", href: "/personal-finance" },
        { label: "Retirement Planner", href: "/calculators/retirement" },
      ]}
    />
  )
}
