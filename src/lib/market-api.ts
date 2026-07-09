import {
  marketIndices as mockIndices,
  topGainers as mockGainers,
  topLosers as mockLosers,
  sectors as mockSectors,
  goldRates as mockGoldRates,
} from "./mock-data"

// Yahoo Finance chart API — keyless, but requires a browser-like User-Agent.
// Every quote is cached for 60s so client polling stays cheap upstream.
const YF_BASE = "https://query1.finance.yahoo.com/v8/finance/chart"
const YF_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
  Accept: "application/json",
}

const TROY_OZ_GRAMS = 31.1035

type Quote = { price: number; change: number; changePercent: number }

async function fetchQuote(symbol: string, revalidate = 60): Promise<Quote | null> {
  try {
    const url = `${YF_BASE}/${encodeURIComponent(symbol)}?interval=1d&range=1d`
    const res = await fetch(url, { headers: YF_HEADERS, next: { revalidate } })
    if (!res.ok) return null
    const data = await res.json()
    const meta = data?.chart?.result?.[0]?.meta
    const price = Number(meta?.regularMarketPrice)
    const prev = Number(meta?.chartPreviousClose ?? meta?.previousClose)
    if (!isFinite(price) || !isFinite(prev) || prev === 0) return null
    const change = price - prev
    return { price, change, changePercent: (change / prev) * 100 }
  } catch {
    return null
  }
}

const NSE_STOCKS = [
  { symbol: "TATAMOTORS", name: "Tata Motors" },
  { symbol: "ADANIENT", name: "Adani Enterprises" },
  { symbol: "SUNPHARMA", name: "Sun Pharma" },
  { symbol: "HCLTECH", name: "HCL Technologies" },
  { symbol: "MARUTI", name: "Maruti Suzuki" },
  { symbol: "BAJFINANCE", name: "Bajaj Finance" },
  { symbol: "WIPRO", name: "Wipro" },
  { symbol: "INFY", name: "Infosys" },
  { symbol: "TECHM", name: "Tech Mahindra" },
  { symbol: "BPCL", name: "BPCL" },
]

export async function getLiveMarketIndices() {
  const [nifty, sensex, bankNifty, usdInr, goldUsd, crudeUsd] = await Promise.all([
    fetchQuote("^NSEI"),
    fetchQuote("^BSESN"),
    fetchQuote("^NSEBANK"),
    fetchQuote("INR=X"),
    fetchQuote("GC=F"),
    fetchQuote("CL=F"),
  ])

  const indices: typeof mockIndices = []

  const pushIndex = (name: string, q: Quote | null, mockName = name) => {
    if (q) {
      indices.push({ name, value: q.price, change: q.change, changePercent: q.changePercent })
    } else {
      const mock = mockIndices.find(i => i.name === mockName)
      if (mock) indices.push(mock)
    }
  }

  pushIndex("Nifty 50", nifty)
  pushIndex("Sensex", sensex)
  pushIndex("Bank Nifty", bankNifty)

  // Gold: COMEX USD/oz → INR per 10g
  if (goldUsd && usdInr) {
    const value = Math.round((goldUsd.price * usdInr.price * 10) / TROY_OZ_GRAMS)
    indices.push({ name: "Gold", value, change: Math.round(value * goldUsd.changePercent / 100), changePercent: goldUsd.changePercent })
  } else {
    pushIndex("Gold", null)
  }

  pushIndex("USD/INR", usdInr)

  // Crude: WTI USD/bbl → INR (≈ MCX quote)
  if (crudeUsd && usdInr) {
    const value = Math.round(crudeUsd.price * usdInr.price)
    indices.push({ name: "Crude Oil", value, change: Math.round(value * crudeUsd.changePercent / 100), changePercent: crudeUsd.changePercent })
  } else {
    pushIndex("Crude Oil", null)
  }

  return indices.length > 0 ? indices : mockIndices
}

export async function getLiveStockMovers() {
  const quotes = await Promise.all(
    NSE_STOCKS.map(async ({ symbol, name }) => {
      const q = await fetchQuote(`${symbol}.NS`, 300)
      return q ? { symbol, name, ...q } : null
    })
  )

  const valid = quotes.filter(Boolean) as Array<{ symbol: string; name: string } & Quote>
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
  const [goldUsd, silverUsd, usdInr] = await Promise.all([
    fetchQuote("GC=F", 300),
    fetchQuote("SI=F", 300),
    fetchQuote("INR=X", 300),
  ])
  if (!goldUsd || !usdInr) return mockGoldRates

  const gold24kPer10g = Math.round((goldUsd.price * usdInr.price * 10) / TROY_OZ_GRAMS)
  const gold22kPer10g = Math.round(gold24kPer10g * (22 / 24))
  const silverPer1kg = silverUsd
    ? Math.round((silverUsd.price * usdInr.price * 1000) / TROY_OZ_GRAMS)
    : mockGoldRates[0].silver

  return mockGoldRates.map(entry => ({
    ...entry,
    gold24k: gold24kPer10g,
    gold22k: gold22kPer10g,
    silver: silverPer1kg,
  }))
}

export async function getAllMarketData() {
  const [indices, movers, goldRates] = await Promise.all([
    getLiveMarketIndices(),
    getLiveStockMovers(),
    getLiveGoldRate(),
  ])
  return { indices, gainers: movers.gainers, losers: movers.losers, goldRates, sectors: mockSectors }
}
