import type { Candle } from "./upstox"

export function ema(values: number[], period: number): number[] {
  const k = 2 / (period + 1)
  const out: number[] = []
  let prev = values[0]
  for (const v of values) {
    prev = v * k + prev * (1 - k)
    out.push(prev)
  }
  return out
}

export function rsi(closes: number[], period = 14): number {
  if (closes.length < period + 1) return 50
  let gains = 0
  let losses = 0
  for (let i = 1; i <= period; i++) {
    const d = closes[i] - closes[i - 1]
    if (d >= 0) gains += d
    else losses -= d
  }
  let avgGain = gains / period
  let avgLoss = losses / period
  for (let i = period + 1; i < closes.length; i++) {
    const d = closes[i] - closes[i - 1]
    avgGain = (avgGain * (period - 1) + Math.max(d, 0)) / period
    avgLoss = (avgLoss * (period - 1) + Math.max(-d, 0)) / period
  }
  if (avgLoss === 0) return 100
  return 100 - 100 / (1 + avgGain / avgLoss)
}

export function atr(candles: Candle[], period = 14): number {
  if (candles.length < 2) return 0
  const trs: number[] = []
  for (let i = 1; i < candles.length; i++) {
    const c = candles[i]
    const prevClose = candles[i - 1].close
    trs.push(Math.max(c.high - c.low, Math.abs(c.high - prevClose), Math.abs(c.low - prevClose)))
  }
  const window = trs.slice(-period)
  return window.reduce((a, b) => a + b, 0) / window.length
}

export function vwap(candles: Candle[]): number {
  let pv = 0
  let vol = 0
  for (const c of candles) {
    const typical = (c.high + c.low + c.close) / 3
    const v = c.volume || 1 // index candles may carry zero volume
    pv += typical * v
    vol += v
  }
  return vol > 0 ? pv / vol : candles[candles.length - 1]?.close ?? 0
}

/** Wilder's ADX — trend strength (>25 trending, <20 choppy). */
export function adx(candles: Candle[], period = 14): number {
  if (candles.length < period * 2 + 1) return 20
  const plusDM: number[] = []
  const minusDM: number[] = []
  const trs: number[] = []
  for (let i = 1; i < candles.length; i++) {
    const up = candles[i].high - candles[i - 1].high
    const down = candles[i - 1].low - candles[i].low
    plusDM.push(up > down && up > 0 ? up : 0)
    minusDM.push(down > up && down > 0 ? down : 0)
    trs.push(Math.max(
      candles[i].high - candles[i].low,
      Math.abs(candles[i].high - candles[i - 1].close),
      Math.abs(candles[i].low - candles[i - 1].close),
    ))
  }
  const smooth = (arr: number[]) => {
    let s = arr.slice(0, period).reduce((a, b) => a + b, 0)
    const out = [s]
    for (let i = period; i < arr.length; i++) {
      s = s - s / period + arr[i]
      out.push(s)
    }
    return out
  }
  const sTR = smooth(trs)
  const sPlus = smooth(plusDM)
  const sMinus = smooth(minusDM)
  const dxs: number[] = []
  for (let i = 0; i < sTR.length; i++) {
    if (sTR[i] === 0) continue
    const pdi = (sPlus[i] / sTR[i]) * 100
    const mdi = (sMinus[i] / sTR[i]) * 100
    if (pdi + mdi === 0) continue
    dxs.push((Math.abs(pdi - mdi) / (pdi + mdi)) * 100)
  }
  const window = dxs.slice(-period)
  return window.length > 0 ? window.reduce((a, b) => a + b, 0) / window.length : 20
}

export type Pivots = { pivot: number; r1: number; r2: number; s1: number; s2: number }

export function pivots(prevDay: Candle): Pivots {
  const p = (prevDay.high + prevDay.low + prevDay.close) / 3
  return {
    pivot: p,
    r1: 2 * p - prevDay.low,
    r2: p + (prevDay.high - prevDay.low),
    s1: 2 * p - prevDay.high,
    s2: p - (prevDay.high - prevDay.low),
  }
}

/** Resample 1-minute candles to n-minute candles. */
export function resample(candles: Candle[], minutes: number): Candle[] {
  const out: Candle[] = []
  const ms = minutes * 60_000
  let bucket: Candle | null = null
  let bucketStart = 0
  for (const c of candles) {
    const start = Math.floor(c.time / ms) * ms
    if (!bucket || start !== bucketStart) {
      if (bucket) out.push(bucket)
      bucket = { ...c, time: start }
      bucketStart = start
    } else {
      bucket.high = Math.max(bucket.high, c.high)
      bucket.low = Math.min(bucket.low, c.low)
      bucket.close = c.close
      bucket.volume += c.volume
    }
  }
  if (bucket) out.push(bucket)
  return out
}
