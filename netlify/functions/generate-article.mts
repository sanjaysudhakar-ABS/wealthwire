import type { Config } from "@netlify/functions"

// Runs every Monday and Thursday at 8am IST (2:30 UTC). Scheduled functions
// are limited to ~30s — too tight for Claude to write a full article — so
// this only fires the generate-article-background worker (15 min limit).
export const config: Config = {
  schedule: "30 2 * * 1,4",
}

export default async function handler() {
  const secret = process.env.CONTENT_SYNC_SECRET
  if (!secret) {
    console.error("[generate-article] CONTENT_SYNC_SECRET not set — cannot trigger background generation")
    return
  }

  const res = await fetch(`${process.env.URL}/.netlify/functions/generate-article-background`, {
    method: "POST",
    headers: { "x-sync-token": secret },
  })
  console.log(`[generate-article] Triggered background generation (status ${res.status})`)
}
