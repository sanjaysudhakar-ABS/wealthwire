import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Script from "next/script"
import { GoogleAnalytics } from "@next/third-parties/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { MarketTicker } from "@/components/layout/MarketTicker"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { CookieBanner } from "@/components/layout/CookieBanner"
import { isAdSenseEnabled } from "@/lib/ads"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// Google Analytics 4 measurement ID. Overridable via NEXT_PUBLIC_GA_ID.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-FKV7XJ1L9L"

export const metadata: Metadata = {
  title: {
    default: "WealthWire - Market Intelligence. Wealth Creation.",
    template: "%s | WealthWire",
  },
  description: "India's leading financial media platform. Get real-time market data, mutual fund analysis, IPO updates, and personal finance guidance.",
  keywords: ["Indian stock market", "Nifty", "Sensex", "mutual funds", "IPO", "personal finance", "investment"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://abscorp.xyz",
    siteName: "WealthWire",
  },
  twitter: {
    card: "summary_large_image",
    site: "@WealthWire",
  },
  other: {
    "google-adsense-account": "ca-pub-5101218278922497",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {isAdSenseEnabled() && (
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5101218278922497"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-[#0F172A] text-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <MarketTicker />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </ThemeProvider>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  )
}
