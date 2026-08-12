import type { Metadata } from "next"
import { GuidePage } from "@/components/content/GuidePage"

export const metadata: Metadata = {
  title: "Retirement Planning Guide for Indians",
  description: "How to estimate retirement corpus, use EPF and NPS, and build SIP habits for financial independence in India.",
}

export default function RetirementGuidePage() {
  return (
    <GuidePage
      title="Retirement Planning: Building Freedom on Purpose"
      intro="Retirement planning is simply future lifestyle design with maths. Start from the life you want, inflate costs, estimate corpus, then reverse-engineer monthly investing — including EPF and NPS."
      sections={[
        {
          heading: "Estimate the target corpus",
          paragraphs: [
            "List today’s monthly expenses, strip work-related costs, add healthcare buffer, then inflate to retirement age. A simple rule of thumb is 25× annual retirement expenses (about a 4% withdrawal rate). It is a starting point — stress-test lower returns and higher longevity.",
          ],
        },
        {
          heading: "Use EPF and NPS as anchors",
          paragraphs: [
            "EPF offers compulsory savings and employer contribution for many salaried employees. NPS adds market-linked retirement investing with limited liquidity. Treat both as core pillars, then fill the gap with mutual fund SIPs.",
          ],
        },
        {
          heading: "Glide path matters",
          paragraphs: [
            "In your 20s–30s, equity-heavy allocation can make sense for long horizons. As retirement approaches, gradually raise debt allocation so a market crash does not force lifestyle cuts. Revisit the plan after every major salary change.",
          ],
          bullets: [
            "Increase SIPs with every raise (pay-yourself-first).",
            "Keep a separate health insurance strategy — medical costs rise faster than general inflation.",
            "Avoid raiding retirement accounts for discretionary spends.",
          ],
        },
      ]}
      related={[
        { label: "Retirement Calculator", href: "/calculators/retirement" },
        { label: "SIP Calculator", href: "/calculators/sip" },
        { label: "Tax Saving Guide", href: "/tax" },
      ]}
    />
  )
}
