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
  { company: "Sample Infra Holdings", symbol: "SAMPLINFRA", openDate: "2026-03-10", closeDate: "2026-03-12", listingDate: "2026-03-18", priceMin: 95, priceMax: 100, gmp: 0, subscriptionTimes: 0, status: "UPCOMING" as const, issueSize: "₹1,200 Cr" },
  { company: "Example Fintech Ltd", symbol: "EXFINTECH", openDate: "2026-02-20", closeDate: "2026-02-24", listingDate: "2026-03-02", priceMin: 210, priceMax: 221, gmp: 0, subscriptionTimes: 1.4, status: "OPEN" as const, issueSize: "₹850 Cr" },
  { company: "Demo Consumer Goods", symbol: "DEMOCG", openDate: "2025-11-05", closeDate: "2025-11-07", listingDate: "2025-11-12", priceMin: 450, priceMax: 475, gmp: 0, subscriptionTimes: 8.2, status: "LISTED" as const, issueSize: "₹3,400 Cr" },
]

export type MockArticle = {
  title: string
  slug: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  coverImage: string
  content: string
}

export const newsArticles: MockArticle[] = [
  {
    title: "How to Build a SIP Habit That Survives Market Volatility",
    slug: "build-sip-habit-market-volatility",
    excerpt: "A practical framework for starting and sticking with SIPs through bull and bear phases — with rupee-cost averaging explained in plain language.",
    category: "Mutual Funds",
    author: "WealthWire Desk",
    date: "12 Jan 2026",
    readTime: "8 min",
    coverImage: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
    content: `Systematic Investment Plans work best when they are boring. The investors who benefit most are rarely the ones who pause SIPs after a 10% correction or double contributions only after headlines turn euphoric.

## Why SIPs help Indian retail investors

Most salaried households receive income monthly. A SIP mirrors that cash-flow rhythm. More importantly, it enforces rupee-cost averaging: you buy more units when NAVs are depressed and fewer when markets are expensive — without needing to predict the next move on the Nifty.

## A simple starter framework

- Automate the SIP on salary credit day so willpower is not required.
- Map every SIP to a named goal (emergency top-up, house down payment, retirement).
- Keep equity SIPs for goals at least 7 years away.
- Review asset allocation annually, not daily NAV charts.

## Worked example

Suppose you invest ₹10,000 each month for 15 years and assume a long-term average return of 12% per year. Your total capital contributed is ₹18 lakh. The estimated corpus is roughly ₹50 lakh. The gap — about ₹32 lakh — is compounding. Change the assumption to 10% and the corpus falls meaningfully, which is why stress-testing matters.

## What to do in a crash

Corrections feel personal; historically they are normal. If your job is stable and your emergency fund is intact, continuing SIPs is usually the disciplined choice. Pausing turns a volatility event into a behavioural loss.

## Key takeaways

- SIPs are a behaviour tool first, a return tool second.
- Step-up SIPs by ~10% annually when income rises.
- Do not judge a 15-year plan by a 15-day chart.

## FAQ

**Is there a perfect SIP date?** Month-start vs month-end differences are minor compared with staying invested for years.

**SIP or lumpsum?** Use SIPs for regular income. Use staggered STPs if you already hold a large cash balance.

Disclaimer: This article is for educational purposes only and does not constitute investment advice. WealthWire is not SEBI registered. Please consult a qualified financial advisor before making investment decisions.`,
  },
  {
    title: "Section 80C Explained: Building a Tax Plan Around Goals",
    slug: "section-80c-tax-plan-around-goals",
    excerpt: "ELSS, PPF, EPF and insurance premiums all compete for the same ₹1.5 lakh limit. Here is how to allocate without buying the wrong product.",
    category: "Tax",
    author: "WealthWire Desk",
    date: "10 Jan 2026",
    readTime: "9 min",
    coverImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
    content: `Tax-saving season in India often becomes a shopping spree for products you do not need. A better approach: decide your asset allocation and insurance needs first, then map eligible instruments into Section 80C if you are on the old regime.

## Old regime vs new regime

The new regime offers lower slab rates with fewer deductions. The old regime retains 80C, 80D, and housing-related benefits. Run both calculations with your actual Form 16 inputs before locking money into ELSS “only for tax.”

## The ₹1.5 lakh 80C basket

Common building blocks include mandatory EPF contributions, PPF, ELSS mutual funds, life insurance premiums (within limits), home-loan principal, and children’s tuition fees. Many salaried investors discover EPF already fills a large share of the limit.

## ELSS vs PPF

ELSS offers equity exposure with a three-year lock-in — higher growth potential and higher volatility. PPF is a long-horizon sovereign-backed debt instrument. They solve different problems; treating them as interchangeable is a mistake.

## Practical January workflow

1. List already-committed 80C items.
2. Compute remaining room.
3. Compare regimes.
4. Only then deploy incremental ELSS/PPF/NPS aligned to goals.

## Key takeaways

- Do not buy expensive insurance-cum-investment plans merely to fill 80C.
- Health cover under 80D is often higher leverage for family risk than squeezing the last rupee of 80C.
- NPS may offer an additional deduction under prevailing rules — verify the current year’s limits.

Disclaimer: This article is for educational purposes only and does not constitute tax advice. WealthWire is not SEBI registered. Please consult a qualified tax professional.`,
  },
  {
    title: "IPO Allotment Basics: How Retail Investors Can Prepare",
    slug: "ipo-allotment-basics-retail-investors",
    excerpt: "From ASBA applications to allotment probability, a calm guide to participating in Indian IPOs without gambling your emergency fund.",
    category: "IPO",
    author: "WealthWire Desk",
    date: "8 Jan 2026",
    readTime: "7 min",
    coverImage: "https://images.unsplash.com/photo-1642790551116-18e150f248e3?w=800",
    content: `IPOs attract attention because listing-day moves can be dramatic. That drama is exactly why process and position sizing matter more than grey-market chatter.

## How retail applications work

Most investors apply via ASBA through net banking or UPI. Funds are blocked rather than debited upfront. You can usually apply at the cut-off price in the retail category subject to exchange and SEBI rules for that issue.

## Allotment is often a lottery

When retail demand is high, allotment becomes probabilistic. Applying from multiple family PANs has rules and misuse can attract scrutiny — follow the law and broker guidance. Never deploy money you need within weeks.

## GMP is not a guarantee

Grey market premiums are unofficial and can vanish before listing. Use the red-herring prospectus for business quality, promoter history, valuation versus peers, and object of the issue.

## Checklist before you apply

- Read the risk factors section, not only the highlight reel.
- Size the application so a listing fall will not hurt essential goals.
- Prefer long-term holding thesis over one-day flip fantasies.

## Key takeaways

- IPO participation is optional — missing an issue is not a failure.
- Process discipline beats tip culture.
- Always assume allotment and listing outcomes can disappoint.

Disclaimer: This article is for educational purposes only and does not constitute investment advice. WealthWire is not SEBI registered.`,
  },
  {
    title: "Emergency Funds First: The Foundation of Every Portfolio",
    slug: "emergency-funds-first-foundation",
    excerpt: "How much cash cushion Indian households need, where to park it, and why raiding equity SIPs for emergencies is costly.",
    category: "Personal Finance",
    author: "WealthWire Desk",
    date: "5 Jan 2026",
    readTime: "6 min",
    coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800",
    content: `An emergency fund is the unglamorous core of personal finance. Without it, every portfolio is one medical bill or job gap away from forced selling.

## Sizing the cushion

Three to six months of essential expenses is a widely used starting range. Variable-income households and single-earner families should lean higher. Count rent or EMI, groceries, school fees, utilities, and insurance premiums — not vacation spends.

## Where to keep it

Use instruments that are safe and liquid: a high-quality savings account for the first month of expenses, with the balance in liquid funds or short breakable FDs. Equities, EPF, and PPF are not emergency funds.

## Protect the fund

After you use it, replenish before restarting aggressive investing. Automating a small monthly transfer until the target is restored prevents permanent leakage.

## Key takeaways

- Cash cushions buy you the right to stay invested elsewhere.
- Liquidity beats an extra 1% yield for this bucket.
- Insurance reduces how large the cash cushion must be for medical shocks.

Disclaimer: Educational content only. WealthWire is not SEBI registered.`,
  },
  {
    title: "Home Loan EMI vs Prepayment: A Decision Framework",
    slug: "home-loan-emi-vs-prepayment",
    excerpt: "When paying down a floating-rate home loan beats investing the surplus — and when it does not.",
    category: "Personal Finance",
    author: "WealthWire Desk",
    date: "2 Jan 2026",
    readTime: "8 min",
    coverImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    content: `Home loans feel heavy because the rupee amounts are large. The quality of the decision improves when you compare interest saved against expected post-tax returns — after keeping liquidity intact.

## Understand the EMI split

Early in the tenure, interest dominates each EMI. That is why prepayments in the first years often save more interest than identical prepayments near the end.

## A simple comparison

If your floating home-loan rate is meaningfully higher than what you confidently expect from low-risk investments after tax, prepaying can be rational. If you still lack an emergency fund or term insurance, fix those first.

## Tenure cut vs EMI cut

Ask your lender whether prepayment reduces tenure (usually better for interest savings) or EMI (better for monthly cash flow). Choose deliberately.

## Worked sketch

On a long-tenure loan, a ₹5 lakh prepayment in year three can remove multiple EMIs worth of interest over the remaining life — exact figures depend on rate and outstanding principal. Use an EMI calculator before you act.

## Key takeaways

- Do not prepay with money you may need within two years.
- Compare after-tax alternatives, not headline mutual-fund past returns.
- Read foreclosure and part-prepayment clauses.

Disclaimer: Educational only — not loan or investment advice. WealthWire is not SEBI registered.`,
  },
  {
    title: "Gold in a Portfolio: Jewellery vs SGB vs ETF",
    slug: "gold-portfolio-jewellery-sgb-etf",
    excerpt: "Making charges, GST, and storage change the maths. Here is how Indian investors can think about gold allocation calmly.",
    category: "Gold",
    author: "WealthWire Desk",
    date: "28 Dec 2025",
    readTime: "7 min",
    coverImage: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800",
    content: `Gold plays a cultural and financial role in India. Mixing the two without noticing making charges is how investors overpay for “returns.”

## Jewellery is consumption plus metal

When you buy jewellery, you pay for craftsmanship and GST. Resale rarely returns making charges. Treat wedding jewellery as a lifestyle purchase with incidental metal value.

## SGB and ETF for investment exposure

Sovereign Gold Bonds track gold prices and may pay a small interest component subject to issue terms. Gold ETFs provide exchange liquidity without storage hassles. Both usually beat physical investment bars on convenience once spreads and storage are considered.

## Allocation guidance

Many long-term plans keep gold near 5–10% as a diversifier — not as the primary wealth engine. Rebalance when prices run far ahead of your target weight.

## Key takeaways

- Separate jewellery goals from investment goals.
- Compare all-in costs, not only the televised gold rate.
- Avoid leveraged gold bets marketed as sure things.

Disclaimer: Educational content only. WealthWire is not SEBI registered.`,
  },
  {
    title: "Reading Market Volatility Without Panic",
    slug: "reading-market-volatility-without-panic",
    excerpt: "What VIX-like fear, FII flows, and sector rotation mean for long-term SIP investors who do not trade daily.",
    category: "Markets",
    author: "WealthWire Desk",
    date: "20 Dec 2025",
    readTime: "6 min",
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    content: `Headlines amplify every 2% down day. Long-term investors need a narrower information diet: goals, asset allocation, and cash-flow runway.

## Volatility is the fee for equity returns

Equity risk premium exists because prices jump around. If your SIP horizon is 10+ years, day-to-day noise is mostly irrelevant — unless it triggers panic selling.

## Flows and narratives

Foreign and domestic institutional flows can move near-term prices. They are weak tools for timing your monthly SIP. Use them as context, not as a trade signal, unless you have a documented process and risk limits.

## A personal volatility checklist

- Is my emergency fund intact?
- Are my equity SIPs funding goals beyond seven years?
- Did anything change in my job or health risk?

If answers are stable, the portfolio often needs patience more than action.

## Key takeaways

- Reduce checking frequency if it increases anxiety without improving decisions.
- Rebalance on schedule, not on social media momentum.
- Distinguishing “permanent capital loss” from “price fluctuation” is the core skill.

Disclaimer: Educational content only. WealthWire is not SEBI registered.`,
  },
  {
    title: "Choosing Between Flexi Cap and Index Funds",
    slug: "flexi-cap-vs-index-funds",
    excerpt: "Active flexi-cap funds promise judgement; index funds promise low costs. Here is a framework for Indian investors deciding the mix.",
    category: "Mutual Funds",
    author: "WealthWire Desk",
    date: "15 Dec 2025",
    readTime: "8 min",
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
    content: `The flexi-cap versus index debate is really about costs, humility, and how much manager risk you want.

## What index funds offer

A Nifty 50 or broad-market index fund seeks to match the index, minus a small expense ratio. You will not beat the market — and you are unlikely to badly underperform it after fees either.

## What flexi-cap funds attempt

Flexi-cap managers can move across market caps. Some outperform for stretches; others lag after fees. Past outperformance is not a warranty. Look at process consistency, drawdowns, and whether the fund’s style matches your temperament.

## A blended approach

Many investors use index funds as a low-cost core and satellite active funds in sizes small enough that disappointment will not wreck the plan. What matters is total portfolio behaviour, not winning an argument on Twitter.

## Key takeaways

- Costs compound against you silently.
- Understand holdings overlap before buying five “different” active funds.
- Match volatility to goal timelines.

Disclaimer: Educational content only — not a recommendation of any scheme. WealthWire is not SEBI registered.`,
  },
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
