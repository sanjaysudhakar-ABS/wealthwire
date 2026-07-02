import type { Config } from "@netlify/functions"
import { syncNewsHeadlines } from "../../src/lib/content-pipeline"

// Runs every 6 hours
export const config: Config = {
  schedule: "0 */6 * * *",
}

export default async function handler() {
  try {
    const saved = await syncNewsHeadlines()
    console.log(`[sync-news] Saved ${saved.length} articles:`, saved)
    return { statusCode: 200, body: JSON.stringify({ saved }) }
  } catch (err) {
    console.error("[sync-news] Error:", err)
    return { statusCode: 500, body: String(err) }
  }
}
