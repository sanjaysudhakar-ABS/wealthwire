import { type IndexKey, INDEX_CONFIG, type Candle, type ChainRow, type ExpiryMode, getSpot, getIntradayCandles, getDailyCandles, getOptionChain, hasUpstoxToken, drainUpstoxErrors } from "./upstox"
import { getGlobalCues, getNewsSentiment, getEventRisk, drainExternalErrors, type Cue, type NewsSentiment } from "./external"
import { ema, rsi, atr, vwap, adx, pivots, resample, type Pivots } from "./indicators"
import { selectIdeas, ivRegimeOf } from "./strategies"

// ─── Types ───────────────────────────────────────────────────────────────────

export type Signal = {
  name: string
  block: "technical" | "derivatives" | "macro"
  score: number // -100 (bearish) .. +100 (bullish)
  weight: number
  reason: string
}

export type TradeLeg = { action: "BUY" | "SELL"; type: "CE" | "PE"; strike: number; premium: number; delta?: number; theta?: number; gamma?: number }

export type TradeIdea = {
  strategy: string
  expiry: string
  legs: TradeLeg[]
  entryNote: string
  target: string
  stopLoss: string
  rationale: string
  maxRisk: string
}

export type Analysis = {
  index: IndexKey
  label: string
  timestamp: string
  spot: number
  expiry: string | null
  regime: "trending" | "choppy"
  direction: "bullish" | "bearish" | "neutral"
  conviction: number // 0..100
  compositeScore: number
  signals: Signal[]
  ideas: TradeIdea[]
  noTradeReason: string | null
  eventRisk: string[]
  headlines: string[]
  dataMode: "live" | "demo"
  diagnostics: {
    sources: Record<string, string | number | boolean>
    errors: string[]
  }
}

// ─── Demo data (used when UPSTOX_ACCESS_TOKEN is absent) ────────────────────

function demoCandles(spot: number, n: number, stepMs: number): Candle[] {
  const out: Candle[] = []
  let price = spot * 0.995
  const now = Date.now()
  for (let i = 0; i < n; i++) {
    const drift = (Math.sin(i / 9) + 0.3) * spot * 0.0004
    const open = price
    const close = price + drift
    out.push({
      time: now - (n - i) * stepMs,
      open,
      close,
      high: Math.max(open, close) + spot * 0.0003,
      low: Math.min(open, close) - spot * 0.0003,
      volume: 1000 + (i % 7) * 250,
    })
    price = close
  }
  return out
}

function demoChain(spot: number, step: number): { expiry: string; rows: ChainRow[] } {
  const atmStrike = Math.round(spot / step) * step
  const rows: ChainRow[] = []
  for (let i = -6; i <= 6; i++) {
    const strike = atmStrike + i * step
    const dist = Math.abs(strike - spot) / spot
    const callPrem = Math.max(spot * 0.004 * Math.exp(-dist * 120) + Math.max(spot - strike, 0), 2)
    const putPrem = Math.max(spot * 0.004 * Math.exp(-dist * 120) + Math.max(strike - spot, 0), 2)
    rows.push({
      strike,
      call: { ltp: Math.round(callPrem), oi: Math.round(80000 * Math.exp(-Math.abs(i - 2) / 2)), volume: 50000, iv: 12 + Math.abs(i), delta: Math.max(0.05, Math.min(0.95, 0.5 - i * 0.12)), theta: -Math.max(2, callPrem * 0.15), gamma: 0.0008 * Math.exp(-Math.abs(i) / 3) },
      put: { ltp: Math.round(putPrem), oi: Math.round(80000 * Math.exp(-Math.abs(i + 2) / 2)), volume: 50000, iv: 13 + Math.abs(i), delta: -Math.max(0.05, Math.min(0.95, 0.5 + i * 0.12)), theta: -Math.max(2, putPrem * 0.15), gamma: 0.0008 * Math.exp(-Math.abs(i) / 3) },
    })
  }
  const expiry = new Date(Date.now() + 4 * 86400_000).toISOString().slice(0, 10)
  return { expiry, rows }
}

// ─── Signal computation ──────────────────────────────────────────────────────

function clamp(v: number, lo = -100, hi = 100) {
  return Math.max(lo, Math.min(hi, v))
}

function technicalSignals(intraday5m: Candle[], daily: Candle[], spot: number, trending: boolean): { signals: Signal[]; atrValue: number; piv: Pivots } {
  const closes5 = intraday5m.map(c => c.close)
  const signals: Signal[] = []

  // Trend: EMA9 vs EMA21 vs VWAP on 5-min.
  // Saturation tuned to real index moves: full score at ~0.15% EMA gap
  // (~35 pts on Nifty) and ~0.25% VWAP distance — an ordinary strong
  // trend day should register as strong, not as ±10.
  const e9 = ema(closes5, 9).at(-1)!
  const e21 = ema(closes5, 21).at(-1)!
  const vw = vwap(intraday5m)
  const emaScore = clamp(((e9 - e21) / spot) * 66000)
  const vwapScore = clamp(((spot - vw) / spot) * 40000)
  signals.push({
    name: "Trend (EMA 9/21)",
    block: "technical",
    score: emaScore,
    weight: 2,
    reason: `EMA9 ${e9 > e21 ? "above" : "below"} EMA21 on 5-min (${e9.toFixed(0)} vs ${e21.toFixed(0)})`,
  })
  signals.push({
    name: "Price vs VWAP",
    block: "technical",
    score: vwapScore,
    weight: 2,
    reason: `Spot ${spot > vw ? "above" : "below"} VWAP ${vw.toFixed(0)} — ${spot > vw ? "buyers" : "sellers"} in control intraday`,
  })

  // Day range position: where spot sits in today's high-low range.
  // The most direct read of a one-way move — at the lows = -100.
  const dayHigh = Math.max(...intraday5m.map(c => c.high))
  const dayLow = Math.min(...intraday5m.map(c => c.low))
  if (dayHigh > dayLow) {
    const pos = (spot - dayLow) / (dayHigh - dayLow)
    signals.push({
      name: "Day range position",
      block: "technical",
      score: clamp((pos - 0.5) * 220),
      weight: 1.5,
      reason: `Spot in the ${pos < 0.25 ? "bottom" : pos > 0.75 ? "top" : "middle"} of today's range (${dayLow.toFixed(0)}–${dayHigh.toFixed(0)})`,
    })
  }

  // Short-term momentum: 30-minute rate of change (full score at ±0.4%)
  if (closes5.length > 7) {
    const roc = (closes5.at(-1)! - closes5.at(-7)!) / spot
    signals.push({
      name: "Momentum (30-min)",
      block: "technical",
      score: clamp(roc * 25000),
      weight: 1.5,
      reason: `${roc >= 0 ? "+" : ""}${(roc * 100).toFixed(2)}% over the last 30 minutes`,
    })
  }

  // Momentum: RSI-14 on 5-min. Extremes are faded only in choppy markets —
  // in a trending regime RSI 22 is confirmation, not a reversal sign.
  const r = rsi(closes5)
  const fade = !trending && (r > 75 || r < 25) ? 0.4 : 1
  const rsiScore = clamp((r - 50) * 2.5) * fade
  signals.push({
    name: "Momentum (RSI-14)",
    block: "technical",
    score: rsiScore,
    weight: 1.5,
    reason: `RSI ${r.toFixed(0)}${fade < 1 ? (r > 75 ? " — overbought in chop, upside capped" : " — oversold in chop, downside capped") : ""}`,
  })

  // Daily structure: close vs 20-day EMA
  const dCloses = daily.map(c => c.close)
  const e20d = ema(dCloses, 20).at(-1)!
  signals.push({
    name: "Daily trend (20-EMA)",
    block: "technical",
    score: clamp(((spot - e20d) / spot) * 4000),
    weight: 1,
    reason: `Spot ${spot > e20d ? "above" : "below"} 20-day EMA ${e20d.toFixed(0)}`,
  })

  const atrValue = atr(intraday5m)
  const piv = pivots(daily.at(-2) ?? daily.at(-1)!)

  return { signals, atrValue, piv }
}

function derivativeSignals(chain: ChainRow[], spot: number): { signals: Signal[]; callWall: number; putWall: number; atmIVAvg: number } {
  const signals: Signal[] = []
  const near = chain.filter(r => Math.abs(r.strike - spot) / spot < 0.03)

  const totalCallOI = near.reduce((s, r) => s + (r.call?.oi ?? 0), 0)
  const totalPutOI = near.reduce((s, r) => s + (r.put?.oi ?? 0), 0)
  const oiAvailable = totalCallOI + totalPutOI > 0
  const pcr = totalCallOI > 0 ? totalPutOI / totalCallOI : 1
  // High PCR → puts written below → support (bullish); extremes fade
  let pcrScore = clamp((pcr - 1) * 120)
  if (pcr > 1.7 || pcr < 0.5) pcrScore = -pcrScore * 0.5 // contrarian at extremes
  signals.push({
    name: "Put/Call ratio (OI)",
    block: "derivatives",
    score: oiAvailable ? pcrScore : 0,
    weight: oiAvailable ? 2 : 0.1,
    reason: oiAvailable
      ? `PCR ${pcr.toFixed(2)} near ATM${pcr > 1.7 ? " — extreme, contrarian" : pcr < 0.5 ? " — extreme, contrarian" : pcr > 1 ? " — put writers supporting" : " — call writers capping"}`
      : "OI not present in chain data — signal excluded",
  })

  // OI walls: highest call OI above spot = resistance, highest put OI below = support
  const callWallRow = chain.filter(r => r.strike >= spot).sort((a, b) => (b.call?.oi ?? 0) - (a.call?.oi ?? 0))[0]
  const putWallRow = chain.filter(r => r.strike <= spot).sort((a, b) => (b.put?.oi ?? 0) - (a.put?.oi ?? 0))[0]
  const callWall = callWallRow?.strike ?? spot * 1.01
  const putWall = putWallRow?.strike ?? spot * 0.99
  const room = (callWall - spot) - (spot - putWall)
  signals.push({
    name: "OI walls",
    block: "derivatives",
    score: clamp((room / spot) * 8000),
    weight: 1.5,
    reason: `Resistance wall ${callWall} / support wall ${putWall} — spot ${room > 0 ? "closer to support" : "closer to resistance"}`,
  })

  // IV level: average ATM IV (used for strategy choice more than direction)
  const atmRow = near.sort((a, b) => Math.abs(a.strike - spot) - Math.abs(b.strike - spot))[0]
  const atmIVAvg = atmRow ? ((atmRow.call?.iv ?? 0) + (atmRow.put?.iv ?? 0)) / 2 : 0
  const skew = atmRow ? (atmRow.put?.iv ?? 0) - (atmRow.call?.iv ?? 0) : 0
  signals.push({
    name: "IV skew",
    block: "derivatives",
    score: clamp(-skew * 15),
    weight: 1,
    reason: `ATM put IV ${skew >= 0 ? "richer" : "cheaper"} than call IV by ${Math.abs(skew).toFixed(1)} pts — ${skew > 1 ? "downside hedging demand" : "no fear premium"}`,
  })

  return { signals, callWall, putWall, atmIVAvg }
}

function macroSignals(cues: Cue[], sentiment: NewsSentiment | null): Signal[] {
  const signals: Signal[] = []

  if (cues.length > 0) {
    const totalWeight = cues.reduce((s, c) => s + c.weight, 0)
    const lead = cues.reduce((s, c) => s + c.changePercent * c.weight, 0) / totalWeight
    const strongest = [...cues].sort((a, b) => Math.abs(b.changePercent * b.weight) - Math.abs(a.changePercent * a.weight))[0]
    signals.push({
      name: "Global cues",
      block: "macro",
      score: clamp(lead * 60),
      weight: 2.5,
      reason: `Weighted global lead ${lead >= 0 ? "+" : ""}${lead.toFixed(2)}% (biggest driver: ${strongest.name} ${strongest.changePercent >= 0 ? "+" : ""}${strongest.changePercent.toFixed(2)}%)`,
    })
  }

  if (sentiment) {
    signals.push({
      name: "News sentiment",
      block: "macro",
      score: clamp(sentiment.score * 150),
      weight: 1.5,
      reason: `Avg sentiment ${sentiment.score.toFixed(2)} across ${sentiment.articleCount} India-tagged stories (24h)`,
    })
  }

  return signals
}

// ─── Orchestrator ────────────────────────────────────────────────────────────

export async function analyze(index: IndexKey, expiryMode: ExpiryMode = "current"): Promise<Analysis> {
  const cfg = INDEX_CONFIG[index]
  const live = hasUpstoxToken()

  const [spotLive, intraday1m, daily, chainLive, cues, sentiment, events] = await Promise.all([
    getSpot(index),
    getIntradayCandles(index),
    getDailyCandles(index),
    getOptionChain(index, expiryMode),
    getGlobalCues(),
    getNewsSentiment(),
    getEventRisk(),
  ])

  const demoSpot = index === "nifty" ? 24500 : 80500
  let spot = spotLive ?? demoSpot
  const candles1m = intraday1m ?? demoCandles(spot, 240, 60_000)
  const dailyCandles = daily ?? demoCandles(spot, 60, 86400_000)
  // Demo spot must sit where the demo candles ended, or signals contradict artificially
  if (!spotLive) spot = candles1m[candles1m.length - 1].close
  const chain = chainLive ?? demoChain(spot, cfg.strikeStep)
  const dataMode: "live" | "demo" = spotLive && intraday1m && chainLive ? "live" : live ? "demo" : "demo"

  const intraday5m = resample(candles1m, 5)
  const adxValue = adx(intraday5m)
  const regimeTrending = adxValue >= 25
  const tech = technicalSignals(intraday5m, dailyCandles, spot, regimeTrending)
  const deriv = derivativeSignals(chain.rows, spot)
  const macro = macroSignals(cues, sentiment)

  // Global cues dominate the open but go quiet during Indian hours (US
  // futures barely move) — after 10:15 IST they shouldn't dilute a live
  // intraday move, so their weight decays once the session is underway.
  const istMins = (() => {
    const ist = new Date(Date.now() + 5.5 * 3600_000)
    return ist.getUTCHours() * 60 + ist.getUTCMinutes()
  })()
  const sessionUnderway = istMins > 615 && istMins < 930 // 10:15–15:30 IST

  // Regime reweighting: trending boosts trend/momentum; choppy boosts OI/PCR
  const trending = regimeTrending
  const signals = [...tech.signals, ...deriv.signals, ...macro].map(s => {
    let w = s.weight
    if (trending && s.block === "technical") w *= 1.5
    if (!trending && s.block === "derivatives") w *= 1.5
    if (sessionUnderway && s.block === "macro") w *= 0.5
    return { ...s, weight: Math.round(w * 100) / 100 }
  })

  const totalWeight = signals.reduce((s, x) => s + x.weight, 0)
  const composite = signals.reduce((s, x) => s + x.score * x.weight, 0) / totalWeight
  let conviction = Math.min(100, Math.round(Math.abs(composite) * 2))
  if (!trending) conviction = Math.round(conviction * 0.8)

  const eventRisk = events?.highImpactToday ?? []
  if (eventRisk.length > 0) conviction = Math.min(conviction, 45)

  const direction: Analysis["direction"] = conviction < 40 ? "neutral" : composite > 0 ? "bullish" : "bearish"

  const ideas = selectIdeas({
    direction,
    conviction,
    spot,
    expiry: chain.expiry,
    chain: chain.rows,
    strikeStep: cfg.strikeStep,
    callWall: deriv.callWall,
    putWall: deriv.putWall,
    atmIVAvg: deriv.atmIVAvg,
    ivRegime: ivRegimeOf(deriv.atmIVAvg),
    atrValue: tech.atrValue,
    piv: tech.piv,
    eventDay: eventRisk.length > 0,
  })

  // Same-day expiry contracts decay by the hour — flag it on every idea
  const todayIST = new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10)
  if (chain.expiry === todayIST) {
    for (const idea of ideas) {
      idea.rationale += " · ⚠ Expiry-day contract: premiums decay hourly, intraday management only"
    }
  }

  let noTradeReason: string | null = null
  if (ideas.length === 0) {
    noTradeReason = direction === "neutral"
      ? eventRisk.length > 0
        ? `Conviction capped — high-impact events today (${eventRisk[0]}); IV already rich, so no volatility buy either`
        : "Signals are mixed and IV is not rich enough to sell — no edge, no trade"
      : "Option chain data insufficient to price entries"
  }

  const greeksLive = chain.rows.some(r => Math.abs(r.call?.delta ?? 0) > 0.01)
  const diagnostics = {
    sources: {
      upstoxTokenSet: live,
      spotLive: Boolean(spotLive),
      intradayCandles: intraday1m?.length ?? 0,
      dailyCandles: daily?.length ?? 0,
      chainRows: chainLive?.rows.length ?? 0,
      chainExpiry: chain.expiry,
      greeksLive,
      globalCues: `${cues.length}/7`,
      sentimentArticles: sentiment?.articleCount ?? 0,
      economicCalendar: events !== null,
    },
    errors: [...drainUpstoxErrors(), ...drainExternalErrors()],
  }

  return {
    index,
    label: cfg.label,
    timestamp: new Date().toISOString(),
    spot,
    expiry: chain.expiry,
    regime: trending ? "trending" : "choppy",
    direction,
    conviction,
    compositeScore: Math.round(composite * 10) / 10,
    signals: signals.map(s => ({ ...s, score: Math.round(s.score) })),
    ideas,
    noTradeReason,
    eventRisk,
    headlines: sentiment?.topHeadlines ?? [],
    dataMode,
    diagnostics,
  }
}
