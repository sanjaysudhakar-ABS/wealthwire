"use client"
import { useState, useMemo } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"

export function SipCalculator() {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const result = useMemo(() => {
    const n = years * 12
    const r = rate / 100 / 12
    const totalInvested = monthly * n
    const futureValue = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
    const returns = futureValue - totalInvested
    return { totalInvested, returns, futureValue }
  }, [monthly, rate, years])

  const fmt = (v: number) => "₹" + v.toLocaleString("en-IN", { maximumFractionDigits: 0 })
  const chartData = [
    { name: "Invested Amount", value: Math.round(result.totalInvested) },
    { name: "Estimated Returns", value: Math.round(result.returns) },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
        <div>
          <div className="flex justify-between mb-2"><label className="text-sm font-semibold">Monthly SIP Amount</label><span className="text-[#1E40AF] font-bold">{fmt(monthly)}</span></div>
          <input type="range" min="500" max="100000" step="500" value={monthly} onChange={e => setMonthly(Number(e.target.value))} className="w-full accent-[#1E40AF]" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>₹500</span><span>₹1,00,000</span></div>
        </div>
        <div>
          <div className="flex justify-between mb-2"><label className="text-sm font-semibold">Expected Returns (p.a.)</label><span className="text-[#1E40AF] font-bold">{rate}%</span></div>
          <input type="range" min="1" max="30" step="0.5" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full accent-[#1E40AF]" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1%</span><span>30%</span></div>
        </div>
        <div>
          <div className="flex justify-between mb-2"><label className="text-sm font-semibold">Time Period</label><span className="text-[#1E40AF] font-bold">{years} Years</span></div>
          <input type="range" min="1" max="40" step="1" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full accent-[#1E40AF]" />
          <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1 Yr</span><span>40 Yrs</span></div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
          <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Total Invested</span><span className="font-semibold">{fmt(result.totalInvested)}</span></div>
          <div className="flex justify-between"><span className="text-sm text-gray-600 dark:text-gray-400">Estimated Returns</span><span className="font-semibold text-emerald-600">{fmt(result.returns)}</span></div>
          <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3"><span className="text-sm font-bold">Total Value</span><span className="text-xl font-extrabold text-[#1E40AF]">{fmt(result.futureValue)}</span></div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center">
        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Investment Breakdown</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value">
              <Cell fill="#1E40AF" />
              <Cell fill="#10B981" />
            </Pie>
            <Tooltip formatter={(v) => typeof v === "number" ? fmt(v) : String(v)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <p className="text-center text-sm text-gray-500 mt-2">Invest <strong>{fmt(monthly)}/month</strong> for <strong>{years} years</strong> and grow your wealth to <strong className="text-[#1E40AF]">{fmt(result.futureValue)}</strong></p>
      </div>
    </div>
  )
}
