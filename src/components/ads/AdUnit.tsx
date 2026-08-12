"use client"

import { isAdSenseEnabled } from "@/lib/ads"

interface AdUnitProps {
  slot: string
  format?: string
  className?: string
}

/**
 * Renders nothing unless NEXT_PUBLIC_ADSENSE_ENABLED=true.
 * Avoids empty ad slots and premature ad inventory during AdSense review.
 */
export function AdUnit({ slot: _slot, format: _format, className = "" }: AdUnitProps) {
  if (!isAdSenseEnabled()) return null

  const isDev = process.env.NODE_ENV === "development"
  if (isDev) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 text-gray-400 text-xs py-3 rounded ${className}`}>
        Advertisement
      </div>
    )
  }
  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ display: "block" }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
      data-ad-slot={_slot}
      data-ad-format={_format || "auto"}
      data-full-width-responsive="true"
    />
  )
}
