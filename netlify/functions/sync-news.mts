import type { Config } from "@netlify/functions"

// Runs every 6 hours. Scheduled functions are limited to ~30s, so this only
// fires the sync-news-background worker (15 min limit) and returns.
export const config: Config = {
  schedule: "0 */6 * * *",
}

export default async function handler() {
  const secret = process.env.CONTENT_SYNC_SECRET
  if (!secret) {
    console.error("[sync-news] CONTENT_SYNC_SECRET not set — cannot trigger background sync")
    return
  }

  const res = await fetch(`${process.env.URL}/.netlify/functions/sync-news-background`, {
    method: "POST",
    headers: { "x-sync-token": secret },
  })
  console.log(`[sync-news] Triggered background sync (status ${res.status})`)
}
