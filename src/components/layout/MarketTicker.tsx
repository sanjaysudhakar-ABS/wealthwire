"use client"
import { marketIndices } from "@/lib/mock-data"

export function MarketTicker() {
  const items = [...marketIndices, ...marketIndices]
  return (
    <div className="bg-[#0F172A] text-white text-xs py-1.5 overflow-hidden">
      <div
        className="ticker-animate flex whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-6">
            <span className="font-semibold text-gray-300">{item.name}</span>
            <span className="font-bold">{item.value.toLocaleString("en-IN")}</span>
            <span className={item.change >= 0 ? "text-emerald-400" : "text-red-400"}>
              {item.change >= 0 ? "▲" : "▼"} {Math.abs(item.changePercent).toFixed(2)}%
            </span>
            <span className="text-gray-500">|</span>
          </span>
        ))}
      </div>
    </div>
  )
}
