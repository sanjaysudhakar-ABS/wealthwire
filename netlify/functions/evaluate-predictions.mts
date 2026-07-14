import type { Config } from "@netlify/functions"
import { evaluateRuns } from "../../src/lib/predictor/log"

// Runs at 15:45 IST (10:15 UTC) on trading days — after market close, so every
// run from the session gets scored against the closing spot.
export const config: Config = {
  schedule: "15 10 * * 1-5",
}

export default async function handler() {
  try {
    const { evaluated } = await evaluateRuns()
    console.log(`[evaluate-predictions] Scored ${evaluated} runs`)
    return { statusCode: 200, body: JSON.stringify({ evaluated }) }
  } catch (err) {
    console.error("[evaluate-predictions] Error:", err)
    return { statusCode: 500, body: String(err) }
  }
}
