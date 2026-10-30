/** Purely illustrative visual for the Loan Estimate Advisor concept. Sample numbers only. */
export function LoanEstimateMock() {
  const rows = [
    { k: "Loan amount", v: "$320,000" },
    { k: "Interest rate", v: "6.625%" },
    { k: "Monthly principal & interest", v: "$2,049" },
    { k: "Prepayment penalty", v: "NO" },
    { k: "Balloon payment", v: "NO" },
  ];
  return (
    <figure
      className="relative mx-auto w-full max-w-md"
      aria-label="Illustrative preview of the Loan Estimate Advisor concept"
    >
      {/* document */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_0_rgba(18,22,28,0.04),0_30px_60px_-30px_rgba(18,22,28,0.35)]">
        <div className="flex items-center justify-between border-b border-line/70 px-5 py-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Sample document</p>
            <p className="text-sm font-semibold tracking-tight">Loan Estimate</p>
          </div>
          <span className="font-mono text-[10px] text-muted">Page 1 of 3</span>
        </div>
        <dl className="divide-y divide-line/60 px-5">
          {rows.map((r) => (
            <div key={r.k} className="flex items-baseline justify-between py-2.5 text-[13px]">
              <dt className="text-ink-2">{r.k}</dt>
              <dd className="font-mono font-medium tabular-nums">{r.v}</dd>
            </div>
          ))}
        </dl>
        <div className="mx-5 mb-5 mt-2 rounded-lg bg-paper px-3 py-2.5 text-[12px] text-ink-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Rate lock</span>
          <p className="mt-0.5">
            <span className="rounded bg-btc/15 px-1 font-medium text-ink">Not locked</span> — rate can change until locked.
          </p>
        </div>
        {/* scanning line */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-14 h-8">
          <div className="scanline h-px w-full bg-gradient-to-r from-transparent via-accent-2 to-transparent shadow-[0_0_18px_2px_rgba(22,122,102,0.35)]" />
        </div>
      </div>

      {/* advisor card */}
      <div className="relative -mt-6 ml-6 rounded-2xl border border-ink/10 bg-ink p-4 text-paper shadow-2xl sm:-mr-8 sm:ml-12">
        <div className="mb-2 flex items-center gap-2">
          <span className="pulse-dot size-2 rounded-full bg-accent-2" aria-hidden />
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/60">Advisor · plain English</p>
        </div>
        <ul className="space-y-2 text-[13px] leading-snug">
          <li className="flex gap-2">
            <span className="text-accent-soft" aria-hidden>→</span>
            Your rate isn&apos;t locked yet. Ask your lender when you can lock and what it costs.
          </li>
          <li className="flex gap-2">
            <span className="text-accent-soft" aria-hidden>→</span>
            No prepayment penalty — you can pay extra or refinance later without a fee.
          </li>
          <li className="flex gap-2">
            <span className="text-accent-soft" aria-hidden>→</span>
            Next: compare Section A (origination charges) against your other offers.
          </li>
        </ul>
      </div>
      <figcaption className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        Concept preview · illustrative numbers
      </figcaption>
    </figure>
  );
}
