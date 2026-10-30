import type { ReactNode } from "react";

export function ToConfirm({ children = "To confirm with Shaun" }: { children?: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-ink/30 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted"
      title="Placeholder — to be filled in"
    >
      <span aria-hidden className="size-1.5 rounded-full bg-btc/80" />
      {children}
    </span>
  );
}

export function SectionHeader({
  index,
  kicker,
  title,
  intro,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <div className="reveal grid gap-6 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-4">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span className="text-accent">{index}</span>
          <span className="h-px w-8 bg-line" aria-hidden />
          {kicker}
        </p>
      </div>
      <div className="md:col-span-8">
        <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
          {title}
        </h2>
        {intro ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-2 text-pretty">{intro}</p>
        ) : null}
      </div>
    </div>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
