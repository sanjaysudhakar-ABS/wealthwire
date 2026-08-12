import type { Metadata } from "next"
import { GuidePage } from "@/components/content/GuidePage"

export const metadata: Metadata = {
  title: "Section 80C & Tax Saving Investments Guide (India)",
  description: "Clear guide to Section 80C, 80D, and common tax-saving options for Indian salaried investors — ELSS, PPF, EPF, insurance, and NPS basics.",
}

export default function TaxPage() {
  return (
    <GuidePage
      title="Tax Saving for Indian Investors: 80C, 80D, and Beyond"
      intro="Tax planning should follow your goals — not the other way around. This evergreen guide walks through the most-used deductions for salaried individuals in India and how to avoid common mistakes."
      sections={[
        {
          heading: "Start with the regime choice",
          paragraphs: [
            "India’s new tax regime offers lower slab rates with fewer deductions; the old regime retains popular deductions like Section 80C. Which is better depends on your salary structure, deductions, and home-loan interest. Run both scenarios with current-year slabs before locking investments only for tax.",
            "If you are already contributing meaningfully to EPF and have a home loan, the old regime can still win — but it is no longer automatic.",
          ],
        },
        {
          heading: "Section 80C (old regime): the ₹1.5 lakh basket",
          paragraphs: [
            "Under the old regime, Section 80C allows deductions up to ₹1.5 lakh across eligible instruments. Popular options include EPF contributions, PPF, ELSS mutual funds, life insurance premiums (within limits), principal repayment on home loans, and tuition fees for children.",
          ],
          bullets: [
            "EPF: automatic for many salaried employees — count employer/employee rules carefully.",
            "PPF: 15-year horizon, sovereign-backed, useful as debt allocation.",
            "ELSS: equity exposure with a 3-year lock-in; highest growth potential and highest volatility in the 80C set.",
            "Do not buy a poor insurance-cum-investment product only to “fill” 80C.",
          ],
        },
        {
          heading: "Health insurance: Section 80D",
          paragraphs: [
            "Section 80D (old regime) offers deductions on health insurance premiums for self/family and parents, with higher limits for senior citizen parents. Adequate health cover is usually more valuable than squeezing a few thousand more from 80C.",
          ],
        },
        {
          heading: "NPS and additional deduction",
          paragraphs: [
            "The National Pension System can provide an additional deduction under Section 80CCD(1B) (up to ₹50,000 in the old regime, subject to prevailing law) over the 80C limit. NPS is built for retirement — treat liquidity constraints as a feature, not a bug.",
          ],
        },
        {
          heading: "Practical workflow each January–March",
          paragraphs: ["A simple seasonal routine beats last-minute product shopping:"],
          bullets: [
            "List investments already locked (EPF, school fees, insurance premiums).",
            "Compute remaining 80C room — if any.",
            "Compare old vs new regime with your exact Form 16 inputs.",
            "Only then deploy incremental ELSS/PPF/NPS aligned to your asset allocation.",
          ],
        },
      ]}
      related={[
        { label: "SIP Calculator", href: "/calculators/sip" },
        { label: "Retirement Planner", href: "/calculators/retirement" },
        { label: "Insurance Basics", href: "/insurance" },
      ]}
    />
  )
}
