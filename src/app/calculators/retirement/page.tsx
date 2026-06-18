"use client"
import { useState, useMemo } from "react"

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retireAge, setRetireAge] = useState(60)
  const [monthly, setMonthly] = useState(50000)
  const [inflation, setInflation] = useState(6)
  const [returns, setReturns] = useState(12)

  const result = useMemo(() => {
    const yearsToRetire = retireAge - currentAge
    const futureMonthly = monthly * Math.pow(1 + inflation / 100, yearsToRetire)
    const corpusNeeded = futureMonthly * 12 * 25
    const sipNeeded = corpusNeeded * (returns / 100 / 12) / (Math.pow(1 + returns / 100 / 12, yearsToRetire * 12) - 1)
    return { yearsToRetire, futureMonthly, corpusNeeded, sipNeeded }
  }, [currentAge, retireAge, monthly, inflation, returns])

  const fmt = (v: number) => {
    if (v >= 10000000) return "₹" + (v / 10000000).toFixed(2) + " Cr"
    if (v >= 100000) return "₹" + (v / 100000).toFixed(2) + " L"
    return "₹" + v.toLocaleString("en-IN", { maximumFractionDigits: 0 })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-1">Retirement Calculator</h1>
      <p className="text-gray-500 mb-8">Plan how much you need to save for a comfortable retirement</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          {[
            { label: "Current Age", value: currentAge, min: 18, max: 55, set: setCurrentAge, suffix: " yrs" },
            { label: "Retirement Age", value: retireAge, min: 40, max: 70, set: setRetireAge, suffix: " yrs" },
            { label: "Monthly Expenses (Today)", value: monthly, min: 10000, max: 500000, step: 5000, set: setMonthly, isRupee: true },
            { label: "Expected Inflation", value: inflation, min: 2, max: 12, set: setInflation, suffix: "%" },
            { label: "Expected Investment Returns", value: returns, min: 6, max: 20, set: setReturns, suffix: "%" },
          ].map((f) => (
            <div key={f.label}>
              <div className="flex justify-between mb-1.5"><label className="text-sm font-semibold">{f.label}</label><span className="text-[#1E40AF] font-bold">{f.isRupee ? "₹" + f.value.toLocaleString("en-IN") : f.value + (f.suffix || "")}</span></div>
              <input type="range" min={f.min} max={f.max} step={f.step || 1} value={f.value} onChange={e => f.set(Number(e.target.value))} className="w-full accent-[#1E40AF]" />
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="bg-[#1E40AF] rounded-2xl p-6 text-white">
            <div className="text-sm text-blue-200 mb-1">Retirement Corpus Needed</div>
            <div className="text-4xl font-extrabold mb-1">{fmt(result.corpusNeeded)}</div>
            <div className="text-sm text-blue-200">in {result.yearsToRetire} years at retirement</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Monthly Expenses at Retirement</div>
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{fmt(result.futureMonthly)}</div>
              <div className="text-xs text-gray-400 mt-1">adjusted for {inflation}% inflation</div>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
              <div className="text-xs text-gray-500 mb-1">Monthly SIP Required</div>
              <div className="text-xl font-bold text-emerald-600">{fmt(result.sipNeeded)}</div>
              <div className="text-xs text-gray-400 mt-1">to reach your goal</div>
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 text-sm text-amber-800 dark:text-amber-300">
            <strong>Rule of 25:</strong> You need 25x your annual retirement expenses as corpus to sustain lifestyle indefinitely (4% withdrawal rate).
          </div>
        </div>
      </div>
    </div>
  )
}
