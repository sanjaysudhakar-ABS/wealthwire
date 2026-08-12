"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Moon, Sun, Menu, X, TrendingUp } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "News", href: "/news" },
  { label: "Markets", href: "/markets" },
  { label: "Mutual Funds", href: "/mutual-funds" },
  { label: "IPO", href: "/ipo" },
  { label: "Calculators", href: "/calculators" },
  { label: "Guides", href: "/personal-finance" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-xl dark:border-gray-800 dark:bg-[#0B1120]/80">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight shrink-0">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-700 to-blue-500 text-white">
              <TrendingUp size={17} />
            </span>
            <span>
              <span className="text-[#1E40AF] dark:text-blue-400">WealthWire</span>
              <span className="text-[#F59E0B]"> India</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + "/")
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-blue-50 text-[#1E40AF] dark:bg-blue-900/40 dark:text-blue-300"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <button aria-label="Search" className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#1E40AF] dark:text-gray-400 dark:hover:bg-gray-800">
              <Search size={18} />
            </button>
            <button
              aria-label="Toggle theme"
              className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#1E40AF] dark:text-gray-400 dark:hover:bg-gray-800"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="hidden sm:flex items-center gap-2 pl-2">
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/auth/signin">
                <Button size="sm" className="rounded-full px-4">Sign Up</Button>
              </Link>
            </div>
            <button
              aria-label="Menu"
              className="lg:hidden rounded-full p-2 text-gray-600 dark:text-gray-400"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-[#0B1120]">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#1E40AF] dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-gray-200 pt-3 dark:border-gray-800">
              <Link href="/auth/signin" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">Login</Button>
              </Link>
              <Link href="/auth/signin" className="flex-1">
                <Button size="sm" className="w-full">Sign Up</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
