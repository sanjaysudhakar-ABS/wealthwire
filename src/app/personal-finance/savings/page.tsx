import type { Metadata } from "next"
import { GuidePage } from "@/components/content/GuidePage"

export const metadata: Metadata = {
  title: "Savings & Emergency Fund Guide (India)",
  description: "How much emergency fund you need, where to park savings in India, and how to separate short-term cash from long-term investments.",
}

export default function SavingsPage() {
  return (
    <GuidePage
      title="Savings & Emergency Funds for Indian Households"
      intro="Before chasing returns, make sure a cash shock will not force you to sell investments at the wrong time. An emergency fund is boring — and essential."
      sections={[
        {
          heading: "How much is enough?",
          paragraphs: [
            "A common target is 3–6 months of essential expenses (rent/EMI, groceries, school fees, utilities, insurance premiums). Dual-income stable households may lean toward 3 months; single-income or variable-income households should aim closer to 6–12 months.",
            "Calculate essentials only — not lifestyle spends you would cut in a crunch.",
          ],
        },
        {
          heading: "Where to park the money",
          paragraphs: [
            "Prioritise liquidity and safety over return. Suitable options typically include savings accounts with decent interest, liquid mutual funds, and short-term bank FDs that you can break if needed. Avoid locking the entire emergency fund in long-tenure FDs or equities.",
          ],
          bullets: [
            "Keep at least one month of expenses in a instantly accessible savings account.",
            "Ladder the rest across liquid funds / short FDs.",
            "Do not count stocks, EPF, or PPF as emergency money.",
          ],
        },
        {
          heading: "Automate the habit",
          paragraphs: [
            "Standing instructions on payday beat willpower. Once the emergency fund is full, redirect that same automated transfer into goal-based SIPs so the savings habit compounds into investing.",
          ],
        },
      ]}
      related={[
        { label: "SIP Calculator", href: "/calculators/sip" },
        { label: "Personal Finance Hub", href: "/personal-finance" },
        { label: "Insurance Basics", href: "/insurance" },
      ]}
    />
  )
}
