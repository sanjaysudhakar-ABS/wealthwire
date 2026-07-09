import Image from "next/image"
import type { AdSlot as AdSlotName } from "@prisma/client"
import prisma from "@/lib/prisma"
import { AdUnit } from "./AdUnit"

// Maps each placement to the AdSense slot id used when no direct-sold
// ad is active for it in the Advertisement table.
const ADSENSE_SLOTS: Record<AdSlotName, string> = {
  HEADER_BANNER: "3456789012",
  SIDEBAR: "4567890123",
  IN_ARTICLE_TOP: "5678901234",
  IN_ARTICLE_MIDDLE: "6789012345",
  IN_ARTICLE_BOTTOM: "7890123456",
  MOBILE_STICKY: "8901234567",
}

const SLOT_HEIGHTS: Partial<Record<AdSlotName, string>> = {
  HEADER_BANNER: "h-24 sm:h-28",
  SIDEBAR: "h-64",
  IN_ARTICLE_TOP: "h-24 sm:h-28",
  IN_ARTICLE_MIDDLE: "h-24 sm:h-28",
  IN_ARTICLE_BOTTOM: "h-24 sm:h-28",
}

async function getDirectAd(slot: AdSlotName) {
  try {
    return await prisma.advertisement.findFirst({
      where: { slot, active: true, imageUrl: { not: null } },
    })
  } catch {
    return null
  }
}

/**
 * Renders an ad placement. Direct-sold ads (Advertisement rows managed via
 * the admin/database) take priority; otherwise the slot falls back to
 * AdSense. Server component — usable from any server-rendered page.
 */
export async function AdSlot({ slot, className = "" }: { slot: AdSlotName; className?: string }) {
  const ad = await getDirectAd(slot)

  if (ad?.imageUrl) {
    const img = (
      <span className={`relative block w-full overflow-hidden rounded-xl ${SLOT_HEIGHTS[slot] ?? "h-28"}`}>
        <Image src={ad.imageUrl} alt="Advertisement" fill className="object-cover" />
      </span>
    )
    return (
      <div className={className}>
        {ad.targetUrl ? (
          <a href={ad.targetUrl} target="_blank" rel="noopener noreferrer sponsored">{img}</a>
        ) : img}
        <span className="mt-1 block text-right text-[10px] uppercase tracking-wider text-gray-400">Sponsored</span>
      </div>
    )
  }

  return <AdUnit slot={ADSENSE_SLOTS[slot]} className={`w-full rounded-xl ${className}`} />
}
