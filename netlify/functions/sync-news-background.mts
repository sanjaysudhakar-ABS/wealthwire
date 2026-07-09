import { syncNewsHeadlines } from "../../src/lib/content-pipeline"

// Background function (15 min limit) — invoked by the scheduled sync-news
// function. Netlify responds 202 to the caller immediately; this keeps
// running until the sync completes.
export default async function handler(req: Request) {
  const token = req.headers.get("x-sync-token")
  if (!process.env.CONTENT_SYNC_SECRET || token !== process.env.CONTENT_SYNC_SECRET) {
    console.error("[sync-news-background] Unauthorized invocation blocked")
    return new Response("Unauthorized", { status: 401 })
  }

  try {
    const saved = await syncNewsHeadlines()
    console.log(`[sync-news-background] Saved ${saved.length} articles:`, saved)
  } catch (err) {
    console.error("[sync-news-background] Error:", err)
  }
}
