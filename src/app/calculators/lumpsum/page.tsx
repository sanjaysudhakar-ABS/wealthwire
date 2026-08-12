import type { Metadata } from "next"
import { LumpsumCalculator } from "@/components/calculators/LumpsumCalculator"
import { CalculatorGuideSection } from "@/components/calculators/CalculatorGuideSection"
import { lumpsumGuide } from "@/lib/calculator-guides"

export const metadata: Metadata = {
  title: "Lumpsum Calculator – One-Time Investment Returns",
  description: "Estimate future value of a one-time mutual fund or investment lumpsum with compounding. Free calculator for Indian investors.",
}

export default function LumpsumCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-1">Lumpsum Calculator</h1>
      <p className="text-gray-500 mb-8">Calculate returns on a one-time lump sum investment and compare with SIP-style investing.</p>
      <LumpsumCalculator />
      <CalculatorGuideSection title="Lumpsum Calculator" guide={lumpsumGuide} />
    </div>
  )
}
