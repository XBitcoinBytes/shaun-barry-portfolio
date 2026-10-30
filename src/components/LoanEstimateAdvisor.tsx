"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
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
type ShareState = "idle" | "shared" | "emailed";
type Toast = { id: number; text: string; tone: "ok" | "warn" };
type SheetState = "closed" | "peek" | "full";

const STORAGE_KEY = "lea:questions:v1";
const NAV_OFFSET = 80; // fixed nav (4rem) + breathing room
const PEEK_FALLBACK = 200; // phone peek sheet height before it has been measured

const isQuestion = (q: unknown): q is Question =>
  !!q &&
  typeof q === "object" &&
  typeof (q as Question).key === "string" &&
  typeof (q as Question).text === "string" &&
  typeof (q as Question).source === "string" &&
  typeof (q as Question).done === "boolean";

/** First sentence of an explanation, for the phone peek. */
const firstSentence = (t: string) => {
  const m = t.match(/^.*?[.!?](?=\s|$)/);
  return m ? m[0] : t;
};

const questionsText = (qs: Question[]) =>
  ["Questions for my lender (from the Loan Estimate Advisor demo):", ...qs.map((q, i) => `${i + 1}. ${q.text}`)].join("\n");

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
  const [shareState, setShareState] = useState<ShareState>("idle");
  const [toast, setToast] = useState<Toast | null>(null);
  const [sheet, setSheet] = useState<SheetState>("closed");
  const [sheetH, setSheetH] = useState(0);
  // height of the sheet's content (without the safe-area padding) → --sheet-h for the toast
  const [sheetContentH, setSheetContentH] = useState(0);
  const [questionsOpen, setQuestionsOpen] = useState(false);
  const [demoInView, setDemoInView] = useState(false);
  const advisorRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const sheetContentRef = useRef<HTMLDivElement>(null);
  const scrollTarget = useRef<string | null>(null);
  const programmaticUntil = useRef(0);
  const hydrated = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shareTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      // bottom sheet on phones / tablets: open as a peek, keep "full" if the reader expanded it
      setSheet((s) => (s === "closed" ? "peek" : s));
      return;
    }
    requestAnimationFrame(() => {
      // new line → show its title/badge at the top of the sticky column (on short viewports the column itself can
      // scroll to reach the checklist; bring it back to the advisor)
      stickyRef.current?.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
      advisorRef.current
        ?.querySelector<HTMLElement>("[data-advisor-body]")
        ?.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
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
      scrollTarget.current = id;
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
    setSheet("closed");
    setQuestionsOpen(false);
    setCopyState("idle");
    setShareState("idle");
    setStarted(false);
  };

  const idx = selected ? hotspots.findIndex((h) => h.id === selected) : -1;
  const goStep = (d: 1 | -1) => {
    const nextIdx = idx < 0 ? (d === 1 ? 0 : hotspots.length - 1) : (idx + d + hotspots.length) % hotspots.length;
    select(hotspots[nextIdx].id);
  };

  const remaining = hotspots.length - visited.length;
  const jumpUnexplored = () => {
    for (let i = 1; i <= hotspots.length; i++) {
      const h = hotspots[(Math.max(idx, 0) + i) % hotspots.length];
      if (!visited.includes(h.id)) return select(h.id);
    }
  };

  const showToast = useCallback((text: string, tone: Toast["tone"] = "ok") => {
    setToast({ id: Date.now(), text, tone });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2500);
  }, []);

  const plural = (n: number) => `${n} question${n === 1 ? "" : "s"}`;

  const flashShare = (state: ShareState) => {
    setShareState(state);
    if (shareTimer.current) clearTimeout(shareTimer.current);
    shareTimer.current = setTimeout(() => setShareState("idle"), 5000);
  };

  const shareList = async () => {
    if (!questions.length) return;
    const text = questionsText(questions);
    const subject = "Questions for my lender";
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title: subject, text });
        flashShare("shared");
        showToast(`Shared ${plural(questions.length)}`);
        return;
      } catch (e) {
        if ((e as DOMException)?.name === "AbortError") return; // reader closed the share sheet
        // any other failure (no share target, permissions) → fall through to email
      }
    }
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    flashShare("emailed");
    showToast(`Opening your email app with ${plural(questions.length)}`);
  };

  const copyList = async () => {
    if (!questions.length) return;
    const text = questionsText(questions);
    let ok = false;
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        ok = false; // permission denied / insecure context → legacy fallback below
      }
    }
    if (!ok) {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "0";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, text.length);
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    setCopyState(ok ? "copied" : "error");
    showToast(ok ? `Copied ${plural(questions.length)}` : "Couldn’t reach the clipboard. Try Share / email instead.", ok ? "ok" : "warn");
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

  useEffect(
    () => () => {
      [copyTimer, shareTimer, toastTimer].forEach((t) => {
        if (t.current) clearTimeout(t.current);
      });
    },
    [],
  );

  // persist the checklist on this device (save effect is declared before load so the first, empty pass is skipped)
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      if (questions.length) localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // storage unavailable (private mode, quota) — the list still works for this visit
    }
  }, [questions]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed)) {
        const saved = parsed.filter(isQuestion);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time restore from localStorage
        if (saved.length) setQuestions(saved);
      }
    } catch {
      // ignore corrupt / unavailable storage
    }
    hydrated.current = true;
  }, []);

  // phone: keep the line you just opened visible ABOVE the bottom sheet
  useEffect(() => {
    const id = scrollTarget.current;
    if (!id) return;
    scrollTarget.current = null;
    if (!isNarrow()) return;
    const raf = requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(`[data-spot="${id}"]`);
      if (!el) return;
      // scroll-margin-bottom = live sheet height (falls back to the ~200px peek in CSS) so "nearest" lands the row
      // just above the sheet; scroll-margin-top keeps it clear of the fixed nav.
      const sheetHeight = sheetRef.current?.offsetHeight ?? PEEK_FALLBACK;
      el.style.scrollMarginBottom = `${sheetHeight + 16}px`;
      el.style.scrollMarginTop = `${NAV_OFFSET}px`;
      const r = el.getBoundingClientRect();
      const fits = r.top >= NAV_OFFSET - 1 && r.bottom <= window.innerHeight - sheetHeight - 12;
      if (fits) return;
      programmaticUntil.current = Date.now() + 900;
      el.scrollIntoView({ block: "nearest", behavior: prefersReducedMotion() ? "auto" : "smooth" });
    });
    return () => cancelAnimationFrame(raf);
  }, [selected, page, sheet]);

  // phone: an expanded sheet drops back to a peek once the reader scrolls the estimate meaningfully
  useEffect(() => {
    if (sheet !== "full") return;
    let startY = window.scrollY;
    const onScroll = () => {
      if (Date.now() < programmaticUntil.current) {
        startY = window.scrollY;
        return;
      }
      if (Math.abs(window.scrollY - startY) > 140) setSheet("peek");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sheet]);

  // measure the sheet so the page always leaves room for it
  const sheetMounted = started && mode === "explore" && demoInView;
  useEffect(() => {
    const el = sheetRef.current;
    if (!sheetMounted || !el || typeof ResizeObserver === "undefined") return;
    const inner = sheetContentRef.current;
    const ro = new ResizeObserver(() => {
      setSheetH(el.offsetHeight);
      setSheetContentH(inner ? inner.offsetHeight : el.offsetHeight);
    });
    ro.observe(el);
    if (inner) ro.observe(inner);
    return () => ro.disconnect();
  }, [sheetMounted]);

  const panelProps = {
    hotspot: selected ? byId[selected] : null,
    offer,
    step: idx + 1,
    onPrev: () => goStep(-1),
    onNext: () => goStep(1),
    complete,
    questionCount: questions.length,
    onCopy: copyList,
    onShare: shareList,
    copyState,
    shareState,
    remaining,
    explored: visited.length,
    onJump: jumpUnexplored,
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

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* left: document or compare (min-w-0 so wide tables scroll inside, never the page) */}
            <div className="min-w-0 lg:col-span-7">
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

            {/* right: advisor + questions. Desktop: one sticky flex column capped to the viewport. The advisor card is
                pinned (its title and Prev/Next never scroll away); the checklist takes the leftover space. */}
            <div className="min-w-0 lg:col-span-5">
              <div
                ref={stickyRef}
                className="space-y-4 lg:sticky lg:top-20 lg:flex lg:max-h-[calc(100dvh-5rem)] lg:flex-col lg:gap-4 lg:space-y-0 lg:overflow-y-auto lg:overscroll-contain lg:pb-4 [scrollbar-width:thin]"
              >
                <div
                  ref={advisorRef}
                  className={`scroll-mt-20 lg:flex lg:min-h-0 lg:shrink-0 lg:flex-col ${mode === "explore" ? "hidden" : ""}`}
                >
                  {mode === "explore" ? (
                    <AdvisorPanel
                      {...panelProps}
                      headingRef={headingRef}
                      compact={questionsOpen}
                      // leave room for the checklist header, or for header + open list when it's expanded. On short
                      // viewports the card keeps ~25rem (never taller than the viewport minus the nav + 16px) so the body
                      // keeps ≥160px; the sticky column then scrolls to reach the checklist.
                      maxH={
                        questionsOpen
                          ? "lg:max-h-[max(min(25rem,calc(100dvh-6rem)),calc(100dvh-25rem))]"
                          : "lg:max-h-[max(min(25rem,calc(100dvh-6rem)),calc(100dvh-12.5rem))]"
                      }
                    />
                  ) : (
                    <CompareAdvisor />
                  )}
                </div>
                <div className="le-checklist-wrap lg:flex lg:min-h-0 lg:flex-1 lg:flex-col">
                  <QuestionList
                    open={questionsOpen}
                    onOpenChange={setQuestionsOpen}
                    onShare={shareList}
                    questions={questions}
                    onToggle={(key) =>
                      setQuestions((qs) => qs.map((q) => (q.key === key ? { ...q, done: !q.done } : q)))
                    }
                    onRemove={(key) => setQuestions((qs) => qs.filter((q) => q.key !== key))}
                    onCopy={copyList}
                    copyState={copyState}
                    shareState={shareState}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* room for the phone bottom sheet so it never covers the last content */}
          {mode === "explore" ? (
            <div aria-hidden className="lg:hidden" style={{ height: Math.max(sheetH, 64) + 16 }} />
          ) : null}

          {/* ---------- phone / tablet bottom sheet ---------- */}
          {sheetMounted ? (
            <div ref={sheetRef} className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
              <div className="mx-auto max-w-2xl overflow-hidden rounded-t-3xl bg-ink pb-[env(safe-area-inset-bottom)] text-paper shadow-[0_-20px_50px_-20px_rgba(18,22,28,0.55)]">
                <div ref={sheetContentRef}>
                  <PhoneSheet state={sheet} onState={setSheet} panel={panelProps} />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* toast: a persistent live region. Phone: anchored 12px above the peek/full sheet (--sheet-h is measured by a
          ResizeObserver, safe area added on top). Desktop: bottom-centre, clear of the sticky advisor title. */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="le-toast pointer-events-none fixed inset-x-0 z-50 flex justify-center px-4"
        style={{ "--sheet-h": `${sheetMounted ? sheetContentH : 0}px` } as CSSProperties}
      >
        {toast ? (
          <p
            key={toast.id}
            className={`animate-[fadeIn_.25s_ease] inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium shadow-[0_12px_30px_-10px_rgba(18,22,28,0.5)] ${
              toast.tone === "ok" ? "bg-accent text-paper" : "bg-ink text-paper"
            }`}
          >
            <span aria-hidden className={toast.tone === "ok" ? "text-accent-soft" : "text-btc"}>
              {toast.tone === "ok" ? "✓" : "!"}
            </span>
            {toast.text}
          </p>
        ) : null}
      </div>
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
      data-spot={id}
      aria-pressed={isSel}
      aria-label={`Line ${n}: ${h.label} — explain this line`}
      className={`group/spot relative block w-full scroll-mt-20 rounded-lg pl-2 text-left outline-offset-2 max-lg:scroll-mb-[13.5rem] transition-[background-color,box-shadow] duration-200 ${
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

type PanelProps = {
  hotspot: Hotspot | null;
  offer: Offer;
  step: number;
  onPrev: () => void;
  onNext: () => void;
  complete: boolean;
  questionCount: number;
  onCopy: () => void;
  onShare: () => void;
  copyState: CopyState;
  shareState: ShareState;
  remaining: number;
  explored: number;
  onJump: () => void;
};

function JumpButton({ remaining, onJump, dark = true }: { remaining: number; onJump: () => void; dark?: boolean }) {
  return (
    <button
      onClick={onJump}
      className={`font-mono text-[11px] uppercase tracking-wider underline decoration-dotted underline-offset-4 transition-colors ${
        dark ? "text-accent-soft hover:text-paper" : "text-accent hover:text-ink"
      }`}
    >
      Jump to next unexplored line · {remaining} left →
    </button>
  );
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
  onShare,
  copyState,
  shareState,
  remaining,
  explored,
  onJump,
  headingRef,
  variant = "card",
  compact = false,
  maxH = "",
}: PanelProps & {
  headingRef?: RefObject<HTMLHeadingElement | null>;
  variant?: "card" | "sheet";
  /** desktop: tighter header while the checklist is open, so the body keeps room to read */
  compact?: boolean;
  /** desktop height cap (Tailwind class) applied to the card itself, so header/footer pin and only the body scrolls */
  maxH?: string;
}) {
  const sheet = variant === "sheet";
  const showJump = !complete && explored > 0 && remaining > 0;
  const headingCls = "outline-none focus-visible:ring-2 focus-visible:ring-accent-soft/60 focus-visible:ring-offset-0 rounded-md";
  const padX = sheet ? "px-5" : "px-6 sm:px-7";

  const completeBox = complete ? (
    <div className={`${sheet ? "mt-3" : "mt-5"} animate-[fadeIn_.35s_ease] rounded-2xl border border-accent-2/60 bg-accent-2/25 p-4`}>
      <p className="font-serif text-2xl leading-tight tracking-tight">
        <span aria-hidden>🎉 </span>You&apos;ve explored every line.
      </p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-paper/75">
        {questionCount
          ? `Copy your ${questionCount} question${questionCount === 1 ? "" : "s"} and bring them to your lender.`
          : "Your question list is empty. Open a line again to add its question."}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          onClick={onCopy}
          disabled={!questionCount}
          className="rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-soft disabled:opacity-40"
        >
          {copyState === "copied" ? "Copied ✓" : copyState === "error" ? "Couldn’t copy. Try again" : "Copy my questions"}
        </button>
        <button
          onClick={onShare}
          disabled={!questionCount}
          className="rounded-full border border-paper/25 px-4 py-2 text-sm transition-colors hover:border-paper/60 disabled:opacity-40"
        >
          {shareState === "idle" ? "Share / email" : "Shared ✓"}
        </button>
      </div>
    </div>
  ) : null;

  return (
    <section
      aria-label="Advisor explanation"
      className={`relative flex flex-col overflow-hidden bg-ink text-paper ${
        sheet ? "pb-5 pt-1" : `min-h-0 rounded-3xl shadow-2xl ${maxH}`
      }`}
    >
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-accent-2/25 blur-3xl" />

      {/* pinned header: status + title + value (desktop card only) */}
      {sheet ? null : (
        <div data-advisor-header className={`relative z-10 shrink-0 bg-ink ${padX} ${compact ? "pt-5" : "pt-6 sm:pt-7"}`} aria-live="polite">
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
          {hotspot ? (
            <div key={hotspot.id} className="animate-[fadeIn_.35s_ease] pb-3">
              <p className={`${compact ? "mt-3" : "mt-5"} font-mono text-[10px] uppercase tracking-[0.16em] text-paper/50`}>{hotspot.section}</p>
              <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2
                  ref={headingRef}
                  tabIndex={-1}
                  className={`font-serif leading-tight tracking-tight ${compact ? "text-2xl" : "text-3xl"} ${headingCls}`}
                >
                  {hotspot.label}
                </h2>
                <p className="font-mono text-sm tabular-nums text-accent-soft">{hotspotValue(hotspot.id, offer)}</p>
              </div>
              <FlagChip flag={hotspot.flag} className={compact ? "mt-2" : "mt-3"} />
            </div>
          ) : null}
        </div>
      )}

      {/* body: scrolls inside the card on desktop so the header and stepper stay put */}
      <div
        data-advisor-body
        className={`relative ${padX} ${sheet ? "" : `min-h-0 flex-auto overflow-y-auto overscroll-contain [scrollbar-width:thin] lg:min-h-[160px] ${hotspot ? "border-t border-paper/10" : ""} pb-5`}`}
      >
        {completeBox}

        {hotspot ? (
          <div key={hotspot.id} className="animate-[fadeIn_.35s_ease]">
            {sheet ? (
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/50">{hotspot.section}</p>
            ) : null}
            <dl className={`${sheet ? "mt-3" : "mt-4"} space-y-4 text-[14px] leading-relaxed`}>
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
          </div>
        ) : (
          <div className={sheet ? "mt-3" : "mt-6"}>
            {sheet ? null : (
              <h2 ref={headingRef} tabIndex={-1} className={`font-serif text-3xl leading-tight tracking-tight ${headingCls}`}>
                Click a numbered line to begin.
              </h2>
            )}
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

      {/* pinned footer: Prev / Next + jump (desktop card only; the phone sheet has its own stepper) */}
      {hotspot && !sheet ? (
        <div className={`relative shrink-0 border-t border-paper/10 ${padX} ${compact ? "pb-5 pt-3" : "pb-6 pt-4 sm:pb-7"}`}>
          <div className="flex items-center justify-between gap-3">
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
          {showJump ? (
            <div className="mt-3 text-center">
              <JumpButton remaining={remaining} onJump={onJump} />
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function FlagChip({ flag, className = "" }: { flag: Flag; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${flagMeta[flag].chip} ${className}`}
    >
      <span className={`size-1.5 rounded-full ${flagMeta[flag].dot}`} aria-hidden />
      {flagMeta[flag].label}
    </span>
  );
}

/* =====================================================================
   Phone / tablet bottom sheet: closed bar → short peek → full explanation
   ===================================================================== */

function PhoneSheet({
  state,
  onState,
  panel,
}: {
  state: SheetState;
  onState: (s: SheetState) => void;
  panel: PanelProps;
}) {
  const h = panel.hotspot;
  const full = state === "full";
  const showJump = !panel.complete && panel.explored > 0 && panel.remaining > 0;
  const status = `Advisor${h ? ` · ${panel.step}/${hotspots.length}` : ""}${panel.complete ? " · all explored ✓" : ""}`;
  const handle = <span aria-hidden className="absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 rounded-full bg-paper/25" />;

  if (state === "closed") {
    return (
      <button
        type="button"
        onClick={() => onState("peek")}
        aria-expanded={false}
        aria-controls="advisor-sheet"
        className="relative flex w-full items-center justify-between gap-3 px-5 pb-3 pt-4 text-left"
      >
        {handle}
        <span className="min-w-0">
          <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-paper/50">{status}</span>
          <span className="block truncate text-sm font-medium">{h ? h.label : "Tap a numbered line to begin"}</span>
        </span>
        <span className="shrink-0 rounded-full border border-paper/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
          Show ▴
        </span>
      </button>
    );
  }

  return (
    <section id="advisor-sheet" aria-label="Advisor explanation" className={`relative flex max-h-[78vh] flex-col ${full ? "" : "min-h-[13rem]"}`}>
      {/* header: always visible */}
      <div className="relative shrink-0 px-5 pb-2 pt-4">
        <button
          type="button"
          onClick={() => onState(full ? "peek" : "full")}
          aria-label={full ? "Show less" : "Expand explanation"}
          className="absolute inset-x-0 top-0 h-4"
        >
          {handle}
        </button>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0" aria-live="polite">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/50">{status}</p>
            <p className="mt-0.5 truncate font-serif text-[22px] leading-tight tracking-tight">
              {h ? h.label : "Tap a numbered line to begin"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onState("closed")}
            aria-expanded
            className="shrink-0 rounded-full border border-paper/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors hover:border-paper/50"
          >
            Hide ▾
          </button>
        </div>
        {h ? (
          <div className="mt-2 flex items-center gap-3">
            <FlagChip flag={h.flag} className="shrink-0" />
            <span className="min-w-0 truncate font-mono text-[12px] tabular-nums text-accent-soft">{hotspotValue(h.id, panel.offer)}</span>
          </div>
        ) : null}
      </div>

      {/* body: one-sentence peek (fixed height, 2 lines max), or the full scrollable explanation */}
      {full ? (
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-paper/10">
          <AdvisorPanel {...panel} variant="sheet" />
        </div>
      ) : (
        <div className="min-h-0 flex-1 px-5 pb-2">
          <p className="line-clamp-2 min-h-[2.75em] text-[13.5px] leading-snug text-paper/80">
            {h
              ? firstSentence(h.what)
              : panel.complete
                ? "Every line explored. Expand to copy or share your questions."
                : "Look for the orange numbers on the estimate. The advisor explains each line and adds a question to your list."}
          </p>
        </div>
      )}

      {/* pinned outside the scroll area so it never disappears under a long explanation */}
      {full && showJump ? (
        <div className="shrink-0 border-t border-paper/10 px-5 py-2.5 text-center">
          <JumpButton remaining={panel.remaining} onJump={panel.onJump} />
        </div>
      ) : null}

      {/* pinned stepper: works in both peek and full */}
      <div className="flex shrink-0 items-center gap-2 border-t border-paper/10 px-4 py-2.5">
        <button
          type="button"
          onClick={panel.onPrev}
          disabled={!h}
          aria-label="Previous line"
          className="rounded-full border border-paper/20 px-3.5 py-2 text-sm transition-colors hover:border-paper/50 disabled:opacity-30"
        >
          ← Prev
        </button>
        <button
          type="button"
          onClick={() => onState(full ? "peek" : "full")}
          aria-expanded={full}
          disabled={!h && !panel.complete}
          className="flex-1 rounded-full px-2 py-2 font-mono text-[10px] uppercase tracking-wider text-paper/70 transition-colors hover:text-paper disabled:opacity-0"
        >
          {full ? "Less ▾" : "Expand ▴"}
        </button>
        <button
          type="button"
          onClick={panel.onNext}
          className="rounded-full bg-paper px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
        >
          {h ? "Next →" : "Start →"}
        </button>
      </div>
    </section>
  );
}

/* =====================================================================
   Questions checklist
   ===================================================================== */

function QuestionList({
  questions,
  open,
  onOpenChange,
  onToggle,
  onRemove,
  onCopy,
  onShare,
  copyState,
  shareState,
}: {
  questions: Question[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggle: (key: string) => void;
  onRemove: (key: string) => void;
  onCopy: () => void;
  onShare: () => void;
  copyState: CopyState;
  shareState: ShareState;
}) {
  const done = questions.filter((q) => q.done).length;
  const n = questions.length;
  const smallBtn =
    "rounded-full border border-ink/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-2 transition-colors hover:border-ink/40";
  return (
    <section
      aria-label="Questions for your lender"
      className="rounded-3xl border border-line bg-white lg:flex lg:min-h-0 lg:flex-1 lg:flex-col lg:overflow-hidden"
    >
      {/* phone (<640px): grid — row 1 chevron + "Questions (n)", row 2 meta, row 3 full-width Copy | Share.
          sm+: one row, buttons on the right. */}
      <div className="grid shrink-0 grid-cols-1 gap-y-3 px-5 py-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-3 sm:gap-y-2">
        <button
          type="button"
          onClick={() => onOpenChange(!open)}
          aria-expanded={open}
          aria-controls="question-list"
          className="group grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 rounded-xl text-left sm:flex sm:w-auto sm:flex-1"
        >
          <span
            aria-hidden
            className={`grid size-7 shrink-0 place-items-center rounded-full border border-line text-[11px] text-ink-2 transition-transform group-hover:border-ink/40 ${
              open ? "rotate-90" : ""
            }`}
          >
            ▸
          </span>
          <span className="min-w-0 flex-1">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:block">Your checklist</span>
            <span className="block whitespace-nowrap text-base font-semibold tracking-tight">
              <span className="sr-only sm:hidden">Your checklist: </span>
              Questions <span className="font-mono text-sm tabular-nums text-accent">({n})</span>
            </span>
            <span className="block text-xs text-muted">
              {n ? `${done} asked · saved on this device` : "Collects as you explore"}
            </span>
          </span>
        </button>
        {n ? (
          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:shrink-0">
            <button onClick={onCopy} className={`${smallBtn} whitespace-nowrap sm:min-w-[6.75rem]`}>
              {copyState === "copied" ? "Copied ✓" : copyState === "error" ? "Copy failed" : "Copy list"}
            </button>
            <button onClick={onShare} className={`${smallBtn} whitespace-nowrap`} aria-label="Share or email your question list">
              {shareState === "idle" ? "Share / email" : "Shared ✓"}
            </button>
          </div>
        ) : null}
      </div>
      {open ? (
        <div
          id="question-list"
          className="le-checklist-list border-t border-line/70 px-5 pb-5 pt-4 lg:max-h-[40vh] lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain [scrollbar-width:thin]"
        >
          {n === 0 ? (
            <p className="rounded-2xl border border-dashed border-ink/15 p-4 text-sm text-muted">
              Your questions will collect here as you explore the estimate.
            </p>
          ) : (
            <ol className="space-y-2">
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
          )}
        </div>
      ) : null}
    </section>
  );
}

/* =====================================================================
   Compare mode
   ===================================================================== */

const MAX_YEARS = 30;

function CompareView({ added, onAddQuestions }: { added: boolean; onAddQuestions: () => void }) {
  const [years, setYears] = useState(5);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState({ overflow: false, atStart: true, atEnd: true });
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

  // phone: track horizontal scroll to drive the sticky-column shadow, right-edge fade, and swipe hint
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const next = { overflow: max > 1, atStart: el.scrollLeft <= 1, atEnd: el.scrollLeft >= max - 1 };
      setScroll((p) => (p.overflow === next.overflow && p.atStart === next.atStart && p.atEnd === next.atEnd ? p : next));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    ro?.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro?.disconnect();
    };
  }, []);

  const stickyCol = `sticky left-0 z-10 bg-white pl-3 sm:pl-5 transition-shadow ${
    scroll.atStart ? "" : "shadow-[6px_0_8px_-6px_rgba(18,22,28,0.25)]"
  }`;

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_1px_0_rgba(18,22,28,0.04),0_30px_60px_-30px_rgba(18,22,28,0.35)]">
      <div className="border-b border-line/70 bg-paper/50 px-5 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Side by side · same loan amount, term & type</p>
        <p className="text-sm font-semibold tracking-tight">Two sample Loan Estimates</p>
      </div>

      {scroll.overflow ? (
        <p className="flex items-center gap-1.5 px-3 pt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:px-5">
          <span aria-hidden>↔</span> {scroll.atEnd ? "All columns in view" : "Swipe for Diff (B vs A)"}
        </p>
      ) : null}
      <div className="relative">
        {/* phone: label 84 + A 88 + B 88 = 260px always in view (fits ~335px); the short "Diff" column (76px) sits at
            the right edge behind the fade / a short swipe.
            Snap points sit on the value columns and scroll-padding equals the sticky label width, so a swipe always
            lands with a column edge flush against the labels. */}
        <div
          ref={scrollerRef}
          className="max-w-full snap-x snap-mandatory scroll-pl-[5.25rem] overflow-x-auto overscroll-x-contain py-4 [scrollbar-width:thin] sm:snap-none sm:scroll-pl-0"
        >
          <table className="w-full min-w-[336px] table-fixed text-[12px] sm:text-[13px]">
            <colgroup>
              <col className="w-[5.25rem] sm:w-auto" />
              <col className="w-[5.5rem] sm:w-[8.5rem]" />
              <col className="w-[5.5rem] sm:w-[8.5rem]" />
              <col className="w-[4.75rem] sm:w-[7rem]" />
            </colgroup>
            <thead>
              <tr className="text-left">
                <th className={`${stickyCol} pb-3 pr-1.5 font-normal sm:pr-2`}>
                  <span className="sr-only">Line</span>
                </th>
                {[A, B].map((o) => (
                  <th key={o.id} className="snap-start px-1.5 pb-3 text-right align-bottom sm:px-2">
                    <span className="block font-mono text-[9px] font-normal uppercase tracking-[0.1em] text-muted sm:text-[10px] sm:tracking-[0.14em]">
                      {o.rateLock.locked ? "Rate locked" : "Not locked"}
                    </span>
                    <span className="block text-[11.5px] font-semibold leading-tight text-balance sm:text-[13px]">{o.lender}</span>
                  </th>
                ))}
                <th className="snap-start pb-3 pl-1.5 pr-3 text-right align-bottom font-mono text-[9px] font-normal uppercase tracking-[0.1em] text-muted sm:pl-2 sm:pr-5 sm:text-[10px] sm:tracking-[0.14em]">
                  <span aria-hidden title="Difference: B vs A">Diff</span>
                  <span className="sr-only">Difference, B versus A</span>
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
                    <th scope="row" className={`${stickyCol} py-2.5 pr-1.5 text-left align-top text-[11.5px] font-normal leading-snug text-ink-2 sm:pr-2 sm:text-[13px]`}>
                      {r.k}
                      {r.note ? <span className="mt-0.5 block text-[10.5px] text-muted sm:text-[11px]">{r.note}</span> : null}
                    </th>
                    {[
                      [r.a, lowA],
                      [r.b, lowB],
                    ].map(([v, low], i) => (
                      <td key={i} className="px-1 py-2.5 text-right align-top sm:px-2">
                        <span
                          className={`rounded-md px-1 py-0.5 font-mono tabular-nums sm:px-1.5 ${
                            low ? "bg-accent-soft font-semibold text-accent" : ""
                          }`}
                        >
                          {r.fmt(v as number)}
                        </span>
                      </td>
                    ))}
                    <td className="py-2.5 pl-1 pr-3 text-right align-top font-mono text-[11px] tabular-nums text-muted sm:pl-2 sm:pr-5 sm:text-[12px]">
                      {d === 0 ? "—" : `B ${d > 0 ? "+" : "−"}${r.k === "Interest rate" ? pct(Math.abs(d)) : r.k === "APR" ? `${Math.abs(d).toFixed(3)}%` : usd(Math.abs(d))}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* right-edge fade: there's more to the right until you reach the end */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 right-0 w-6 bg-linear-to-l from-white to-white/0 transition-opacity duration-200 ${
            scroll.overflow && !scroll.atEnd ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <p className="px-3 pb-4 text-[11px] text-muted sm:px-5">
        Green = lower of the two. Lower isn’t automatically better — see the time-horizon check below.
      </p>

      {/* horizon */}
      <div className="min-w-0 border-t border-line/70 px-5 py-6 sm:px-8">
        <label htmlFor="horizon" className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="min-w-0 text-sm font-semibold">How long do you expect to keep this loan?</span>
          <span className="font-mono text-sm tabular-nums text-accent">{keep}</span>
        </label>
        {/* break-even legend: in normal flow so it wraps on narrow screens instead of overflowing */}
        <p className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[10px] text-[#9a5806]">
          <span aria-hidden className="inline-block h-3 w-0.5 rounded-full bg-btc" />
          <span className="rounded-full bg-btc/15 px-2 py-0.5">Break-even ≈ {breakEvenYears.toFixed(1)} yr</span>
          <span className="text-muted">orange tick on the slider</span>
        </p>
        <div className="relative mt-3 w-full min-w-0">
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
            className="relative z-10 m-0 box-border block w-full min-w-0 max-w-full accent-[#0f5e4f]"
          />
        </div>
        <div className="mt-1 flex justify-between font-mono text-[10px] text-muted">
          <span>1 yr</span>
          <span>10</span>
          <span>20</span>
          <span>{MAX_YEARS} yr</span>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            [A, costA],
            [B, costB],
          ].map(([o, c]) => {
            const offer = o as Offer;
            const win = better === offer.id;
            return (
              <div
                key={offer.id}
                className={`min-w-0 rounded-2xl border p-4 transition-colors ${win ? "border-accent bg-accent-soft/60" : "border-line bg-paper/60"}`}
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
          className="mt-5 w-full rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent disabled:cursor-default disabled:bg-accent disabled:opacity-80 sm:w-auto"
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
