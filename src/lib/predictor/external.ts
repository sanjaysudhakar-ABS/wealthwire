// Global cues (Yahoo), news sentiment (Marketaux), and event risk (Finnhub)
// for the predictor. All fetchers degrade to null — never throw.

// Per-invocation error collector — drained into each analysis run's
// diagnostics so external-source failures are debuggable from the log.
let errors: string[] = []
function recordError(msg: string) {
  if (errors.length < 20) errors.push(msg)
}
export function drainExternalErrors(): string[] {
  const out = errors
  errors = []
  return out
}

const YF_BASE = "https://query1.finance.yahoo.com/v8/finance/chart"
const YF_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  Accept: "application/json",
}

export type Cue = { name: string; changePercent: number; weight: number }

async function yahooChangePercent(symbol: string): Promise<number | null> {
  try {
    const res = await fetch(`${YF_BASE}/${encodeURIComponent(symbol)}?interval=1d&range=1d`, {
      headers: YF_HEADERS,
      next: { revalidate: 300 },
    })
    if (!res.ok) {
      recordError(`yahoo ${symbol}: HTTP ${res.status}`)
      return null
    }
    const meta = (await res.json())?.chart?.result?.[0]?.meta
    const price = Number(meta?.regularMarketPrice)
    const prev = Number(meta?.chartPreviousClose ?? meta?.previousClose)
    if (!isFinite(price) || !isFinite(prev) || prev === 0) return null
    return ((price - prev) / prev) * 100
  } catch (err) {
    recordError(`yahoo ${symbol}: ${String(err).slice(0, 120)}`)
    return null
  }
}

/** Overnight/global lead indicators, weighted by historical influence on Nifty open. */
export async function getGlobalCues(): Promise<Cue[]> {
  const symbols: Array<{ symbol: string; name: string; weight: number; invert?: boolean }> = [
    { symbol: "ES=F", name: "S&P 500 futures", weight: 3 },
    { symbol: "NQ=F", name: "Nasdaq futures", weight: 2 },
    { symbol: "^N225", name: "Nikkei 225", weight: 1.5 },
    { symbol: "^HSI", name: "Hang Seng", weight: 1 },
    { symbol: "DX-Y.NYB", name: "Dollar index (DXY)", weight: 1.5, invert: true },
    { symbol: "CL=F", name: "Crude oil (WTI)", weight: 1, invert: true },
    { symbol: "INR=X", name: "USD/INR", weight: 1, invert: true },
  ]
  const results = await Promise.all(
    symbols.map(async s => {
      const chg = await yahooChangePercent(s.symbol)
      if (chg === null) return null
      return { name: s.name, changePercent: s.invert ? -chg : chg, weight: s.weight }
    })
  )
  return results.filter(Boolean) as Cue[]
}

export type NewsSentiment = { score: number; articleCount: number; topHeadlines: string[] }

/** Marketaux aggregate sentiment for India-relevant financial news, last 24h. */
export async function getNewsSentiment(): Promise<NewsSentiment | null> {
  const token = process.env.MARKETAUX_API_TOKEN
  if (!token) return null
  try {
    const publishedAfter = new Date(Date.now() - 24 * 3600_000).toISOString().slice(0, 16)
    const url = `https://api.marketaux.com/v1/news/all?api_token=${token}&countries=in&filter_entities=true&language=en&published_after=${publishedAfter}&limit=20`
    const res = await fetch(url, { next: { revalidate: 1800 } })
    if (!res.ok) {
      recordError(`marketaux: HTTP ${res.status}`)
      return null
    }
    const data = await res.json()
    const articles = data?.data
    if (!Array.isArray(articles) || articles.length === 0) return null

    let sum = 0
    let n = 0
    for (const a of articles) {
      for (const e of a.entities ?? []) {
        if (typeof e.sentiment_score === "number") {
          sum += e.sentiment_score
          n++
        }
      }
    }
    return {
      score: n > 0 ? sum / n : 0, // -1..1
      articleCount: articles.length,
      topHeadlines: articles.slice(0, 5).map((a: { title: string }) => a.title),
    }
  } catch (err) {
    recordError(`marketaux: ${String(err).slice(0, 120)}`)
    return null
  }
}

export type EventRisk = { highImpactToday: string[]; source: string }

// Known high-impact dates that need no API: the FOMC publishes its meeting
// schedule years ahead. Decisions land ~11:30pm IST, so the Indian market
// reaction day is the following session. Extend this map as schedules for
// RBI MPC / Union Budget are announced.
const STATIC_HIGH_IMPACT: Record<string, string> = {
  "2026-07-29": "US: FOMC rate decision (announced overnight IST)",
  "2026-07-30": "IN: Market reacting to overnight FOMC decision",
  "2026-09-16": "US: FOMC rate decision (announced overnight IST)",
  "2026-09-17": "IN: Market reacting to overnight FOMC decision",
  "2026-10-28": "US: FOMC rate decision (announced overnight IST)",
  "2026-10-29": "IN: Market reacting to overnight FOMC decision",
  "2026-12-09": "US: FOMC rate decision (announced overnight IST)",
  "2026-12-10": "IN: Market reacting to overnight FOMC decision",
}

/** High-impact events today (IST): built-in FOMC schedule, plus Finnhub's
 *  economic calendar when the plan allows it (403 on the free tier). */
export async function getEventRisk(): Promise<EventRisk> {
  const today = new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10)
  const events: string[] = STATIC_HIGH_IMPACT[today] ? [STATIC_HIGH_IMPACT[today]] : []
  let source = "built-in schedule"

  const key = process.env.FINNHUB_API_KEY
  if (key) {
    try {
      const res = await fetch(`https://finnhub.io/api/v1/calendar/economic?from=${today}&to=${today}&token=${key}`, {
        next: { revalidate: 3600 },
      })
      if (res.ok) {
        const data = await res.json()
        const rows = data?.economicCalendar
        if (Array.isArray(rows)) {
          const high = rows
            .filter((e: { impact?: string; country?: string }) => e.impact === "high" && ["IN", "US"].includes(e.country ?? ""))
            .map((e: { event?: string; country?: string }) => `${e.country}: ${e.event}`)
          events.push(...high)
          source = "finnhub + built-in schedule"
        }
      } else if (res.status === 403) {
        // Economic calendar is a paid Finnhub feature — expected on free tier
        source = "built-in schedule (Finnhub calendar needs a paid plan)"
      } else {
        recordError(`finnhub calendar: HTTP ${res.status}`)
      }
    } catch (err) {
      recordError(`finnhub calendar: ${String(err).slice(0, 120)}`)
    }
  }

  return { highImpactToday: [...new Set(events)].slice(0, 5), source }
}
