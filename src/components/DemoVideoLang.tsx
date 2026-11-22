"use client";

import { useState } from "react";

type Lang = "en" | "es";

export function DemoVideoLang({
  slugs,
  title,
  seconds,
  className = "",
}: {
  slugs: Record<Lang, string>;
  title: string;
  seconds: Record<Lang, number>;
  className?: string;
}) {
  const [lang, setLang] = useState<Lang>("en");
  const slug = slugs[lang];
  const label = lang === "en" ? "English screens" : "Spanish screens";
  return (
    <figure className={`max-w-2xl ${className}`}>
      <div role="group" aria-label="Video language" className="mb-2 inline-flex rounded-full border border-line p-0.5 font-mono text-[11px] uppercase tracking-[0.12em]">
        {(["en", "es"] as const).map((l) => (
          <button
            key={l}
            type="button"
            aria-pressed={lang === l}
            onClick={() => setLang(l)}
            className={`rounded-full px-3 py-1 transition-colors ${lang === l ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
          >
            {l === "en" ? "English" : "Español"}
          </button>
        ))}
      </div>
      <video
        key={slug}
        className="aspect-video h-auto w-full rounded-2xl border border-line bg-ink"
        src={`/videos/${slug}-explainer.mp4`}
        poster={`/videos/${slug}-poster.webp`}
        width={1280}
        height={720}
        controls
        playsInline
        preload="none"
        aria-label={`${title}: ${seconds[lang]}-second narrated demo video with captions (${label})`}
      />
      <figcaption className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        Watch the {seconds[lang]}-second demo · narrated, with captions · {label}
      </figcaption>
    </figure>
  );
}
