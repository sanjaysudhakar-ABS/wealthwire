// Declarative strategy catalog, distilled from the options-strategy canon
// (Bible of Options Strategies, NSE Bank Nifty booklet, OIC quick guide,
// Zerodha Varsity M5, Danes). Each entry declares when it applies
// (direction × conviction × IV regime × event day) and how to build its legs
// from the live chain. The engine selects by filtering, not by if/else —
// adding a strategy is adding an entry.

import type { ChainRow } from "./upstox"
import type { TradeIdea } from "./engine"
import type { Pivots } from "./indicators"

export type IVRegime = "cheap" | "normal" | "rich"

export type StrategyContext = {
  direction: "bullish" | "bearish" | "neutral"
  conviction: number
  spot: number
  chain: ChainRow[]
  strikeStep: number
  callWall: number
  putWall: number
  atmIVAvg: number
  ivRegime: IVRegime
  atrValue: number
  piv: Pivots
  eventDay: boolean
}

type StrategyDef = {
  name: string
  priority: (ctx: StrategyContext) => number // 0 = not applicable
  build: (ctx: StrategyContext) => TradeIdea | null
}

export function ivRegimeOf(atmIVAvg: number): IVRegime {
  if (atmIVAvg <= 0) return "normal" // unknown — assume normal
  if (atmIVAvg < 13) return "cheap"
  if (atmIVAvg > 16) return "rich"
  return "normal"
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function round2(n: number) {
  return Math.round(n * 20) / 20
}

function helpers(ctx: StrategyContext) {
  const atm = Math.round(ctx.spot / ctx.strikeStep) * ctx.strikeStep
  const byStrike = (s: number) => ctx.chain.find(r => r.strike === s)
  const side = (s: number, type: "CE" | "PE") =>
    type === "CE" ? byStrike(s)?.call : byStrike(s)?.put
  const prem = (s: number, type: "CE" | "PE") => side(s, type)?.ltp ?? 0
  const delta = (s: number, type: "CE" | "PE") => Math.abs(side(s, type)?.delta ?? 0.5)
  const theta = (s: number, type: "CE" | "PE") => side(s, type)?.theta ?? 0
  const gamma = (s: number, type: "CE" | "PE") => side(s, type)?.gamma ?? 0
  const move = Math.max(ctx.atrValue * 6, ctx.spot * 0.003)

  // Attach greeks so every logged idea carries them for later refinement
  const leg = (action: "BUY" | "SELL", type: "CE" | "PE", strike: number) => ({
    action,
    type,
    strike,
    premium: prem(strike, type),
    delta: Math.round(delta(strike, type) * 100) / 100,
    theta: Math.round(theta(strike, type) * 100) / 100,
    gamma: gamma(strike, type),
  })

  const greeksLive = ctx.chain.some(r => Math.abs(r.call?.delta ?? 0) > 0.01)

  // Pick the strike whose |delta| is closest to target — keeps suggestions in
  // the tradeable band instead of drifting to far-OTM strikes with no
  // responsiveness. Falls back to distance-from-ATM when greeks are absent.
  const strikeByDelta = (type: "CE" | "PE", target: number): number | null => {
    if (!greeksLive) return null
    let best: number | null = null
    let bestDiff = Infinity
    for (const r of ctx.chain) {
      const s = type === "CE" ? r.call : r.put
      if (!s || s.ltp <= 0) continue
      const d = Math.abs(s.delta)
      if (d < 0.28 || d > 0.75) continue // never suggest lottery tickets or deep ITM
      const diff = Math.abs(d - target)
      if (diff < bestDiff) {
        bestDiff = diff
        best = r.strike
      }
    }
    return best
  }

  // Illiquid chains put OI walls far away; never let a suggested strike sit
  // more than `steps` strike-steps from ATM.
  const capNearAtm = (strike: number, steps: number) =>
    Math.max(atm - steps * ctx.strikeStep, Math.min(atm + steps * ctx.strikeStep, strike))

  return { atm, prem, delta, theta, gamma, move, leg, strikeByDelta, capNearAtm, greeksLive }
}

// ─── Catalog ─────────────────────────────────────────────────────────────────

const CATALOG: StrategyDef[] = [
  {
    // Directional long option — best when premium is not overpriced
    name: "long-option",
    priority: ctx =>
      ctx.direction === "neutral" ? 0 : ctx.ivRegime === "rich" ? 4 : 9,
    build: ctx => {
      const { atm, prem, delta, theta, gamma, move, leg, strikeByDelta, capNearAtm } = helpers(ctx)
      const bull = ctx.direction === "bullish"
      const type: "CE" | "PE" = bull ? "CE" : "PE"
      // Strike by delta: ~0.50 for moderate conviction, ~0.40 for high
      // conviction (leverage without leaving the responsive band).
      const targetDelta = ctx.conviction > 70 ? 0.4 : 0.5
      const byDelta = strikeByDelta(type, targetDelta)
      const fallback = bull ? atm + (ctx.conviction > 70 ? 1 : 0) * ctx.strikeStep : atm - (ctx.conviction > 70 ? 1 : 0) * ctx.strikeStep
      const strike = capNearAtm(byDelta ?? fallback, 3)
      const p = prem(strike, type)
      if (p <= 0) return null
      const invalidation = bull ? Math.min(ctx.putWall, ctx.piv.s1) : Math.max(ctx.callWall, ctx.piv.r1)
      const targetSpot = bull ? Math.min(ctx.spot + move, ctx.callWall) : Math.max(ctx.spot - move, ctx.putWall)
      const d = delta(strike, type)
      const th = theta(strike, type)
      const g = gamma(strike, type)
      const thetaNote = th < 0 ? `; theta burn ≈ ₹${Math.abs(round2(th))}/day` : ""
      // Premium estimate: delta + gamma second-order term for the move,
      // minus one day of theta decay — delta alone understates gains on a
      // favourable move and overstates them once decay is counted.
      const m = Math.abs(targetSpot - ctx.spot)
      const targetPrem = Math.max(round2(p + d * m + 0.5 * g * m * m - Math.abs(th)), round2(p * 1.15))
      return {
        strategy: bull ? "Long Call" : "Long Put",
        legs: [leg("BUY", type, strike)],
        entryNote: `Enter near ₹${round2(p)} (delta ${d.toFixed(2)}${thetaNote}); better entry if spot retests ${bull ? "support" : "resistance"} ${bull ? ctx.putWall : ctx.callWall}`,
        target: `₹${targetPrem} (spot → ${targetSpot.toFixed(0)}, incl. gamma & 1-day theta)`,
        stopLoss: `₹${round2(Math.max(p - Math.abs(ctx.spot - invalidation) * d, p * 0.7))} (spot ${bull ? "below" : "above"} ${invalidation.toFixed(0)})`,
        rationale: `${ctx.conviction > 70 ? "High" : "Moderate"} conviction ${ctx.direction} view with ${ctx.ivRegime} IV — strike picked at ~${targetDelta.toFixed(1)} delta`,
        maxRisk: `Premium paid: ₹${round2(p)} × lot`,
      }
    },
  },
  {
    // Debit spread — defined-risk directional, capped at the opposing OI wall
    name: "debit-spread",
    priority: ctx => (ctx.direction === "neutral" ? 0 : 6),
    build: ctx => {
      const { atm, prem, leg } = helpers(ctx)
      const bull = ctx.direction === "bullish"
      const type: "CE" | "PE" = bull ? "CE" : "PE"
      const longStrike = atm
      const shortStrike = bull
        ? Math.min(atm + 2 * ctx.strikeStep, Math.round(ctx.callWall / ctx.strikeStep) * ctx.strikeStep)
        : Math.max(atm - 2 * ctx.strikeStep, Math.round(ctx.putWall / ctx.strikeStep) * ctx.strikeStep)
      if (shortStrike === longStrike) return null
      const pLong = prem(longStrike, type)
      const pShort = prem(shortStrike, type)
      if (pLong <= 0 || pShort <= 0) return null
      const debit = round2(pLong - pShort)
      if (debit <= 0) return null
      const maxGain = Math.abs(shortStrike - longStrike) - debit
      return {
        strategy: bull ? "Bull Call Spread" : "Bear Put Spread",
        legs: [leg("BUY", type, longStrike), leg("SELL", type, shortStrike)],
        entryNote: `Net debit ≈ ₹${debit}`,
        target: `₹${round2(debit + maxGain * 0.6)} (60% of max value; spot → ${shortStrike})`,
        stopLoss: `₹${round2(debit * 0.5)} (half the debit)`,
        rationale: `Defined-risk ${ctx.direction} play capped at the ${bull ? "call" : "put"} OI wall ${shortStrike}`,
        maxRisk: `Net debit: ₹${debit} × lot (max loss)`,
      }
    },
  },
  {
    // Credit spread — when IV is rich, sell expensive premium with the trend
    name: "credit-spread",
    priority: ctx => (ctx.direction === "neutral" || ctx.ivRegime !== "rich" ? 0 : 8),
    build: ctx => {
      const { atm, prem, leg, capNearAtm } = helpers(ctx)
      const bull = ctx.direction === "bullish"
      // Bull view → sell the put wall below (market holds above it);
      // bear view → sell the call wall above. On thin chains (Sensex/BSE)
      // the wall can sit far away, producing far-OTM strikes with negligible
      // premium and no responsiveness — cap at 2 strike-steps from ATM.
      const type: "CE" | "PE" = bull ? "PE" : "CE"
      let sellStrike = capNearAtm(Math.round((bull ? ctx.putWall : ctx.callWall) / ctx.strikeStep) * ctx.strikeStep, 2)
      // Keep at least one step of room from spot
      sellStrike = bull ? Math.min(sellStrike, atm - ctx.strikeStep) : Math.max(sellStrike, atm + ctx.strikeStep)
      const hedgeStrike = bull ? sellStrike - ctx.strikeStep : sellStrike + ctx.strikeStep
      if (bull ? sellStrike >= ctx.spot : sellStrike <= ctx.spot) return null
      const pSell = prem(sellStrike, type)
      const pHedge = prem(hedgeStrike, type)
      if (pSell <= 0 || pHedge <= 0) return null
      const credit = round2(pSell - pHedge)
      // A credit under ~12% of the width is bad risk/reward — skip
      if (credit < ctx.strikeStep * 0.12) return null
      return {
        strategy: bull ? "Bull Put Spread (credit)" : "Bear Call Spread (credit)",
        legs: [leg("SELL", type, sellStrike), leg("BUY", type, hedgeStrike)],
        entryNote: `Net credit ≈ ₹${credit} — IV is rich, so sell premium at the ${bull ? "put" : "call"} wall`,
        target: `Keep 60% of credit (buy back ≈ ₹${round2(credit * 0.4)})`,
        stopLoss: `Exit if spot closes ${bull ? "below" : "above"} ${sellStrike}`,
        rationale: `${ctx.direction} view + rich IV (${ctx.atmIVAvg.toFixed(1)}) — collect decay while the OI wall holds`,
        maxRisk: `₹${round2(ctx.strikeStep - credit)} × lot (width − credit)`,
      }
    },
  },
  {
    // Iron condor — neutral + rich IV: sell the range the writers defend
    name: "iron-condor",
    priority: ctx => (ctx.direction === "neutral" && ctx.ivRegime === "rich" ? 8 : 0),
    build: ctx => {
      const { prem, atm, leg, capNearAtm } = helpers(ctx)
      const sellCall = capNearAtm(Math.round(ctx.callWall / ctx.strikeStep) * ctx.strikeStep, 3)
      const sellPut = capNearAtm(Math.round(ctx.putWall / ctx.strikeStep) * ctx.strikeStep, 3)
      if (sellCall <= atm || sellPut >= atm) return null
      const pc = prem(sellCall, "CE")
      const pp = prem(sellPut, "PE")
      const hc = prem(sellCall + ctx.strikeStep, "CE")
      const hp = prem(sellPut - ctx.strikeStep, "PE")
      if (!pc || !pp || !hc || !hp) return null
      const credit = round2(pc + pp - hc - hp)
      if (credit <= 0) return null
      return {
        strategy: "Iron Condor",
        legs: [
          leg("SELL", "CE", sellCall),
          leg("BUY", "CE", sellCall + ctx.strikeStep),
          leg("SELL", "PE", sellPut),
          leg("BUY", "PE", sellPut - ctx.strikeStep),
        ],
        entryNote: `Net credit ≈ ₹${credit}; range play between OI walls ${sellPut}–${sellCall}`,
        target: `Keep 50–60% of credit (₹${round2(credit * 0.5)})`,
        stopLoss: `Exit if spot closes beyond ${sellPut} or ${sellCall}`,
        rationale: "No directional edge + rich IV → sell the range the option writers themselves are defending",
        maxRisk: `₹${round2(ctx.strikeStep - credit)} × lot (width − credit)`,
      }
    },
  },
  {
    // Iron butterfly — neutral + very rich IV: tighter, higher-credit condor
    name: "iron-butterfly",
    priority: ctx => (ctx.direction === "neutral" && ctx.atmIVAvg > 18 ? 7 : 0),
    build: ctx => {
      const { prem, atm, leg } = helpers(ctx)
      const wing = 2 * ctx.strikeStep
      const pc = prem(atm, "CE")
      const pp = prem(atm, "PE")
      const hc = prem(atm + wing, "CE")
      const hp = prem(atm - wing, "PE")
      if (!pc || !pp || !hc || !hp) return null
      const credit = round2(pc + pp - hc - hp)
      if (credit <= 0) return null
      return {
        strategy: "Iron Butterfly",
        legs: [
          leg("SELL", "CE", atm),
          leg("SELL", "PE", atm),
          leg("BUY", "CE", atm + wing),
          leg("BUY", "PE", atm - wing),
        ],
        entryNote: `Net credit ≈ ₹${credit}; profits if spot pins near ${atm}`,
        target: `Keep 40–50% of credit (buy back ≈ ₹${round2(credit * 0.55)})`,
        stopLoss: `Exit if spot moves beyond breakevens ${atm - Math.round(credit)}–${atm + Math.round(credit)}`,
        rationale: `Very rich ATM IV (${ctx.atmIVAvg.toFixed(1)}) + no direction → maximum decay collection at the money`,
        maxRisk: `₹${round2(wing - credit)} × lot (wing width − credit)`,
      }
    },
  },
  {
    // Long straddle — event day with cheap IV: buy the move before it's priced
    name: "event-straddle",
    priority: ctx => (ctx.eventDay && ctx.ivRegime === "cheap" ? 10 : 0),
    build: ctx => {
      const { prem, atm, leg } = helpers(ctx)
      const pc = prem(atm, "CE")
      const pp = prem(atm, "PE")
      if (!pc || !pp) return null
      const cost = round2(pc + pp)
      return {
        strategy: "Long Straddle (event play)",
        legs: [leg("BUY", "CE", atm), leg("BUY", "PE", atm)],
        entryNote: `Combined cost ≈ ₹${cost}; enter before the event, direction-agnostic`,
        target: `₹${round2(cost * 1.5)} (spot beyond ${atm - Math.round(cost)}/${atm + Math.round(cost)} breakevens)`,
        stopLoss: `₹${round2(cost * 0.7)} — or exit right after the event if no move materialises`,
        rationale: "High-impact event today with cheap IV — buy volatility before the market prices it",
        maxRisk: `₹${cost} × lot (both premiums)`,
      }
    },
  },
]

/** Pick up to 3 applicable strategies, highest priority first. */
export function selectIdeas(ctx: StrategyContext): TradeIdea[] {
  return CATALOG
    .map(def => ({ def, priority: def.priority(ctx) }))
    .filter(x => x.priority > 0)
    .sort((a, b) => b.priority - a.priority)
    .map(x => x.def.build(ctx))
    .filter((idea): idea is TradeIdea => idea !== null)
    .slice(0, 3)
}
