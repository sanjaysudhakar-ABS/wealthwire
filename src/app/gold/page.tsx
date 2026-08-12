import type { Metadata } from "next"
import { GuidePage } from "@/components/content/GuidePage"

export const metadata: Metadata = {
  title: "Gold & Silver Rates Guide for Indian Investors",
  description: "Understand how gold and silver prices work in India, 24K vs 22K, making charges, and when physical gold, SGB, or gold ETFs may fit your portfolio.",
}

export default function GoldPage() {
  return (
    <GuidePage
      title="Gold & Silver Rates: A Practical Guide for Indian Investors"
      intro="Gold is both a cultural staple and a portfolio diversifier in India. This guide explains how retail prices are set, what 24K and 22K mean, and how to choose between jewellery, coins, Sovereign Gold Bonds, and gold ETFs."
      sections={[
        {
          heading: "How gold prices are quoted in India",
          paragraphs: [
            "Indian jewellers usually quote gold per 10 grams. The headline “spot” moves with international prices (typically USD/oz) and the USD–INR exchange rate. Import duty, GST, and local premiums then shape what you pay at the counter.",
            "City-wise differences are usually small and reflect local demand, making charges, and dealer spreads rather than a different underlying gold price.",
          ],
        },
        {
          heading: "24K vs 22K vs 18K",
          paragraphs: [
            "Purity is measured in karats. 24K is ~99.9% pure gold, 22K is 91.6% (common for jewellery), and 18K is 75%. Higher purity means a higher metal value — but pure gold is softer, so jewellery is often 22K for durability.",
          ],
          bullets: [
            "For investment purity, prefer 24K coins/bars from recognised refiners, or paper gold (SGB/ETF).",
            "Jewellery includes making charges and GST — these rarely come back fully when you sell.",
            "Always check hallmarking (BIS) before buying physical gold.",
          ],
        },
        {
          heading: "Physical gold vs SGB vs gold ETF",
          paragraphs: [
            "Physical gold offers ownership you can hold, but storage, making charges, and resale spreads reduce effective returns. Sovereign Gold Bonds (SGBs) track gold price, pay a small annual interest, and can be tax-efficient if held to maturity — subject to RBI issue terms. Gold ETFs and gold funds offer liquidity on the exchange or via mutual funds without storage hassle.",
            "Many planners suggest keeping gold around 5–10% of a long-term portfolio as a hedge, not as the core growth engine.",
          ],
        },
        {
          heading: "Silver in brief",
          paragraphs: [
            "Silver is more industrial than gold, so prices can be more volatile. Retail silver is often quoted per kilogram. As with gold, prefer transparent pricing and be wary of steep premiums on collectible coins unless you specifically want them.",
          ],
        },
        {
          heading: "Checklist before you buy",
          paragraphs: ["Use this quick list so emotion does not override arithmetic:"],
          bullets: [
            "Decide the purpose: jewellery/consumption vs investment hedge.",
            "Compare all-in cost: metal + making + GST + spreads.",
            "For investment exposure, compare SGB and gold ETF total costs over your holding period.",
            "Avoid leverage or “tips” promising guaranteed gold returns.",
          ],
        },
      ]}
      related={[
        { label: "SIP Calculator", href: "/calculators/sip" },
        { label: "Personal Finance Hub", href: "/personal-finance" },
        { label: "Markets Overview", href: "/markets" },
      ]}
    />
  )
}
