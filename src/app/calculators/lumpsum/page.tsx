"use client"
import { useState, useMemo } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

export default function LumpsumCalculator() {
  const [amount, setAmount] = useState(100000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const result = useMemo(() => {
    const fv = amount * Math.pow(1 + rate / 100, years)
    return { invested: amount, returns: fv - amount, total: fv }
  }, [amount, rate, years])
  const fmt = (v: number) => "₹" + v.toLocaleString("en-IN", { maximumFractionDigits: 0 })
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-1">Lumpsum Calculator</h1>
      <p className="text-gray-500 mb-8">Calculate returns on a one-time lump sum investment</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          {[
            { label: "Investment Amount", value: amount, min: 10000, max: 10000000, step: 10000, set: setAmount, fmt: true, minL: "₹10,000", maxL: "₹1 Crore" },
            { label: "Expected Returns (p.a.)", value: rate, min: 1, max: 30, step: 0.5, set: setRate, fmt: false, minL: "1%", maxL: "30%", suffix: "%" },
            { label: "Time Period", value: years, min: 1, max: 40, step: 1, set: setYears, fmt: false, minL: "1 Yr", maxL: "40 Yrs", suffix: " Years" },
          ].map((f) => (
            <div key={f.label}>
              <div className="flex justify-between mb-2"><label className="text-sm font-semibold">{f.label}</label><span className="text-[#1E40AF] font-bold">{f.fmt ? fmt(f.value) : f.value + (f.suffix || "")}</span></div>
              <input type="range" min={f.min} max={f.max} step={f.step} value={f.value} onChange={e => f.set(Number(e.target.value))} className="w-full accent-[#1E40AF]" />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>{f.minL}</span><span>{f.maxL}</span></div>
            </div>
          ))}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
            <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Invested Amount</span><span className="font-semibold">{fmt(result.invested)}</span></div>
            <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Estimated Returns</span><span className="font-semibold text-emerald-600">{fmt(result.returns)}</span></div>
            <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3"><span className="text-sm font-bold">Total Value</span><span className="text-xl font-extrabold text-[#1E40AF]">{fmt(result.total)}</span></div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Investment Breakdown</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={[{ name: "Invested", value: result.invested }, { name: "Returns", value: Math.round(result.returns) }]} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value">
                <Cell fill="#1E40AF" /><Cell fill="#10B981" />
              </Pie>
              <Tooltip formatter={(v) => typeof v === "number" ? fmt(v) : String(v)} /><Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
