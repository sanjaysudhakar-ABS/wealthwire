import type { Metadata } from "next"
import { GuidePage } from "@/components/content/GuidePage"

export const metadata: Metadata = {
  title: "Credit Cards in India – Rewards Without the Debt Trap",
  description: "How to use credit cards responsibly in India: repayment discipline, rewards math, hidden fees, and when not to carry a balance.",
}

export default function CreditCardsPage() {
  return (
    <GuidePage
      title="Credit Cards: Use the Tool, Avoid the Trap"
      intro="Credit cards are excellent payment instruments and terrible long-term loans. Master repayment discipline first; optimise rewards second."
      sections={[
        {
          heading: "The non-negotiable rule",
          paragraphs: [
            "Pay the full statement balance before the due date, every month. Revolving credit at 30–45% annualised interest destroys any rewards you earn. If you cannot clear the bill, stop discretionary swipes immediately.",
          ],
        },
        {
          heading: "Rewards math without the hype",
          paragraphs: [
            "Compare effective value after excluding fees, capped categories, and reward blackout dates. A simple 1–2% flat cashback card can beat a complex points card if you value your time and hate fine print.",
          ],
        },
        {
          heading: "Healthy habits",
          paragraphs: [
            "Small operational habits prevent expensive mistakes:",
          ],
          bullets: [
            "Enable due-date reminders and autopay for at least the full amount when cash flow is stable.",
            "Keep utilisation moderate; very high utilisation can pressure your credit score.",
            "Avoid cash advances — fees and interest typically start immediately.",
            "Track annual fees vs benefits; downgrade cards you do not use.",
          ],
        },
      ]}
      related={[
        { label: "Savings Guide", href: "/personal-finance/savings" },
        { label: "Personal Finance Hub", href: "/personal-finance" },
        { label: "EMI Calculator", href: "/calculators/emi" },
      ]}
    />
  )
}
