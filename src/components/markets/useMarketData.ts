"use client"

import { useEffect, useRef, useState } from "react"

export type IndexQuote = { name: string; value: number; change: number; changePercent: number }

// Poll every 60s while Indian markets are open (Mon–Fri ~9:00–16:00 IST),
// every 10 min otherwise — prices barely move off-hours.
function pollDelay(): number {
  const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000)
  const day = ist.getUTCDay()
  const mins = ist.getUTCHours() * 60 + ist.getUTCMinutes()
  const marketHours = day >= 1 && day <= 5 && mins >= 540 && mins <= 960
  return marketHours ? 60_000 : 600_000
}

export function useMarketIndices(initial: IndexQuote[]) {
  const [indices, setIndices] = useState<IndexQuote[]>(initial)
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    let cancelled = false

    async function tick() {
      try {
        const res = await fetch("/api/market-data")
        if (res.ok) {
          const data = await res.json()
          if (!cancelled && Array.isArray(data.indices) && data.indices.length > 0) {
            setIndices(data.indices)
            setUpdatedAt(new Date())
          }
        }
      } catch { /* keep last known values */ }
      if (!cancelled) timer.current = setTimeout(tick, pollDelay())
    }

    tick()
    return () => {
      cancelled = true
      clearTimeout(timer.current)
    }
  }, [])

  return { indices, updatedAt }
}
