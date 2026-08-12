import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://abscorp.xyz"
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/markets`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/mutual-funds`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/ipo`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/news`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
    { url: `${base}/calculators`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/calculators/sip`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/calculators/emi`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/calculators/lumpsum`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/calculators/retirement`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/personal-finance`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/personal-finance/savings`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/personal-finance/retirement`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/personal-finance/home-loans`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/personal-finance/credit-cards`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/tax`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/insurance`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gold`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/open-demat-account`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/terms-of-use`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/disclaimer`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
  ]
}
