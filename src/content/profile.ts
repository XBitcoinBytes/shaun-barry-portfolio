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
  // Top-of-page résumé link (hero + nav). Keep false until the corrected
  // primary résumé has no FLAG / PLACEHOLDER / [CONFIRM] tags or a
  // "do not submit" banner. The contact-section download stays as-is.
  publishResumeLink: true,
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
    org: "Independent — AI and Mortgage Technology",
    title: "Builder & researcher",
    dates: "Now",
    current: true,
    summary:
      "Designing borrower-first AI tools for mortgage: a loan-officer-reviewed borrower-advice eval, a Loan Estimate advisor for consumers, and an AI adoption roadmap for lenders. Publishing BitcoinBytes on the side.",
    highlights: [
      "Designed and published the Mortgage Borrower Advice Eval (v1.1): 78 loan-officer-reviewed items testing whether AI assistants give borrowers safe, useful advice",
      "Built a 1,000-question private mortgage AI benchmark (gold answers grounded in public primary sources where available) and compared Codex and Grok 4.7: 80.3% vs 67.8% pass rate on 814 held-out questions (preliminary, single judge)",
      "Built a 393-term, bilingual (English and Spanish) Mortgage Compliance Glossary with Loan Estimate and Closing Disclosure examples and regulation citations (launching soon)",
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
    dates: "Mar 2024 – Mar 2025",
    summary: "FHA, VA, Conventional, and Jumbo origination with AI-assisted workflows.",
    highlights: [
      "Streamlined origination and underwriting with AI tools for FHA, VA, Conventional, and Jumbo loans",
      "Ran data-driven risk assessments while achieving a 95% client satisfaction rate",
    ],
  },
  {
    org: "AmeriSave Mortgage Corp",
    title: "Senior Mortgage Loan Originator – Chat Team · Remote",
    dates: "May 2014 – Mar 2024",
    summary:
      "High-volume digital originator — most production came through online and chat channels.",
    highlights: [
      "Originated and closed 1,400+ residential mortgage loans totaling $400M+, managing a 70+ client pipeline in Salesforce, Botsplash, and LendingTree",
      "Funded $80M+ in 2020, ranking in the top 5% of U.S. mortgage originators",
      "Maintained a 95%+ client satisfaction rating with repeat and referral business",
    ],
  },
  {
    org: "Guaranteed Rate",
    title: "Senior Mortgage Originator",
    dates: "Mar 2014 – May 2014",
    summary: "Brief origination role between AmeriSave stints.",
    highlights: [],
  },
  {
    org: "AmeriSave Mortgage Corp",
    title: "Senior Mortgage Loan Originator – Chat Team · Remote",
    dates: "Apr 2010 – Dec 2013",
    summary:
      "High-volume digital originator — most production came through online and chat channels.",
    highlights: [],
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

export type Certification = { name: string; issuer: string; date: string };
export type CertificationGroup = { title: string; items: Certification[] };

export const certificationsLinkedIn = "https://www.linkedin.com/in/barryshaun/details/certifications/";

/**
 * Add a new certification as ONE line at the top of the right group (newest first).
 * date format: "Mon YYYY". Credential IDs are intentionally not shown on the site.
 */
export const certificationGroups: CertificationGroup[] = [
  {
    title: "AI certifications",
    items: [
      { name: "Generative AI Fundamentals", issuer: "Pragmatic AI Labs", date: "Aug 2025" },
      { name: "End to End LLM with Azure", issuer: "Pragmatic AI Labs · edX", date: "Aug 2025" },
      { name: "Small Language Models", issuer: "Pragmatic AI Labs · edX", date: "Aug 2025" },
      { name: "Using GenAI to Automate Software Development Tasks", issuer: "Pragmatic AI Labs · edX", date: "Jul 2025" },
      { name: "Introduction to Generative AI", issuer: "Pragmatic AI Labs · edX", date: "Jul 2025" },
      { name: "Generative AI and LLMs on AWS", issuer: "Pragmatic AI Labs · edX", date: "Jul 2025" },
      { name: "Beginning Llamafile", issuer: "Pragmatic AI Labs · edX", date: "Jun 2025" },
      { name: "Agile with AI", issuer: "Pragmatic AI Labs · edX", date: "Jun 2025" },
      { name: "Applied Local Large Language Models", issuer: "Pragmatic AI Labs · edX", date: "Jun 2025" },
      { name: "Introduction to LLM Vulnerabilities", issuer: "edX", date: "Jun 2025" },
      { name: "Introduction to Data Science", issuer: "IBM · edX", date: "Jun 2025" },
      { name: "Models and Platforms for Generative AI", issuer: "IBM · edX", date: "May 2025" },
      { name: "Impact, Ethics, and Issues with Generative AI", issuer: "IBM · edX", date: "May 2025" },
      { name: "Foundations of AI", issuer: "IBM", date: "May 2025" },
      { name: "Introduction to Generative AI", issuer: "IBM · edX", date: "May 2025" },
      { name: "Prompt Design in Vertex AI Skill Badge", issuer: "Google", date: "Apr 2025" },
      { name: "Introduction to Prompt Engineering", issuer: "IBM · edX", date: "Apr 2025" },
      { name: "AI for Everyone: Master the Basics", issuer: "IBM · edX", date: "Apr 2025" },
    ],
  },
  {
    title: "Bitcoin & economics",
    items: [
      { name: "ECON120 Monetary History", issuer: "Saylor University", date: "Apr 2025" },
      { name: "ECON104 Principles of Austrian Economics II", issuer: "Saylor University", date: "Apr 2025" },
      { name: "ECON105 Hard Questions on Hard Money", issuer: "Saylor University", date: "Mar 2025" },
      { name: "ECON103 Principles of Austrian Economics I", issuer: "Saylor University", date: "Mar 2025" },
      { name: "PRDV151 Bitcoin for Everybody", issuer: "Saylor University", date: "Feb 2025 · also Dec 2022" },
      { name: "ECON135 What is Money?", issuer: "Saylor University", date: "Feb 2025" },
      { name: "CS198.1x Bitcoin and Cryptocurrencies", issuer: "UC Berkeley · edX", date: "Jan 2023" },
      { name: "Certified Bitcoin Professional (CBP)", issuer: "CryptoCurrency Certification Consortium (C4)", date: "Dec 2022" },
    ],
  },
];

export const certificationCount = certificationGroups.reduce((n, g) => n + g.items.length, 0);

export type Credential = { label: string; value: string | null; href?: string };

export const credentials: Credential[] = [
  { label: "NMLS ID", value: profile.nmlsId },
  {
    label: "Licenses",
    value: "Currently licensed in 36 states plus DC (NMLS #30170): AK, AZ, AR, CA, CO, CT, DC, FL, GA, ID, IL, IN, IA, KS, KY, MD, MA, MI, MN, MS, MO, MT, NM, NC, ND, OH, OK, OR, PA, RI, SD, TN, TX, VT, VA, WA, WV",
  },
  { label: "Certifications", value: `${certificationCount} certifications — full list below` },
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
