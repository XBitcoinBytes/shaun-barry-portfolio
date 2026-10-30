"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import {
  borrower,
  cashToClose,
  closingCosts,
  compareQuestions,
  hotspots,
  loanCosts,
  monthlyPI,
  offers,
  originationTotal,
  otherCosts,
  pct,
  totalMonthly,
  totalPaid,
  usd,
  type Flag,
  type Hotspot,
  type Offer,
} from "@/content/loanEstimateSample";

type Mode = "explore" | "compare";
type Question = { key: string; text: string; source: string; done: boolean };
type CopyState = "idle" | "copied" | "error";

const flagMeta: Record<Flag, { label: string; chip: string; dot: string }> = {
  ask: { label: "Worth a question", chip: "bg-btc/20 text-[#ffd49a]", dot: "bg-btc" },
  key: { label: "Key number", chip: "bg-paper/10 text-paper/80", dot: "bg-paper/70" },
  good: { label: "Looks standard", chip: "bg-accent-2/30 text-accent-soft", dot: "bg-accent-2" },
};

const byId = Object.fromEntries(hotspots.map((h) => [h.id, h])) as Record<string, Hotspot>;

const isNarrow = () => typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches;
const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =====================================================================
   Main
   ===================================================================== */

export function LoanEstimateAdvisor() {
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState<Mode>("explore");
  const [page, setPage] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [visited, setVisited] = useState<string[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [demoInView, setDemoInView] = useState(false);
  const advisorRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const offer = offers.A;
  const complete = visited.length === hotspots.length;
  const compareAdded = compareQuestions.every((_, i) => questions.some((q) => q.key === `cmp-${i}`));

  const addQuestion = useCallback((key: string, text: string, source: string) => {
    setQuestions((qs) => (qs.some((q) => q.key === key) ? qs : [...qs, { key, text, source, done: false }]));
  }, []);

  /** Make sure the advisor is visible after a selection changes. */
  const revealAdvisor = useCallback(() => {
    if (typeof window === "undefined") return;
    if (isNarrow()) {
      setSheetOpen(true); // bottom sheet on phones / tablets
      return;
    }
    requestAnimationFrame(() => {
      const el = advisorRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const offscreen = r.top < 64 || r.top > window.innerHeight - 160;
      if (offscreen) {
        el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
        headingRef.current?.focus({ preventScroll: true });
      }
    });
  }, []);

  const select = useCallback(
    (id: string) => {
      const h = byId[id];
      if (!h) return;
      setSelected(id);
      setPage(h.page);
      setVisited((v) => (v.includes(id) ? v : [...v, id]));
      addQuestion(id, h.ask, h.label);
      revealAdvisor();
    },
    [addQuestion, revealAdvisor],
  );

  const start = (m: Mode) => {
    setStarted(true);
    setMode(m);
    requestAnimationFrame(() =>
      demoRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" }),
    );
  };

  const reset = () => {
    setSelected(null);
    setVisited([]);
    setQuestions([]);
    setPage(1);
    setMode("explore");
    setSheetOpen(false);
    setCopyState("idle");
    setStarted(false);
  };

  const idx = selected ? hotspots.findIndex((h) => h.id === selected) : -1;
  const goStep = (d: 1 | -1) => {
    const nextIdx = idx < 0 ? (d === 1 ? 0 : hotspots.length - 1) : (idx + d + hotspots.length) % hotspots.length;
    select(hotspots[nextIdx].id);
  };

  const copyList = async () => {
    const text = [
      "Questions for my lender (from the Loan Estimate Advisor demo):",
      ...questions.map((q, i) => `${i + 1}. ${q.text}`),
    ].join("\n");
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      // fallback for browsers without async clipboard permission
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    setCopyState(ok ? "copied" : "error");
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState("idle"), 2400);
  };

  // keyboard: ← / → step through lines while exploring
  useEffect(() => {
    if (!started || mode !== "explore") return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName)) return;
      if (e.key === "ArrowRight") goStep(1);
      if (e.key === "ArrowLeft") goStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // only show the phone bottom sheet while the demo is on screen
  useEffect(() => {
    if (!started) return;
    const el = demoRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setDemoInView(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  const panelProps = {
    hotspot: selected ? byId[selected] : null,
    offer,
    step: idx + 1,
    onPrev: () => goStep(-1),
    onNext: () => goStep(1),
    complete,
    questionCount: questions.length,
    onCopy: copyList,
    copyState,
  };

  return (
    <div>
      {/* ---------- Intro / start ---------- */}
      <StartCard started={started} onStart={start} />

      {started ? (
        <div ref={demoRef} className="mt-10 scroll-mt-24">
          {/* mode switch + progress */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div role="tablist" aria-label="Demo mode" className="inline-flex rounded-full border border-line bg-white p-1">
              {(
                [
                  ["explore", "Explore the estimate"],
                  ["compare", "Compare two offers"],
                ] as const
              ).map(([m, label]) => (
                <button
                  key={m}
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => setMode(m)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    mode === m ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="min-w-44">
                <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  <span>{complete ? "All lines explored ✓" : "Lines explored"}</span>
                  <span className="tabular-nums text-ink">
                    {visited.length}/{hotspots.length}
                  </span>
                </div>
                <div
                  className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line"
                  role="progressbar"
                  aria-label="Lines explored"
                  aria-valuemin={0}
                  aria-valuemax={hotspots.length}
                  aria-valuenow={visited.length}
                >
                  <div
                    className={`h-full rounded-full transition-[width] duration-500 ${complete ? "bg-accent" : "bg-accent-2"}`}
                    style={{ width: `${(visited.length / hotspots.length) * 100}%` }}
                  />
                </div>
              </div>
              <button
                onClick={reset}
                className="rounded-full border border-ink/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-2 transition-colors hover:border-ink/40"
              >
                Restart
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            {/* left: document or compare */}
            <div className="lg:col-span-7">
              {mode === "explore" ? (
                <LoanEstimateDoc
                  offer={offer}
                  page={page}
                  setPage={setPage}
                  selected={selected}
                  visited={visited}
                  onSelect={select}
                />
              ) : (
                <CompareView
                  added={compareAdded}
                  onAddQuestions={() => compareQuestions.forEach((q, i) => addQuestion(`cmp-${i}`, q, "Compare"))}
                />
              )}
            </div>

            {/* right: advisor + questions (sticky under the fixed nav on desktop) */}
            <div className="lg:col-span-5">
              <div className="space-y-6 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:overscroll-contain lg:pb-2 [scrollbar-width:thin]">
                <div ref={advisorRef} className={`scroll-mt-20 ${mode === "explore" ? "hidden lg:block" : ""}`}>
                  {mode === "explore" ? <AdvisorPanel {...panelProps} headingRef={headingRef} /> : <CompareAdvisor />}
                </div>
                <QuestionList
                  questions={questions}
                  onToggle={(key) =>
                    setQuestions((qs) => qs.map((q) => (q.key === key ? { ...q, done: !q.done } : q)))
                  }
                  onRemove={(key) => setQuestions((qs) => qs.filter((q) => q.key !== key))}
                  onCopy={copyList}
                  copyState={copyState}
                />
              </div>
            </div>
          </div>

          {/* room for the phone bottom sheet so it never covers the last content */}
          {mode === "explore" ? <div aria-hidden className="h-20 lg:hidden" /> : null}

          {/* ---------- phone / tablet bottom sheet ---------- */}
          {mode === "explore" && demoInView ? (
            <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
              <div className="mx-auto max-w-2xl overflow-hidden rounded-t-3xl bg-ink text-paper shadow-[0_-20px_50px_-20px_rgba(18,22,28,0.55)]">
                <button
                  type="button"
                  onClick={() => setSheetOpen((o) => !o)}
                  aria-expanded={sheetOpen}
                  aria-controls="advisor-sheet"
                  className="relative flex w-full items-center justify-between gap-3 px-5 pb-3 pt-4 text-left"
                >
                  <span aria-hidden className="absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 rounded-full bg-paper/25" />
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-paper/50">
                      Advisor{selected ? ` · ${idx + 1}/${hotspots.length}` : ""}
                      {complete ? " · all explored ✓" : ""}
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {selected ? byId[selected].label : "Click a numbered line to begin"}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full border border-paper/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                    {sheetOpen ? "Hide ▾" : "Show ▴"}
                  </span>
                </button>
                {sheetOpen ? (
                  <div id="advisor-sheet" className="max-h-[62vh] overflow-y-auto overscroll-contain border-t border-paper/10">
                    <AdvisorPanel {...panelProps} variant="sheet" />
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/* =====================================================================
   Start card
   ===================================================================== */

function StartCard({ started, onStart }: { started: boolean; onStart: (m: Mode) => void }) {
  return (
    <div className="grid gap-6 rounded-3xl border border-line bg-white p-7 sm:p-9 lg:grid-cols-12 lg:items-center lg:gap-10">
      <div className="lg:col-span-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Sample borrower · {borrower.note}</p>
        <p className="mt-2 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">{borrower.names}</p>
        <p className="mt-3 max-w-lg leading-relaxed text-ink-2">
          Buying a {usd(borrower.purchasePrice)} home with 20% down. They just got their first Loan Estimate and
          aren&apos;t sure what to look at. Click through it the way a good loan officer would walk them through it.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            onClick={() => onStart("explore")}
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent"
          >
            {started ? "Back to the estimate" : "Try the demo"}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </button>
          <button
            onClick={() => onStart("compare")}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/50 px-5 py-3 text-sm font-medium transition-colors hover:border-ink/40"
          >
            Compare two offers
          </button>
        </div>
      </div>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:col-span-5">
        {[
          ["Purchase price", usd(borrower.purchasePrice)],
          ["Down payment", usd(borrower.downPayment)],
          ["Loan", "30-yr fixed · Conventional"],
          ["Property", "Anytown, MI (sample)"],
        ].map(([k, v]) => (
          <div key={k} className="bg-paper/60 p-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{k}</dt>
            <dd className="mt-1 text-sm font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* =====================================================================
   Loan Estimate document
   ===================================================================== */

function Spot({
  id,
  selected,
  visited,
  onSelect,
  children,
  className = "",
}: {
  id: string;
  selected: string | null;
  visited: string[];
  onSelect: (id: string) => void;
  children: ReactNode;
  className?: string;
}) {
  const isSel = selected === id;
  const seen = visited.includes(id);
  const h = byId[id];
  const n = hotspots.findIndex((x) => x.id === id) + 1;
  // nudge toward line 1 until the visitor opens their first line
  const hint = n === 1 && !selected && visited.length === 0;
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      aria-pressed={isSel}
      aria-label={`Line ${n}: ${h.label} — explain this line`}
      className={`group/spot relative block w-full rounded-lg pl-2 text-left outline-offset-2 transition-[background-color,box-shadow] duration-200 ${
        isSel
          ? "bg-accent-soft/70 ring-2 ring-accent"
          : "hover:bg-accent-soft/40 hover:ring-1 hover:ring-accent/40"
      } ${className}`}
    >
      <span
        aria-hidden
        className={`absolute -left-2.5 top-2 z-10 grid size-5 place-items-center rounded-full font-mono text-[9px] font-medium transition-colors sm:-left-3 ${
          isSel
            ? "bg-accent text-paper"
            : seen
              ? "bg-accent-2/20 text-accent"
              : `bg-btc text-white shadow-[0_0_0_3px_rgba(232,137,12,0.18)] ${hint ? "hint-ring" : ""}`
        }`}
      >
        {seen && !isSel ? "✓" : n}
      </span>
      {hint ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -top-3 left-4 z-10 rounded-full bg-btc px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-white shadow-sm"
        >
          Start here
        </span>
      ) : null}
      {children}
    </button>
  );
}

function DocHeading({ children }: { children: ReactNode }) {
  return (
    <h4 className="mt-6 mb-2 border-b-2 border-ink pb-1 text-[13px] font-bold uppercase tracking-wide first:mt-0">
      {children}
    </h4>
  );
}

function Row({ k, v, sub, bold }: { k: ReactNode; v: ReactNode; sub?: ReactNode; bold?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 px-3 py-2 text-[13px]">
      <div>
        <p className={bold ? "font-semibold text-ink" : "text-ink-2"}>{k}</p>
        {sub ? <p className="mt-0.5 text-[11px] text-muted">{sub}</p> : null}
      </div>
      <p className={`shrink-0 font-mono tabular-nums ${bold ? "font-semibold" : "font-medium"}`}>{v}</p>
    </div>
  );
}

function YesNo({ yes, children }: { yes: boolean; children?: ReactNode }) {
  return (
    <span className="font-sans">
      <span className={`rounded px-1 font-semibold ${yes ? "bg-btc/15" : ""}`}>{yes ? "YES" : "NO"}</span>
      {children ? <span className="ml-1 text-ink-2">{children}</span> : null}
    </span>
  );
}

function LoanEstimateDoc({
  offer,
  page,
  setPage,
  selected,
  visited,
  onSelect,
}: {
  offer: Offer;
  page: 1 | 2 | 3;
  setPage: (p: 1 | 2 | 3) => void;
  selected: string | null;
  visited: string[];
  onSelect: (id: string) => void;
}) {
  const sp = { selected, visited, onSelect };
  const pi = Math.round(monthlyPI(offer));
  const dailyInt = (offer.loanAmount * offer.rate) / 365;

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_1px_0_rgba(18,22,28,0.04),0_30px_60px_-30px_rgba(18,22,28,0.35)]">
      {/* doc toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/70 bg-paper/50 px-5 py-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Sample document · click any numbered line</p>
          <p className="text-sm font-semibold tracking-tight">Loan Estimate — {offer.lender}</p>
        </div>
        <div role="tablist" aria-label="Loan Estimate page" className="flex gap-1">
          {([1, 2, 3] as const).map((p) => {
            const total = hotspots.filter((h) => h.page === p).length;
            const seen = hotspots.filter((h) => h.page === p && visited.includes(h.id)).length;
            return (
              <button
                key={p}
                role="tab"
                aria-selected={page === p}
                onClick={() => setPage(p)}
                className={`rounded-full px-3 py-1.5 font-mono text-[11px] transition-colors ${
                  page === p ? "bg-ink text-paper" : "border border-line text-ink-2 hover:border-ink/40"
                }`}
              >
                Page {p}
                <span className={`ml-1.5 ${page === p ? "text-paper/60" : "text-muted"}`}>
                  {seen}/{total}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        {page === 1 ? (
          <div>
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="text-[13px] font-semibold">{offer.lender}</p>
                <p className="font-serif text-3xl tracking-tight">Loan Estimate</p>
              </div>
              <p className="font-mono text-[11px] text-muted">Date issued {offer.issued}</p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <dl className="space-y-1 px-3 text-[12px]">
                {[
                  ["Applicants", `${borrower.names} (fictional)`],
                  ["Property", borrower.property],
                  ["Sale price", usd(borrower.purchasePrice)],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-3">
                    <dt className="w-20 shrink-0 text-muted">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <Spot id="terms" {...sp} className="px-3 py-1.5">
                <dl className="space-y-1 text-[12px]">
                  {[
                    ["Loan term", `${offer.termYears} years`],
                    ["Purpose", borrower.purpose],
                    ["Product", borrower.product],
                    ["Loan type", borrower.loanType],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-3">
                      <dt className="w-20 shrink-0 text-muted">{k}</dt>
                      <dd className="font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Spot>
            </div>
            <Spot id="rateLock" {...sp} className="mt-3 px-3 py-2.5">
              <p className="text-[12px]">
                <span className="mr-2 text-muted">Rate lock</span>
                {offer.rateLock.locked ? (
                  <YesNo yes>until {offer.rateLock.until}</YesNo>
                ) : (
                  <span className="rounded bg-btc/15 px-1 font-semibold">NO</span>
                )}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-muted">
                Before closing, your interest rate, points, and lender credits can change unless you lock the interest
                rate. All other estimated closing costs expire on {offer.closingCostsExpire}.
              </p>
            </Spot>

            <DocHeading>Loan Terms</DocHeading>
            <div className="mb-1 flex justify-end px-3 text-[10px] uppercase tracking-wider text-muted">
              Can this amount increase after closing?
            </div>
            <div className="space-y-1">
              <Spot id="loanAmount" {...sp}>
                <Row k="Loan amount" v={<>{usd(offer.loanAmount)} · <YesNo yes={false} /></>} />
              </Spot>
              <Spot id="rate" {...sp}>
                <Row k="Interest rate" v={<>{pct(offer.rate)} · <YesNo yes={false} /></>} />
              </Spot>
              <Spot id="monthlyPI" {...sp}>
                <Row
                  k="Monthly principal & interest"
                  sub="See Projected Payments below for your estimated total monthly payment"
                  v={<>{usd(pi)} · <YesNo yes={false} /></>}
                />
              </Spot>
            </div>
            <div className="mt-2 mb-1 flex justify-end px-3 text-[10px] uppercase tracking-wider text-muted">
              Does the loan have these features?
            </div>
            <div className="space-y-1">
              <Spot id="prepay" {...sp}>
                <Row k="Prepayment penalty" v={<YesNo yes={false} />} />
              </Spot>
              <Spot id="balloon" {...sp}>
                <Row k="Balloon payment" v={<YesNo yes={false} />} />
              </Spot>
            </div>

            <DocHeading>Projected Payments</DocHeading>
            <Spot id="projected" {...sp}>
              <div className="px-3 py-2 text-[13px]">
                <p className="mb-1 text-[11px] text-muted">Years 1–30</p>
                {[
                  ["Principal & interest", usd(pi)],
                  ["Mortgage insurance", "+ $0"],
                  ["Estimated escrow", `+ ${usd(offer.monthlyEscrow)}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-0.5">
                    <span className="text-ink-2">{k}</span>
                    <span className="font-mono tabular-nums">{v}</span>
                  </div>
                ))}
                <div className="mt-1 flex justify-between border-t border-line pt-1.5 font-semibold">
                  <span>Estimated total monthly payment</span>
                  <span className="font-mono tabular-nums">{usd(totalMonthly(offer))}</span>
                </div>
                <p className="mt-1.5 text-[11px] text-muted">
                  Estimated taxes, insurance & assessments: {usd(offer.monthlyEscrow)} a month · in escrow: property
                  taxes, homeowner&apos;s insurance
                </p>
              </div>
            </Spot>

            <DocHeading>Costs at Closing</DocHeading>
            <div className="px-3 pb-1 text-[13px]">
              <div className="flex justify-between">
                <span className="text-ink-2">Estimated closing costs</span>
                <span className="font-mono tabular-nums">{usd(closingCosts(offer))}</span>
              </div>
              <p className="text-[11px] text-muted">
                Includes {usd(loanCosts(offer))} in Loan Costs + {usd(otherCosts(offer))} in Other Costs −{" "}
                {usd(offer.lenderCredits)} in Lender Credits. See page 2.
              </p>
            </div>
            <Spot id="costsAtClosing" {...sp} className="mt-1">
              <Row k="Estimated cash to close" sub="Includes closing costs. See page 2 for details." v={usd(cashToClose(offer))} bold />
            </Spot>
          </div>
        ) : null}

        {page === 2 ? (
          <div>
            <p className="font-serif text-2xl tracking-tight">Closing Cost Details</p>
            <div className="mt-4 grid gap-x-8 md:grid-cols-2">
              <div>
                <DocHeading>Loan Costs</DocHeading>
                <Spot id="origination" {...sp}>
                  <Row k="A. Origination charges" v={usd(originationTotal(offer))} bold />
                  <div className="px-3 pb-2 text-[12px] text-ink-2">
                    <div className="flex justify-between py-0.5">
                      <span>{((offer.points / offer.loanAmount) * 100).toFixed(2)}% of loan amount (points)</span>
                      <span className="font-mono">{usd(offer.points)}</span>
                    </div>
                    {offer.originationItems.map(([k, v]) => (
                      <div key={k} className="flex justify-between py-0.5">
                        <span>{k}</span>
                        <span className="font-mono">{usd(v)}</span>
                      </div>
                    ))}
                  </div>
                </Spot>
                <Spot id="cannotShop" {...sp} className="mt-1">
                  <Row k="B. Services you cannot shop for" v={usd(offer.cannotShop)} bold />
                  <Items items={[["Appraisal fee", 650], ["Credit report fee", 55], ["Flood determination", 15], ["Tax monitoring", 85]]} />
                </Spot>
                <Spot id="canShop" {...sp} className="mt-1">
                  <Row k="C. Services you can shop for" v={usd(offer.canShop)} bold />
                  <Items
                    items={[
                      ["Title – Lender’s title policy", 1_450],
                      ["Title – Settlement agent fee", 795],
                      ["Survey fee", 400],
                      ["Pest inspection", 125],
                    ]}
                  />
                </Spot>
                <div className="mt-1 rounded-lg bg-paper px-3">
                  <Row k="D. Total loan costs (A + B + C)" v={usd(loanCosts(offer))} bold />
                </div>
              </div>
              <div>
                <DocHeading>Other Costs</DocHeading>
                <div className="px-3 text-[12px]">
                  <div className="flex justify-between py-2 text-[13px] font-semibold">
                    <span>E. Taxes & other government fees</span>
                    <span className="font-mono">{usd(offer.taxesGov)}</span>
                  </div>
                  <div className="flex justify-between pb-2 text-ink-2">
                    <span>Recording fees</span>
                    <span className="font-mono">{usd(offer.taxesGov)}</span>
                  </div>
                </div>
                <Spot id="prepaidsEscrow" {...sp}>
                  <Row k="F. Prepaids" v={usd(offer.prepaids)} bold />
                  <Items
                    items={[
                      ["Homeowner’s insurance (12 mo.)", 1_680],
                      [`Prepaid interest ($${dailyInt.toFixed(2)}/day × 15 days)`, offer.prepaids - 1_680],
                    ]}
                  />
                  <Row k="G. Initial escrow payment at closing" v={usd(offer.initialEscrow)} bold />
                  <Items items={[["Homeowner’s insurance · $140/mo × 2", 280], ["Property taxes · $500/mo × 3", 1_500]]} />
                </Spot>
                <div className="mt-1 rounded-lg bg-paper px-3">
                  <Row k="I. Total other costs (E + F + G)" v={usd(otherCosts(offer))} bold />
                </div>
                <div className="mt-2 rounded-lg bg-ink/[0.04] px-3">
                  <Row k="J. Total closing costs" sub="D + I − lender credits" v={usd(closingCosts(offer))} bold />
                </div>
              </div>
            </div>

            <DocHeading>Calculating Cash to Close</DocHeading>
            <Spot id="cashCalc" {...sp}>
              <div className="px-3 py-2 text-[12px]">
                {[
                  ["Total closing costs (J)", usd(closingCosts(offer))],
                  ["Closing costs financed", "$0"],
                  ["Down payment / funds from borrower", usd(borrower.downPayment)],
                  ["Deposit", `− ${usd(borrower.deposit)}`],
                  ["Funds for borrower", "$0"],
                  ["Seller credits", "$0"],
                  ["Adjustments and other credits", "$0"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-0.5">
                    <span className="text-ink-2">{k}</span>
                    <span className="font-mono tabular-nums">{v}</span>
                  </div>
                ))}
                <div className="mt-1 flex justify-between border-t border-line pt-1.5 text-[13px] font-semibold">
                  <span>Estimated cash to close</span>
                  <span className="font-mono tabular-nums">{usd(cashToClose(offer))}</span>
                </div>
              </div>
            </Spot>
          </div>
        ) : null}

        {page === 3 ? (
          <div>
            <p className="font-serif text-2xl tracking-tight">Additional Information About This Loan</p>
            <DocHeading>Comparisons</DocHeading>
            <p className="mb-2 px-3 text-[11px] text-muted">Use these measures to compare this loan with other loans.</p>
            <div className="space-y-1">
              <Spot id="in5" {...sp}>
                <div className="px-3 py-2 text-[13px]">
                  <p className="font-semibold">In 5 years</p>
                  <div className="mt-1 flex justify-between">
                    <span className="text-ink-2">Total you will have paid in principal, interest, mortgage insurance, and loan costs</span>
                    <span className="ml-4 font-mono tabular-nums">{usd(offer.in5Total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-2">Principal you will have paid off</span>
                    <span className="ml-4 font-mono tabular-nums">{usd(offer.in5Principal)}</span>
                  </div>
                </div>
              </Spot>
              <Spot id="apr" {...sp}>
                <Row k="Annual Percentage Rate (APR)" sub="Your costs over the loan term expressed as a rate. This is not your interest rate." v={`${offer.apr.toFixed(3)}%`} />
              </Spot>
              <Spot id="tip" {...sp}>
                <Row
                  k="Total Interest Percentage (TIP)"
                  sub="The total amount of interest you will pay over the loan term as a percentage of your loan amount."
                  v={`${offer.tip.toFixed(2)}%`}
                />
              </Spot>
            </div>
            <DocHeading>Other Considerations</DocHeading>
            <dl className="space-y-2 px-3 text-[12px] text-ink-2">
              {[
                ["Appraisal", "We may order an appraisal to determine the property’s value and charge you for it."],
                ["Homeowner’s insurance", "This loan requires homeowner’s insurance on the property, which you may obtain from a company of your choice."],
                ["Late payment", "If your payment is more than 15 days late, we will charge a late fee of 5% of the monthly principal and interest payment."],
                ["Servicing", "We intend to transfer servicing of your loan."],
              ].map(([k, v]) => (
                <div key={k} className="grid gap-1 sm:grid-cols-[9rem_1fr]">
                  <dt className="font-semibold text-ink">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 rounded-lg bg-paper px-3 py-2 text-[11px] text-muted">
              Sample only. A real Loan Estimate is three pages and includes lender contact and NMLS details. This demo
              simplifies the layout and uses fictional data.
            </p>
          </div>
        ) : null}
      </div>

      {/* page footer nav */}
      <div className="flex items-center justify-between border-t border-line/70 bg-paper/50 px-5 py-3 font-mono text-[11px] text-muted">
        <button
          disabled={page === 1}
          onClick={() => setPage((page - 1) as 1 | 2)}
          className="rounded-full px-2 py-1 transition-colors hover:text-ink disabled:opacity-30"
        >
          ← Prev page
        </button>
        <span>Page {page} of 3</span>
        <button
          disabled={page === 3}
          onClick={() => setPage((page + 1) as 2 | 3)}
          className="rounded-full px-2 py-1 transition-colors hover:text-ink disabled:opacity-30"
        >
          Next page →
        </button>
      </div>
    </div>
  );
}

function Items({ items }: { items: [string, number][] }) {
  return (
    <div className="px-3 pb-2 text-[12px] text-ink-2">
      {items.map(([k, v]) => (
        <div key={k} className="flex justify-between py-0.5">
          <span>{k}</span>
          <span className="font-mono">{usd(v)}</span>
        </div>
      ))}
    </div>
  );
}

/* =====================================================================
   Advisor panel
   ===================================================================== */

function hotspotValue(id: string, o: Offer): string | null {
  switch (id) {
    case "terms":
      return `${o.termYears}-yr · ${borrower.product} · ${borrower.loanType}`;
    case "rateLock":
      return o.rateLock.locked ? `Locked until ${o.rateLock.until}` : "NO — not locked";
    case "loanAmount":
      return usd(o.loanAmount);
    case "rate":
      return pct(o.rate);
    case "monthlyPI":
      return `${usd(Math.round(monthlyPI(o)))}/mo`;
    case "prepay":
    case "balloon":
      return "NO";
    case "projected":
      return `${usd(totalMonthly(o))}/mo`;
    case "costsAtClosing":
    case "cashCalc":
      return usd(cashToClose(o));
    case "origination":
      return usd(originationTotal(o));
    case "cannotShop":
      return usd(o.cannotShop);
    case "canShop":
      return usd(o.canShop);
    case "prepaidsEscrow":
      return usd(o.prepaids + o.initialEscrow);
    case "in5":
      return usd(o.in5Total);
    case "apr":
      return `${o.apr.toFixed(3)}%`;
    case "tip":
      return `${o.tip.toFixed(2)}%`;
    default:
      return null;
  }
}

function AdvisorPanel({
  hotspot,
  offer,
  step,
  onPrev,
  onNext,
  complete,
  questionCount,
  onCopy,
  copyState,
  headingRef,
  variant = "card",
}: {
  hotspot: Hotspot | null;
  offer: Offer;
  step: number;
  onPrev: () => void;
  onNext: () => void;
  complete: boolean;
  questionCount: number;
  onCopy: () => void;
  copyState: CopyState;
  headingRef?: RefObject<HTMLHeadingElement | null>;
  variant?: "card" | "sheet";
}) {
  const headingCls = "outline-none focus-visible:ring-2 focus-visible:ring-accent-soft/60 focus-visible:ring-offset-0 rounded-md";
  return (
    <section
      aria-label="Advisor explanation"
      className={`relative overflow-hidden bg-ink text-paper ${
        variant === "sheet" ? "px-5 pb-6 pt-1" : "rounded-3xl p-6 shadow-2xl sm:p-7"
      }`}
    >
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-accent-2/25 blur-3xl" />
      <div className="relative" aria-live="polite">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="pulse-dot size-2 rounded-full bg-accent-2" aria-hidden />
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/60">Advisor · plain English</p>
          </div>
          {hotspot ? (
            <p className="font-mono text-[10px] tabular-nums text-paper/50">
              {step} / {hotspots.length}
            </p>
          ) : null}
        </div>

        {complete ? (
          <div className="mt-5 animate-[fadeIn_.35s_ease] rounded-2xl border border-accent-2/60 bg-accent-2/25 p-4">
            <p className="font-serif text-2xl leading-tight tracking-tight">
              <span aria-hidden>🎉 </span>You&apos;ve explored every line.
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-paper/75">
              {questionCount
                ? `Copy your ${questionCount} question${questionCount === 1 ? "" : "s"} and bring them to your lender.`
                : "Your question list is empty. Open a line again to add its question."}
            </p>
            <button
              onClick={onCopy}
              disabled={!questionCount}
              className="mt-3 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-soft disabled:opacity-40"
            >
              {copyState === "copied" ? "Copied ✓" : copyState === "error" ? "Couldn’t copy. Try again" : "Copy my questions"}
            </button>
          </div>
        ) : null}

        {hotspot ? (
          <div key={hotspot.id} className="animate-[fadeIn_.35s_ease]">
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/50">{hotspot.section}</p>
            <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 ref={headingRef} tabIndex={-1} className={`font-serif text-3xl leading-tight tracking-tight ${headingCls}`}>
                {hotspot.label}
              </h2>
              <p className="font-mono text-sm tabular-nums text-accent-soft">{hotspotValue(hotspot.id, offer)}</p>
            </div>
            <span
              className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${flagMeta[hotspot.flag].chip}`}
            >
              <span className={`size-1.5 rounded-full ${flagMeta[hotspot.flag].dot}`} aria-hidden />
              {flagMeta[hotspot.flag].label}
            </span>

            <dl className="mt-5 space-y-4 text-[14px] leading-relaxed">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/50">What it means</dt>
                <dd className="mt-1 text-paper/85">{hotspot.what}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/50">Why it matters</dt>
                <dd className="mt-1 text-paper/85">{hotspot.why}</dd>
              </div>
            </dl>

            <div className="mt-5 rounded-2xl border border-paper/10 bg-paper/[0.06] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-soft">Ask your lender</p>
              <p className="mt-1.5 text-[14px] leading-relaxed">“{hotspot.ask}”</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-paper/45">✓ Added to your questions</p>
            </div>

            {hotspot.tip ? (
              <p className="mt-4 flex gap-2 text-[13px] leading-snug text-paper/70">
                <span className="text-btc" aria-hidden>
                  ◆
                </span>
                {hotspot.tip}
              </p>
            ) : null}

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-paper/10 pt-4">
              <button
                onClick={onPrev}
                className="rounded-full border border-paper/20 px-3.5 py-2 text-sm transition-colors hover:border-paper/50"
              >
                ← Prev
              </button>
              <span className="hidden font-mono text-[10px] text-paper/40 sm:inline">or use ← → keys</span>
              <button
                onClick={onNext}
                className="rounded-full bg-paper px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
              >
                Next line →
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <h2 ref={headingRef} tabIndex={-1} className={`font-serif text-3xl leading-tight tracking-tight ${headingCls}`}>
              Click a numbered line to begin.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-paper/70">
              Look for the orange numbers on the estimate. The advisor explains each line in plain English, tells you why
              it matters, and adds a smart question to your list.
            </p>
            <button
              onClick={onNext}
              className="mt-6 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
            >
              Start with line 1 →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* =====================================================================
   Questions checklist
   ===================================================================== */

function QuestionList({
  questions,
  onToggle,
  onRemove,
  onCopy,
  copyState,
}: {
  questions: Question[];
  onToggle: (key: string) => void;
  onRemove: (key: string) => void;
  onCopy: () => void;
  copyState: CopyState;
}) {
  const done = questions.filter((q) => q.done).length;
  return (
    <section aria-label="Questions for your lender" className="rounded-3xl border border-line bg-white p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Your checklist</p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight">Questions for your lender</h2>
        </div>
        {questions.length ? (
          <button
            onClick={onCopy}
            className="shrink-0 rounded-full border border-ink/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-2 transition-colors hover:border-ink/40"
          >
            {copyState === "copied" ? "Copied ✓" : "Copy list"}
          </button>
        ) : null}
      </div>
      <p role="status" className="min-h-0 text-xs">
        {copyState === "copied" ? (
          <span className="mt-2 inline-block rounded-full bg-accent-soft px-2.5 py-1 text-accent">
            Copied {questions.length} question{questions.length === 1 ? "" : "s"} to your clipboard
          </span>
        ) : copyState === "error" ? (
          <span className="mt-2 inline-block rounded-full bg-btc/15 px-2.5 py-1 text-ink-2">
            Couldn’t reach the clipboard. Try again.
          </span>
        ) : null}
      </p>
      {questions.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-ink/15 p-4 text-sm text-muted">
          Your questions will collect here as you explore the estimate.
        </p>
      ) : (
        <>
          <p className="mt-1 text-xs text-muted">
            {questions.length} question{questions.length === 1 ? "" : "s"} · {done} asked
          </p>
          <ol className="mt-4 max-h-[22rem] space-y-2 overflow-y-auto pr-1">
            {questions.map((q) => (
              <li key={q.key} className="group flex gap-3 rounded-2xl border border-line/80 bg-paper/50 p-3">
                <input
                  type="checkbox"
                  checked={q.done}
                  onChange={() => onToggle(q.key)}
                  aria-label={`Mark as asked: ${q.text}`}
                  className="mt-1 size-4 shrink-0 accent-[#0f5e4f]"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-accent">{q.source}</p>
                  <p className={`mt-0.5 text-[13px] leading-snug ${q.done ? "text-muted line-through" : "text-ink"}`}>
                    {q.text}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(q.key)}
                  aria-label="Remove question"
                  className="self-start rounded px-1 text-muted opacity-60 transition-opacity hover:text-ink group-hover:opacity-100"
                >
                  ×
                </button>
              </li>
            ))}
          </ol>
        </>
      )}
    </section>
  );
}

/* =====================================================================
   Compare mode
   ===================================================================== */

const MAX_YEARS = 30;

function CompareView({ added, onAddQuestions }: { added: boolean; onAddQuestions: () => void }) {
  const [years, setYears] = useState(5);
  const A = offers.A;
  const B = offers.B;
  const piA = monthlyPI(A);
  const piB = monthlyPI(B);
  const months = years * 12;

  // Same measure as the Loan Estimate's "In 5 years" line: payments + loan costs. Using one measure everywhere keeps
  // the table, the cards, and the break-even marker in agreement.
  const costA = useMemo(() => totalPaid(A, months), [A, months]);
  const costB = useMemo(() => totalPaid(B, months), [B, months]);
  const breakEven = Math.ceil((loanCosts(B) - loanCosts(A)) / (piA - piB));
  const breakEvenYears = breakEven / 12;

  type R = { k: string; a: number; b: number; fmt: (n: number) => string; lowerIsBetter?: boolean; note?: string };
  const rows: R[] = [
    { k: "Interest rate", a: A.rate, b: B.rate, fmt: (n) => pct(n), lowerIsBetter: true },
    { k: "Discount points (in Section A)", a: A.points, b: B.points, fmt: usd, lowerIsBetter: true, note: "1 point = 1% of the loan" },
    { k: "A. Origination charges", a: originationTotal(A), b: originationTotal(B), fmt: usd, lowerIsBetter: true },
    { k: "D. Total loan costs", a: loanCosts(A), b: loanCosts(B), fmt: usd, lowerIsBetter: true },
    { k: "Monthly principal & interest", a: Math.round(piA), b: Math.round(piB), fmt: usd, lowerIsBetter: true },
    { k: "Estimated cash to close", a: cashToClose(A), b: cashToClose(B), fmt: usd, lowerIsBetter: true },
    { k: "APR", a: A.apr, b: B.apr, fmt: (n) => `${n.toFixed(3)}%`, lowerIsBetter: true },
    {
      k: `In ${years} year${years === 1 ? "" : "s"} — total paid`,
      a: Math.round(costA),
      b: Math.round(costB),
      fmt: usd,
      lowerIsBetter: true,
      note: "Payments + loan costs · moves with the slider below",
    },
  ];

  const better = costA <= costB ? "A" : "B";
  const keep = `${years} year${years === 1 ? "" : "s"}`;
  // centre of the range thumb (≈16px wide) at a given year value
  const markerLeft = `calc(8px + ${(Math.min(Math.max(breakEvenYears, 1), MAX_YEARS) - 1) / (MAX_YEARS - 1)} * (100% - 16px))`;
  const diff = Math.abs(costA - costB);

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_1px_0_rgba(18,22,28,0.04),0_30px_60px_-30px_rgba(18,22,28,0.35)]">
      <div className="border-b border-line/70 bg-paper/50 px-5 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Side by side · same loan amount, term & type</p>
        <p className="text-sm font-semibold tracking-tight">Two sample Loan Estimates</p>
      </div>

      <div className="overflow-x-auto px-3 py-4 sm:px-5">
        <table className="w-full min-w-[30rem] text-[13px]">
          <thead>
            <tr className="text-left">
              <th className="px-2 pb-3 font-normal" />
              {[A, B].map((o) => (
                <th key={o.id} className="px-2 pb-3 text-right align-bottom">
                  <span className="block font-mono text-[10px] font-normal uppercase tracking-[0.14em] text-muted">
                    {o.rateLock.locked ? "Rate locked" : "Not locked"}
                  </span>
                  <span className="font-semibold">{o.lender}</span>
                </th>
              ))}
              <th className="px-2 pb-3 text-right font-mono text-[10px] font-normal uppercase tracking-[0.14em] text-muted">
                Difference
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60">
            {rows.map((r) => {
              const lowA = r.a < r.b;
              const lowB = r.b < r.a;
              const d = r.b - r.a;
              return (
                <tr key={r.k.startsWith("In ") ? "horizon" : r.k}>
                  <th scope="row" className="px-2 py-2.5 text-left font-normal text-ink-2">
                    {r.k}
                    {r.note ? <span className="block text-[11px] text-muted">{r.note}</span> : null}
                  </th>
                  {[
                    [r.a, lowA],
                    [r.b, lowB],
                  ].map(([v, low], i) => (
                    <td key={i} className="px-2 py-2.5 text-right">
                      <span
                        className={`rounded-md px-1.5 py-0.5 font-mono tabular-nums ${
                          low ? "bg-accent-soft font-semibold text-accent" : ""
                        }`}
                      >
                        {r.fmt(v as number)}
                      </span>
                    </td>
                  ))}
                  <td className="px-2 py-2.5 text-right font-mono text-[12px] tabular-nums text-muted">
                    {d === 0 ? "—" : `B ${d > 0 ? "+" : "−"}${r.k === "Interest rate" ? pct(Math.abs(d)) : r.k === "APR" ? `${Math.abs(d).toFixed(3)}%` : usd(Math.abs(d))}`}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="mt-2 px-2 text-[11px] text-muted">Green = lower of the two. Lower isn’t automatically better — see the time-horizon check below.</p>
      </div>

      {/* horizon */}
      <div className="border-t border-line/70 px-5 py-6 sm:px-8">
        <label htmlFor="horizon" className="flex items-baseline justify-between gap-4">
          <span className="text-sm font-semibold">How long do you expect to keep this loan?</span>
          <span className="font-mono text-sm tabular-nums text-accent">{keep}</span>
        </label>
        <div className="relative mt-7">
          {/* break-even marker */}
          <div aria-hidden className="pointer-events-none absolute -top-6 z-20 -translate-x-1/2 whitespace-nowrap" style={{ left: markerLeft }}>
            <span className="rounded-full bg-btc/15 px-2 py-0.5 font-mono text-[10px] text-[#9a5806]">
              Break-even ≈ {breakEvenYears.toFixed(1)} yr
            </span>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 z-20 h-5 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-btc"
            style={{ left: markerLeft }}
          />
          <input
            id="horizon"
            type="range"
            min={1}
            max={MAX_YEARS}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            aria-valuetext={keep}
            aria-describedby="horizon-breakeven"
            className="relative z-10 block w-full accent-[#0f5e4f]"
          />
        </div>
        <div className="mt-1 flex justify-between font-mono text-[10px] text-muted">
          <span>1 yr</span>
          <span>10</span>
          <span>20</span>
          <span>{MAX_YEARS} yr</span>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            [A, costA],
            [B, costB],
          ].map(([o, c]) => {
            const offer = o as Offer;
            const win = better === offer.id;
            return (
              <div
                key={offer.id}
                className={`rounded-2xl border p-4 transition-colors ${win ? "border-accent bg-accent-soft/60" : "border-line bg-paper/60"}`}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{offer.lender}</p>
                <p className="mt-1 font-mono text-2xl tabular-nums">{usd(Math.round(c as number))}</p>
                <p className="text-[12px] text-ink-2">payments + loan costs over {keep}</p>
                {win ? (
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-accent">Cheaper if you keep it {keep}</p>
                ) : null}
              </div>
            );
          })}
        </div>
        <p id="horizon-breakeven" className="mt-4 text-[13px] leading-relaxed text-ink-2">
          Lender B charges {usd(loanCosts(B) - loanCosts(A))} more upfront to save about {usd(Math.round(piA - piB))}/month.
          Break-even is roughly <strong className="text-ink">{breakEven} months (~{breakEvenYears.toFixed(1)} years)</strong>:
          keep the loan longer and B comes out ahead; sell or refinance sooner and A does. If you keep it {keep}, Lender {better}{" "}
          costs about <strong className="text-ink">{usd(Math.round(diff))}</strong> less.
        </p>
        <button
          onClick={onAddQuestions}
          disabled={added}
          className="mt-5 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent disabled:cursor-default disabled:bg-accent disabled:opacity-80"
        >
          {added ? "Compare questions added ✓" : "Add compare questions to my list"}
        </button>
      </div>
    </div>
  );
}

function CompareAdvisor() {
  const A = offers.A;
  const B = offers.B;
  return (
    <section className="relative overflow-hidden rounded-3xl bg-ink p-6 text-paper shadow-2xl sm:p-7">
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-accent-2/25 blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="pulse-dot size-2 rounded-full bg-accent-2" aria-hidden />
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/60">Advisor · what&apos;s really different</p>
        </div>
        <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight">Lower rate, or lower upfront cost?</h2>
        <ul className="mt-5 space-y-3 text-[14px] leading-relaxed text-paper/85">
          <li className="flex gap-2">
            <span className="text-accent-soft" aria-hidden>→</span>
            <span>
              Lender B&apos;s lower rate ({pct(B.rate)} vs {pct(A.rate)}) comes from paying {usd(B.points)} in discount points. That
              shows up in Section A and in a higher cash to close.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent-soft" aria-hidden>→</span>
            <span>
              Sections B and C, the prepaids, and escrow are nearly identical. The real difference is the lender&apos;s own price.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-btc" aria-hidden>◆</span>
            <span>
              Lender A&apos;s rate is <strong>not locked</strong>, but Lender B&apos;s is. Ask A to re-price and lock on the same day
              before you decide.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent-soft" aria-hidden>→</span>
            <span>The APR favors B because it assumes you keep the loan all 30 years. Use the slider to test your own plans.</span>
          </li>
        </ul>
        <p className="mt-6 border-t border-paper/10 pt-4 text-[12px] text-paper/50">
          The advisor points out the trade-offs. You and a licensed loan officer make the call.
        </p>
      </div>
    </section>
  );
}
