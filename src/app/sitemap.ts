import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://abscorp.xyz", lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: "https://abscorp.xyz/markets", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://abscorp.xyz/mutual-funds", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://abscorp.xyz/ipo", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://abscorp.xyz/news", lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: "https://abscorp.xyz/calculators", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://abscorp.xyz/calculators/sip", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://abscorp.xyz/calculators/emi", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://abscorp.xyz/calculators/retirement", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://abscorp.xyz/open-demat-account", lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: "https://abscorp.xyz/gold", lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: "https://abscorp.xyz/about", lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: "https://abscorp.xyz/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: "https://abscorp.xyz/privacy-policy", lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: "https://abscorp.xyz/terms-of-use", lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: "https://abscorp.xyz/disclaimer", lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ]
}
