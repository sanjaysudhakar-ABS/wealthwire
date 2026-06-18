"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewArticlePage() {
  const [title, setTitle] = useState("")
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">New Article</h1>
      <form className="space-y-5">
        <div><label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Title *</label><Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Article title" /></div>
        <div><label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Slug (auto-generated)</label><Input value={slug} readOnly className="bg-gray-50 dark:bg-gray-800 text-gray-500" /></div>
        <div><label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Excerpt</label><textarea rows={2} placeholder="Short summary for SEO and previews..." className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] resize-none" /></div>
        <div><label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Content *</label><textarea rows={16} placeholder="Write your article content here..." className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] resize-none font-mono" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Category</label><select className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"><option>Markets</option><option>Mutual Funds</option><option>IPO</option><option>Tax</option><option>Economy</option><option>Gold</option><option>Personal Finance</option></select></div>
          <div><label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Status</label><select className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"><option>Draft</option><option>Review</option><option>Published</option><option>Scheduled</option></select></div>
        </div>
        <div><label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 block">Cover Image URL</label><Input placeholder="https://images.unsplash.com/..." /></div>
        <div className="border-t border-gray-200 dark:border-gray-800 pt-5">
          <h3 className="text-sm font-bold mb-4 text-gray-700 dark:text-gray-300">SEO Settings</h3>
          <div className="space-y-3">
            <div><label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">SEO Title (max 60 chars)</label><Input placeholder="SEO optimized title" /></div>
            <div><label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Meta Description (max 160 chars)</label><textarea rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] resize-none" placeholder="Brief description for search engines" /></div>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="submit">Publish Article</Button>
          <Button type="button" variant="outline">Save as Draft</Button>
          <Button type="button" variant="ghost">Preview</Button>
        </div>
      </form>
    </div>
  )
}
