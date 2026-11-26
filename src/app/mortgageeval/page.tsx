import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Arrow } from "@/components/ui";
import { MortgageEvalLaunchCta } from "@/components/MortgageEvalLaunchCta";
import { loanEstimateCheckSite, mortgageEvalSite } from "@/content/siteLinks";

const description =
  "MortgageEval is a public site where anyone can test a mortgage AI against an open-source 78-question mortgage benchmark. The site is live at https://mortgageeval.com.";

export const metadata: Metadata = {
  title: "MortgageEval · Shaun Barry",
  description,
  openGraph: { title: "MortgageEval", description, type: "article" },
  twitter: { card: "summary_large_image", title: "MortgageEval", description },
};

function Kicker({ children }: { children: ReactNode }) {
  return <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{children}</h2>;
}

function Stat({ n, label }: { n: ReactNode; label: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white/70 p-5">
      <p className="font-serif text-3xl leading-none tracking-tight sm:text-4xl">{n}</p>
      <p className="mt-2 text-sm text-ink-2">{label}</p>
    </div>
  );
}

const palette = [
  { name: "Prussian Night", hex: "#0A1020" },
  { name: "Coral", hex: "#FF7A62" },
  { name: "Charcoal", hex: "#121A2C" },
  { name: "Electric blue", hex: "#2E8BFF" },
];

export default function MortgageEvalSitePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" className="relative overflow-x-clip pt-28 sm:pt-32">
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
            <span className="text-accent">MortgageEval</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                  <span className="size-1.5 rounded-full bg-accent-2" aria-hidden />
                  {mortgageEvalSite.status}
                </span>
                <span className="font-mono text-[11px] text-muted">Public benchmark site · November 2026</span>
              </div>
              <h1 className="mt-5 font-serif text-[clamp(2.4rem,5.6vw,4.5rem)] leading-[0.98] tracking-[-0.02em] text-balance">
                {mortgageEvalSite.href ? (
                  <a
                    href={mortgageEvalSite.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MortgageEval
                  </a>
                ) : (
                  "MortgageEval"
                )}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2 text-pretty">
                A public site where anyone can test a mortgage AI against an open-source 78-question mortgage benchmark.
                Answers are checked against a licensed loan officer&apos;s answer key. The site is built, in a Prussian
                Night and Coral design, and is live at MortgageEval.com.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <MortgageEvalLaunchCta />
                <Link
                  href="/mortgage-advice-eval"
                  className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/50 px-5 py-3 text-sm font-medium transition-colors hover:border-ink/40"
                >
                  See the public eval <Arrow />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 lg:col-span-4">
              <Stat n="78" label="questions on the open-source mortgage benchmark" />
              <Stat n="12" label="models being tested" />
              <Stat n="No-gate PDF" label="results you can download without signing up" />
              <Stat n={mortgageEvalSite.status} label="at mortgageeval.com" />
            </div>
          </div>

          <section className="mt-16 grid gap-10 border-t border-line pt-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Kicker>What it is</Kicker>
            </div>
            <div className="lg:col-span-8 max-w-3xl space-y-4 text-[15px] leading-relaxed text-ink-2">
              <p>
                MortgageEval lets a visitor paste an AI assistant&apos;s answer to a real borrower mortgage question and
                see how it scores. The homepage leads with that test. A leaderboard of 12 models being tested sits
                underneath as supporting evidence, and a category weight toggle lets a visitor decide which parts of
                the score matter most.
              </p>
              <p>
                When the test is done, the score breakdown is available immediately, and the PDF results can be
                downloaded without creating an account. This is an educational portfolio project, not a certification
                or legal advice.
              </p>
            </div>
          </section>

          <section className="mt-16 grid gap-10 border-t border-line pt-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Kicker>What&apos;s on the site</Kicker>
            </div>
            <ul className="lg:col-span-8 grid gap-3 sm:grid-cols-2">
              {[
                ["Test-first homepage", "The first thing you see is the question and a place to paste an answer."],
                ["12 models being tested", "A public leaderboard. Not every model has a published score yet."],
                ["Category weight toggle", "Visitors can change how much each scoring category counts."],
                ["No-gate PDF results", "Download a results PDF without signing up."],
                ["Licensed answer key", "Answers are checked against a licensed loan officer's answer key."],
                ["Open-source 78-question mortgage benchmark", "The public November 2026 benchmark. A larger private question bank is used for vendor testing."],
              ].map(([t, d]) => (
                <li key={t} className="rounded-2xl border border-line bg-white p-5">
                  <p className="font-medium tracking-tight text-ink">{t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{d}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 grid gap-10 border-t border-line pt-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Kicker>Design</Kicker>
            </div>
            <div className="lg:col-span-8 max-w-3xl">
              <p className="text-[15px] leading-relaxed text-ink-2">
                The site uses a Prussian Night and Coral palette with a charcoal base, electric blue for scores, and
                coral for buttons, plus faint geometric accents. It was built with AI coding assistants and directed
                and reviewed by Shaun Barry, currently licensed in 36 states plus DC (NMLS #30170).
              </p>
              <ul className="mt-6 flex flex-wrap gap-4">
                {palette.map((c) => (
                  <li key={c.hex} className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="size-7 rounded-full border border-line"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>
                      <span className="block text-sm font-medium">{c.name}</span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{c.hex}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-16 rounded-3xl border border-line bg-white p-7 sm:p-9">
            <Kicker>Status</Kicker>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink-2">
              {mortgageEvalSite.label} is live at{" "}{mortgageEvalSite.href ?? "https://mortgageeval.com"}.
              Related work already on this portfolio: the{" "}
              <Link href="/mortgage-advice-eval" className="underline underline-offset-2">
                Mortgage Borrower Advice Eval
              </Link>
              ,{" "}
              <a
                href={loanEstimateCheckSite.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                Loan Estimate Check
              </a>
              , and the{" "}
              <a
                href="https://mortgagecomplianceglossary.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                Mortgage Compliance Glossary
              </a>
              .
            </p>
            <div className="mt-6">
              <MortgageEvalLaunchCta />
            </div>
          </section>

          <div className="mt-12">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/50 px-5 py-3 text-sm font-medium transition-colors hover:border-ink/40"
            >
              ← Back to projects
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 Shaun Barry</p>
          <p className="font-mono text-xs">Mortgage and AI Technology · Michigan</p>
        </div>
      </footer>
    </>
  );
}
