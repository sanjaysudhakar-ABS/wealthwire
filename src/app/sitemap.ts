import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://wealthwireindia.com", lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: "https://wealthwireindia.com/markets", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://wealthwireindia.com/mutual-funds", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://wealthwireindia.com/ipo", lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: "https://wealthwireindia.com/news", lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: "https://wealthwireindia.com/calculators", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://wealthwireindia.com/calculators/sip", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://wealthwireindia.com/calculators/emi", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://wealthwireindia.com/calculators/retirement", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://wealthwireindia.com/open-demat-account", lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: "https://wealthwireindia.com/gold", lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: "https://wealthwireindia.com/about", lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: "https://wealthwireindia.com/contact", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: "https://wealthwireindia.com/privacy-policy", lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: "https://wealthwireindia.com/terms-of-use", lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: "https://wealthwireindia.com/disclaimer", lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ]
}
