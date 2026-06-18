import Link from "next/link"
import { LayoutDashboard, FileText, Tag, Users, BarChart3, Settings, Megaphone } from "lucide-react"

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FileText, label: "Articles", href: "/admin/articles" },
  { icon: Tag, label: "Categories", href: "/admin/categories" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Megaphone, label: "Newsletter", href: "/admin/newsletter" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <aside className="w-56 bg-[#0F172A] text-gray-300 flex flex-col shrink-0">
        <div className="p-5 border-b border-gray-800">
          <div className="text-sm font-bold"><span className="text-[#1E40AF]">WealthWire</span><span className="text-[#F59E0B]">India</span></div>
          <div className="text-xs text-gray-500 mt-0.5">Admin Panel</div>
        </div>
        <nav className="flex-1 p-3">
          {sidebarLinks.map((link) => (
            <Link key={link.href} href={link.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:bg-gray-800 hover:text-white transition-colors mb-0.5">
              <link.icon size={16} className="shrink-0" />{link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
