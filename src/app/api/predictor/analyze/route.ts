import { NextRequest, NextResponse } from "next/server"
import { analyze } from "@/lib/predictor/engine"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const index = body.index === "sensex" ? "sensex" : "nifty"
  try {
    const result = await analyze(index)
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
