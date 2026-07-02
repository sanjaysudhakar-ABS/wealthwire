import type { Config } from "@netlify/functions"
import { generateAIArticle } from "../../src/lib/content-pipeline"

// Runs every Monday and Thursday at 8am IST (2:30 UTC)
export const config: Config = {
  schedule: "30 2 * * 1,4",
}

export default async function handler() {
  try {
    const result = await generateAIArticle()
    console.log(`[generate-article] ${result.action}: "${result.title}" → /news/${result.slug}`)
    return { statusCode: 200, body: JSON.stringify(result) }
  } catch (err) {
    console.error("[generate-article] Error:", err)
    return { statusCode: 500, body: String(err) }
  }
}
