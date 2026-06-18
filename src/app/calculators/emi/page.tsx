"use client"
import { useState, useMemo } from "react"

export default function EMICalculatorPage() {
  const [principal, setPrincipal] = useState(2000000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)

  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const r = rate / 12 / 100
    const n = tenure * 12
    const e = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
    const total = e * n
    return { emi: e, totalInterest: total - principal, totalPayment: total }
  }, [principal, rate, tenure])

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-2">EMI Calculator</h1>
      <p className="text-gray-500 mb-8">Calculate your monthly loan EMI for home, car, or personal loans</p>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium text-sm">Loan Amount</label>
              <span className="font-bold text-[#1E40AF]">₹{principal.toLocaleString("en-IN")}</span>
            </div>
            <input type="range" min={100000} max={10000000} step={100000} value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-full accent-[#1E40AF]" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium text-sm">Interest Rate (p.a.)</label>
              <span className="font-bold text-[#1E40AF]">{rate}%</span>
            </div>
            <input type="range" min={4} max={20} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full accent-[#1E40AF]" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium text-sm">Loan Tenure</label>
              <span className="font-bold text-[#1E40AF]">{tenure} Years</span>
            </div>
            <input type="range" min={1} max={30} value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-full accent-[#1E40AF]" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#1E40AF] text-white rounded-xl p-5 text-center">
          <p className="text-blue-200 text-sm mb-1">Monthly EMI</p>
          <p className="text-2xl font-bold">₹{Math.round(emi).toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-center">
          <p className="text-gray-500 text-sm mb-1">Total Interest</p>
          <p className="text-xl font-bold text-red-600">₹{Math.round(totalInterest).toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 text-center">
          <p className="text-gray-500 text-sm mb-1">Total Payment</p>
          <p className="text-xl font-bold">₹{Math.round(totalPayment).toLocaleString("en-IN")}</p>
        </div>
      </div>
    </div>
  )
}
