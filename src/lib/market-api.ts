import {
  marketIndices as mockIndices,
  topGainers as mockGainers,
  topLosers as mockLosers,
  sectors as mockSectors,
  goldRates as mockGoldRates,
} from "./mock-data"

const AV_KEY = process.env.ALPHA_VANTAGE_API_KEY
const AV_BASE = "https://www.alphavantage.co/query"

// Indian market symbols on Alpha Vantage
const INDEX_SYMBOLS = [
  { symbol: "NSEI", name: "Nifty 50" },
  { symbol: "BSESN", name: "Sensex" },
  { symbol: "NSEBANK", name: "Bank Nifty" },
]

const STOCK_SYMBOLS = [
  { symbol: "TATAMOTORS.BSE", name: "Tata Motors" },
  { symbol: "ADANIENT.BSE", name: "Adani Enterprises" },
  { symbol: "SUNPHARMA.BSE", name: "Sun Pharma" },
  { symbol: "HCLTECH.BSE", name: "HCL Technologies" },
  { symbol: "MARUTI.BSE", name: "Maruti Suzuki" },
  { symbol: "BAJFINANCE.BSE", name: "Bajaj Finance" },
  { symbol: "WIPRO.BSE", name: "Wipro" },
  { symbol: "INFY.BSE", name: "Infosys" },
  { symbol: "TECHM.BSE", name: "Tech Mahindra" },
  { symbol: "BPCL.BSE", name: "BPCL" },
]

type StockQuote = {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

async function fetchQuote(symbol: string): Promise<{ price: number; change: number; changePercent: number } | null> {
  if (!AV_KEY) return null
  try {
    const url = `${AV_BASE}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${AV_KEY}`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const data = await res.json()
    const q = data["Global Quote"]
    if (!q || !q["05. price"]) return null
    const price = parseFloat(q["05. price"])
    const change = parseFloat(q["09. change"])
    const changePercent = parseFloat(q["10. change percent"]?.replace("%", "") ?? "0")
    if (isNaN(price)) return null
    return { price, change, changePercent }
  } catch {
    return null
  }
}

export async function getLiveMarketIndices() {
  if (!AV_KEY) return mockIndices

  const results = await Promise.all(
    INDEX_SYMBOLS.map(async ({ symbol, name }) => {
      const q = await fetchQuote(symbol)
      if (!q) return null
      return { name, value: q.price, change: q.change, changePercent: q.changePercent }
    })
  )

  const live = results.filter(Boolean) as typeof mockIndices
  if (live.length === 0) return mockIndices

  // Append non-index entries (Gold, USD/INR, Crude) from mock since AV free tier doesn't cover commodities well
  const extras = mockIndices.filter(i => !["Nifty 50", "Sensex", "Bank Nifty"].includes(i.name))
  return [...live, ...extras]
}

export async function getLiveStockMovers() {
  if (!AV_KEY) return { gainers: mockGainers, losers: mockLosers }

  const quotes = await Promise.all(
    STOCK_SYMBOLS.map(async ({ symbol, name }) => {
      const q = await fetchQuote(symbol)
      if (!q) return null
      const shortSymbol = symbol.replace(".BSE", "")
      return { symbol: shortSymbol, name, ...q } as StockQuote
    })
  )

  const valid = quotes.filter(Boolean) as StockQuote[]
  if (valid.length < 4) return { gainers: mockGainers, losers: mockLosers }

  const sorted = [...valid].sort((a, b) => b.changePercent - a.changePercent)
  const gainers = sorted.filter(s => s.changePercent > 0).slice(0, 5)
  const losers = sorted.filter(s => s.changePercent < 0).slice(-5).reverse()

  return {
    gainers: gainers.length >= 3 ? gainers : mockGainers,
    losers: losers.length >= 3 ? losers : mockLosers,
  }
}

export async function getLiveGoldRate() {
  if (!AV_KEY) return mockGoldRates

  try {
    // Gold price in USD per troy oz
    const url = `${AV_BASE}?function=CURRENCY_EXCHANGE_RATE&from_currency=XAU&to_currency=USD&apikey=${AV_KEY}`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return mockGoldRates
    const data = await res.json()
    const rate = data["Realtime Currency Exchange Rate"]
    if (!rate) return mockGoldRates

    // Fetch USD/INR
    const inrUrl = `${AV_BASE}?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=INR&apikey=${AV_KEY}`
    const inrRes = await fetch(inrUrl, { next: { revalidate: 3600 } })
    if (!inrRes.ok) return mockGoldRates
    const inrData = await inrRes.json()
    const inrRate = inrData["Realtime Currency Exchange Rate"]
    if (!inrRate) return mockGoldRates

    const goldUsd = parseFloat(rate["5. Exchange Rate"])
    const usdInr = parseFloat(inrRate["5. Exchange Rate"])
    if (isNaN(goldUsd) || isNaN(usdInr)) return mockGoldRates

    // Convert to INR per 10 grams (1 troy oz = 31.1035g)
    const gold24kPer10g = Math.round((goldUsd * usdInr * 10) / 31.1035)
    const gold22kPer10g = Math.round(gold24kPer10g * (22 / 24))
    const silverUrl = `${AV_BASE}?function=CURRENCY_EXCHANGE_RATE&from_currency=XAG&to_currency=USD&apikey=${AV_KEY}`
    const silverRes = await fetch(silverUrl, { next: { revalidate: 3600 } })
    let silverPer1kg = mockGoldRates[0].silver
    if (silverRes.ok) {
      const silverData = await silverRes.json()
      const silverRate = silverData["Realtime Currency Exchange Rate"]
      if (silverRate) {
        const silverUsd = parseFloat(silverRate["5. Exchange Rate"])
        if (!isNaN(silverUsd)) {
          // 1 troy oz = 31.1035g, 1kg = 1000g
          silverPer1kg = Math.round((silverUsd * usdInr * 1000) / 31.1035)
        }
      }
    }

    return mockGoldRates.map(entry => ({
      ...entry,
      gold24k: gold24kPer10g,
      gold22k: gold22kPer10g,
      silver: silverPer1kg,
    }))
  } catch {
    return mockGoldRates
  }
}

export async function getAllMarketData() {
  const [indices, movers, goldRates] = await Promise.all([
    getLiveMarketIndices(),
    getLiveStockMovers(),
    getLiveGoldRate(),
  ])
  return { indices, gainers: movers.gainers, losers: movers.losers, goldRates, sectors: mockSectors }
}
