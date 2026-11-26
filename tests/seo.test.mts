import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_PAGES, SITE_URL } from "../src/content/canonical.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("canonical origin is the public portfolio host", () => {
  assert.equal(SITE_URL, "https://shaun-barry-portfolio.vercel.app");
});

test("sitemap module lists the homepage and every case-study route", () => {
  const src = readFileSync(join(root, "src/app/sitemap.ts"), "utf8");
  assert.match(src, /SITE_PAGES/);
  assert.match(src, /SITE_URL/);
  assert.ok(SITE_PAGES.includes("/"));
  assert.ok(SITE_PAGES.includes("/mortgageeval"));
  assert.ok(SITE_PAGES.includes("/loan-estimate-advisor"));
  assert.ok(SITE_PAGES.includes("/lender-ai-roadmap"));
  assert.ok(SITE_PAGES.includes("/mortgage-advice-eval"));
  assert.ok(SITE_PAGES.includes("/mortgage-ai-eval"));
  assert.ok(SITE_PAGES.includes("/bot-dashboard-design"));
});

test("robots module points at the sitemap on the public host", () => {
  const src = readFileSync(join(root, "src/app/robots.ts"), "utf8");
  assert.match(src, /sitemap: `\$\{SITE_URL\}\/sitemap\.xml`/);
  assert.match(src, /host: SITE_URL/);
});

test("root layout sets metadataBase and a canonical URL", () => {
  const src = readFileSync(join(root, "src/app/layout.tsx"), "utf8");
  assert.match(src, /metadataBase: new URL\(SITE_URL\)/);
  assert.match(src, /alternates: \{ canonical: SITE_URL \}/);
});
