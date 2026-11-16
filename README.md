# Shaun Barry — Mortgage × AI

Personal site for [Shaun Barry](https://shaun-barry-portfolio.vercel.app), a mortgage loan originator with 25+ years in home lending, now building borrower-first AI for the mortgage industry. Based in Clarkston, Michigan.

**Live site:** [https://shaun-barry-portfolio.vercel.app](https://shaun-barry-portfolio.vercel.app)

## What's on the site

- **Background** — origination experience at Quicken Loans, AmeriSave Mortgage Corp, Perry Johnson Mortgage, and Refi.com / Veterans United, with earlier roles at Wells Fargo, Home Quarters, and Citizens Mortgage.
- **Credentials** — NMLS ID 30170; licensed mortgage loan originator (the active state list is on the site); 18 Generative AI & Prompt Engineering certifications (IBM, Google, Pragmatic AI); Certified Bitcoin Professional (CBP); Bitcoin & Cryptocurrencies (UC Berkeley, 2022); and Cincinnati State coursework in Marketing.
- **[Loan Estimate Advisor](https://shaun-barry-portfolio.vercel.app/loan-estimate-advisor)** — an interactive demo that explains a sample Loan Estimate in plain English, with lender questions and side-by-side offer comparison.
- **[Mortgage Borrower Advice Eval](https://shaun-barry-portfolio.vercel.app/mortgage-advice-eval)**: an open, loan-officer-reviewed AI-safety eval (v1.1, 78 items) covering Loan Estimate/TRID literacy, closing wire fraud, application fraud, fair lending, and over-refusal. It includes a hand-graded gold set. A provisional Nov 15, 2026 run of Codex (gpt-6.1-sol) scored 85.1% overall and 98.5% on safety (77 of 78 items, LLM-judged, not yet reviewed). A 525-item question bank is in progress toward 1,000; those scores are from the 78-item eval, not the bank. The repo is [mortgage-borrower-advice-eval](https://github.com/XBitcoinBytes/mortgage-borrower-advice-eval).
- **Lender AI Roadmap** — a concept in design: a practical, phased plan for mortgage companies to bring AI into origination, starting with governance and team quick wins, then borrower-facing experiences.
- **BitcoinBytes** — a live education side project: sound, accurate, unbiased Bitcoin information in small pieces, with a website (price alerts and a newsletter), 25+ financial education podcast episodes on YouTube, a daily companion account on X, and the Clarkston Bitcoin Meetup Group offline. See [bitcoinbytes.org](https://bitcoinbytes.org), the [GitHub repo](https://github.com/XBitcoinBytes/BitcoinBytes), [YouTube @MyBitcoinBytes](https://www.youtube.com/@MyBitcoinBytes), and [X @xbitcoinbytes](https://x.com/xbitcoinbytes).

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

- [mortgage-borrower-advice-eval](https://github.com/XBitcoinBytes/mortgage-borrower-advice-eval) — v1.1 eval for safe vs. unsafe mortgage borrower advice (loan-officer-reviewed, with a hand-graded gold set). The README records a provisional first model run and an in-progress 525-item question bank.
- [acadia-dark-sky-planner](https://github.com/XBitcoinBytes/acadia-dark-sky-planner) — dark-sky vacation-rental planner for the Acadia, Maine area
- [youtube-channel-audit](https://github.com/XBitcoinBytes/youtube-channel-audit) — packaging audit tools and summaries for YouTube channels

## Contact

- Email: [keeptheclient@yahoo.com](mailto:keeptheclient@yahoo.com)
- LinkedIn: [linkedin.com/in/barryshaun](https://www.linkedin.com/in/barryshaun/)
- GitHub: [github.com/XBitcoinBytes](https://github.com/XBitcoinBytes)
