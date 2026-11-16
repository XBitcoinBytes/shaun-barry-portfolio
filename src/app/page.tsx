import Link from "next/link";
import { Nav } from "@/components/Nav";
import { RevealObserver } from "@/components/RevealObserver";
import { Arrow, SectionHeader, ToConfirm } from "@/components/ui";
import { credentials, experience, links, profile, skills } from "@/content/profile";

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

const roadmap = [
  { p: "01", t: "Foundations", d: "Data inventory, governance, vendor review, and guardrails for privacy and fair lending." },
  { p: "02", t: "Assist the team", d: "Document intake, condition summaries, and drafting help for loan officers and processors." },
  { p: "03", t: "Serve the borrower", d: "Plain-English explanations of disclosures, status updates, and next-step guidance." },
  { p: "04", t: "Measure & scale", d: "Track cycle time, borrower satisfaction, and accuracy — expand only what proves out." },
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
                Making the mortgage <em className="text-accent">clearer</em> for every borrower — with AI that earns trust.
              </h1>
              <p
                className="reveal mt-6 max-w-xl text-lg leading-relaxed text-ink-2 text-pretty"
                style={{ ["--d" as string]: "160ms" }}
              >
                I&apos;m Shaun Barry, a mortgage loan originator with 25+ years in home lending — Quicken Loans,
                AmeriSave, and Veterans United among them — based in the{" "}
                {profile.location} area. I&apos;m focused on where lending experience meets applied AI: tools
                that help consumers understand their loan, and practical roadmaps that help lenders adopt AI responsibly.
              </p>
              <div className="reveal mt-9 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "240ms" }}>
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
                >
                  See the work <Arrow />
                </a>
                <Link
                  href="/loan-estimate-advisor"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/50 px-5 py-3 text-sm font-medium transition-colors hover:border-ink/40"
                >
                  <span className="size-1.5 rounded-full bg-accent-2" aria-hidden />
                  Try the Loan Estimate demo
                </Link>
                <a
                  href="#contact"
                  className="inline-flex items-center px-2 py-3 text-sm font-medium text-ink-2 underline-offset-4 transition-colors hover:text-ink hover:underline"
                >
                  Get in touch
                </a>
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
                  <dd className="mt-1 text-sm font-medium">AI × Mortgage</dd>
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
                  I know how a loan actually gets made. <span className="text-muted">Now I want to make it make sense.</span>
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
              title="Four bets on a better mortgage experience."
              intro="An interactive demo, an open AI-safety eval, a concept in active design, and one live project. Each starts from a real pain point I’ve seen up close."
            />

            <div className="mt-16 grid gap-6 lg:grid-cols-2">
              {/* Loan Estimate Advisor */}
              <article className="reveal group flex flex-col rounded-3xl border border-line bg-white p-7 sm:p-9 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-12">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      <span className="pulse-dot size-1.5 rounded-full bg-accent-2" aria-hidden />
                      Interactive demo
                    </span>
                    <span className="font-mono text-[11px] text-muted">Consumer app</span>
                  </div>
                  <h3 className="mt-6 font-serif text-4xl leading-tight tracking-tight">Loan Estimate Advisor</h3>
                  <p className="mt-2 text-[17px] font-medium leading-snug text-ink">
                    Explains your Loan Estimate in plain English and compares offers.
                  </p>
                  <p className="mt-4 leading-relaxed text-ink-2">
                    Every borrower receives a standardized, three-page Loan Estimate after applying — and most
                    don&apos;t know what to look at. Upload it, and the advisor explains each section in plain
                    English, flags what to ask your lender, and helps you compare offers side by side.
                  </p>
                  <p className="mt-4 text-sm text-muted">
                    Educational guidance, not a lending decision — designed to make borrowers better-informed
                    customers.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link
                      href="/loan-estimate-advisor"
                      className="group/cta inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
                    >
                      Try the demo
                      <span aria-hidden className="transition-transform group-hover/cta:translate-x-0.5">→</span>
                    </Link>
                    <span className="font-mono text-[11px] text-muted">Clickable sample estimate · ~2 min</span>
                  </div>
                </div>
                <ol className="mt-8 grid gap-3 lg:mt-0">
                  {[
                    ["Upload", "PDF or photo of the Loan Estimate."],
                    ["Extract", "Read key fields: rate, lock status, loan costs, cash to close."],
                    ["Explain", "Plain-English notes tied to the exact line on the form."],
                    ["Compare", "Line up multiple estimates and highlight real differences."],
                    ["Ask", "A short list of smart questions to bring back to the lender."],
                  ].map(([t, d], i) => (
                    <li key={t} className="flex gap-4 rounded-2xl border border-line/80 bg-paper/60 p-4">
                      <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="text-sm font-semibold">{t}</p>
                        <p className="text-sm text-ink-2">{d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>

              {/* Mortgage Borrower Advice Eval */}
              <article className="reveal group flex flex-col rounded-3xl border border-line bg-white p-7 sm:p-9 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-12">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      <span className="size-1.5 rounded-full bg-accent-2" aria-hidden />
                      Open eval · v1.1
                    </span>
                    <span className="font-mono text-[11px] text-muted">AI safety</span>
                  </div>
                  <h3 className="mt-6 font-serif text-4xl leading-tight tracking-tight">Mortgage Borrower Advice Eval</h3>
                  <p className="mt-2 text-[17px] font-medium leading-snug text-ink">
                    Tests whether AI gives borrowers safe, useful mortgage advice.
                  </p>
                  <p className="mt-4 leading-relaxed text-ink-2">
                    78 loan-officer-reviewed test cases that check whether an AI assistant gives borrowers safe, useful
                    answers on Loan Estimates and TRID, closing wire fraud, application fraud, fair lending, and more,
                    and whether it over-refuses legitimate questions. A provisional first model run (Codex gpt-6.1-sol,
                    Nov 15, 2026) scored 85.1% overall and 98.5% on safety (77 of 78 items, LLM-judged, not yet
                    reviewed). A 525-item question bank is in progress toward 1,000; those scores are from the 78-item
                    eval, not the bank.
                  </p>
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
              </article>

              {/* Lender AI Roadmap */}
              <article className="reveal flex flex-col rounded-3xl border border-line bg-ink p-7 text-paper sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-paper/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-soft">
                    Concept · In design
                  </span>
                  <span className="font-mono text-[11px] text-paper/50">Industry playbook</span>
                </div>
                <h3 className="mt-6 font-serif text-4xl leading-tight tracking-tight">Lender AI Roadmap</h3>
                <p className="mt-2 text-[17px] font-medium leading-snug text-paper/90">
                  Gives lenders a practical, phased plan to adopt AI.
                </p>
                <p className="mt-4 leading-relaxed text-paper/75">
                  A practical, phased plan for mortgage companies to bring AI into origination — starting with
                  governance and quick wins for the team, then extending to borrower-facing experiences.
                </p>
                <ol className="mt-8 space-y-px overflow-hidden rounded-2xl border border-paper/10">
                  {roadmap.map((r) => (
                    <li key={r.p} className="flex gap-4 bg-paper/[0.04] p-4">
                      <span className="font-mono text-xs text-accent-soft">{r.p}</span>
                      <div>
                        <p className="text-sm font-semibold">{r.t}</p>
                        <p className="text-sm text-paper/65">{r.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>

              {/* BitcoinBytes */}
              <article className="reveal flex flex-col rounded-3xl border border-line bg-white p-7 sm:p-9" style={{ ["--d" as string]: "90ms" }}>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-btc/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8a4f00]">
                    Live · Side project
                  </span>
                  <span className="font-mono text-[11px] text-muted">Education & media</span>
                </div>
                <h3 className="mt-6 font-serif text-4xl leading-tight tracking-tight">
                  Bitcoin<span className="text-btc">Bytes</span>
                </h3>
                <p className="mt-2 text-[17px] font-medium leading-snug text-ink">
                  Gives people sound, unbiased Bitcoin education in small pieces.
                </p>
                <p className="mt-4 leading-relaxed text-ink-2">
                  Sound, accurate, unbiased Bitcoin information in small, digestible pieces. A website with price
                  alerts and a newsletter, 25+ financial education podcast episodes on YouTube, and a daily
                  companion account on X. Offline, I promote financial education through the Clarkston Bitcoin Meetup Group.
                </p>
                <div className="mt-6 rounded-2xl border border-line bg-paper/60 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Editorial standard</p>
                  <ul className="mt-3 space-y-2 text-sm text-ink-2">
                    <li>— Explain how it works before what it costs</li>
                    <li>— Context over hype; facts over predictions</li>
                    <li>— Security basics first: self-custody, scams, privacy</li>
                  </ul>
                </div>
                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  <a
                    href={links.bitcoinBytesSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
                  >
                    bitcoinbytes.org <Arrow />
                  </a>
                  <a
                    href="https://github.com/XBitcoinBytes/BitcoinBytes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink/40"
                  >
                    GitHub <Arrow />
                  </a>
                  <a
                    href={links.bitcoinBytesX}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink/40"
                  >
                    @xbitcoinbytes on X <Arrow />
                  </a>
                  <a
                    href={links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink/40"
                  >
                    YouTube · @MyBitcoinBytes <Arrow />
                  </a>
                </div>
              </article>
            </div>

            <div className="reveal mt-6 flex flex-col items-start justify-between gap-4 rounded-3xl border border-dashed border-ink/20 p-7 sm:flex-row sm:items-center">
              <div>
                <p className="font-semibold tracking-tight">Code & prototypes</p>
                <p className="mt-1 text-sm text-ink-2">
                  Public repositories for these projects will be linked here as they ship.
                </p>
              </div>
              {profile.github ? (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper"
                >
                  GitHub <Arrow />
                </a>
              ) : (
                <ToConfirm>GitHub link to add</ToConfirm>
              )}
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
          </div>
        </section>


        {/* ---------------- SIDE PROJECTS ---------------- */}
        <section id="side-projects" className="border-t border-line py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <SectionHeader
              index="05"
              kicker="Side projects"
              title="Practical tools built for real people."
            />

            <div className="mt-16 grid gap-8">
            <article className="reveal overflow-hidden rounded-3xl border border-line bg-white">
              <div className="p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    Live · Essentially finished
                  </span>
                  <span className="font-mono text-[11px] text-muted">Virtual office</span>
                </div>
                <h3 className="mt-6 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                  Bot Tracker
                </h3>
                <p className="mt-2 text-[17px] font-medium leading-snug text-ink">
                  A live animated office view of my AI agent team at their desks, with messages passing between them.
                </p>
                <p className="mt-4 max-w-3xl leading-relaxed text-ink-2">
                  Ara, my chief of staff, sits at the head desk. Helper bots walk the floor, hand off work, and show
                  their activity in a sidebar. It&apos;s a replay modeled on a busy stretch of my bot team&apos;s real work — job leads,
                  research, inbox triage, drafts — not a live feed of private messages. The product is essentially
                  finished; a few more bots may be added later.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="https://bot-tracker-bitcoin-bytes-travel.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
                  >
                    Live site <Arrow />
                  </a>
                  <a
                    href="https://github.com/XBitcoinBytes/bot-tracker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink/40"
                  >
                    GitHub <Arrow />
                  </a>
                </div>
              </div>
              <img
                src="/projects/bot-tracker.webp"
                alt="Screenshot of Bot Tracker, a top-down virtual office with Shaun Barry's AI bots at their desks and a sidebar of activity and messages."
                className="h-auto w-full border-t border-line"
                width={1440}
                height={900}
              />
            </article>

            <article className="reveal overflow-hidden rounded-3xl border border-line bg-white">
              <div className="p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    In progress · Built with AI
                  </span>
                  <span className="font-mono text-[11px] text-muted">iPhone web app</span>
                </div>
                <h3 className="mt-6 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                  HomeTask, a household-task PWA for iPhone
                </h3>
                <p className="mt-2 text-[17px] font-medium leading-snug text-ink">
                  Keeps household chores and due dates on your phone&apos;s home screen.
                </p>
                <p className="mt-4 max-w-3xl leading-relaxed text-ink-2">
                  I built this as a phone-friendly web app for my own home — not a native App Store
                  app. It lives on the iPhone home screen, tracks recurring chores and due dates on
                  the device, and works without an account. I&apos;m still finishing it as a portfolio
                  piece.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="https://github.com/XBitcoinBytes/HomeTask"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
                  >
                    GitHub <Arrow />
                  </a>
                </div>
              </div>
              <img
                src="/projects/hometask.webp"
                alt="Screenshot of HomeTask on an iPhone-sized screen, showing the welcome view and a choice of starting schedule."
                className="mx-auto h-auto w-full max-w-sm border-t border-line bg-ink"
                width={390}
                height={844}
              />
            </article>

            <article className="reveal overflow-hidden rounded-3xl border border-line bg-white">
              <div className="p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                    Side project · Built with AI
                  </span>
                  <span className="font-mono text-[11px] text-muted">Travel guide</span>
                </div>
                <h3 className="mt-6 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                  England Trip Companion, a reservation-aware travel guide built with AI
                </h3>
                <p className="mt-2 text-[17px] font-medium leading-snug text-ink">
                  Turns scattered trip bookings into one clear daily plan.
                </p>
                <p className="mt-4 max-w-3xl leading-relaxed text-ink-2">
                  I built this with ChatGPT for an eight-person, twelve-day family trip to England. It turned
                  scattered bookings into one clear daily plan, kept what was confirmed separate from what
                  wasn&apos;t, and kept private details like codes and booking numbers off the site. It&apos;s a small
                  project, but it&apos;s how I like to use AI: practical, honest about what isn&apos;t verified, and
                  built for real people.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="https://england-trip-companion.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
                  >
                    Live site <Arrow />
                  </a>
                  <a
                    href="https://github.com/XBitcoinBytes/england-trip-companion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink/40"
                  >
                    GitHub <Arrow />
                  </a>
                </div>
              </div>
              <img
                src="/projects/england-trip-companion.webp"
                alt="Screenshot of the England Trip Companion, showing the trip overview and a day-by-day plan."
                className="h-auto w-full border-t border-line"
                width={1920}
                height={2541}
              />
            </article>
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
                I&apos;m looking for a full-time role where mortgage experience and an AI mindset
                both matter — product, operations, enablement, or borrower experience.
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
          <p className="font-mono text-xs">Mortgage × AI · Michigan</p>
        </div>
      </footer>
    </>
  );
}
