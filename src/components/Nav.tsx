"use client";

import { useEffect, useState } from "react";

const items = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line/80 bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Shaun Barry — home">
          <span className="grid size-8 place-items-center rounded-lg bg-ink font-serif text-[15px] text-paper">
            SB
          </span>
          <span className="text-[15px] font-medium tracking-tight">Shaun Barry</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {items.map((i) => (
            <li key={i.href}>
              <a
                href={i.href}
                className="rounded-md px-3 py-2 text-sm text-ink-2 transition-colors hover:text-ink"
              >
                {i.label}
              </a>
            </li>
          ))}
          <li className="ml-2">
            <a
              href="#contact"
              className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              Get in touch
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="-mr-2 grid size-10 place-items-center rounded-md md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-5 bg-ink transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] w-5 bg-ink transition-transform duration-300 ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line/70 md:hidden">
        <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3">
          {[...items, { href: "#contact", label: "Get in touch" }].map((i) => (
            <li key={i.href}>
              <a
                href={i.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg tracking-tight text-ink"
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
