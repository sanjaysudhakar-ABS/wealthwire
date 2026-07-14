import { NextRequest, NextResponse } from "next/server"
import { analyze } from "@/lib/predictor/engine"
import { saveRun } from "@/lib/predictor/log"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const index = body.index === "sensex" ? "sensex" : "nifty"
  const expiryMode = body.expiry === "next" ? "next" : "current"
  try {
    const result = await analyze(index, expiryMode)
    await saveRun(result)
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
