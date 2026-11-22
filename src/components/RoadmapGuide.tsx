"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  decisionRights,
  integrationPatterns,
  maturityDimensions,
  paths,
  readinessQuestions,
  scorecard,
  sources,
  useCases,
  vendorQuestions,
  type Path,
  type SourceId,
} from "@/content/lenderRoadmap";

type PathId = Path["id"];

function parseHash(): { path: PathId | null; step: number } {
  if (typeof window === "undefined") return { path: null, step: 0 };
  const m = window.location.hash.match(/^#guide-(new|scale)(?:-(\d+))?$/);
  if (!m) return { path: null, step: 0 };
  const path = m[1] as PathId;
  const max = paths.find((p) => p.id === path)!.steps.length;
  const n = Math.min(Math.max(Number(m[2] ?? 1), 1), max);
  return { path, step: n - 1 };
}

function SourceLinks({ ids }: { ids: SourceId[] }) {
  return (
    <ul className="mt-2 space-y-1 text-sm">
      {ids.map((id) => (
        <li key={id}>
          <a href={sources[id].url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2 hover:text-ink">
            {sources[id].label}
          </a>
        </li>
      ))}
    </ul>
  );
}

const pill: Record<string, string> = {
  High: "bg-accent-soft text-accent",
  Medium: "bg-paper-2 text-ink-2",
  Lower: "bg-paper-2 text-muted",
  Low: "bg-accent-soft text-accent",
  RiskMedium: "bg-[#fbeed6] text-[#7a4b00]",
  RiskHigh: "bg-[#f7dcdc] text-[#8a1f1f]",
};

function UseCaseTable({ mode }: { mode: PathId }) {
  const rows = useCases.filter((u) => (mode === "new" ? u.tier === 3 || u.risk !== "High" : u.tier !== 3));
  return (
    <div className="mt-4">
      <p className="text-xs text-muted">
        {mode === "new" ? "Start with Tier 3 (internal). Tier 2 comes after your first rollout holds." : "Next waves: Tier 2, then Tier 1 with full controls."} Value and risk ratings are my judgment, not measured results.
      </p>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {rows.map((u) => (
          <li key={u.name} className={`rounded-2xl border p-4 ${u.tier === 3 ? "border-accent/40 bg-accent-soft/40" : "border-line bg-white"}`}>
            <p className="font-semibold leading-snug">{u.name}</p>
            <p className="mt-1 text-sm text-ink-2">{u.example}</p>
            <p className="mt-2 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em]">
              <span className="rounded-full bg-ink px-2 py-0.5 text-paper">Tier {u.tier}</span>
              <span className={`rounded-full px-2 py-0.5 ${pill[u.value]}`}>Value: {u.value}</span>
              <span className={`rounded-full px-2 py-0.5 ${u.risk === "Low" ? pill.Low : u.risk === "Medium" ? pill.RiskMedium : pill.RiskHigh}`}>Risk: {u.risk}</span>
            </p>
            <p className="mt-2 text-sm"><span className="font-semibold">Controls:</span> {u.controls}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Readiness() {
  const [checked, setChecked] = useState<boolean[]>(() => readinessQuestions.map(() => false));
  const score = checked.filter(Boolean).length;
  const verdict =
    score <= 3
      ? "Start with ownership and an interim data rule before any tool."
      : score <= 7
        ? "Ready for one internal pilot once the unchecked items have owners."
        : "Ready to pilot. Keep the unchecked items on the pilot's risk list.";
  return (
    <fieldset className="mt-4 rounded-2xl border border-line bg-white p-4 sm:p-5">
      <legend className="px-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Readiness check: tick what&apos;s true today</legend>
      <ul className="grid gap-2 sm:grid-cols-2">
        {readinessQuestions.map((q, i) => (
          <li key={q}>
            <label className="flex cursor-pointer items-start gap-3 rounded-xl p-2 text-sm hover:bg-paper">
              <input
                type="checkbox"
                className="mt-0.5 size-4 accent-[var(--color-accent)]"
                checked={checked[i]}
                onChange={() => setChecked((c) => c.map((v, j) => (j === i ? !v : v)))}
              />
              <span>{q}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="mt-3 rounded-xl bg-paper p-3 text-sm" aria-live="polite">
        <strong>{score} of {readinessQuestions.length}.</strong> {verdict}
      </p>
    </fieldset>
  );
}

function Maturity() {
  const [scores, setScores] = useState<Record<string, number>>({});
  const done = Object.keys(scores).length === maturityDimensions.length;
  const lowest = done ? maturityDimensions.reduce((a, b) => (scores[b.id] < scores[a.id] ? b : a)) : null;
  return (
    <div className="mt-4 space-y-3">
      {maturityDimensions.map((d) => (
        <fieldset key={d.id} className="rounded-2xl border border-line bg-white p-4">
          <legend className="px-1 text-sm font-semibold">{d.name}</legend>
          <div className="mt-1 grid gap-2 sm:grid-cols-4">
            {d.levels.map((l, i) => (
              <label key={l} className={`flex cursor-pointer items-start gap-2 rounded-xl border p-2.5 text-sm ${scores[d.id] === i + 1 ? "border-accent bg-accent-soft/50" : "border-line hover:bg-paper"}`}>
                <input type="radio" name={`m-${d.id}`} className="mt-0.5 accent-[var(--color-accent)]" checked={scores[d.id] === i + 1} onChange={() => setScores((s) => ({ ...s, [d.id]: i + 1 }))} />
                <span><span className="font-mono text-xs text-muted">{i + 1}</span> {l}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <p className="rounded-xl bg-paper p-3 text-sm" aria-live="polite">
        {lowest ? (
          <>
            <strong>Your constraint: {lowest.name} (level {scores[lowest.id]}).</strong> Fix this before adding use cases. The next level looks like: “{lowest.levels[Math.min(scores[lowest.id], 3)]}”.
          </>
        ) : (
          `Score all five to see your constraint (${Object.keys(scores).length} of 5 done).`
        )}
      </p>
    </div>
  );
}

function Roi() {
  const [v, setV] = useState({ loans: 200, minutes: 20, rate: 45, adoption: 60, cost: 2500 });
  const hours = (v.loans * v.minutes * (v.adoption / 100)) / 60;
  const gross = hours * v.rate;
  const net = gross - v.cost;
  const fields: [keyof typeof v, string, string][] = [
    ["loans", "Loans per month in scope", ""],
    ["minutes", "Minutes saved per loan (measure in pilot)", ""],
    ["rate", "Loaded cost per staff hour ($)", ""],
    ["adoption", "Share of loans where it's actually used (%)", ""],
    ["cost", "Tool and support cost per month ($)", ""],
  ];
  const fmt = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  return (
    <div className="mt-4 rounded-2xl border border-line bg-white p-4 sm:p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">ROI worksheet: your numbers</p>
      <p className="mt-1 text-xs text-muted">The starting values are placeholders to overwrite, not benchmarks or results.</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-5">
        {fields.map(([k, label]) => (
          <label key={k} className="text-sm">
            <span className="block text-ink-2">{label}</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              value={v[k]}
              onChange={(e) => setV((s) => ({ ...s, [k]: Math.max(0, Number(e.target.value) || 0) }))}
              className="mt-1 w-full rounded-lg border border-line bg-paper px-2 py-1.5 font-mono"
            />
          </label>
        ))}
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3" aria-live="polite">
        <div className="rounded-xl bg-paper p-3"><dt className="text-muted">Staff hours freed / month</dt><dd className="font-serif text-2xl">{fmt(hours)}</dd></div>
        <div className="rounded-xl bg-paper p-3"><dt className="text-muted">Value if that time is reused</dt><dd className="font-serif text-2xl">${fmt(gross)}</dd></div>
        <div className="rounded-xl bg-paper p-3"><dt className="text-muted">Net of tool cost</dt><dd className={`font-serif text-2xl ${net < 0 ? "text-[#8a1f1f]" : ""}`}>{net < 0 ? "−" : ""}${fmt(Math.abs(net))}</dd></div>
      </dl>
      <p className="mt-3 text-xs text-muted">Formula: loans × minutes saved × adoption ÷ 60 × hourly cost − tool cost. Leaves out quality gains (fewer cures, fewer defects), which you should measure separately.</p>
    </div>
  );
}

function Widget({ kind, mode }: { kind: NonNullable<Path["steps"][number]["widget"]>; mode: PathId }) {
  switch (kind) {
    case "readiness":
      return <Readiness />;
    case "maturity":
      return <Maturity />;
    case "roi":
      return <Roi />;
    case "usecases":
      return <UseCaseTable mode={mode} />;
    case "vendor":
      return (
        <ol className="mt-4 list-decimal space-y-1.5 rounded-2xl border border-line bg-white p-4 pl-9 text-sm sm:p-5 sm:pl-10">
          {vendorQuestions.map((q) => <li key={q}>{q}</li>)}
        </ol>
      );
    case "decisionRights":
      return (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[520px] text-left text-sm">
            <caption className="px-4 pt-3 text-left font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Who decides: human-in-the-loop rules</caption>
            <thead><tr className="border-b border-line"><th className="p-3">Task</th><th className="p-3">AI may</th><th className="p-3">Human</th></tr></thead>
            <tbody>
              {decisionRights.map((r) => (
                <tr key={r.task} className="border-b border-line last:border-0"><td className="p-3 font-medium">{r.task}</td><td className="p-3">{r.ai}</td><td className="p-3 text-ink-2">{r.human}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "integration":
      return (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {integrationPatterns.map((p) => (
            <li key={p.name} className={`rounded-2xl border p-4 ${p.fit === "Avoid" ? "border-[#e8b9b9] bg-[#fbf1f1]" : "border-line bg-white"}`}>
              <p className="font-semibold">{p.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Best for: {p.fit}</p>
              <p className="mt-1 text-sm text-ink-2">{p.note}</p>
            </li>
          ))}
        </ul>
      );
    case "scorecard":
      return (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {scorecard.map((g) => (
            <div key={g.group} className="rounded-2xl border border-line bg-white p-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{g.group}</p>
              <ul className="mt-2 space-y-1 text-sm">{g.items.map((i) => <li key={i}>— {i}</li>)}</ul>
            </div>
          ))}
        </div>
      );
  }
}

export function RoadmapGuide() {
  const [path, setPath] = useState<PathId | null>(null);
  const [step, setStep] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  useEffect(() => {
    const sync = () => {
      const h = parseHash();
      setPath(h.path);
      setStep(h.step);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const current = useMemo(() => paths.find((p) => p.id === path) ?? null, [path]);

  const go = useCallback((p: PathId | null, s: number) => {
    moved.current = true;
    setPath(p);
    setStep(s);
    const hash = p ? `#guide-${p}-${s + 1}` : "#guide";
    window.history.replaceState(null, "", hash);
  }, []);

  useEffect(() => {
    if (moved.current) {
      headingRef.current?.focus({ preventScroll: true });
      headingRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
      moved.current = false;
    }
    const pill = document.querySelector<HTMLElement>('#guide [aria-current="step"]');
    const rail = pill?.closest("nav");
    if (pill && rail) rail.scrollLeft = pill.offsetLeft - rail.clientWidth / 2 + pill.clientWidth / 2;
  }, [path, step]);

  const onKey = (e: React.KeyboardEvent) => {
    if (!current) return;
    const t = e.target as HTMLElement;
    if (["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName)) return;
    if (e.key === "ArrowRight" && step < current.steps.length - 1) go(current.id, step + 1);
    if (e.key === "ArrowLeft" && step > 0) go(current.id, step - 1);
  };

  if (!current) {
    return (
      <section id="guide" aria-labelledby="guide-choose" className="scroll-mt-28 rounded-3xl border border-line bg-white p-6 sm:p-9">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Interactive guide</p>
        <h2 id="guide-choose" ref={headingRef} tabIndex={-1} className="mt-3 scroll-mt-32 font-serif text-3xl tracking-tight outline-none sm:text-4xl">
          Where is your company today?
        </h2>
        <p className="mt-2 max-w-2xl text-ink-2">Pick one. You can switch paths at any time, and each step links to the rule behind it.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {paths.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => go(p.id, 0)}
              className="group rounded-2xl border border-line bg-paper p-6 text-left transition hover:border-accent hover:bg-accent-soft/40 focus-visible:border-accent"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{p.steps.length} steps</span>
              <span className="mt-2 block font-serif text-2xl">{p.label}</span>
              <span className="mt-2 block text-sm text-ink-2">{p.who}</span>
              <span className="mt-3 block text-sm">{p.promise}</span>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">Start this path →</span>
            </button>
          ))}
        </div>
      </section>
    );
  }

  const s = current.steps[step];
  const other = paths.find((p) => p.id !== current.id)!;
  const pct = Math.round(((step + 1) / current.steps.length) * 100);

  return (
    <section id="guide" aria-labelledby="guide-step" onKeyDown={onKey} className="scroll-mt-28 rounded-3xl border border-line bg-white p-5 sm:p-9">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Path: {current.label}</p>
        <div className="flex gap-2 text-sm">
          <button type="button" onClick={() => go(other.id, 0)} className="rounded-full border border-line px-3 py-1 hover:border-accent">Switch to “{other.label}”</button>
          <button type="button" onClick={() => go(null, 0)} className="rounded-full border border-line px-3 py-1 hover:border-accent">Start over</button>
        </div>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-paper-2" role="progressbar" aria-label="Progress through this path" aria-valuemin={1} aria-valuemax={current.steps.length} aria-valuenow={step + 1} aria-valuetext={`Step ${step + 1} of ${current.steps.length}`}>
        <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${pct}%` }} />
      </div>

      <nav aria-label="Steps in this path" className="-mx-1 mt-4 overflow-x-auto pb-1">
        <ol className="flex min-w-max gap-1.5 px-1 lg:min-w-0 lg:flex-wrap">
          {current.steps.map((st, i) => (
            <li key={st.id}>
              <button
                type="button"
                onClick={() => go(current.id, i)}
                aria-current={i === step ? "step" : undefined}
                className={`rounded-full border px-3 py-1.5 text-xs sm:text-sm ${i === step ? "border-ink bg-ink text-paper" : i < step ? "border-accent/50 bg-accent-soft/50 text-accent" : "border-line text-ink-2 hover:border-accent"}`}
              >
                <span className="font-mono">{i + 1}</span> {st.title}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-6" aria-live="polite">
        <p className="font-mono text-xs text-muted">Step {step + 1} of {current.steps.length}</p>
        <h2 id="guide-step" ref={headingRef} tabIndex={-1} className="mt-1 scroll-mt-32 font-serif text-3xl leading-tight tracking-tight outline-none sm:text-4xl">
          {s.title}
        </h2>
        <p className="mt-3 max-w-3xl text-[17px] leading-relaxed text-ink-2">{s.why}</p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">What to do</h3>
          <ol className="mt-2 space-y-2">
            {s.doThis.map((d, i) => (
              <li key={d} className="flex gap-3"><span className="mt-0.5 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span><span>{d}</span></li>
            ))}
          </ol>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl bg-paper p-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Owner</h3>
            <p className="mt-1 text-sm">{s.owner}</p>
            <h3 className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Done when</h3>
            <ul className="mt-1 space-y-1 text-sm">{s.doneWhen.map((d) => <li key={d}>✓ {d}</li>)}</ul>
          </div>
          <div className="rounded-2xl border border-[#ecd3a6] bg-[#fdf6e9] p-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#7a4b00]">Compliance watch-out</h3>
            <p className="mt-1 text-sm">{s.watchOut}</p>
            <SourceLinks ids={s.sources} />
          </div>
        </div>
      </div>

      {s.widget && <Widget kind={s.widget} mode={current.id} />}

      <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-5">
        <button type="button" onClick={() => go(current.id, step - 1)} disabled={step === 0} className="rounded-full border border-line px-4 py-2 text-sm disabled:opacity-40">
          ← Back
        </button>
        <p className="hidden text-xs text-muted sm:block">Tip: ← and → keys move between steps</p>
        {step < current.steps.length - 1 ? (
          <button type="button" onClick={() => go(current.id, step + 1)} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-accent">
            <span className="sm:hidden">Next →</span>
            <span className="hidden sm:inline">Next: {current.steps[step + 1].title} →</span>
          </button>
        ) : (
          <button type="button" onClick={() => go(other.id, 0)} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-paper">
            {current.id === "new" ? "Next: the scaling path →" : "See the starter path →"}
          </button>
        )}
      </div>
    </section>
  );
}
