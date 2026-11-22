import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { RoadmapGuide } from "@/components/RoadmapGuide";
import { guardrails, sources, useCases, type SourceId } from "@/content/lenderRoadmap";

const description =
  "A practical, compliance-aware AI roadmap for mortgage lenders, with two interactive paths: getting started, and scaling AI already in use.";

export const metadata: Metadata = {
  title: "Lender AI Roadmap · Shaun Barry",
  description,
  openGraph: { title: "Lender AI Roadmap", description, type: "article" },
  twitter: { card: "summary_large_image", title: "Lender AI Roadmap", description },
};

function Kicker({ children, id }: { children: ReactNode; id?: string }) {
  return <h2 id={id} className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{children}</h2>;
}

function Cites({ ids }: { ids: SourceId[] }) {
  return (
    <span className="block text-xs">
      {ids.map((id, i) => (
        <span key={id}>
          {i > 0 && " · "}
          <a href={sources[id].url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
            {sources[id].label.split(" (")[0].split(":")[0]}
          </a>
        </span>
      ))}
    </span>
  );
}

const buildBuy = [
  { opt: "Configure", when: "Your LOS, POS or document vendor already ships the feature", watch: "Read the AI terms; get model-change notices", pick: "Default for first use cases" },
  { opt: "Buy", when: "Commodity tasks: document extraction, call notes, QC flags", watch: "Vendor diligence questions; exit plan; GSE vendor-oversight duty", pick: "Most lenders, most use cases" },
  { opt: "Build (thin layer)", when: "Your own policies, overlays and workflows are the differentiator", watch: "You own testing, monitoring and security", pick: "Internal Q&A, workflow glue" },
  { opt: "Build (model)", when: "Credit, pricing or proprietary risk models", watch: "Needs validation, fair lending testing and explainable reasons", pick: "Only with model risk capacity" },
];

const change = [
  ["Say what it's for", "Name the task it takes off people's plates, and say plainly whether roles change."],
  ["Champions, not mandates", "One respected user per team; their edits shape the prompts and templates."],
  ["Train the 'never' list", "Borrower data rules, disclosures, credit decisions: what AI must never do."],
  ["Don't grade people on usage", "Measure outcomes (time, quality), not how often someone clicks the AI button."],
  ["Close the loop", "A two-minute way to report a bad output, with a visible fix log."],
];

export default function LenderAiRoadmapPage() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <Nav />
      <main id="main" className="relative overflow-x-clip pt-28 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
          <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            <Link href="/#projects" className="transition-colors hover:text-ink">← Projects</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-2">Lender AI Roadmap</span>
          </nav>

          <header className="mt-8 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Industry playbook · Draft v1 · Rules checked Nov 22, 2026</p>
            <h1 className="mt-4 font-serif text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.02] tracking-tight">Lender AI Roadmap</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-2">
              A step-by-step plan for mortgage lenders to adopt AI without creating fair lending, disclosure or privacy problems.
              Pick your starting point, then work through each step: what to do, who owns it, when it&apos;s done, and the rule behind it.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-2">
              <span className="font-semibold text-ink">Why I built this:</span> after 25+ years originating loans, I build and test AI tools for
              mortgage work, and this is the plan I&apos;d want a lender to follow first. I&apos;m Shaun Barry, currently licensed in 36 states plus DC (NMLS #30170).
            </p>
            <ul className="mt-5 flex flex-wrap gap-2 text-sm">
              <li><a href="#guide" className="rounded-full bg-ink px-4 py-2 font-semibold text-paper hover:bg-accent">Start the guide</a></li>
              <li><a href="#use-cases" className="rounded-full border border-line px-4 py-2 hover:border-accent">Use cases by value and risk</a></li>
              <li><a href="#guardrails" className="rounded-full border border-line px-4 py-2 hover:border-accent">Compliance guardrails</a></li>
              <li><a href="#sources" className="rounded-full border border-line px-4 py-2 hover:border-accent">Sources</a></li>
            </ul>
          </header>

          <section aria-label="What changed in 2026" className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ["GSE AI governance: next deadline Jan 18, 2027", "Freddie Mac has required an AI governance framework since Mar 3, 2026. Fannie Mae's updated Supplement adds Section 4 controls (it calls AI \"Super Intelligence\"), required by Jan 18, 2027: a use-case inventory, testing, monitoring, change management, security risks such as prompt injection, and third-party AI."],
              ["SR 11-7 was replaced", "April 2026 interagency model risk guidance is risk-based and puts generative and agentic AI out of scope."],
              ["Regulation B changed; adverse action didn't", "An Apr 22, 2026 amendment (effective Jul 21) removed the effects test. The §1002.9 adverse-action rules are unchanged, and the CFPB's AI circulars stay withdrawn (May 12, 2025)."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-line bg-white/70 p-5">
                <p className="font-semibold">{t}</p>
                <p className="mt-1 text-sm text-ink-2">{d}</p>
              </div>
            ))}
          </section>

          <div className="mt-10">
            <RoadmapGuide />
          </div>

          <section id="use-cases" aria-labelledby="uc-h" className="mt-14 scroll-mt-28">
            <Kicker id="uc-h">Use cases ranked by value and risk</Kicker>
            <p className="mt-3 max-w-3xl text-ink-2">Ratings are my judgment for a typical lender, not measured results. Tier 3 is where to start; Tier 1 needs full model risk and fair lending controls.</p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-line bg-white" tabIndex={0} role="region" aria-label="Use cases table (scrolls sideways)">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-b border-line bg-paper/60"><tr><th className="p-3">Use case</th><th className="p-3">Tier</th><th className="p-3">Value</th><th className="p-3">Risk</th><th className="p-3">Minimum controls</th><th className="p-3">Rules</th></tr></thead>
                <tbody>
                  {[...useCases].sort((a, b) => b.tier - a.tier).map((u) => (
                    <tr key={u.name} className="border-b border-line align-top last:border-0">
                      <td className="p-3"><span className="font-medium">{u.name}</span><span className="block text-xs text-muted">{u.example}</span>{u.proof ? <a href={u.proof.href} className="mt-1 block text-xs font-medium text-accent underline-offset-4 hover:underline">{u.proof.label} →</a> : null}</td>
                      <td className="p-3 font-mono">{u.tier}</td><td className="p-3">{u.value}</td><td className="p-3">{u.risk}</td>
                      <td className="p-3">{u.controls}</td><td className="p-3"><Cites ids={u.rules} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="guardrails" aria-labelledby="gr-h" className="mt-14 scroll-mt-28">
            <Kicker id="gr-h">Compliance guardrails</Kicker>
            <p className="mt-3 max-w-3xl text-ink-2">What each rule means for AI and the minimum control. Plain-English summaries, not legal advice. Have counsel confirm how they apply to you.</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {guardrails.map((g) => (
                <article key={g.area} className="rounded-2xl border border-line bg-white p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{g.rule}</p>
                  <h3 className="mt-1 font-semibold">{g.area}</h3>
                  <p className="mt-2 text-sm text-ink-2">{g.meaning}</p>
                  <p className="mt-2 text-sm"><span className="font-semibold">Control:</span> {g.control}</p>
                  <div className="mt-3"><Cites ids={g.src} /></div>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="bb-h" className="mt-14">
            <Kicker id="bb-h">Build, buy or configure</Kicker>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-line bg-white" tabIndex={0} role="region" aria-label="Build, buy or configure table (scrolls sideways)">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-line bg-paper/60"><tr><th className="p-3">Option</th><th className="p-3">When it fits</th><th className="p-3">What you take on</th><th className="p-3">Typical pick</th></tr></thead>
                <tbody>{buildBuy.map((b) => (<tr key={b.opt} className="border-b border-line last:border-0"><td className="p-3 font-medium">{b.opt}</td><td className="p-3">{b.when}</td><td className="p-3">{b.watch}</td><td className="p-3 text-ink-2">{b.pick}</td></tr>))}</tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="cm-h" className="mt-14">
            <Kicker id="cm-h">Change management</Kicker>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {change.map(([t, d]) => (<li key={t} className="rounded-2xl border border-line bg-white p-4"><p className="font-semibold">{t}</p><p className="mt-1 text-sm text-ink-2">{d}</p></li>))}
            </ul>
          </section>

          <section id="sources" aria-labelledby="src-h" className="mt-14 scroll-mt-28 rounded-3xl border border-line bg-white p-7 sm:p-9">
            <Kicker id="src-h">Sources (open primary sources)</Kicker>
            <ol className="mt-4 grid list-decimal gap-x-8 gap-y-1.5 pl-5 text-sm md:grid-cols-2">
              {Object.values(sources).map((s) => (
                <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-accent">{s.label}</a></li>
              ))}
            </ol>
            <p className="mt-6 max-w-3xl text-sm text-muted">
              Written by Shaun Barry, a mortgage professional currently licensed in 36 states plus DC (NMLS #30170). This is general information, not legal advice.
              Regulatory status was checked against the sources above on Nov 22, 2026; guidance changes, so confirm current versions before relying on them.
            </p>
          </section>
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
