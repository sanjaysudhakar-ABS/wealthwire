import { NextResponse } from "next/server"
import { getHistory, evaluateRuns } from "@/lib/predictor/log"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Opportunistically score any stale runs so hit rates stay current even
    // between scheduled evaluations.
    await evaluateRuns().catch(() => {})
    return NextResponse.json(await getHistory())
  } catch {
    return NextResponse.json({ runs: [], stats: null })
  }
}
