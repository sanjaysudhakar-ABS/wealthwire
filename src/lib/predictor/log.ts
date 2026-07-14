import prisma from "../prisma"
import { getSpot, type IndexKey } from "./upstox"
import type { Analysis, Signal } from "./engine"

// ─── Run logging ─────────────────────────────────────────────────────────────

/** Persist an analysis run. Never throws — logging must not break analysis. */
export async function saveRun(a: Analysis): Promise<void> {
  try {
    await prisma.predictorRun.create({
      data: {
        index: a.index,
        spot: a.spot,
        expiry: a.expiry,
        regime: a.regime,
        direction: a.direction,
        conviction: a.conviction,
        composite: a.compositeScore,
        dataMode: a.dataMode,
        signals: a.signals as object[],
        ideas: a.ideas as unknown as object[],
        noTradeReason: a.noTradeReason,
        eventRisk: a.eventRisk,
      },
    })
  } catch (err) {
    console.error("[predictor-log] saveRun failed:", err)
  }
}

// ─── Outcome evaluation ──────────────────────────────────────────────────────

// A directional call counts as a hit when spot moved ≥0.1% the predicted way;
// a neutral call counts as a hit when spot stayed within ±0.25%.
const DIRECTIONAL_THRESHOLD = 0.1
const NEUTRAL_THRESHOLD = 0.25

function scoreOutcome(direction: string, pctMove: number): string {
  if (direction === "neutral") {
    return Math.abs(pctMove) < NEUTRAL_THRESHOLD ? "hit" : "miss"
  }
  const wanted = direction === "bullish" ? 1 : -1
  if (Math.abs(pctMove) < DIRECTIONAL_THRESHOLD) return "flat"
  return Math.sign(pctMove) === wanted ? "hit" : "miss"
}

/** Evaluate all live runs older than 30 minutes against the current spot. */
export async function evaluateRuns(): Promise<{ evaluated: number }> {
  const cutoff = new Date(Date.now() - 30 * 60_000)
  const pending = await prisma.predictorRun.findMany({
    where: { evaluatedAt: null, dataMode: "live", createdAt: { lt: cutoff } },
    orderBy: { createdAt: "asc" },
    take: 100,
  })
  if (pending.length === 0) return { evaluated: 0 }

  const spots = new Map<string, number>()
  for (const index of [...new Set(pending.map(r => r.index))]) {
    const s = await getSpot(index as IndexKey)
    if (s) spots.set(index, s)
  }

  let evaluated = 0
  for (const run of pending) {
    const spotNow = spots.get(run.index)
    if (!spotNow) continue
    const pctMove = ((spotNow - run.spot) / run.spot) * 100
    await prisma.predictorRun.update({
      where: { id: run.id },
      data: {
        evaluatedAt: new Date(),
        spotAtEval: spotNow,
        pctMove,
        outcome: scoreOutcome(run.direction, pctMove),
      },
    })
    evaluated++
  }
  return { evaluated }
}

// ─── History + hit rates ─────────────────────────────────────────────────────

export type SignalStat = { name: string; hits: number; total: number }

export async function getHistory() {
  const [recent, evaluated] = await Promise.all([
    prisma.predictorRun.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true, createdAt: true, index: true, spot: true, direction: true,
        conviction: true, dataMode: true, outcome: true, pctMove: true,
      },
    }),
    prisma.predictorRun.findMany({
      where: { evaluatedAt: { not: null }, dataMode: "live" },
      orderBy: { createdAt: "desc" },
      take: 200,
      select: { direction: true, outcome: true, pctMove: true, signals: true },
    }),
  ])

  const directional = evaluated.filter(r => r.direction !== "neutral" && r.outcome !== "flat")
  const directionalHits = directional.filter(r => r.outcome === "hit").length

  // Per-signal hit rate: a signal scores a hit when its lean (score beyond
  // ±15) matched the realized move direction.
  const perSignal = new Map<string, SignalStat>()
  for (const run of evaluated) {
    if (run.pctMove === null || Math.abs(run.pctMove) < DIRECTIONAL_THRESHOLD) continue
    const moveSign = Math.sign(run.pctMove)
    for (const s of (run.signals as unknown as Signal[]) ?? []) {
      if (Math.abs(s.score) < 15) continue
      const stat = perSignal.get(s.name) ?? { name: s.name, hits: 0, total: 0 }
      stat.total++
      if (Math.sign(s.score) === moveSign) stat.hits++
      perSignal.set(s.name, stat)
    }
  }

  return {
    runs: recent,
    stats: {
      evaluated: evaluated.length,
      directionalCalls: directional.length,
      directionalHits,
      perSignal: [...perSignal.values()].sort((a, b) => b.total - a.total),
    },
  }
}
