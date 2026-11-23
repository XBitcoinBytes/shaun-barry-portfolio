"use client";

import { useId, useState } from "react";
import type { Certification, CertificationGroup } from "@/content/profile";

/** Shown by default, in this order. Matched by name + issuer; data stays in profile.ts. */
const FEATURED: { name: string; issuer: string }[] = [
  { name: "Scope AI Solutions", issuer: "OpenAI Academy" },
  { name: "Foundations in Generative AI", issuer: "IBM SkillsBuild" },
  { name: "Building effective human-agent teams (beta)", issuer: "Claude Academy (Anthropic)" },
  { name: "Impact, Ethics, and Issues with Generative AI", issuer: "IBM · edX" },
  { name: "Introduction to LLM Vulnerabilities", issuer: "edX" },
  { name: "Prompt Design in Vertex AI Skill Badge", issuer: "Google" },
  { name: "Generative AI and LLMs on AWS", issuer: "Pragmatic AI Labs · edX" },
  { name: "Using GenAI to Automate Software Development Tasks", issuer: "Pragmatic AI Labs · edX" },
  { name: "CS198.1x Bitcoin and Cryptocurrencies", issuer: "UC Berkeley · edX" },
];

function Row({ c }: { c: Certification }) {
  return (
    <li className="flex flex-col gap-0.5 border-b border-line/70 py-3 last:border-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
      <div className="min-w-0">
        <p className="text-[15px] font-medium leading-snug">
          {c.href ? (
            <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-4 hover:underline">
              {c.name}
            </a>
          ) : (
            c.name
          )}
        </p>
        <p className="text-xs text-muted">{c.issuer}</p>
      </div>
      <p className="shrink-0 font-mono text-xs text-ink-2">{c.date}</p>
    </li>
  );
}

export function CertList({ groups }: { groups: CertificationGroup[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const all = groups.flatMap((g) => g.items);
  const isFeatured = (c: Certification) => FEATURED.some((f) => f.name === c.name && f.issuer === c.issuer);
  const featured = FEATURED.map((f) => all.find((c) => c.name === f.name && c.issuer === f.issuer)).filter(
    (c): c is Certification => Boolean(c),
  );
  const restCount = all.length - featured.length;

  return (
    <div className="mt-6">
      <ul className="grid gap-x-8 lg:grid-cols-2">
        {featured.map((c, i) => (
          <Row key={`f-${c.name}-${i}`} c={c} />
        ))}
      </ul>

      <div className="mt-6 flex justify-center sm:justify-start">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {open ? "Show fewer certifications" : `Show all ${all.length} certifications`}
          <span aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
        </button>
      </div>

      <div id={panelId} hidden={!open} className="mt-8">
        <p className="text-xs text-muted">The other {restCount}, by group:</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-2">
          {groups.map((g) => {
            const items = g.items.filter((c) => !isFeatured(c));
            if (items.length === 0) return null;
            return (
              <div key={g.title}>
                <p className="border-b border-line pb-3 text-[15px] font-semibold">
                  {g.title} <span className="font-normal text-muted">({g.items.length} total)</span>
                </p>
                <ul>
                  {items.map((c, i) => (
                    <Row key={`${g.title}-${c.name}-${c.issuer}-${i}`} c={c} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
