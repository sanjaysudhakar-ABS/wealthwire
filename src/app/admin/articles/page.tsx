import { Metadata } from "next"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { newsArticles } from "@/lib/mock-data"

export const metadata: Metadata = { title: "Manage Articles | WealthWire Admin" }

export default function AdminArticlesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Link href="/admin/articles/new" className="flex items-center gap-2 bg-[#1E40AF] hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"><Plus size={16} /> New Article</Link>
      </div>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
              <th className="text-left px-5 py-3 font-medium text-gray-500">Title</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Category</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Author</th>
              <th className="text-center px-5 py-3 font-medium text-gray-500">Status</th>
              <th className="text-right px-5 py-3 font-medium text-gray-500">Date</th>
              <th className="text-right px-5 py-3 font-medium text-gray-500">Actions</th>
            </tr></thead>
            <tbody>
              {newsArticles.map((a) => (
                <tr key={a.slug} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  <td className="px-5 py-3 font-medium max-w-xs truncate">{a.title}</td>
                  <td className="px-5 py-3"><span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{a.category}</span></td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400 text-xs">{a.author}</td>
                  <td className="px-5 py-3 text-center"><span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">Published</span></td>
                  <td className="px-5 py-3 text-right text-gray-500 text-xs">{a.date}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-[#1E40AF] transition-colors"><Edit size={14} /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
