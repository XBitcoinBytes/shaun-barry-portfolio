import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { LoanEstimateAdvisor } from "@/components/LoanEstimateAdvisor";

const description =
  "Interactive demo: click through a sample Loan Estimate and get plain-English explanations, smart questions for your lender, and a side-by-side offer comparison. Educational demo with fictional data.";

export const metadata: Metadata = {
  title: "Loan Estimate Advisor — Interactive demo · Shaun Barry",
  description,
  openGraph: { title: "Loan Estimate Advisor — Interactive demo", description, type: "website" },
  twitter: { card: "summary_large_image", title: "Loan Estimate Advisor — Interactive demo", description },
};

function Disclaimer({ compact = false }: { compact?: boolean }) {
  const items = ["Educational demo", "Sample data", "Not a loan offer or financial advice", "Humans decide"];
  return (
    <div
      role="note"
      className={`flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-btc/40 bg-btc/[0.08] ${
        compact ? "px-4 py-3" : "px-5 py-4"
      }`}
    >
      <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full bg-btc font-mono text-xs font-bold text-white">
        !
      </span>
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#8a4f00]">
        {items.map((t, i) => (
          <span key={t}>
            {i > 0 ? <span className="mx-2 text-[#8a4f00]/50">·</span> : null}
            {t}
          </span>
        ))}
      </p>
      {!compact ? (
        <p className="w-full text-sm leading-relaxed text-ink-2">
          Every borrower, lender, and number on this page is fictional. Real Loan Estimates vary by lender, market,
          and your situation. Use this to learn what to look for — then talk with a licensed loan officer before
          making any decision.
        </p>
      ) : null}
    </div>
  );
}

export default function LoanEstimateAdvisorPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="relative pt-28 sm:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[linear-gradient(to_right,rgba(18,22,28,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,22,28,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,black,transparent)]"
        />
        <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
          <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            <Link href="/#projects" className="transition-colors hover:text-ink">
              ← Projects
            </Link>
            <span className="mx-2">/</span>
            <span className="text-accent">Interactive demo</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                  <span className="pulse-dot size-1.5 rounded-full bg-accent-2" aria-hidden />
                  Interactive demo
                </span>
                <span className="font-mono text-[11px] text-muted">Consumer app · v1 prototype</span>
              </div>
              <h1 className="mt-5 font-serif text-[clamp(2.6rem,6vw,4.75rem)] leading-[0.98] tracking-[-0.02em] text-balance">
                Loan Estimate <em className="text-accent">Advisor</em>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2 text-pretty">
                Every borrower gets a three-page Loan Estimate, and most don&apos;t know what to look at. Click any line
                on a sample estimate to see what it means in plain English, why it matters, and what to ask your lender.
              </p>
            </div>
            <ol className="grid gap-2 text-sm lg:col-span-4">
              {[
                ["01", "Click a numbered line on the estimate"],
                ["02", "Read the plain-English explanation"],
                ["03", "Collect your questions for the lender"],
                ["04", "Compare two offers side by side"],
              ].map(([n, t]) => (
                <li key={n} className="flex gap-3 rounded-xl border border-line/80 bg-white/60 px-3 py-2">
                  <span className="font-mono text-xs text-accent">{n}</span>
                  {t}
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8">
            <Disclaimer />
          </div>

          <div className="mt-8">
            <LoanEstimateAdvisor />
          </div>

          <section className="mt-16 grid gap-6 border-t border-line pt-12 md:grid-cols-3">
            {[
              ["What a full version adds", "Upload a PDF or photo, extract fields automatically, and explain every line of the borrower’s real estimate."],
              ["Designed for trust", "Every explanation points back to the exact line on the form. No black boxes, no product pushing."],
              ["Humans in the loop", "The advisor educates and prepares questions. Licensed loan officers advise and decide."],
            ].map(([t, d]) => (
              <div key={t}>
                <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{t}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{d}</p>
              </div>
            ))}
          </section>

          <div className="mt-12">
            <Disclaimer compact />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/50 px-5 py-3 text-sm font-medium transition-colors hover:border-ink/40"
            >
              ← Back to projects
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              Talk with Shaun about this
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 Shaun Barry</p>
          <p className="font-mono text-xs">Educational demo · fictional data · not financial advice</p>
        </div>
      </footer>
    </>
  );
}
