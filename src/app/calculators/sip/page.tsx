import type { Metadata } from "next"
import { SipCalculator } from "@/components/calculators/SipCalculator"
import { CalculatorGuideSection } from "@/components/calculators/CalculatorGuideSection"
import { sipGuide } from "@/lib/calculator-guides"

export const metadata: Metadata = {
  title: "SIP Calculator – Estimate Mutual Fund SIP Returns",
  description: "Free SIP calculator for Indian investors. Estimate corpus from monthly SIPs, understand rupee-cost averaging, and plan step-up investments.",
}

export default function SIPCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">SIP Calculator</h1>
        <p className="text-gray-500">Calculate returns on your monthly Systematic Investment Plan and learn how compounding builds long-term wealth.</p>
      </div>
      <SipCalculator />
      <CalculatorGuideSection title="SIP Calculator" guide={sipGuide} />
    </div>
  )
}
