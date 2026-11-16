/**
 * Single source of truth for the site's content.
 * Anything set to `null` renders as a clearly-labeled "To confirm" placeholder.
 * Fill these in with Shaun and redeploy.
 */

export const profile = {
  name: "Shaun Barry",
  location: "Clarkston, Michigan",
  headline: "Mortgage loan originator with 25+ years in home lending, now building borrower-first AI for mortgage.",
  nmlsId: "30170",
  openTo: "Open to full-time roles",

  // ---- Needs Shaun's input ----
  email: "keeptheclient@yahoo.com" as string | null,
  phone: "248 842 7104" as string | null,
  linkedin: "https://www.linkedin.com/in/barryshaun/" as string | null,
  github: "https://github.com/XBitcoinBytes" as string | null,
  photo: null as string | null, // e.g. "/shaun.jpg" placed in /public
  resumePdf: "/Shaun-Barry-Resume.pdf" as string | null,
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
      "Designing borrower-first AI tools for mortgage: a loan-officer-reviewed borrower-advice eval, a Loan Estimate advisor for consumers, and an AI adoption roadmap for lenders. Publishing BitcoinBytes on the side.",
    highlights: [
      "Designed and published the Mortgage Borrower Advice Eval (v1.1): 78 loan-officer-reviewed items testing whether AI assistants give borrowers safe, useful advice",
      "A provisional Nov 15, 2026 Codex (gpt-6.1-sol) run scored 85.1% overall and 98.5% on safety (77 of 78 items, LLM-judged, not yet reviewed). A 525-item question bank is in progress toward 1,000",
      "Built a clickable Loan Estimate Advisor demo: plain-English explanations, lender questions, and offer comparison",
      "Drafting a phased, compliance-aware AI roadmap for mortgage lenders",
      "Created 25+ financial education podcast episodes on YouTube (@MyBitcoinBytes), using AI to simplify complex finance topics",
    ],
  },
  {
    org: "Refi.com / Veterans United",
    title: "Mortgage Loan Originator",
    dates: "Nov 2025 – Nov 2026; role ended Nov 2026",
    summary:
      "Originated refinance and purchase loans, working directly in the process that takes a borrower from application to closing.",
    highlights: [
      "Cultivated client relationships by collecting financial information and running credit to determine loan eligibility",
      "Advised borrowers on suitable loan options, clearly explaining terms, rates, and the entire loan process",
      "Managed client paperwork and loan files from initial application to final closing",
    ],
  },
  {
    org: "Perry Johnson Mortgage",
    title: "Executive Mortgage Loan Originator · Remote",
    dates: "Apr 2024 – Apr 2025",
    summary: "FHA, VA, Conventional, and Jumbo origination with AI-assisted workflows.",
    highlights: [
      "Streamlined origination and underwriting with AI tools, reducing processing times by 25%",
      "Ran data-driven risk assessments while achieving a 95% client satisfaction rate",
    ],
  },
  {
    org: "AmeriSave Mortgage Corp",
    title: "Senior Mortgage Loan Originator – Chat Team · Remote",
    dates: "Mar 2010 – Mar 2024",
    summary:
      "High-volume digital originator — most production came through online and chat channels.",
    highlights: [
      "Originated and closed 1,400+ residential mortgage loans totaling $400M+, managing a 70+ client pipeline in Salesforce, Botsplash, and LendingTree",
      "Funded $80M+ in 2020, ranking in the top 5% of U.S. mortgage originators",
      "Maintained a 95%+ client satisfaction rating with repeat and referral business",
      "Held active mortgage licenses in 24 states",
    ],
  },
  {
    org: "Quicken Loans",
    title: "Executive Mortgage Banker – Chat Team · Troy, MI",
    dates: "Mar 2005 – Feb 2010",
    summary: "Personalized mortgage solutions with long-term client relationships and repeat business.",
    highlights: [
      "Originated $36M+ in annual loan funding, consistently exceeding sales and performance targets",
      "Pioneered adoption of chat to improve client communication and streamline loan processing",
    ],
  },
  {
    org: "Earlier career",
    title: "Wells Fargo · Home Quarters · Citizens Mortgage",
    dates: "Before 2005",
    summary:
      "Sr. Home Mortgage Consultant at Wells Fargo, Director of Mortgage Banking at Home Quarters, and Presidents Club Loan Officer at Citizens Mortgage Inc.",
    highlights: [],
  },
];

export type Credential = { label: string; value: string | null; href?: string };

export const credentials: Credential[] = [
  { label: "NMLS ID", value: profile.nmlsId },
  {
    label: "Licensed MLO (NMLS)",
    value: "AK, AR, AZ, CA, CO, CT, DC, FL, GA, IA, ID, IL, IN, KS, KY, MA, MD, MI, MN, MO, MS, MT, NC, ND, NE, NH, NM, OH, OK, OR, PA, RI, SD, TN, TX, VA, VT, WA, WV",
  },
  {
    label: "Certifications",
    value:
      "18 Generative AI & Prompt Engineering certifications (IBM, Google, Pragmatic AI) · Certified Bitcoin Professional (CBP) – C4 · Bitcoin & Cryptocurrencies – UC Berkeley, 2022",
    href: "https://www.linkedin.com/in/barryshaun/details/certifications/",
  },
  { label: "Education", value: "Cincinnati State — coursework in Marketing" },
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
  tools: [
    "Encompass",
    "Salesforce",
    "Botsplash",
    "Loan-Sifter",
    "DocuSign",
    "HubSpot",
    "Microsoft Office",
    "CRM & digital lending platforms",
    "Fintech & AI-driven tools",
  ] as string[] | null,
};

export const links = {
  bitcoinBytesSite: "https://bitcoinbytes.org",
  bitcoinBytesX: "https://x.com/xbitcoinbytes",
  youtube: "https://www.youtube.com/@MyBitcoinBytes",
};
