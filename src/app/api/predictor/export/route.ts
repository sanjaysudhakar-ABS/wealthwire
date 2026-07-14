import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

// Full analysis log as a downloadable JSON file — built to be dropped into a
// review session for engine refinement: every run carries its signals,
// ideas (with per-leg greeks), verdict, and scored outcome.
export async function GET() {
  try {
    const runs = await prisma.predictorRun.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    })
    const payload = {
      exportedAt: new Date().toISOString(),
      tool: "wealthwire-predictor",
      engineNotes: {
        convictionGate: 40,
        directionalHitThresholdPct: 0.1,
        neutralHitThresholdPct: 0.25,
        ivRegimes: { cheap: "<13", normal: "13-16", rich: ">16" },
        evaluation: "outcome scored against spot at ~15:45 IST same day (or first later check)",
      },
      runCount: runs.length,
      runs,
    }
    return new NextResponse(JSON.stringify(payload, null, 2), {
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="predictor-log-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    })
  } catch (err) {
    return NextResponse.json({ error: `Export failed — is the PredictorRun table created? ${String(err)}` }, { status: 500 })
  }
}
