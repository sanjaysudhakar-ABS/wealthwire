import { NextRequest, NextResponse } from "next/server"
import { newsArticles } from "@/lib/mock-data"

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.toLowerCase() || ""
  if (!q) return NextResponse.json([])
  const results = newsArticles.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)).slice(0, 5)
  return NextResponse.json(results)
}
