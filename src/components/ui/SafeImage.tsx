"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

const FALLBACK = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800"

/** next/image that swaps to a stock fallback when the remote image is a
 *  dead link — synced news articles reference publisher-hosted images
 *  that sometimes 404. */
export function SafeImage({ src, alt, ...rest }: ImageProps) {
  const [failed, setFailed] = useState(false)
  return (
    <Image
      {...rest}
      alt={alt}
      src={failed ? FALLBACK : src}
      onError={() => setFailed(true)}
    />
  )
}
