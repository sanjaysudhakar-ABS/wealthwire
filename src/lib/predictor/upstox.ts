// Upstox API v2 client for the predictor. Uses the long-lived analytics/extended
// token from UPSTOX_ACCESS_TOKEN (read-only market data — no daily re-auth).
// Every function returns null on failure; the engine falls back to demo data.

const BASE = "https://api.upstox.com/v2"

export type IndexKey = "nifty" | "sensex"

export const INDEX_CONFIG: Record<IndexKey, { instrumentKey: string; label: string; strikeStep: number; lotSize: number }> = {
  nifty: { instrumentKey: "NSE_INDEX|Nifty 50", label: "Nifty 50", strikeStep: 50, lotSize: 75 },
  sensex: { instrumentKey: "BSE_INDEX|SENSEX", label: "Sensex", strikeStep: 100, lotSize: 20 },
}

function headers() {
  const token = process.env.UPSTOX_ACCESS_TOKEN
  if (!token) return null
  return { Authorization: `Bearer ${token}`, Accept: "application/json" }
}

async function get(path: string): Promise<Record<string, unknown> | null> {
  const h = headers()
  if (!h) return null
  try {
    const res = await fetch(`${BASE}${path}`, { headers: h, cache: "no-store" })
    if (!res.ok) return null
    const json = await res.json()
    return json?.status === "success" ? json.data : null
  } catch {
    return null
  }
}

export async function getSpot(index: IndexKey): Promise<number | null> {
  const key = INDEX_CONFIG[index].instrumentKey
  const data = await get(`/market-quote/ltp?instrument_key=${encodeURIComponent(key)}`)
  if (!data) return null
  const entry = Object.values(data)[0] as { last_price?: number } | undefined
  return typeof entry?.last_price === "number" ? entry.last_price : null
}

export type Candle = { time: number; open: number; high: number; low: number; close: number; volume: number }

function parseCandles(data: Record<string, unknown> | null): Candle[] | null {
  const rows = (data as { candles?: unknown[][] } | null)?.candles
  if (!Array.isArray(rows) || rows.length === 0) return null
  // Upstox returns newest-first: [timestamp, open, high, low, close, volume, oi]
  return rows
    .map(r => ({
      time: new Date(r[0] as string).getTime(),
      open: Number(r[1]), high: Number(r[2]), low: Number(r[3]), close: Number(r[4]),
      volume: Number(r[5] ?? 0),
    }))
    .reverse()
}

/** Intraday 1-minute candles for today (oldest first). */
export async function getIntradayCandles(index: IndexKey): Promise<Candle[] | null> {
  const key = encodeURIComponent(INDEX_CONFIG[index].instrumentKey)
  return parseCandles(await get(`/historical-candle/intraday/${key}/1minute`))
}

/** Daily candles for the last `days` calendar days (oldest first). */
export async function getDailyCandles(index: IndexKey, days = 60): Promise<Candle[] | null> {
  const key = encodeURIComponent(INDEX_CONFIG[index].instrumentKey)
  const to = new Date().toISOString().slice(0, 10)
  const from = new Date(Date.now() - days * 86400_000).toISOString().slice(0, 10)
  return parseCandles(await get(`/historical-candle/${key}/day/${to}/${from}`))
}

export type ChainSide = { ltp: number; oi: number; volume: number; iv: number; delta: number; theta: number }

export type ChainRow = {
  strike: number
  call: ChainSide | null
  put: ChainSide | null
}

type UpstoxOptionSide = {
  market_data?: { ltp?: number; oi?: number; volume?: number }
  option_greeks?: { iv?: number; delta?: number; theta?: number }
}

function parseSide(side: UpstoxOptionSide | undefined) {
  if (!side?.market_data) return null
  return {
    ltp: Number(side.market_data.ltp ?? 0),
    oi: Number(side.market_data.oi ?? 0),
    volume: Number(side.market_data.volume ?? 0),
    iv: Number(side.option_greeks?.iv ?? 0),
    delta: Number(side.option_greeks?.delta ?? 0),
    theta: Number(side.option_greeks?.theta ?? 0),
  }
}

/** Option chain with Greeks for the nearest expiry on/after today. */
export async function getOptionChain(index: IndexKey): Promise<{ expiry: string; rows: ChainRow[] } | null> {
  const key = encodeURIComponent(INDEX_CONFIG[index].instrumentKey)

  const contracts = await get(`/option/contract?instrument_key=${key}`)
  if (!contracts) return null
  const today = new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10) // IST date
  const expiries = [...new Set((contracts as unknown as Array<{ expiry?: string }>).map(c => c.expiry).filter(Boolean) as string[])]
    .filter(e => e >= today)
    .sort()
  // Expiry-day premiums are gamma-dominated and decay within hours — roll to
  // the next expiry for suggested entries when today is the expiry.
  const expiry = (expiries[0] === today && expiries.length > 1) ? expiries[1] : expiries[0]
  if (!expiry) return null

  const chain = await get(`/option/chain?instrument_key=${key}&expiry_date=${expiry}`)
  if (!chain || !Array.isArray(chain)) return null

  const rows: ChainRow[] = (chain as Array<{ strike_price?: number; call_options?: UpstoxOptionSide; put_options?: UpstoxOptionSide }>)
    .map(r => ({
      strike: Number(r.strike_price ?? 0),
      call: parseSide(r.call_options),
      put: parseSide(r.put_options),
    }))
    .filter(r => r.strike > 0)
    .sort((a, b) => a.strike - b.strike)

  return rows.length > 0 ? { expiry, rows } : null
}

export function hasUpstoxToken(): boolean {
  return Boolean(process.env.UPSTOX_ACCESS_TOKEN)
}
