"use client"

import { useEffect, useState } from "react"
import { Activity, TrendingUp, TrendingDown, Minus, AlertTriangle, RefreshCw } from "lucide-react"

type Signal = { name: string; block: string; score: number; weight: number; reason: string }
type TradeLeg = { action: "BUY" | "SELL"; type: "CE" | "PE"; strike: number; premium: number }
type TradeIdea = { strategy: string; legs: TradeLeg[]; entryNote: string; target: string; stopLoss: string; rationale: string; maxRisk: string }
type Analysis = {
  label: string; timestamp: string; spot: number; expiry: string | null
  regime: string; direction: "bullish" | "bearish" | "neutral"; conviction: number; compositeScore: number
  signals: Signal[]; ideas: TradeIdea[]; noTradeReason: string | null
  eventRisk: string[]; headlines: string[]; dataMode: "live" | "demo"
}

const BLOCK_LABEL: Record<string, string> = { technical: "Technical", derivatives: "Derivatives", macro: "Macro & News" }

type HistoryRun = {
  id: string; createdAt: string; index: string; spot: number; direction: string
  conviction: number; dataMode: string; outcome: string | null; pctMove: number | null
}
type History = {
  runs: HistoryRun[]
  stats: {
    evaluated: number
    directionalCalls: number
    directionalHits: number
    perSignal: Array<{ name: string; hits: number; total: number }>
  } | null
}

function OutcomeBadge({ outcome }: { outcome: string | null }) {
  if (!outcome) return <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-500 dark:bg-gray-800">pending</span>
  const style = outcome === "hit"
    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
    : outcome === "miss"
      ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
  return <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${style}`}>{outcome}</span>
}

export default function PredictorPage() {
  const [index, setIndex] = useState<"nifty" | "sensex">("nifty")
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<History | null>(null)

  async function loadHistory() {
    try {
      const res = await fetch("/api/predictor/history")
      if (res.ok) setHistory(await res.json())
    } catch { /* history is best-effort */ }
  }

  useEffect(() => {
    const t = setTimeout(loadHistory, 0)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function run() {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch("/api/predictor/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index }),
      })
      if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error ?? `HTTP ${res.status}`)
      setAnalysis(await res.json())
      loadHistory()
    } catch (e) {
      setError(String(e))
    } finally {
      setBusy(false)
    }
  }

  const dirColor = analysis?.direction === "bullish" ? "text-emerald-500" : analysis?.direction === "bearish" ? "text-red-500" : "text-gray-400"
  const DirIcon = analysis?.direction === "bullish" ? TrendingUp : analysis?.direction === "bearish" ? TrendingDown : Minus

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-2 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 text-white"><Activity size={20} /></span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Market Predictor</h1>
          <p className="text-sm text-gray-500">Evidence aggregator for Nifty & Sensex options — private research tool</p>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
        Educational analysis only — not investment advice. Options carry risk of total premium loss. Verify levels before acting.
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="flex rounded-full border border-gray-200 p-1 dark:border-gray-700">
          {(["nifty", "sensex"] as const).map(ix => (
            <button
              key={ix}
              onClick={() => setIndex(ix)}
              className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-colors ${index === ix ? "bg-[#1E40AF] text-white" : "text-gray-600 dark:text-gray-300"}`}
            >
              {ix === "nifty" ? "Nifty 50" : "Sensex"}
            </button>
          ))}
        </div>
        <button
          onClick={run}
          disabled={busy}
          className="flex items-center gap-2 rounded-full bg-[#1E40AF] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
        >
          <RefreshCw size={15} className={busy ? "animate-spin" : ""} />
          {busy ? "Analyzing…" : "Analyze"}
        </button>
        {analysis && (
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${analysis.dataMode === "live" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
            {analysis.dataMode === "live" ? "Live data" : "Demo data — set UPSTOX_ACCESS_TOKEN"}
          </span>
        )}
      </div>

      {error && <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">{error}</div>}

      {analysis && (
        <div className="space-y-8">
          {/* Verdict */}
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-gray-200 bg-white p-6 sm:grid-cols-4 dark:border-gray-800 dark:bg-gray-900">
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-400">{analysis.label} spot</div>
              <div className="text-xl font-bold">{analysis.spot.toLocaleString("en-IN")}</div>
              <div className="text-xs text-gray-400">expiry {analysis.expiry ?? "—"}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Direction</div>
              <div className={`flex items-center gap-1.5 text-xl font-bold capitalize ${dirColor}`}><DirIcon size={20} /> {analysis.direction}</div>
              <div className="text-xs text-gray-400">{analysis.regime} regime</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Conviction</div>
              <div className="text-xl font-bold">{analysis.conviction}<span className="text-sm text-gray-400">/100</span></div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                <div className={`h-1.5 rounded-full ${analysis.conviction >= 60 ? "bg-emerald-500" : analysis.conviction >= 40 ? "bg-amber-500" : "bg-gray-400"}`} style={{ width: `${analysis.conviction}%` }} />
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-400">Composite score</div>
              <div className="text-xl font-bold">{analysis.compositeScore > 0 ? "+" : ""}{analysis.compositeScore}</div>
              <div className="text-xs text-gray-400">{new Date(analysis.timestamp).toLocaleTimeString("en-IN")}</div>
            </div>
          </div>

          {analysis.eventRisk.length > 0 && (
            <div className="flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              <div><span className="font-semibold">Event risk today (conviction capped):</span> {analysis.eventRisk.join(" · ")}</div>
            </div>
          )}

          {/* Trade ideas */}
          {analysis.noTradeReason ? (
            <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center dark:border-gray-700">
              <div className="mb-1 text-lg font-bold">No trade</div>
              <p className="text-sm text-gray-500">{analysis.noTradeReason}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {analysis.ideas.map((idea, i) => (
                <div key={i} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-bold tracking-tight">{idea.strategy}</h3>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">#{i + 1}</span>
                  </div>
                  <div className="mb-3 space-y-1.5">
                    {idea.legs.map((leg, j) => (
                      <div key={j} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-1.5 text-sm dark:bg-gray-800">
                        <span className={`font-bold ${leg.action === "BUY" ? "text-emerald-600" : "text-red-500"}`}>{leg.action}</span>
                        <span className="font-semibold">{leg.strike} {leg.type}</span>
                        <span className="text-gray-500">₹{leg.premium}</span>
                      </div>
                    ))}
                  </div>
                  <dl className="space-y-1.5 text-sm">
                    <div><dt className="inline font-semibold">Entry: </dt><dd className="inline text-gray-600 dark:text-gray-400">{idea.entryNote}</dd></div>
                    <div><dt className="inline font-semibold text-emerald-600">Target: </dt><dd className="inline text-gray-600 dark:text-gray-400">{idea.target}</dd></div>
                    <div><dt className="inline font-semibold text-red-500">Stop: </dt><dd className="inline text-gray-600 dark:text-gray-400">{idea.stopLoss}</dd></div>
                    <div><dt className="inline font-semibold">Max risk: </dt><dd className="inline text-gray-600 dark:text-gray-400">{idea.maxRisk}</dd></div>
                  </dl>
                  <p className="mt-3 border-t border-gray-100 pt-3 text-xs text-gray-500 dark:border-gray-800">{idea.rationale}</p>
                </div>
              ))}
            </div>
          )}

          {/* Signal table */}
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <h3 className="border-b border-gray-100 px-5 py-3 font-bold tracking-tight dark:border-gray-800">Signal breakdown</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wider text-gray-400 dark:border-gray-800">
                  <th className="px-5 py-2 font-medium">Signal</th>
                  <th className="px-2 py-2 font-medium">Block</th>
                  <th className="px-2 py-2 text-right font-medium">Score</th>
                  <th className="px-2 py-2 text-right font-medium">Weight</th>
                  <th className="px-5 py-2 font-medium">Why</th>
                </tr>
              </thead>
              <tbody>
                {analysis.signals.map((s) => (
                  <tr key={s.name} className="border-b border-gray-50 dark:border-gray-800/50">
                    <td className="px-5 py-2.5 font-semibold">{s.name}</td>
                    <td className="px-2 py-2.5 text-xs text-gray-500">{BLOCK_LABEL[s.block] ?? s.block}</td>
                    <td className={`px-2 py-2.5 text-right font-bold ${s.score > 15 ? "text-emerald-600" : s.score < -15 ? "text-red-500" : "text-gray-400"}`}>{s.score > 0 ? "+" : ""}{s.score}</td>
                    <td className="px-2 py-2.5 text-right text-gray-500">{s.weight}×</td>
                    <td className="px-5 py-2.5 text-xs text-gray-500">{s.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {analysis.headlines.length > 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-3 font-bold tracking-tight">Driving headlines (24h)</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-400">
                {analysis.headlines.map(h => <li key={h}>{h}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}

      {!analysis && !error && (
        <div className="rounded-2xl border border-dashed border-gray-300 p-16 text-center text-gray-500 dark:border-gray-700">
          Pick an index and hit <span className="font-semibold">Analyze</span> — the engine pulls live price action, the option chain,
          global cues, and news sentiment, then scores the evidence.
        </div>
      )}

      {/* Track record */}
      {history && history.runs.length > 0 && (
        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-5 py-3 dark:border-gray-800">
              <h3 className="font-bold tracking-tight">Track record</h3>
              <div className="flex items-center gap-3">
                {history.stats && history.stats.directionalCalls > 0 && (
                  <span className="text-sm text-gray-500">
                    Directional hit rate:{" "}
                    <span className="font-bold text-gray-900 dark:text-white">
                      {Math.round((history.stats.directionalHits / history.stats.directionalCalls) * 100)}%
                    </span>{" "}
                    ({history.stats.directionalHits}/{history.stats.directionalCalls} scored calls)
                  </span>
                )}
                <a
                  href="/api/predictor/export"
                  download
                  className="rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-gray-600 transition-colors hover:border-[#1E40AF] hover:text-[#1E40AF] dark:border-gray-600 dark:text-gray-300"
                >
                  Download log (JSON)
                </a>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wider text-gray-400 dark:border-gray-800">
                  <th className="px-5 py-2 font-medium">When</th>
                  <th className="px-2 py-2 font-medium">Index</th>
                  <th className="px-2 py-2 font-medium">Call</th>
                  <th className="px-2 py-2 text-right font-medium">Conviction</th>
                  <th className="px-2 py-2 text-right font-medium">Move since</th>
                  <th className="px-5 py-2 text-right font-medium">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {history.runs.map(r => (
                  <tr key={r.id} className="border-b border-gray-50 dark:border-gray-800/50">
                    <td className="px-5 py-2 text-gray-500">{new Date(r.createdAt).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</td>
                    <td className="px-2 py-2 font-semibold capitalize">{r.index}</td>
                    <td className={`px-2 py-2 font-semibold capitalize ${r.direction === "bullish" ? "text-emerald-600" : r.direction === "bearish" ? "text-red-500" : "text-gray-400"}`}>
                      {r.direction}{r.dataMode === "demo" ? " (demo)" : ""}
                    </td>
                    <td className="px-2 py-2 text-right">{r.conviction}</td>
                    <td className={`px-2 py-2 text-right ${r.pctMove == null ? "text-gray-400" : r.pctMove >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {r.pctMove == null ? "—" : `${r.pctMove >= 0 ? "+" : ""}${r.pctMove.toFixed(2)}%`}
                    </td>
                    <td className="px-5 py-2 text-right"><OutcomeBadge outcome={r.outcome} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {history.stats && history.stats.perSignal.length > 0 && (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
              <h3 className="mb-3 font-bold tracking-tight">Signal hit rates <span className="ml-1 text-xs font-normal text-gray-400">(when the signal leaned ±15 or more)</span></h3>
              <div className="flex flex-wrap gap-2">
                {history.stats.perSignal.map(s => {
                  const rate = Math.round((s.hits / s.total) * 100)
                  return (
                    <span key={s.name} className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${rate >= 55 ? "bg-emerald-50 text-emerald-800 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-800" : rate >= 45 ? "bg-gray-50 text-gray-600 ring-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700" : "bg-red-50 text-red-700 ring-red-200 dark:bg-red-900/30 dark:text-red-300 dark:ring-red-800"}`}>
                      {s.name}: {rate}% ({s.hits}/{s.total})
                    </span>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
