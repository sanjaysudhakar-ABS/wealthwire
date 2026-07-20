import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WealthWire",
    short_name: "WealthWire",
    description: "Market Intelligence. Wealth Creation.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1E40AF",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  }
}
