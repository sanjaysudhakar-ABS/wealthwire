/**
 * AdSense is gated until the site meets publisher quality criteria.
 * Set NEXT_PUBLIC_ADSENSE_ENABLED=true only after Google approves the site
 * and you have enough original content live.
 */
export function isAdSenseEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true"
}
