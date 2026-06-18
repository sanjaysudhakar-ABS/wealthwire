import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { MarketTicker } from "@/components/layout/MarketTicker"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "WealthWire India - Market Intelligence. Wealth Creation.",
    template: "%s | WealthWire India",
  },
  description: "India's leading financial media platform. Get real-time market data, mutual fund analysis, IPO updates, and personal finance guidance.",
  keywords: ["Indian stock market", "Nifty", "Sensex", "mutual funds", "IPO", "personal finance", "investment"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://wealthwireindia.com",
    siteName: "WealthWire India",
  },
  twitter: {
    card: "summary_large_image",
    site: "@WealthWireIndia",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white dark:bg-[#0F172A] text-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <MarketTicker />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
