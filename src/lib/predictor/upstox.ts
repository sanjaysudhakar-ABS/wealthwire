// Upstox API v2 client for the predictor. Uses the long-lived analytics/extended
// token from UPSTOX_ACCESS_TOKEN (read-only market data — no daily re-auth).
// Every function returns null on failure; the engine falls back to demo data.

const BASE = "https://api.upstox.com/v2"

export type IndexKey = "nifty" | "sensex"

export const INDEX_CONFIG: Record<IndexKey, { instrumentKey: string; label: string; strikeStep: number; lotSize: number }> = {
  nifty: { instrumentKey: "NSE_INDEX|Nifty 50", label: "Nifty 50", strikeStep: 50, lotSize: 75 },
  sensex: { instrumentKey: "BSE_INDEX|SENSEX", label: "Sensex", strikeStep: 100, lotSize: 20 },
}

// Per-invocation error collector so failures reach the analysis log instead
// of silently degrading to demo data.
let errors: string[] = []
function recordError(msg: string) {
  if (errors.length < 20) errors.push(msg)
}
export function drainUpstoxErrors(): string[] {
  const out = errors
  errors = []
  return out
}

function headers() {
  const token = process.env.UPSTOX_ACCESS_TOKEN
  if (!token) return null
  return { Authorization: `Bearer ${token}`, Accept: "application/json" }
}

async function get(path: string): Promise<Record<string, unknown> | null> {
  const h = headers()
  if (!h) return null
  const endpoint = path.split("?")[0]
  try {
    const res = await fetch(`${BASE}${path}`, { headers: h, cache: "no-store" })
    if (!res.ok) {
      const body = await res.text().catch(() => "")
      recordError(`upstox ${endpoint}: HTTP ${res.status} ${body.slice(0, 150)}`)
      return null
    }
    const json = await res.json()
    if (json?.status !== "success") {
      recordError(`upstox ${endpoint}: status=${json?.status} ${JSON.stringify(json?.errors ?? "").slice(0, 150)}`)
      return null
    }
    return json.data
  } catch (err) {
    recordError(`upstox ${endpoint}: ${String(err).slice(0, 150)}`)
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

export type ChainSide = { ltp: number; oi: number; volume: number; iv: number; delta: number; theta: number; gamma: number }

export type ChainRow = {
  strike: number
  call: ChainSide | null
  put: ChainSide | null
}

type UpstoxOptionSide = {
  market_data?: { ltp?: number; oi?: number; volume?: number }
  option_greeks?: { iv?: number; delta?: number; theta?: number; gamma?: number }
}

function num(v: unknown): number {
  const n = Number(v)
  return isFinite(n) ? n : 0
}

function parseSide(side: UpstoxOptionSide | undefined) {
  if (!side?.market_data) return null
  // Sanitize greeks: IV may arrive as a decimal fraction (0.14) or percent
  // (14.2) depending on source conventions — normalize to percent. Delta is
  // clamped to [-1, 1]; anything outside is corrupt data, better zeroed.
  let iv = num(side.option_greeks?.iv)
  if (iv > 0 && iv < 1) iv *= 100
  if (iv < 0 || iv > 200) iv = 0
  let delta = num(side.option_greeks?.delta)
  if (Math.abs(delta) > 1) delta = 0
  return {
    ltp: num(side.market_data.ltp),
    oi: num(side.market_data.oi),
    volume: num(side.market_data.volume),
    iv,
    delta,
    theta: num(side.option_greeks?.theta),
    gamma: Math.max(0, num(side.option_greeks?.gamma)),
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
