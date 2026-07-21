import { NextRequest, NextResponse } from "next/server"
import { syncNewsHeadlines, generateAIArticle, syncCoinpediaFeed } from "@/lib/content-pipeline"

// Protected by a secret token — call with ?token=YOUR_CONTENT_SYNC_SECRET
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")

  if (!process.env.CONTENT_SYNC_SECRET || token !== process.env.CONTENT_SYNC_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const type = body.type as string

  try {
    if (type === "news") {
      const saved = await syncNewsHeadlines()
      return NextResponse.json({ type: "news", saved })
    }

    if (type === "coinpedia") {
      const saved = await syncCoinpediaFeed()
      return NextResponse.json({ type: "coinpedia", saved })
    }

    if (type === "ai-article") {
      const result = await generateAIArticle()
      return NextResponse.json({ type: "ai-article", ...result })
    }

    // Run all
    const [news, crypto, article] = await Promise.all([
      syncNewsHeadlines(),
      syncCoinpediaFeed().catch(e => { console.error("[coinpedia] sync failed:", e); return [] }),
      generateAIArticle(),
    ])
    return NextResponse.json({ news: { saved: news }, coinpedia: { saved: crypto }, article })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
