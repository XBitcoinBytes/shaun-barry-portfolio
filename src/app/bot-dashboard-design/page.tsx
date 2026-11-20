import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Arrow } from "@/components/ui";

const description =
  "A product-design case study: the one-file design blueprint behind Bot Tracker, with the questions asked, the decisions made, and what was left open.";

export const metadata: Metadata = {
  title: "Bot Dashboard design blueprint · Shaun Barry",
  description,
  openGraph: { title: "Bot Dashboard: the design blueprint", description, type: "article" },
  twitter: { card: "summary_large_image", title: "Bot Dashboard: the design blueprint", description },
};

function Kicker({ children }: { children: ReactNode }) {
  return <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{children}</h2>;
}

const questions: [string, string][] = [
  ["Who is it for, and what should they feel?", "Employers and visitors glancing at a portfolio. It should feel busy, polished and high-end within seconds, and never look idle or offline."],
  ["How do you show an AI team without exposing its work?", "Show how the team works, not what it works on. Viewers never see my prompts, and the activity is a replay modeled on a real busy stretch, not a live feed."],
  ["What does a bot look like?", "A character, not a dot on a chart: each bot gets its own shape, color and name, so the team reads as people at desks."],
  ["How much should a visitor be able to do?", "As little as possible. Instant load, no intro animation, no sound, no click-through."],
  ["What does an error look like?", "Honest, in plain words on a small plaque, for example “Ara says fail, bot retries.”"],
  ["Does it work on a phone?", "Yes, as a first-class view, with a bottom bar instead of a menu."],
];

const decisions: [string, string[]][] = [
  ["The room", [
    "Open-roof, bird's-eye view on a charcoal background, so the bots are the brightest things on screen.",
    "Light comes only from desk lamps, a soft window glow and a still fish tank in a quiet corner, with a few plants.",
    "Sixteen desks in clusters of four with dividers. The chief of staff has a larger head desk facing the room; five desks are active, four are ready, and seven are unused (closed laptop, soft lamp, no mug).",
  ]],
  ["Bots as characters", [
    "Metallic figures that reuse the shape and color family of the app's own bot avatars, each with a slightly different reflective finish.",
    "Name above each bot as plain text with no bubble, soft shadow underneath, and eyes that glance and blink.",
    "Early drafts said “blobs.” I corrected that after seeing the real avatars: same shapes, more polish.",
  ]],
  ["Messages and motion", [
    "The sending bot walks over and delivers each message, with a short verb-phrase label on a dark plaque.",
    "Four scripted five-minute loops, served at random, ending on a hard cut. No dead moments: some bots work quietly while others talk, look out the window or stare at the fish tank, then they rotate.",
    "Even visits with no messages show life: bots chat with a coworker or step away, scripted but varied like a real office.",
  ]],
  ["Interaction, kept deliberately small", [
    "No click-a-bot behavior and no prompt history. Prompts are never shown to viewers.",
    "The sidebar is an instrument panel: gauges and bot names that reflect what is happening right now.",
    "A small decorative icon logo in a corner, reused as the favicon. No link, no sound, no Easter eggs.",
  ]],
];

const open: [string, string][] = [
  ["The name", "“Bot Tracker” is the working name. A better one may come."],
  ["Status indicator", "The chief of staff's green status dot in the app is left out of the office for now."],
  ["Replay vs. real data", "The original brief wanted real usage and token metrics per bot. v1 is a replay modeled on real activity, not live data; going live would need a safe, summarized feed."],
  ["Hosting", "It lives on a default Vercel address with no custom domain yet, and deploys are manual."],
];

export default function BotDashboardDesignPage() {
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
        <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
          <nav aria-label="Breadcrumb" className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            <Link href="/#side-projects" className="transition-colors hover:text-ink">
              ← Side projects
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-2">Bot dashboard design</span>
          </nav>

          <header className="mt-8 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Case study · Product design · Nov 15, 2026</p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">
              Bot Dashboard: the design blueprint
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-2">
              How I approach product design before building: write down the questions, make each decision on purpose,
              and keep an honest list of what is still open. This is the one-file spec behind Bot Tracker, a live
              animated office view of my AI agent team.
            </p>
          </header>

          <p role="note" className="mt-8 rounded-2xl border border-btc/40 bg-btc/[0.08] px-5 py-4 text-sm leading-relaxed text-ink-2">
            <strong className="font-semibold text-ink">Status:</strong> the blueprint was written on Nov 15, 2026,
            before any code. Bot Tracker v1 was built from it that evening and is live. Details here are generic by
            design: no prompts, client information or private project data.
          </p>

          <section className="mt-14 border-t border-line pt-12">
            <Kicker>The questions I asked first</Kicker>
            <dl className="mt-6 grid gap-4 md:grid-cols-2">
              {questions.map(([q, a]) => (
                <div key={q} className="rounded-2xl border border-line bg-white p-5">
                  <dt className="font-semibold tracking-tight text-ink">{q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-2">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-14 border-t border-line pt-12">
            <Kicker>Decisions I made</Kicker>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {decisions.map(([t, items]) => (
                <div key={t} className="rounded-2xl border border-line bg-white p-6">
                  <h3 className="font-serif text-2xl tracking-tight">{t}</h3>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-2">
                    {items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 border-t border-line pt-12">
            <Kicker>Still open</Kicker>
            <dl className="mt-6 grid gap-4 md:grid-cols-2">
              {open.map(([q, a]) => (
                <div key={q} className="rounded-2xl border border-dashed border-ink/25 p-5">
                  <dt className="font-semibold tracking-tight text-ink">{q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-ink-2">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-14 rounded-3xl border border-line bg-white p-7 sm:p-9">
            <Kicker>See what it became</Kicker>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink-2">
              The built version is Bot Tracker, with a live site and public repository.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://bot-tracker-bitcoin-bytes-travel.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent"
              >
                Live site <Arrow />
              </a>
              <Link
                href="/#side-projects"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink/40"
              >
                Back to side projects
              </Link>
            </div>
          </section>
        </div>
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
