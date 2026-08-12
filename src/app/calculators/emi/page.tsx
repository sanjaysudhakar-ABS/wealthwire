import type { Metadata } from "next"
import { EmiCalculator } from "@/components/calculators/EmiCalculator"
import { CalculatorGuideSection } from "@/components/calculators/CalculatorGuideSection"
import { emiGuide } from "@/lib/calculator-guides"

export const metadata: Metadata = {
  title: "EMI Calculator – Home, Car & Personal Loan EMI",
  description: "Free EMI calculator for Indian loans. Estimate monthly EMI, total interest, and compare tenure options before you borrow.",
}

export default function EMICalculatorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-2">EMI Calculator</h1>
      <p className="text-gray-500 mb-8">Calculate your monthly loan EMI for home, car, or personal loans — then review interest cost before you sign.</p>
      <EmiCalculator />
      <CalculatorGuideSection title="EMI Calculator" guide={emiGuide} />
    </div>
  )
}
