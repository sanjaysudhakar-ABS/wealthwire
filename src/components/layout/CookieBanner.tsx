"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function CookieBanner() {
  const [accepted, setAccepted] = useState(true) // default true to avoid flash

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (consent !== "accepted") {
      setAccepted(false)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem("cookie-consent", "accepted")
    setAccepted(true)
  }

  if (accepted) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0F172A] text-white px-4 py-4 shadow-lg"
      style={{ animation: "fadeInUp 0.3s ease-out" }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300 flex-1">
          We use cookies to personalise content and ads (including Google AdSense), analyse traffic,
          and improve your experience.{" "}
          <Link href="/privacy-policy" className="text-[#F59E0B] hover:underline">
            Learn more
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/privacy-policy"
            className="text-sm text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-lg transition-colors"
          >
            Learn More
          </Link>
          <button
            onClick={handleAccept}
            className="text-sm bg-[#1E40AF] hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
