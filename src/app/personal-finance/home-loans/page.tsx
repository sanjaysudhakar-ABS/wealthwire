import type { Metadata } from "next"
import { GuidePage } from "@/components/content/GuidePage"

export const metadata: Metadata = {
  title: "Home Loans in India – EMI, Rates & Prepayment",
  description: "How to decide home-loan affordability, compare floating rates, and use prepayment strategically — with links to our EMI calculator.",
}

export default function HomeLoansPage() {
  return (
    <GuidePage
      title="Home Loans: Borrow with Clear Eyes"
      intro="A home loan is often the largest financial contract of your life. Affordability, total interest, and flexibility matter more than the brochure interest rate."
      sections={[
        {
          heading: "Affordability first",
          paragraphs: [
            "Banks may approve large loans based on income multiples, but that does not mean you should borrow the maximum. A practical guardrail is keeping total EMIs within a comfortable share of take-home pay (many households use ~40% as a soft ceiling) while still funding retirement SIPs and an emergency reserve.",
          ],
        },
        {
          heading: "Rate type, fees, and fine print",
          paragraphs: [
            "Most Indian home loans are floating. Compare repo-linked rates, reset frequency, processing fees, insurance cross-sells, and foreclosure rules. A slightly higher rate with easier prepayment can beat a “teaser” structure.",
          ],
        },
        {
          heading: "Prepayment strategy",
          paragraphs: [
            "When your loan rate exceeds expected post-tax returns on low-risk investments, prepaying can be rational — especially early in the tenure when interest share is high. Always maintain emergency liquidity before prepaying aggressively.",
          ],
          bullets: [
            "Use the EMI calculator to compare 15 vs 20 vs 25 year tenures.",
            "Ask whether prepayment reduces tenure or EMI — pick based on cash-flow needs.",
            "Claim eligible tax benefits only if you are on a regime that allows them.",
          ],
        },
      ]}
      related={[
        { label: "EMI Calculator", href: "/calculators/emi" },
        { label: "Tax Saving Guide", href: "/tax" },
        { label: "Personal Finance Hub", href: "/personal-finance" },
      ]}
    />
  )
}
