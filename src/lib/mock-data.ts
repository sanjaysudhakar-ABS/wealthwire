export const marketIndices = [
  { name: "Nifty 50", value: 24532.15, change: 127.35, changePercent: 0.52 },
  { name: "Sensex", value: 80723.42, change: 412.25, changePercent: 0.51 },
  { name: "Bank Nifty", value: 52134.80, change: -89.20, changePercent: -0.17 },
  { name: "Gold", value: 72450, change: 320, changePercent: 0.44 },
  { name: "USD/INR", value: 83.42, change: -0.12, changePercent: -0.14 },
  { name: "Crude Oil", value: 6842, change: 54, changePercent: 0.80 },
]

export const topGainers = [
  { symbol: "TATAMOTORS", name: "Tata Motors", price: 987.45, change: 42.30, changePercent: 4.48 },
  { symbol: "ADANIENT", name: "Adani Enterprises", price: 2876.10, change: 98.50, changePercent: 3.55 },
  { symbol: "SUNPHARMA", name: "Sun Pharma", price: 1654.20, change: 54.70, changePercent: 3.42 },
  { symbol: "HCLTECH", name: "HCL Technologies", price: 1789.35, change: 52.15, changePercent: 3.00 },
  { symbol: "MARUTI", name: "Maruti Suzuki", price: 12450.00, change: 342.00, changePercent: 2.83 },
]

export const topLosers = [
  { symbol: "BAJFINANCE", name: "Bajaj Finance", price: 6754.20, change: -198.30, changePercent: -2.85 },
  { symbol: "WIPRO", name: "Wipro", price: 432.15, change: -11.40, changePercent: -2.57 },
  { symbol: "INFY", name: "Infosys", price: 1567.80, change: -38.20, changePercent: -2.38 },
  { symbol: "TECHM", name: "Tech Mahindra", price: 1234.50, change: -27.80, changePercent: -2.20 },
  { symbol: "BPCL", name: "BPCL", price: 342.60, change: -6.90, changePercent: -1.97 },
]

export const mutualFunds = [
  { name: "Mirae Asset Large Cap Fund", amc: "Mirae Asset", category: "Large Cap", nav: 98.42, returns1Y: 18.4, returns3Y: 22.1, returns5Y: 16.8, minSip: 1000, rating: 5, riskRating: "Moderately High" },
  { name: "Parag Parikh Flexi Cap Fund", amc: "PPFAS", category: "Flexi Cap", nav: 71.23, returns1Y: 24.6, returns3Y: 26.8, returns5Y: 21.3, minSip: 1000, rating: 5, riskRating: "Moderately High" },
  { name: "Axis Bluechip Fund", amc: "Axis MF", category: "Large Cap", nav: 56.18, returns1Y: 16.2, returns3Y: 19.4, returns5Y: 14.7, minSip: 500, rating: 4, riskRating: "Moderately High" },
  { name: "SBI Small Cap Fund", amc: "SBI MF", category: "Small Cap", nav: 142.67, returns1Y: 32.1, returns3Y: 28.4, returns5Y: 24.9, minSip: 500, rating: 5, riskRating: "Very High" },
  { name: "HDFC Mid-Cap Opportunities Fund", amc: "HDFC MF", category: "Mid Cap", nav: 124.38, returns1Y: 28.7, returns3Y: 25.2, returns5Y: 19.6, minSip: 500, rating: 4, riskRating: "High" },
  { name: "Nippon India ELSS Tax Saver", amc: "Nippon India", category: "ELSS", nav: 87.54, returns1Y: 21.3, returns3Y: 23.7, returns5Y: 18.2, minSip: 500, rating: 4, riskRating: "High" },
  { name: "UTI Nifty 50 Index Fund", amc: "UTI MF", category: "Index", nav: 142.10, returns1Y: 14.8, returns3Y: 17.2, returns5Y: 13.4, minSip: 500, rating: 4, riskRating: "Moderately High" },
  { name: "Kotak Emerging Equity Fund", amc: "Kotak MF", category: "Mid Cap", nav: 98.76, returns1Y: 26.4, returns3Y: 24.1, returns5Y: 20.3, minSip: 1000, rating: 4, riskRating: "High" },
]

export const ipoList = [
  { company: "Ola Electric Mobility", symbol: "OLAELEC", openDate: "2024-08-02", closeDate: "2024-08-06", listingDate: "2024-08-09", priceMin: 72, priceMax: 76, gmp: 12, subscriptionTimes: 4.3, status: "LISTED" as const, issueSize: "₹6,145 Cr" },
  { company: "Hyundai Motor India", symbol: "HYUNDAI", openDate: "2024-10-15", closeDate: "2024-10-17", listingDate: "2024-10-22", priceMin: 1865, priceMax: 1960, gmp: 45, subscriptionTimes: 2.4, status: "LISTED" as const, issueSize: "₹27,870 Cr" },
  { company: "Swiggy", symbol: "SWIGGY", openDate: "2024-11-06", closeDate: "2024-11-08", listingDate: "2024-11-13", priceMin: 371, priceMax: 390, gmp: 28, subscriptionTimes: 3.6, status: "LISTED" as const, issueSize: "₹11,327 Cr" },
  { company: "Niva Bupa Health Insurance", symbol: "NIVABUPA", openDate: "2024-12-07", closeDate: "2024-12-11", listingDate: "2024-12-14", priceMin: 74, priceMax: 78, gmp: 8, subscriptionTimes: 0, status: "UPCOMING" as const, issueSize: "₹2,200 Cr" },
  { company: "ACME Solar Holdings", symbol: "ACMESOLAR", openDate: "2024-11-20", closeDate: "2024-11-22", listingDate: "2024-11-27", priceMin: 275, priceMax: 289, gmp: 15, subscriptionTimes: 2.1, status: "OPEN" as const, issueSize: "₹2,900 Cr" },
]

export const newsArticles = [
  { title: "Nifty 50 Hits Fresh All-Time High: What's Driving the Rally?", slug: "nifty-50-all-time-high-rally-analysis", excerpt: "Indian benchmarks surged to record levels as FII inflows accelerated and strong Q2 earnings season boosted sentiment across sectors.", category: "Markets", author: "Rahul Sharma", date: "2024-11-12", readTime: "5 min", coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800" },
  { title: "Top 5 SIP Funds That Turned ₹10,000/Month Into ₹1 Crore in 10 Years", slug: "top-sip-funds-1-crore-10-years", excerpt: "Systematic Investment Plans in these mutual funds have delivered exceptional wealth creation. Here is a deep dive into the numbers.", category: "Mutual Funds", author: "Priya Mehta", date: "2024-11-11", readTime: "8 min", coverImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800" },
  { title: "IPO Allotment: How to Check Status and What to Do If You Miss Out", slug: "ipo-allotment-check-status-guide", excerpt: "Step-by-step guide to checking IPO allotment status on BSE, NSE, and registrar websites, plus strategies for better allotment chances.", category: "IPO", author: "Vikram Singh", date: "2024-11-10", readTime: "4 min", coverImage: "https://images.unsplash.com/photo-1642790551116-18e150f248e3?w=800" },
  { title: "Budget 2025 Expectations: Will Income Tax Slabs Change?", slug: "budget-2025-income-tax-expectations", excerpt: "Tax experts and economists weigh in on what the upcoming Union Budget might hold for individual taxpayers and the middle class.", category: "Tax", author: "Anita Desai", date: "2024-11-09", readTime: "6 min", coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800" },
  { title: "Gold Hits ₹73,000 Per 10 Grams: Should You Buy Now?", slug: "gold-price-73000-should-you-buy", excerpt: "Gold prices are at historic highs. We analyze global factors, domestic demand, and whether this is the right time to add gold to your portfolio.", category: "Gold", author: "Suresh Patel", date: "2024-11-08", readTime: "5 min", coverImage: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800" },
  { title: "RBI Keeps Repo Rate Unchanged at 6.5%: Impact on Home Loans and EMIs", slug: "rbi-repo-rate-unchanged-impact-home-loans", excerpt: "The Reserve Bank of India maintained its policy rate for the seventh consecutive time. Here is what it means for borrowers and fixed deposit investors.", category: "Economy", author: "Deepa Krishnan", date: "2024-11-07", readTime: "4 min", coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800" },
  { title: "How to Save ₹1.5 Lakh Tax Under Section 80C: Complete Guide 2024-25", slug: "save-tax-section-80c-guide-2024", excerpt: "From ELSS funds to PPF, life insurance and home loan principal — maximize your Section 80C deductions with this comprehensive guide.", category: "Tax", author: "Anita Desai", date: "2024-11-06", readTime: "10 min", coverImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800" },
  { title: "Zerodha vs Upstox vs Groww: Which Broker Is Best for 2025?", slug: "zerodha-upstox-groww-broker-comparison-2025", excerpt: "A detailed feature-by-feature comparison of India's top discount brokers. We cover brokerage, platform quality, research tools, and customer service.", category: "Markets", author: "Rahul Sharma", date: "2024-11-05", readTime: "12 min", coverImage: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800" },
  { title: "Tata Motors Q2 Results: Net Profit Jumps 35% on Jaguar Land Rover Strength", slug: "tata-motors-q2-results-profit-jlr", excerpt: "Tata Motors reported a strong second quarter with consolidated net profit rising 35% YoY, driven by robust JLR performance in premium segments.", category: "Markets", author: "Vikram Singh", date: "2024-11-04", readTime: "3 min", coverImage: "https://images.unsplash.com/photo-1518987048-93e29699e79a?w=800" },
  { title: "Retirement Planning at 30: The 15x Rule and Why It Works", slug: "retirement-planning-30s-15x-rule", excerpt: "If you save 15x your annual expenses by retirement, you can sustain your lifestyle indefinitely. Here is how to apply this rule in the Indian context.", category: "Personal Finance", author: "Priya Mehta", date: "2024-11-03", readTime: "7 min", coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800" },
]

export const goldRates = [
  { city: "Mumbai", gold24k: 72450, gold22k: 66412, silver: 87500 },
  { city: "Delhi", gold24k: 72520, gold22k: 66476, silver: 87600 },
  { city: "Chennai", gold24k: 72600, gold22k: 66550, silver: 87800 },
  { city: "Kolkata", gold24k: 72480, gold22k: 66440, silver: 87550 },
  { city: "Bangalore", gold24k: 72500, gold22k: 66458, silver: 87520 },
]

export const sectors = [
  { name: "IT", change: 1.42 },
  { name: "Banking", change: -0.38 },
  { name: "FMCG", change: 0.87 },
  { name: "Auto", change: 2.15 },
  { name: "Pharma", change: 1.23 },
  { name: "Energy", change: -0.54 },
  { name: "Metal", change: 0.92 },
  { name: "Realty", change: 3.10 },
]
