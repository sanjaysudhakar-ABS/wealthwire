"use client"

import { useState } from "react"
import Link from "next/link"

const subjectOptions = [
  "General Inquiry",
  "Advertise With Us",
  "Content Partnership",
  "Press",
  "Technical Support",
  "Other",
]

export function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState(subjectOptions[0])
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Form */}
      <div className="md:col-span-2">
        {submitted ? (
          <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 p-8 text-center">
            <div className="text-4xl mb-3 text-green-600">&#10003;</div>
            <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-2">Message Sent!</h2>
            <p className="text-green-700 dark:text-green-300">
              Thank you for reaching out, {name}. We will get back to you within 24 hours.
            </p>
            <button
              onClick={() => { setSubmitted(false); setName(""); setEmail(""); setMessage(""); setSubject(subjectOptions[0]); }}
              className="mt-6 text-sm text-[#1E40AF] hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                {subjectOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what's on your mind..."
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E40AF] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1E40AF] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Send Message
            </button>
          </form>
        )}
      </div>

      {/* Contact Info */}
      <div className="space-y-5">
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-800/50">
          <h3 className="font-semibold text-[#0F172A] dark:text-white mb-1">Email</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">editorial@wealthwireindia.com</p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-800/50">
          <h3 className="font-semibold text-[#0F172A] dark:text-white mb-1">Address</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Mumbai, Maharashtra, India</p>
        </div>
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-800/50">
          <h3 className="font-semibold text-[#0F172A] dark:text-white mb-1">Response Time</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Within 24 hours on business days</p>
        </div>

        {/* Social */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-800/50">
          <h3 className="font-semibold text-[#0F172A] dark:text-white mb-3">Follow Us</h3>
          <div className="space-y-2 text-sm">
            <a href="https://twitter.com/WealthWireIndia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#1E40AF] transition-colors">
              &#120143; @WealthWireIndia
            </a>
            <a href="https://linkedin.com/company/wealthwireindia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#1E40AF] transition-colors">
              in WealthWire India
            </a>
            <a href="https://youtube.com/@WealthWireIndia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#1E40AF] transition-colors">
              &#9654; WealthWire India
            </a>
          </div>
        </div>
      </div>

      <div className="md:col-span-3 border-t border-gray-200 dark:border-gray-800 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Looking for our legal pages?{" "}
        <Link href="/privacy-policy" className="text-[#1E40AF] hover:underline">Privacy Policy</Link>{" "}
        &middot;{" "}
        <Link href="/terms-of-use" className="text-[#1E40AF] hover:underline">Terms of Use</Link>{" "}
        &middot;{" "}
        <Link href="/disclaimer" className="text-[#1E40AF] hover:underline">Disclaimer</Link>
      </div>
    </div>
  )
}
