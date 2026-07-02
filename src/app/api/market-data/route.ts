import { NextResponse } from "next/server"
import { getAllMarketData } from "@/lib/market-api"

export const revalidate = 3600

export async function GET() {
  const data = await getAllMarketData()
  return NextResponse.json(data)
}
