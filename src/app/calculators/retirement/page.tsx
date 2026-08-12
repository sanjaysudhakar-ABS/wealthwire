import type { Metadata } from "next"
import { RetirementCalculator } from "@/components/calculators/RetirementCalculator"
import { CalculatorGuideSection } from "@/components/calculators/CalculatorGuideSection"
import { retirementGuide } from "@/lib/calculator-guides"

export const metadata: Metadata = {
  title: "Retirement Calculator – Corpus & SIP Planner",
  description: "Plan your retirement corpus with inflation and the rule of 25. Estimate the monthly SIP needed for financial independence in India.",
}

export default function RetirementCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-1">Retirement Calculator</h1>
      <p className="text-gray-500 mb-8">Plan how much you need to save for a comfortable retirement and what SIP may get you there.</p>
      <RetirementCalculator />
      <CalculatorGuideSection title="Retirement Calculator" guide={retirementGuide} />
    </div>
  )
}
