/**
 * Shared educational blocks for calculator pages.
 * Keeps tool pages from looking like empty widgets to AdSense / search reviewers.
 */

export type CalculatorGuide = {
  howItWorks: string[]
  formula?: string
  example: { title: string; body: string }
  tips: string[]
  faqs: { q: string; a: string }[]
  related: { label: string; href: string }[]
}

export const sipGuide: CalculatorGuide = {
  howItWorks: [
    "A Systematic Investment Plan (SIP) invests a fixed amount in a mutual fund every month on a chosen date.",
    "You benefit from rupee-cost averaging: you buy more units when NAVs are low and fewer when NAVs are high.",
    "Returns compound over time — the longer you stay invested, the more powerful the effect becomes.",
    "This calculator assumes a constant annual return. Real markets fluctuate year to year.",
  ],
  formula: "FV = P × (((1 + r)^n − 1) / r) × (1 + r), where P is monthly SIP, r is monthly rate, n is number of months.",
  example: {
    title: "Example: ₹10,000/month for 15 years at 12% p.a.",
    body: "Total invested ≈ ₹18 lakh. Estimated corpus ≈ ₹50 lakh. Roughly ₹32 lakh comes from compounding — illustrating why starting early matters more than timing the market.",
  },
  tips: [
    "Increase your SIP by 10% each year (step-up SIP) to keep pace with salary growth.",
    "Prefer equity funds for goals 7+ years away; use debt or hybrid for nearer goals.",
    "Do not pause SIPs during corrections — that is often when rupee-cost averaging helps most.",
    "Link SIPs to specific goals (house, education, retirement) instead of investing vaguely.",
  ],
  faqs: [
    { q: "Is the return rate guaranteed?", a: "No. The rate you enter is an assumption. Equity mutual funds can deliver higher or lower returns than the figure you model." },
    { q: "What is a good SIP amount to start with?", a: "Start with an amount you can sustain without stress — even ₹500–₹1,000 builds the habit. Raise it as income grows." },
    { q: "SIP vs lumpsum — which is better?", a: "SIPs suit regular income and reduce timing risk. Lumpsum can work if you have idle capital and a long horizon, ideally staggered via STP." },
  ],
  related: [
    { label: "Lumpsum Calculator", href: "/calculators/lumpsum" },
    { label: "Retirement Planner", href: "/calculators/retirement" },
    { label: "Mutual Fund Centre", href: "/mutual-funds" },
  ],
}

export const emiGuide: CalculatorGuide = {
  howItWorks: [
    "EMI (Equated Monthly Instalment) is the fixed amount you pay each month toward a loan.",
    "Each EMI has two parts: interest on the outstanding principal and repayment of principal.",
    "Early in the tenure, interest is a larger share; later, principal repayment dominates.",
    "This calculator uses the standard reducing-balance EMI formula used by most Indian lenders.",
  ],
  formula: "EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is principal, r is monthly interest rate, n is tenure in months.",
  example: {
    title: "Example: ₹50 lakh home loan at 8.5% for 20 years",
    body: "Monthly EMI ≈ ₹43,391. Total payment ≈ ₹1.04 crore, of which interest ≈ ₹54 lakh. A prepayment of ₹5 lakh in year 5 can cut years off the tenure or lower EMI — check your lender’s rules.",
  },
  tips: [
    "Compare floating vs fixed rates and processing fees, not just the headline interest rate.",
    "Keep total EMIs under ~40–50% of take-home pay so cash flow stays resilient.",
    "Use surplus bonuses for prepayment when the loan rate exceeds expected post-tax investment returns.",
    "Check foreclosure charges and reset clauses before signing.",
  ],
  faqs: [
    { q: "Does a longer tenure always help?", a: "It lowers EMI but sharply raises total interest. Prefer the shortest tenure you can afford comfortably." },
    { q: "Can I change EMI mid-loan?", a: "Many banks let you raise EMI or prepay. Part-prepayment usually needs a written request; rules vary by lender." },
    { q: "Home loan vs personal loan?", a: "Home loans are cheaper and may offer tax benefits under Sections 80C and 24(b). Personal loans are costlier and unsecured." },
  ],
  related: [
    { label: "SIP Calculator", href: "/calculators/sip" },
    { label: "Home Loans Guide", href: "/personal-finance/home-loans" },
    { label: "Tax Saving Guide", href: "/tax" },
  ],
}

export const lumpsumGuide: CalculatorGuide = {
  howItWorks: [
    "A lumpsum investment puts a one-time amount into a fund, stock, or other asset and leaves it to grow.",
    "Growth is modelled with compound interest: each year’s return builds on prior gains.",
    "Lumpsums work best with a clear horizon and an emergency fund already in place.",
    "If you are uneasy about market timing, stagger entry via a Systematic Transfer Plan (STP).",
  ],
  formula: "FV = P × (1 + r)^t, where P is principal, r is annual return, t is years.",
  example: {
    title: "Example: ₹5 lakh invested for 10 years at 12% p.a.",
    body: "Estimated value ≈ ₹15.5 lakh. Invested amount stays ₹5 lakh; compounding contributes ≈ ₹10.5 lakh — showing why idle cash in low-yield accounts can be costly over long horizons.",
  },
  tips: [
    "Match asset allocation to the goal date — do not put near-term money fully in equities.",
    "For large windfalls, consider deploying over 3–6 months via STP into equity funds.",
    "Rebalance annually so one asset class does not dominate the portfolio.",
    "Factor in taxes: equity LTCG and debt taxation rules affect net returns.",
  ],
  faqs: [
    { q: "When is lumpsum better than SIP?", a: "When you already hold surplus cash and have a long horizon. SIPs are better when money arrives monthly." },
    { q: "Should I wait for a market dip?", a: "Timing consistently is hard. A staggered STP often beats waiting indefinitely in cash." },
    { q: "Are calculator returns realistic?", a: "They are illustrations only. Past fund returns do not guarantee future results." },
  ],
  related: [
    { label: "SIP Calculator", href: "/calculators/sip" },
    { label: "Retirement Planner", href: "/calculators/retirement" },
    { label: "Mutual Fund Centre", href: "/mutual-funds" },
  ],
}

export const retirementGuide: CalculatorGuide = {
  howItWorks: [
    "This planner estimates the corpus you may need so that investment income can support post-retirement expenses.",
    "It inflates today’s expenses to retirement age, then applies a simple multiple (rule of 25 / ~4% withdrawal).",
    "It also backs into a monthly SIP that could grow to that corpus at your assumed return rate.",
    "Real plans should also include EPF, NPS, pensions, and healthcare inflation separately.",
  ],
  example: {
    title: "Example: Age 30, retire at 60, ₹50,000 monthly expenses today",
    body: "At 6% inflation, expenses at 60 are much higher. Using 25× annual expenses, corpus needs often land in crores. Starting a SIP in the teens of thousands early is usually easier than catching up after 45.",
  },
  tips: [
    "Increase equity allocation while you are young; glide toward debt as retirement nears.",
    "Treat NPS Tier I and EPF as core retirement anchors, then add mutual fund SIPs.",
    "Build a separate health insurance buffer — medical inflation often outruns general inflation.",
    "Review the plan every 2–3 years after salary changes or major life events.",
  ],
  faqs: [
    { q: "What is the rule of 25?", a: "Multiply annual retirement expenses by 25 for a rough corpus that supports a 4% annual withdrawal. It is a starting heuristic, not a guarantee." },
    { q: "Should I include EPF in this calculator?", a: "This tool shows the total corpus target. Subtract expected EPF/NPS balances to find how much your SIPs still need to cover." },
    { q: "Is 12% return realistic?", a: "Long-term equity-oriented portfolios have historically delivered double-digit averages in India, but sequences of returns vary. Stress-test at 8–10% as well." },
  ],
  related: [
    { label: "SIP Calculator", href: "/calculators/sip" },
    { label: "Retirement Guide", href: "/personal-finance/retirement" },
    { label: "Tax Saving Guide", href: "/tax" },
  ],
}
