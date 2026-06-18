import { NextResponse } from "next/server"
import { marketIndices, topGainers, topLosers, sectors } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json({ indices: marketIndices, gainers: topGainers, losers: topLosers, sectors })
}
