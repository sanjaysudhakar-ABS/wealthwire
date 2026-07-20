import type { Metadata } from "next"
import { ContactForm } from "@/components/layout/ContactForm"

export const metadata: Metadata = {
  title: "Contact Us | WealthWire",
  description: "Get in touch with WealthWire for editorial enquiries, advertising, content partnerships, or technical support.",
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-2">Contact Us</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-10">
        Got a question, story tip, or partnership idea? Reach out — we read every message.
      </p>
      <ContactForm />
    </div>
  )
}
