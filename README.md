# Shaun Barry — Mortgage × AI

Personal site for [Shaun Barry](https://shaun-barry-portfolio.vercel.app), a mortgage loan originator with 25+ years in home lending, now building borrower-first AI for the mortgage industry. Based in Clarkston, Michigan.

**Live site:** [https://shaun-barry-portfolio.vercel.app](https://shaun-barry-portfolio.vercel.app)

## What's on the site

- **Background** — origination experience at Quicken Loans, AmeriSave Mortgage Corp, Perry Johnson Mortgage, and Refi.com / Veterans United, with earlier roles at Wells Fargo, Home Quarters, and Citizens Mortgage.
- **Credentials** — NMLS ID 30170; currently licensed in 36 states plus DC (NMLS #30170); a full certifications list (26: 18 AI certifications from IBM, Google, Pragmatic AI Labs and edX, plus 8 Bitcoin & economics certifications including Certified Bitcoin Professional (CBP), UC Berkeley CS198.1x via edX (Jan 2023) and Saylor University courses), with a link to LinkedIn; and Cincinnati State coursework in Marketing.
- **[Loan Estimate Advisor](https://shaun-barry-portfolio.vercel.app/loan-estimate-advisor)** — an interactive demo that explains a sample Loan Estimate in plain English, with lender questions and side-by-side offer comparison.
- **[Mortgage Borrower Advice Eval](https://shaun-barry-portfolio.vercel.app/mortgage-advice-eval)**: an open, loan-officer-reviewed AI-safety eval (v1.1, 78 items) covering Loan Estimate/TRID literacy, closing wire fraud, application fraud, fair lending, and over-refusal. It includes a hand-graded gold set. A provisional Nov 15, 2026 run of Codex (gpt-6.1-sol) scored 85.1% overall and 98.5% on safety (77 of 78 items, LLM-judged, not yet reviewed). Those scores are from the 78-item eval, not the larger private bank. The repo is [mortgage-borrower-advice-eval](https://github.com/XBitcoinBytes/mortgage-borrower-advice-eval).
- **[Mortgage AI Eval](https://shaun-barry-portfolio.vercel.app/mortgage-ai-eval)**: a 1,000-question private benchmark, built, tested, and supervised by a licensed loan officer, with a provisional Codex vs Grok 4.7 comparison. The question bank is private and the repository is available on request.
- **Mortgage Compliance Glossary** (launching soon): 393 terms in English and Spanish with Loan Estimate and Closing Disclosure examples, regulation citations, and a Borrower / Professional toggle. Not live yet; the site shows screenshots only.
- **Lender AI Roadmap** — an interactive guide (draft) at `/lender-ai-roadmap`: a compliance-aware, step-by-step plan for mortgage lenders, with one path for lenders new to AI and one for lenders scaling AI they already use.
- **BitcoinBytes** — a live education side project: sound, accurate, unbiased Bitcoin information in small pieces, with a website (price alerts and a newsletter), 25+ financial education podcast episodes on YouTube, a daily companion account on X, and the Clarkston Bitcoin Meetup Group offline. See [bitcoinbytes.org](https://bitcoinbytes.org), the [GitHub repo](https://github.com/XBitcoinBytes/BitcoinBytes), [YouTube @MyBitcoinBytes](https://www.youtube.com/@MyBitcoinBytes), and [X @xbitcoinbytes](https://x.com/xbitcoinbytes).

- **[Bot Tracker](https://bot-tracker-bitcoin-bytes-travel.vercel.app)** — a live animated office view of Shaun's AI agent team at their desks, with messages passing between them. It is a replay modeled on the real work of the bot team, essentially finished, with a few more bots possibly added later. Repo: [XBitcoinBytes/bot-tracker](https://github.com/XBitcoinBytes/bot-tracker).
- **[Bot Dashboard design blueprint](https://shaun-barry-portfolio.vercel.app/bot-dashboard-design)** — a product-design case study: the questions, decisions and open items from the design file behind Bot Tracker.
- **HomeTask** — an in-progress iPhone-friendly household-task PWA (not a native App Store app). Repo: [XBitcoinBytes/HomeTask](https://github.com/XBitcoinBytes/HomeTask).
- **England Trip Companion** — a side project: a reservation-aware travel guide built with ChatGPT for an eight-person family trip. Live site: [england-trip-companion.netlify.app](https://england-trip-companion.netlify.app/). Repo: [XBitcoinBytes/england-trip-companion](https://github.com/XBitcoinBytes/england-trip-companion).

A résumé PDF is included in [`public/Shaun-Barry-Resume.pdf`](public/Shaun-Barry-Resume.pdf).

## Tech stack

- [Next.js](https://nextjs.org/) (App Router) and TypeScript
- Tailwind CSS v4
- Deployed on [Vercel](https://vercel.com/)

Site copy lives in [`src/content/profile.ts`](src/content/profile.ts). The Loan Estimate demo uses a clearly labeled sample file, not a real borrower's disclosure.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Related repositories

- [mortgage-borrower-advice-eval](https://github.com/XBitcoinBytes/mortgage-borrower-advice-eval) — v1.1 eval for safe vs. unsafe mortgage borrower advice (loan-officer-reviewed, with a hand-graded gold set). The README records a provisional first model run.
- [acadia-dark-sky-planner](https://github.com/XBitcoinBytes/acadia-dark-sky-planner) — dark-sky vacation-rental planner for the Acadia, Maine area
- [youtube-channel-audit](https://github.com/XBitcoinBytes/youtube-channel-audit) — packaging audit tools and summaries for YouTube channels

## Contact

- Email: [keeptheclient@yahoo.com](mailto:keeptheclient@yahoo.com)
- LinkedIn: [linkedin.com/in/barryshaun](https://www.linkedin.com/in/barryshaun/)
- GitHub: [github.com/XBitcoinBytes](https://github.com/XBitcoinBytes)
