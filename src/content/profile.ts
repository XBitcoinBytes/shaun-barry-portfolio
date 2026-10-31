/**
 * Single source of truth for the site's content.
 * Anything set to `null` renders as a clearly-labeled "To confirm" placeholder.
 * Fill these in with Shaun and redeploy.
 */

export const profile = {
  name: "Shaun Barry",
  location: "Clarkston / Waterford, Michigan",
  headline: "Mortgage lending professional building toward AI × mortgage.",
  nmlsId: "30170",
  openTo: "Open to full-time, base-salary roles",

  // ---- Needs Shaun's input ----
  email: "keeptheclient@yahoo.com" as string | null,
  phone: "248 842 7104" as string | null,
  linkedin: "https://www.linkedin.com/in/barryshaun/" as string | null,
  github: null as string | null, // full URL once verified
  photo: null as string | null, // e.g. "/shaun.jpg" placed in /public
  resumePdf: null as string | null, // e.g. "/Shaun-Barry-Resume.pdf" placed in /public
};

export type Role = {
  org: string;
  title: string | null; // null => "Title to confirm"
  dates: string | null; // null => "Dates to confirm"
  summary: string;
  highlights: (string | null)[]; // null entries render as placeholders
  current?: boolean;
};

export const experience: Role[] = [
  {
    org: "Independent — AI × Mortgage",
    title: "Builder & researcher",
    dates: "Now",
    current: true,
    summary:
      "Designing borrower-first AI tools for mortgage: a Loan Estimate advisor for consumers and an AI adoption roadmap for lenders. Publishing BitcoinBytes on the side.",
    highlights: [
      "Built a clickable Loan Estimate Advisor demo: plain-English explanations, lender questions, and offer comparison",
      "Drafting a phased, compliance-aware AI roadmap for mortgage lenders",
    ],
  },
  {
    org: "Refi.com / Veterans United",
    title: null,
    dates: null,
    summary:
      "Mortgage and home lending — working directly in the process that takes a borrower from application to closing.",
    highlights: [null, null, null],
  },
];

export const credentials = [
  { label: "NMLS ID", value: profile.nmlsId },
  { label: "Education", value: null as string | null },
  { label: "Certifications", value: null as string | null },
];

export const skills = {
  mortgage: [
    "Home lending & refinance process",
    "Loan Estimate & Closing Disclosure literacy",
    "Borrower communication & education",
    "Pipeline from application to closing",
    "Regulated, compliance-first environments",
  ],
  ai: [
    "LLM-powered document understanding",
    "Prompt & workflow design",
    "AI product discovery for regulated industries",
    "Human-in-the-loop process design",
    "Responsible AI & fair-lending awareness",
  ],
  tools: null as string[] | null, // e.g. LOS / CRM / pricing engines — to confirm
};

export const links = {
  bitcoinBytesSite: "https://bitcoinbytes.org",
  bitcoinBytesX: "https://x.com/xbitcoinbytes",
};
