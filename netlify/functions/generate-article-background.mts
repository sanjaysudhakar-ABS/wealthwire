import { generateAIArticle } from "../../src/lib/content-pipeline"

// Background function (15 min limit) — invoked by the scheduled
// generate-article function, so Claude has time to write the full article.
export default async function handler(req: Request) {
  const token = req.headers.get("x-sync-token")
  if (!process.env.CONTENT_SYNC_SECRET || token !== process.env.CONTENT_SYNC_SECRET) {
    console.error("[generate-article-background] Unauthorized invocation blocked")
    return new Response("Unauthorized", { status: 401 })
  }

  try {
    const result = await generateAIArticle()
    console.log(`[generate-article-background] ${result.action}: "${result.title}" → /news/${result.slug}`)
  } catch (err) {
    console.error("[generate-article-background] Error:", err)
  }
}
