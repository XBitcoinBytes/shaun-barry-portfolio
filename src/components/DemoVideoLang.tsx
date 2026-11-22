"use client";

import { useState } from "react";

type Lang = "en" | "es";

const copy: Record<Lang, { button: string; aria: (title: string, s: number) => string; caption: (s: number) => string }> = {
  en: {
    button: "English",
    aria: (title, s) => `${title}: ${s}-second narrated demo video with captions`,
    caption: (s) => `Watch the ${s}-second demo · narrated, with captions`,
  },
  es: {
    button: "Español",
    aria: (title, s) => `${title}: video de demostración narrado de ${s} segundos, con subtítulos`,
    caption: (s) => `Mira la demo de ${s} segundos · narrada, con subtítulos`,
  },
};

export function DemoVideoLang({
  slugs,
  title,
  seconds,
  className = "",
}: {
  slugs: Record<Lang, string>;
  title: Record<Lang, string>;
  seconds: Record<Lang, number>;
  className?: string;
}) {
  const [lang, setLang] = useState<Lang>("en");
  const slug = slugs[lang];
  return (
    <figure className={`max-w-2xl ${className}`}>
      <div
        role="group"
        aria-label="Video language / Idioma del video"
        className="mb-2 inline-flex rounded-full border border-line p-0.5 font-mono text-[11px] uppercase tracking-[0.12em]"
      >
        {(["en", "es"] as const).map((l) => (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={lang === l}
            onClick={() => setLang(l)}
            className={`rounded-full px-3 py-1 transition-colors ${lang === l ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
          >
            {copy[l].button}
          </button>
        ))}
      </div>
      <video
        key={slug}
        lang={lang}
        className="aspect-video h-auto w-full rounded-2xl border border-line bg-ink"
        src={`/videos/${slug}-explainer.mp4`}
        poster={`/videos/${slug}-poster.webp`}
        width={1280}
        height={720}
        controls
        playsInline
        preload="none"
        aria-label={copy[lang].aria(title[lang], seconds[lang])}
      />
      <figcaption lang={lang} className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        {copy[lang].caption(seconds[lang])}
      </figcaption>
    </figure>
  );
}
