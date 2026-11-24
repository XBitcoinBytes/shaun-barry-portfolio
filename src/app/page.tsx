import Link from "next/link";
import { Nav } from "@/components/Nav";
import { RevealObserver } from "@/components/RevealObserver";
import { Arrow, DemoVideo, SectionHeader, ToConfirm } from "@/components/ui";
import { DemoVideoLang } from "@/components/DemoVideoLang";
import { CertList } from "@/components/CertList";
import { MortgageEvalLaunchCta } from "@/components/MortgageEvalLaunchCta";
import { certificationGroups, certificationsLinkedIn, credentials, experience, profile, skills } from "@/content/profile";

const principles = [
  {
    t: "Borrower first",
    d: "The best AI in lending makes a stressful, high-stakes decision easier to understand — not just faster to process.",
  },
  {
    t: "Explainable by default",
    d: "Every suggestion should point back to the line on the document or the rule it came from. No black boxes.",
  },
  {
    t: "Compliance is a feature",
    d: "TRID, fair lending, and privacy aren’t afterthoughts. They shape the product from the first sketch.",
  },
  {
    t: "Humans in the loop",
    d: "AI drafts, flags, and summarizes. Licensed professionals advise and decide.",
  },
];

export default function Home() {
  return (
    <>
      <RevealObserver />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Nav />

      <main id="main">
        {/* ---------------- HERO ---------------- */}
        <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(18,22,28,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,22,28,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_20%,black,transparent)]"
          />
          <div className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 lg:pb-28">
            <div className="max-w-4xl">
              <p className="reveal inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-3 py-1 text-xs text-ink-2">
                <span className="pulse-dot size-1.5 rounded-full bg-accent-2" aria-hidden />
                {profile.openTo}
              </p>
              <h1
                className="reveal mt-6 font-serif text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.98] tracking-[-0.02em] text-balance"
                style={{ ["--d" as string]: "80ms" }}
              >
                Shaun Barry
              </h1>
              <p
                className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 text-pretty"
                style={{ ["--d" as string]: "160ms" }}
              >
                I use AI tools to build tools for real mortgage problems, drawing on 25+ years in home lending
                (1,400+ loans and $400M+ closed at AmeriSave alone). My builds include MortgageEval, ClearEstimate,
                a mortgage borrower-advice eval, and a bilingual compliance glossary. I&apos;m currently licensed in
                36 states plus DC (NMLS #30170).
              </p>
              <p
                className="reveal mt-4 max-w-xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-muted"
                style={{ ["--d" as string]: "200ms" }}
              >
                AI product builder · mortgage technology · governance and QA
              </p>
              <div className="reveal mt-6 flex flex-wrap items-center gap-2.5" style={{ ["--d" as string]: "220ms" }}>
                {profile.email ? (
                  <a
                    href={`mailto:${profile.email}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink"
                  >
                    Email me <Arrow />
                  </a>
                ) : null}
                {profile.publishResumeLink && profile.resumePdf ? (
                  <a
                    href={profile.resumePdf}
                    className="group inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink/50"
                  >
                    Download résumé (PDF) <Arrow />
                  </a>
                ) : null}
                {profile.linkedin ? (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink/50"
                  >
                    LinkedIn <Arrow />
                  </a>
                ) : null}
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
                >
                  See the work <Arrow />
                </a>
                <Link
                  href="/loan-estimate-advisor"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink/50"
                >
                  <span className="size-1.5 rounded-full bg-accent-2" aria-hidden />
                  Try the Loan Estimate demo
                </Link>
              </div>
              <dl
                className="reveal mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-6"
                style={{ ["--d" as string]: "320ms" }}
              >
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Lending</dt>
                  <dd className="mt-1 text-sm font-medium">25+ years</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Focus</dt>
                  <dd className="mt-1 text-sm font-medium">AI and Mortgage Technology</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Based</dt>
                  <dd className="mt-1 text-sm font-medium">Michigan</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* ---------------- ABOUT ---------------- */}
        <section id="about" className="border-t border-line py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeader
              index="01"
              kicker="About"
              title={
                <>
                  I know how a loan actually gets made.
                </>
              }
              intro={
                <>
                  My background is 25+ years in mortgage origination — 1,400+ loans and $400M+ funded at AmeriSave
                  alone, plus Quicken Loans, Perry Johnson Mortgage, and Refi.com / Veterans United. It&apos;s the day-to-day
                  reality of disclosures, conditions, timelines, and borrowers who just want to know where they
                  stand. I&apos;m now channeling that experience into AI: not hype, but specific, useful tools
                  that remove confusion from one of the biggest financial decisions people make.
                </>
              }
            />
            <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {principles.map((p, i) => (
                <li
                  key={p.t}
                  className="reveal bg-paper p-6 transition-colors hover:bg-white"
                  style={{ ["--d" as string]: `${i * 70}ms` }}
                >
                  <p className="font-mono text-[11px] text-accent">0{i + 1}</p>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- EXPERIENCE ---------------- */}
        <section id="experience" className="border-t border-line bg-paper-2/50 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeader index="02" kicker="Experience" title="Where I’ve worked, and what I’m building now." />
            <ol className="mt-16 md:ml-[33.333%]">
              {experience.map((r, i) => (
                <li
                  key={r.org}
                  className="reveal relative border-l border-line pb-14 pl-8 last:pb-0"
                  style={{ ["--d" as string]: `${i * 90}ms` }}
                >
                  <span
                    aria-hidden
                    className={`absolute -left-[5px] top-2 size-[9px] rounded-full ring-4 ring-paper ${r.current ? "bg-accent-2" : "bg-ink"}`}
                  />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                      {r.dates ?? <ToConfirm>Dates to confirm</ToConfirm>}
                    </p>
                  </div>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">{r.org}</h3>
                  <p className="mt-1 text-ink-2">
                    {r.title ?? (
                      <span className="inline-flex flex-wrap items-center gap-2">
                        Mortgage lending professional <ToConfirm>Exact title to confirm</ToConfirm>
                      </span>
                    )}
                  </p>
                  <p className="mt-4 max-w-2xl leading-relaxed text-ink-2">{r.summary}</p>
                  {r.highlights.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {r.highlights.map((h, j) => (
                      <li key={j} className="flex gap-3 text-[15px] leading-relaxed">
                        <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-ink/40" />
                        {h ?? <ToConfirm>Highlight to add</ToConfirm>}
                      </li>
                    ))}
                  </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- PROJECTS ---------------- */}
        <section id="projects" className="border-t border-line py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeader
              index="03"
              kicker="Projects"
              title="Tools for a clearer mortgage."
              intro="Four featured builds first: MortgageEval, a public site for testing mortgage AI (launching soon); ClearEstimate, a TRID compliance checker; the Mortgage Borrower Advice Eval; and a bilingual compliance glossary. More builds follow below. Each starts from a real pain point I’ve seen up close."
            />

            <div className="mt-16 grid gap-6">
              {/* MortgageEval */}
              <article id="mortgageeval" className="reveal group flex flex-col rounded-3xl border border-line bg-white p-7 sm:p-9 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      Launching soon
                    </span>
                    <span className="font-mono text-[11px] text-muted">Public benchmark site · Prussian Night and Coral</span>
                  </div>
                  <h3 className="mt-6 font-serif text-4xl leading-tight tracking-tight">MortgageEval</h3>
                  <p className="mt-2 text-[17px] font-medium leading-snug text-ink">
                    Anyone can test a mortgage AI against an open-source 78-question mortgage benchmark.
                  </p>
                  <p className="mt-4 leading-relaxed text-ink-2">
                    The site leads with the test itself: paste an assistant&apos;s answer to a real borrower question and
                    see how it scores against a licensed loan officer&apos;s answer key. A leaderboard of 12 models being
                    tested sits underneath, with a category weight toggle, and results come as a no-gate PDF — no
                    account required. The design uses Prussian Night and Coral on a charcoal base, with electric blue
                    for scores.
                  </p>
                  <p className="mt-4 text-sm text-muted">
                    Built, not yet live. The public URL will appear here once the site is deployed.
                  </p>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-2"><span className="mr-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">My role</span>I designed the public test, the leaderboard and the scoring display, directed AI coding assistants to build the site, and reviewed the results against the licensed answer key.</p>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <MortgageEvalLaunchCta />
                    <Link
                      href="/mortgageeval"
                      className="group/cta inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink/40"
                    >
                      Read about the site
                      <span aria-hidden className="transition-transform group-hover/cta:translate-x-0.5">→</span>
                    </Link>
                  </div>
                </div>
                <ul className="mt-8 grid grid-cols-2 gap-3 lg:mt-0">
                  {[
                    ["78", "questions on the public benchmark"],
                    ["12", "models being tested"],
                    ["No-gate PDF", "results without signing up"],
                    ["Launching soon", "built, not yet deployed"],
                  ].map(([n, d]) => (
                    <li key={d} className="rounded-2xl border border-line/80 bg-paper/60 p-4">
                      <p className="font-serif text-2xl leading-none sm:text-3xl">{n}</p>
                      <p className="mt-2 text-sm text-ink-2">{d}</p>
                    </li>
                  ))}
                </ul>
              </article>

              {/* ClearEstimate */}
              <article id="clearestimate" className="reveal group flex flex-col rounded-3xl border border-line bg-white p-7 sm:p-9 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      In development
                    </span>
                    <span className="font-mono text-[11px] text-muted">Compliance tool · Synthetic data</span>
                  </div>
                  <h3 className="mt-6 font-serif text-4xl leading-tight tracking-tight">ClearEstimate</h3>
                  <p className="mt-2 text-[17px] font-medium leading-snug text-ink">
                    Reads a Loan Estimate or Closing Disclosure the way a lender does.
                  </p>
                  <p className="mt-4 leading-relaxed text-ink-2">
                    Upload the PDF and ClearEstimate extracts every fee, explains it in plain English, runs a TRID
                    compliance scan with the regulation cited on each finding, and tests fee tolerances against the
                    earlier Loan Estimate, so a cure shows up before closing instead of in an audit.
                  </p>
                  <p className="mt-4 leading-relaxed text-ink-2">
                    It is measured on 200 synthetic Loan Estimates and Closing Disclosures, each with an answer key,
                    including signature-detection pages that show a signature present or missing. A 10-step
                    improvement loop follows two rules: every change must be a strict improvement (the never-worse
                    rule), and the loop stops once the tool is at or near 100% on all metrics (the stop-at-perfection
                    rule).
                  </p>
                  <ul className="mt-6 grid grid-cols-2 gap-3">
                    {[
                      ["53 / 59", "seeded violations caught after improvement #2 (89.8%)"],
                      ["8 / 8", "signature checks"],
                      ["100%", "fees and key fields"],
                      ["0", "false findings on 160 valid documents"],
                    ].map(([n, d]) => (
                      <li key={d} className="rounded-2xl border border-line/80 bg-paper/60 p-4">
                        <p className="font-serif text-2xl leading-none sm:text-3xl">{n}</p>
                        <p className="mt-2 text-sm text-ink-2">{d}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-muted">
                    Not public yet. The demo uses synthetic sample documents only.
                  </p>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-2"><span className="mr-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">My role</span>I designed the fee-extraction, TRID scan, tolerance rules and the never-worse / stop-at-perfection improvement loop, directed AI coding assistants to build them, and tested the results against 200 synthetic Loan Estimates and Closing Disclosures, including signature-detection pages.</p>
                </div>
                <DemoVideo slug="clearestimate" seconds={31} title="ClearEstimate" className="mt-8 lg:mt-0" />
              </article>

              {/* Mortgage Borrower Advice Eval */}
              <article className="reveal group flex flex-col rounded-3xl border border-line bg-white p-7 sm:p-9">
                <div className="lg:grid lg:grid-cols-2 lg:gap-12">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                        <span className="size-1.5 rounded-full bg-accent-2" aria-hidden />
                        Open eval · v1.1
                      </span>
                      <span className="font-mono text-[11px] text-muted">AI safety · open-source 78-question mortgage benchmark</span>
                    </div>
                    <h3 className="mt-6 font-serif text-4xl leading-tight tracking-tight">Mortgage Borrower Advice Eval</h3>
                    <p className="mt-2 text-[17px] font-medium leading-snug text-ink">
                      Tests whether AI gives borrowers safe, useful mortgage advice.
                    </p>
                    <p className="mt-4 leading-relaxed text-ink-2">
                      78 loan-officer-reviewed test cases that check whether an AI assistant gives borrowers safe, useful
                      answers on Loan Estimates and TRID, closing wire fraud, application fraud, fair lending, and more,
                      and whether it over-refuses legitimate questions.
                    </p>
                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-2"><span className="mr-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">My role</span>I designed the rubric, the 19 risk categories and the safe/unsafe test pairs, reviewed the 78 open-eval reference answers as a licensed loan officer, and supervise the benchmark runs, with AI tools drafting questions and grading answers.</p>
                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <Link
                        href="/mortgage-advice-eval"
                        className="group/cta inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
                      >
                        See the eval
                        <span aria-hidden className="transition-transform group-hover/cta:translate-x-0.5">→</span>
                      </Link>
                      <a
                        href="https://github.com/XBitcoinBytes/mortgage-borrower-advice-eval"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink/40"
                      >
                        GitHub <Arrow />
                      </a>
                    </div>
                  </div>
                  <ul className="mt-8 grid grid-cols-2 gap-3 lg:mt-0">
                    {[
                      ["78", "items · 47 unsafe, 31 safe controls"],
                      ["19", "risk categories"],
                      ["8 / 8", "LO verdict vs. rubric agree on hard-fail (gold set)"],
                      ["76 / 78", "reference answers at full rubric marks"],
                    ].map(([n, d]) => (
                      <li key={d} className="rounded-2xl border border-line/80 bg-paper/60 p-4">
                        <p className="font-serif text-3xl leading-none">{n}</p>
                        <p className="mt-2 text-sm text-ink-2">{d}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="mortgage-ai-eval" className="mt-10 border-t border-line pt-8 lg:grid lg:grid-cols-2 lg:gap-12">
                  <div>
                    <p className="inline-flex items-center gap-1.5 rounded-full bg-btc/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-2">
                      <span className="size-1.5 rounded-full bg-btc" aria-hidden />
                      Vendor testing · private question bank
                    </p>
                    <p className="mt-4 leading-relaxed text-ink-2">
                      Alongside the open-source 78-question mortgage benchmark, a larger private question bank is used
                      for vendor testing. It was built, tested, and supervised by a licensed loan officer with over 25
                      years of mortgage experience, and it covers Loan Estimate and Closing Disclosure literacy, fees,
                      escrow, down payments, wire and application fraud, fair lending, and more. The private bank stays
                      unpublished. Counts and scores from it are not listed here.
                    </p>
                    <div className="mt-5 rounded-2xl border border-line bg-paper/60 p-4 text-sm leading-relaxed text-ink-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Method and limits</p>
                      <ul className="mt-2 list-disc space-y-1 pl-4">
                        <li>The open-source 78-question mortgage benchmark is public. The larger private question bank is used for vendor testing and stays unpublished.</li>
                        <li>Vendor-testing runs are supervised by a licensed loan officer. Details of those runs are available on request, not published here.</li>
                        <li>The private bank stays private; the repository is available on request.</li>
                      </ul>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <Link
                        href="/mortgage-ai-eval"
                        className="group/cta inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink/40"
                      >
                        See the method
                        <span aria-hidden className="transition-transform group-hover/cta:translate-x-0.5">→</span>
                      </Link>
                    </div>
                  </div>
                  <ul className="mt-8 grid grid-cols-2 gap-3 lg:mt-0">
                    {[
                      ["Public", "open-source 78-question mortgage benchmark"],
                      ["Private bank", "used for vendor testing; counts and scores are not published"],
                    ].map(([n, d]) => (
                      <li key={d} className="rounded-2xl border border-line/80 bg-paper/60 p-4">
                        <p className="font-serif text-2xl leading-none sm:text-3xl">{n}</p>
                        <p className="mt-2 text-sm text-ink-2">{d}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <DemoVideo slug="mortgage-eval" seconds={33} title="Mortgage Borrower Advice Eval" className="mt-8" />
              </article>

              {/* Mortgage Compliance Glossary */}
              <article id="mortgage-compliance-glossary" className="reveal flex flex-col overflow-hidden rounded-3xl border border-line bg-white">
                <div className="p-7 sm:p-9">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      Live
                    </span>
                    <span className="font-mono text-[11px] text-muted">Reference tool · English + Spanish</span>
                  </div>
                  <h3 className="mt-6 font-serif text-4xl leading-tight tracking-tight">Mortgage Compliance Glossary</h3>
                  <p className="mt-2 text-[17px] font-medium leading-snug text-ink">
                    393 mortgage terms, explained in plain English first, then the regulation.
                  </p>
                  <p className="mt-4 max-w-3xl leading-relaxed text-ink-2">
                    A desk reference for originators, processors, and borrowers. Each entry starts with a plain-English
                    definition, then shows where the term appears on the Loan Estimate or Closing Disclosure with example
                    figures, and cites the regulation behind it. A Borrower / Professional toggle switches between a
                    short explanation and the full compliance view, and every page has an English and a Spanish version.
                  </p>
                  <p className="mt-4 text-sm text-muted">
                    The Spanish text is still awaiting native-speaker review.
                  </p>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-2"><span className="mr-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">My role</span>I designed the plain-English-first entry format and the Borrower / Professional views, directed AI tools to draft and build the entries, and checked terms against public regulatory sources.</p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a
                      href="https://mortgage-glossary.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      Open the glossary <Arrow />
                    </a>
                  </div>
                  <DemoVideoLang
                    slugs={{ en: "mortgage-compliance-glossary-en", es: "mortgage-compliance-glossary-es" }}
                    seconds={{ en: 28, es: 28 }}
                    title={{ en: "Mortgage Compliance Glossary", es: "Glosario de cumplimiento hipotecario" }}
                    className="mt-7"
                  />
                </div>
                <div className="grid gap-px border-t border-line bg-line md:grid-cols-2">
                  <figure className="bg-white">
                    <img
                      src="/projects/glossary-term-en.webp"
                      alt="Screenshot of the Mortgage Compliance Glossary entry for Loan Estimate in English, with the Borrower and Professional toggle, a plain-English definition, and an example of where the term appears on the form."
                      className="h-auto w-full"
                      width={1440}
                      height={830}
                      loading="lazy"
                    />
                    <figcaption className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                      English entry: Loan Estimate, professional view
                    </figcaption>
                  </figure>
                  <figure className="bg-white">
                    <img
                      src="/projects/glossary-term-es.webp"
                      alt="Screenshot of the same glossary entry in Spanish, titled Estimación del préstamo, with the same form example and related terms."
                      className="h-auto w-full"
                      width={1440}
                      height={830}
                      loading="lazy"
                    />
                    <figcaption className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                      Spanish entry: Estimación del préstamo
                    </figcaption>
                  </figure>
                </div>
              </article>

            </div>

            <div id="side-projects" className="mt-16 scroll-mt-24">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">More builds</p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <li className="reveal flex min-w-0 flex-col rounded-2xl border border-line bg-white p-5">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft font-mono text-[11px] font-semibold text-accent">LE</span>
                  <h3 className="text-lg font-semibold leading-tight tracking-tight">Loan Estimate Advisor</h3>
                </div>
                <p className="mt-3 text-sm leading-snug text-ink-2">Explains a Loan Estimate in plain English, flags what to ask, and compares offers.</p>
                <p className="mt-2 text-xs leading-relaxed text-muted"><span className="mr-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">My role</span>I designed the walkthrough and lender questions from my origination work, directed AI coding tools to build it, and tested it on a fictional sample Loan Estimate.</p>
                <div className="mt-auto pt-4">
                  <Link href="/loan-estimate-advisor" className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline">Try the demo <span aria-hidden>→</span></Link>
                  <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-muted"><a href="/videos/loan-estimate-advisor-explainer.mp4" className="underline-offset-4 hover:text-ink hover:underline">33-sec demo video</a></p>
                </div>
              </li>
              <li className="reveal flex min-w-0 flex-col rounded-2xl border border-line bg-white p-5">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft font-mono text-[11px] font-semibold text-accent">AR</span>
                  <h3 className="text-lg font-semibold leading-tight tracking-tight">Lender AI Roadmap</h3>
                </div>
                <p className="mt-3 text-sm leading-snug text-ink-2">A click-through, compliance-aware plan for lenders starting with AI or scaling it.</p>
                <p className="mt-2 text-xs leading-relaxed text-muted"><span className="mr-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">My role</span>I designed both paths and each step&apos;s owner and rule, directed AI tools to build the interactive guide, and checked the cited rules against their primary sources.</p>
                <div className="mt-auto pt-4">
                  <Link href="/lender-ai-roadmap" className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline">Open the roadmap <span aria-hidden>→</span></Link>
                </div>
              </li>
              <li className="reveal flex min-w-0 flex-col rounded-2xl border border-line bg-white p-5">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft font-mono text-[11px] font-semibold text-accent">₿</span>
                  <h3 className="text-lg font-semibold leading-tight tracking-tight">BitcoinBytes</h3>
                </div>
                <p className="mt-3 text-sm leading-snug text-ink-2">Sound, unbiased Bitcoin education in small pieces: site, newsletter, YouTube and X.</p>
                <p className="mt-2 text-xs leading-relaxed text-muted"><span className="mr-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">My role</span>I set the editorial standard and topics, directed AI tools to build the site and draft content, and approve what gets published.</p>
                <div className="mt-auto pt-4">
                  <a href="https://bitcoinbytes.org" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline">bitcoinbytes.org <Arrow className="size-3.5" /></a>
                  <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-muted"><a href="https://github.com/XBitcoinBytes/BitcoinBytes" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-ink hover:underline">GitHub</a><a href="https://x.com/xbitcoinbytes" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-ink hover:underline">X</a><a href="https://www.youtube.com/@MyBitcoinBytes" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-ink hover:underline">YouTube</a></p>
                </div>
              </li>
              <li className="reveal flex min-w-0 flex-col rounded-2xl border border-line bg-white p-5">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft font-mono text-[11px] font-semibold text-accent">BT</span>
                  <h3 className="text-lg font-semibold leading-tight tracking-tight">Bot Tracker</h3>
                </div>
                <p className="mt-3 text-sm leading-snug text-ink-2">A live animated office view of my AI agent team at work, replayed from a busy stretch.</p>
                <p className="mt-2 text-xs leading-relaxed text-muted"><span className="mr-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">My role</span>I wrote the design spec, directed AI coding tools to build it from that spec, and approved it before launch.</p>
                <div className="mt-auto pt-4">
                  <a href="https://bot-tracker-bitcoin-bytes-travel.vercel.app" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline">Live site <Arrow className="size-3.5" /></a>
                  <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-muted"><a href="https://github.com/XBitcoinBytes/bot-tracker" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-ink hover:underline">GitHub</a><a href="/videos/bot-tracker-explainer.mp4" className="underline-offset-4 hover:text-ink hover:underline">22-sec demo video</a></p>
                </div>
              </li>
              <li id="bot-dashboard-design" className="reveal flex min-w-0 flex-col rounded-2xl border border-line bg-white p-5">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft font-mono text-[11px] font-semibold text-accent">BD</span>
                  <h3 className="text-lg font-semibold leading-tight tracking-tight">Bot Dashboard design blueprint</h3>
                </div>
                <p className="mt-3 text-sm leading-snug text-ink-2">Case study: how I spec a product before anyone builds it.</p>
                <p className="mt-2 text-xs leading-relaxed text-muted"><span className="mr-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">My role</span>I wrote the brief, made each design decision, and recorded the questions left open.</p>
                <div className="mt-auto pt-4">
                  <Link href="/bot-dashboard-design" className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline">Read the case study <span aria-hidden>→</span></Link>
                </div>
              </li>
              <li className="reveal flex min-w-0 flex-col rounded-2xl border border-line bg-white p-5">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft font-mono text-[11px] font-semibold text-accent">HT</span>
                  <h3 className="text-lg font-semibold leading-tight tracking-tight">HomeTask</h3>
                </div>
                <p className="mt-3 text-sm leading-snug text-ink-2">An iPhone home-screen web app for recurring household chores and due dates. In progress.</p>
                <p className="mt-2 text-xs leading-relaxed text-muted"><span className="mr-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">My role</span>I designed the chore catalog and schedules, directed AI tools to build it, and am testing it for my own home.</p>
                <div className="mt-auto pt-4">
                  <a href="https://github.com/XBitcoinBytes/HomeTask" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline">GitHub <Arrow className="size-3.5" /></a>
                </div>
              </li>
              <li className="reveal flex min-w-0 flex-col rounded-2xl border border-line bg-white p-5">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent-soft font-mono text-[11px] font-semibold text-accent">ET</span>
                  <h3 className="text-lg font-semibold leading-tight tracking-tight">England Trip Companion</h3>
                </div>
                <p className="mt-3 text-sm leading-snug text-ink-2">Turned scattered bookings for an eight-person family trip into one daily plan.</p>
                <p className="mt-2 text-xs leading-relaxed text-muted"><span className="mr-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">My role</span>I planned the guide&apos;s structure and what stayed private, directed ChatGPT to build it, and checked it against our bookings.</p>
                <div className="mt-auto pt-4">
                  <a href="https://england-trip-companion.netlify.app/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline">Live site <Arrow className="size-3.5" /></a>
                </div>
              </li>
              </ul>
              <p className="mt-6 text-sm text-ink-2">
                All public code is on{" "}
                <a href="https://github.com/XBitcoinBytes" target="_blank" rel="noopener noreferrer" className="font-medium text-accent underline-offset-4 hover:underline">
                  GitHub
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- SKILLS ---------------- */}
        <section id="skills" className="border-t border-line bg-paper-2/50 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeader index="04" kicker="Skills" title="Lending fluency, paired with an AI builder’s toolkit." />
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              <div className="reveal rounded-3xl border border-line bg-paper p-7">
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Mortgage</h3>
                <ul className="mt-5 space-y-3">
                  {skills.mortgage.map((s) => (
                    <li key={s} className="border-b border-line/70 pb-3 text-[15px] last:border-0 last:pb-0">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="reveal rounded-3xl border border-line bg-paper p-7" style={{ ["--d" as string]: "70ms" }}>
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">AI & product</h3>
                <ul className="mt-5 space-y-3">
                  {skills.ai.map((s) => (
                    <li key={s} className="border-b border-line/70 pb-3 text-[15px] last:border-0 last:pb-0">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="reveal flex flex-col rounded-3xl border border-line bg-paper p-7" style={{ ["--d" as string]: "140ms" }}>
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Credentials</h3>
                <dl className="mt-5 space-y-4">
                  {credentials.map((c) => (
                    <div key={c.label} className="border-b border-line/70 pb-4 last:border-0 last:pb-0">
                      <dt className="text-xs text-muted">{c.label}</dt>
                      <dd className="mt-1 text-[15px] font-medium">
                        {c.value ?? <ToConfirm>To add</ToConfirm>}
                        {c.href ? (
                          <a
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1.5 block text-xs font-normal text-accent underline-offset-4 hover:underline"
                          >
                            View all on LinkedIn ↗
                          </a>
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 border-t border-line/70 pt-4">
                  <p className="text-xs text-muted">Systems & tools</p>
                  <div className="mt-2">
                    {skills.tools ? (
                      <p className="text-[15px]">{skills.tools.join(" · ")}</p>
                    ) : (
                      <ToConfirm>LOS / CRM tools to add</ToConfirm>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div id="certifications" className="reveal mt-6 rounded-3xl border border-line bg-paper p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Certifications</h3>
                <a
                  href={certificationsLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent underline-offset-4 hover:underline"
                >
                  View credentials on LinkedIn ↗
                </a>
              </div>
              <CertList groups={certificationGroups} />
            </div>
          </div>
        </section>


        {/* ---------------- CONTACT ---------------- */}
        <section id="contact" className="border-t border-line py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="reveal relative overflow-hidden rounded-[2rem] bg-ink px-7 py-14 text-paper sm:px-14 sm:py-20">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-accent-2/30 blur-3xl"
              />
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-paper/55">06 — Contact</p>
              <h2 className="mt-5 max-w-3xl font-serif text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[1.02] tracking-tight text-balance">
                Building AI for lending? <em className="text-accent-soft">Let&apos;s talk.</em>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
                I build AI that helps a lender&apos;s team communicate with borrowers and handle documents. I&apos;m looking for a full-time role where deep mortgage experience and hands-on AI building both matter.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                {profile.email ? (
                  <a
                    href={`mailto:${profile.email}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-paper px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
                  >
                    {profile.email} <Arrow />
                  </a>
                ) : (
                  <span className="inline-flex items-center rounded-full border border-dashed border-paper/30 px-5 py-3 font-mono text-xs uppercase tracking-wider text-paper/60">
                    Email to add
                  </span>
                )}
                {profile.phone ? (
                  <a
                    href={`tel:+1${profile.phone.replace(/\D/g, "")}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-paper/20 px-5 py-3 text-sm font-medium hover:border-paper/50"
                  >
                    {profile.phone} <Arrow />
                  </a>
                ) : null}
                {profile.linkedin ? (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-paper/20 px-5 py-3 text-sm font-medium hover:border-paper/50"
                  >
                    LinkedIn <Arrow />
                  </a>
                ) : (
                  <span className="inline-flex items-center rounded-full border border-dashed border-paper/30 px-5 py-3 font-mono text-xs uppercase tracking-wider text-paper/60">
                    LinkedIn to add
                  </span>
                )}
                {profile.resumePdf ? (
                  <a
                    href={profile.resumePdf}
                    className="group inline-flex items-center gap-2 rounded-full border border-paper/20 px-5 py-3 text-sm font-medium hover:border-paper/50"
                  >
                    Download résumé <Arrow />
                  </a>
                ) : null}
              </div>
              <p className="mt-10 text-sm text-paper/50">{profile.location}</p>
            </div>
          </div>
        </section>
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
