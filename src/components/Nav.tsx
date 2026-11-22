"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";

const items = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#side-projects", label: "More builds" },
];

const DEMO_HREF = "/loan-estimate-advisor";
const EVAL_HREF = "/mortgage-advice-eval";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onDemo = pathname === DEMO_HREF;
  const onEval = pathname === EVAL_HREF;

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
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              history.replaceState(null, "", "/");
            }
          }}
          className="group flex items-center gap-2.5"
          aria-label="Shaun Barry — home"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-ink font-serif text-[15px] text-paper">
            SB
          </span>
          <span className="text-[15px] font-medium tracking-tight">Shaun Barry</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {items.map((i) => (
            <li key={i.href}>
              <Link
                href={i.href}
                className="rounded-md px-3 py-2 text-sm text-ink-2 transition-colors hover:text-ink"
              >
                {i.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={DEMO_HREF}
              aria-current={onDemo ? "page" : undefined}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm transition-colors ${
                onDemo ? "font-medium text-accent" : "text-ink-2 hover:text-ink"
              }`}
            >
              <span className="size-1.5 rounded-full bg-accent-2" aria-hidden />
              Demo
            </Link>
          </li>
          <li>
            <Link
              href={EVAL_HREF}
              aria-current={onEval ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-sm transition-colors ${
                onEval ? "font-medium text-accent" : "text-ink-2 hover:text-ink"
              }`}
            >
              AI Eval
            </Link>
          </li>
          {profile.linkedin ? (
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-3 py-2 text-sm text-ink-2 transition-colors hover:text-ink"
              >
                LinkedIn
              </a>
            </li>
          ) : null}
          {profile.publishResumeLink && profile.resumePdf ? (
            <li>
              <a
                href={profile.resumePdf}
                className="rounded-md px-3 py-2 text-sm text-ink-2 transition-colors hover:text-ink"
              >
                Résumé
              </a>
            </li>
          ) : null}
          <li className="ml-2">
            <Link
              href="/#contact"
              className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-accent"
            >
              Get in touch
            </Link>
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
          {items.map((i) => (
            <li key={i.href}>
              <Link
                href={i.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg tracking-tight text-ink"
              >
                {i.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={DEMO_HREF}
              onClick={() => setOpen(false)}
              aria-current={onDemo ? "page" : undefined}
              className={`flex items-center gap-2 py-3 text-lg tracking-tight ${onDemo ? "text-accent" : "text-ink"}`}
            >
              <span className="size-2 rounded-full bg-accent-2" aria-hidden />
              Demo · Loan Estimate Advisor
            </Link>
          </li>
          <li>
            <Link
              href={EVAL_HREF}
              onClick={() => setOpen(false)}
              aria-current={onEval ? "page" : undefined}
              className={`block py-3 text-lg tracking-tight ${onEval ? "text-accent" : "text-ink"}`}
            >
              AI Eval · Mortgage Borrower Advice
            </Link>
          </li>
          {profile.linkedin ? (
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block py-3 text-lg tracking-tight text-ink"
              >
                LinkedIn
              </a>
            </li>
          ) : null}
          {profile.publishResumeLink && profile.resumePdf ? (
            <li>
              <a
                href={profile.resumePdf}
                onClick={() => setOpen(false)}
                className="block py-3 text-lg tracking-tight text-ink"
              >
                Résumé
              </a>
            </li>
          ) : null}
          <li>
            <Link href="/#contact" onClick={() => setOpen(false)} className="block py-3 text-lg tracking-tight text-ink">
              Get in touch
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
