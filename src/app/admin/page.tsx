import { Metadata } from "next"
import Link from "next/link"
import { FileText, Users, Mail, Eye, Plus, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { newsArticles } from "@/lib/mock-data"

export const metadata: Metadata = { title: "Admin Dashboard | WealthWire" }

export default function AdminDashboard() {
  const stats = [
    { label: "Total Articles", value: "247", icon: FileText, change: "+12 this week", color: "text-blue-600 bg-blue-50" },
    { label: "Total Users", value: "1,842", icon: Users, change: "+89 this month", color: "text-emerald-600 bg-emerald-50" },
    { label: "Newsletter Subscribers", value: "5,621", icon: Mail, change: "+234 this month", color: "text-purple-600 bg-purple-50" },
    { label: "Page Views (30d)", value: "1,24,500", icon: Eye, change: "+18% vs last month", color: "text-amber-600 bg-amber-50" },
  ]
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-2xl font-bold">Dashboard</h1><p className="text-gray-500 text-sm mt-0.5">Welcome back! Here&apos;s what&apos;s happening.</p></div>
        <Link href="/admin/articles/new" className="flex items-center gap-2 bg-[#1E40AF] hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"><Plus size={16} /> New Article</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}><stat.icon size={18} /></div>
                <TrendingUp size={14} className="text-emerald-500" />
              </div>
              <div className="text-2xl font-extrabold mb-0.5">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
              <div className="text-xs text-emerald-600 mt-1">{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Recent Articles</CardTitle></CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
              <th className="text-left px-5 py-3 font-medium text-gray-500">Title</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Category</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Author</th>
              <th className="text-center px-5 py-3 font-medium text-gray-500">Status</th>
              <th className="text-right px-5 py-3 font-medium text-gray-500">Date</th>
            </tr></thead>
            <tbody>
              {newsArticles.slice(0, 5).map((a) => (
                <tr key={a.slug} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  <td className="px-5 py-3 font-medium max-w-xs truncate">{a.title}</td>
                  <td className="px-5 py-3"><span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{a.category}</span></td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{a.author}</td>
                  <td className="px-5 py-3 text-center"><span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">Published</span></td>
                  <td className="px-5 py-3 text-right text-gray-500">{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
