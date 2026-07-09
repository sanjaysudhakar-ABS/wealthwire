"use client"

import Link from "next/link"
import { TrendingUp, TrendingDown, ChevronRight } from "lucide-react"
import { useMarketIndices, type IndexQuote } from "./useMarketData"

function formatINR(value: number) {
  return value.toLocaleString("en-IN", { maximumFractionDigits: 2 })
}

export function MarketOverviewLive({ initialIndices }: { initialIndices: IndexQuote[] }) {
  const { indices, updatedAt } = useMarketIndices(initialIndices)

  return (
    <section className="rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1e293b] p-6 lg:p-8 shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-white tracking-tight">Market Overview</h2>
          {updatedAt && (
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400 ring-1 ring-emerald-500/30">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Live · {updatedAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </div>
        <Link href="/markets" className="flex items-center gap-1 text-sm font-medium text-blue-400 hover:underline">View All <ChevronRight size={14} /></Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {indices.map((idx) => (
          <div key={idx.name} className="rounded-2xl bg-white/5 p-4 text-center ring-1 ring-white/10 backdrop-blur transition-colors hover:bg-white/10">
            <div className="mb-1 text-xs text-gray-400">{idx.name}</div>
            <div className="text-base font-bold text-white">{formatINR(idx.value)}</div>
            <div className={`mt-1 flex items-center justify-center gap-0.5 text-xs font-semibold ${idx.changePercent >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {idx.changePercent >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {idx.changePercent >= 0 ? "+" : ""}{idx.changePercent.toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
