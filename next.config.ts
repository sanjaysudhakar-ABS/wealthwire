import type { NextConfig } from "next"
const nextConfig: NextConfig = {
  images: {
    // Synced news articles carry cover images from arbitrary publisher
    // domains (Reuters, Nasdaq, GlobeNewswire, ...), so allow any HTTPS host.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
}
export default nextConfig
