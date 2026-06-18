"use client"
import { useState } from "react"
import Link from "next/link"
import { Search, Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Markets", href: "/markets" },
  { label: "Mutual Funds", href: "/mutual-funds" },
  { label: "IPO", href: "/ipo" },
  { label: "Personal Finance", href: "/news" },
  { label: "News", href: "/news" },
  { label: "Calculators", href: "/calculators" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md dark:border-gray-700 dark:bg-[#0F172A]/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-1 text-xl font-bold">
            <span className="text-[#1E40AF]">WealthWire</span>
            <span className="text-[#F59E0B]">India</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-[#1E40AF] dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600 hover:text-[#1E40AF] dark:text-gray-400">
              <Search size={18} />
            </button>
            <button
              className="p-2 text-gray-600 hover:text-[#1E40AF] dark:text-gray-400"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/auth/signin">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
            <button
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-[#0F172A]">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="py-2 text-sm font-medium text-gray-700 hover:text-[#1E40AF] dark:text-gray-300"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700 mt-2">
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
