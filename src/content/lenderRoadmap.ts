// Lender AI Roadmap: content for the interactive guide (DRAFT, local prototype).
// Rules: no invented stats or quotes. Every legal statement points to a primary source in `sources`.
// Value/risk ratings and time ranges are the author's judgment and are labeled that way on the page.
// Regulatory status checked Nov 22, 2026 (loop 2: Reg B 2026 amendment, Fannie Supplement Section 4).

export type SourceId =
  | "ecoa"
  | "regb9"
  | "regbAppC"
  | "regbAmend2026"
  | "cfpbWithdrawn"
  | "udaap"
  | "cfpbChatbots"
  | "trid"
  | "regzAds"
  | "glba"
  | "regp"
  | "safeguards"
  | "mrm2026"
  | "occ202613"
  | "tprm2023"
  | "tprm2026"
  | "freddie"
  | "fannie"
  | "nistRmf"
  | "nistGenai"
  | "colorado"
  | "fha";

export const sources: Record<SourceId, { label: string; url: string; note?: string }> = {
  ecoa: { label: "Equal Credit Opportunity Act, 15 U.S.C. 1691", url: "https://www.law.cornell.edu/uscode/text/15/1691" },
  regb9: {
    label: "Regulation B, 12 CFR 1002.9 (notifications, including adverse action)",
    url: "https://www.ecfr.gov/current/title-12/chapter-X/part-1002/section-1002.9",
  },
  regbAppC: {
    label: "Regulation B, Appendix C (sample notices) and Supplement I",
    url: "https://www.ecfr.gov/current/title-12/chapter-X/part-1002",
  },
  regbAmend2026: {
    label: "CFPB final rule amending Regulation B: effects test, discouragement, special purpose credit programs (Federal Register, Apr 22, 2026; effective Jul 21, 2026)",
    url: "https://www.federalregister.gov/documents/2026/04/22/2026-07804/equal-credit-opportunity-act-regulation-b",
  },
  cfpbWithdrawn: {
    label: "CFPB: Withdrawn guidance (Circulars 2022-03 and 2023-03 withdrawn May 12, 2025)",
    url: "https://www.consumerfinance.gov/compliance/guidance/withdrawn-guidance/",
  },
  udaap: {
    label: "Dodd-Frank Act UDAAP, 12 U.S.C. 5531 and 5536",
    url: "https://www.law.cornell.edu/uscode/text/12/5531",
  },
  cfpbChatbots: {
    label: "CFPB issue spotlight: Chatbots in consumer finance (June 2023)",
    url: "https://www.consumerfinance.gov/data-research/research-reports/chatbots-in-consumer-finance/chatbots-in-consumer-finance/",
  },
  trid: {
    label: "TRID: Regulation Z, 12 CFR 1026.19(e)-(f), 1026.37, 1026.38",
    url: "https://www.ecfr.gov/current/title-12/chapter-X/part-1026/subpart-C/section-1026.19",
  },
  regzAds: {
    label: "Regulation Z advertising, 12 CFR 1026.24",
    url: "https://www.ecfr.gov/current/title-12/chapter-X/part-1026/subpart-C/section-1026.24",
  },
  glba: { label: "Gramm-Leach-Bliley Act, 15 U.S.C. 6801-6809", url: "https://www.law.cornell.edu/uscode/text/15/6801" },
  regp: { label: "Regulation P (privacy), 12 CFR Part 1016", url: "https://www.ecfr.gov/current/title-12/chapter-X/part-1016" },
  safeguards: {
    label: "FTC Safeguards Rule, 16 CFR Part 314 (covers non-bank mortgage lenders and brokers)",
    url: "https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-314",
  },
  mrm2026: {
    label: "Federal Reserve SR 26-2: Revised Guidance on Model Risk Management (Apr 17, 2026; replaces SR 11-7)",
    url: "https://www.federalreserve.gov/supervisionreg/srletters/SR2602.htm",
  },
  occ202613: {
    label: "OCC Bulletin 2026-13: Model Risk Management, Revised Guidance (Apr 17, 2026)",
    url: "https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-13.html",
  },
  tprm2023: {
    label: "Interagency Guidance on Third-Party Relationships: Risk Management (OCC Bulletin 2023-17, June 6, 2023)",
    url: "https://www.occ.gov/news-issuances/bulletins/2023/bulletin-2023-17.html",
  },
  tprm2026: {
    label: "Proposed interagency third-party risk management guidance (Federal Register, Sept 15, 2026)",
    url: "https://www.federalregister.gov/documents/2026/09/15/2026-18859/proposed-third-party-risk-management-guidance",
  },
  freddie: {
    label: "Freddie Mac Guide Bulletin 2025-16 (AI/ML governance, Guide 1302.8, effective Mar 3, 2026)",
    url: "https://guide.freddiemac.com/ci/okcsFattach/get/1010639_7",
  },
  fannie: {
    label: "Fannie Mae Information Security and Business Resiliency Supplement, Section 4 \"Super Intelligence\" (Fannie's new term for AI) governance; full implementation required by Jan 18, 2027 (Bulletin 26-01; carries forward LL-2026-04)",
    url: "https://www.fanniemae.com/about-us/corp-responsibility/governance/information-security-and-business-resiliency-supplement",
  },
  nistRmf: { label: "NIST AI Risk Management Framework 1.0 (NIST AI 100-1, 2023)", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf" },
  nistGenai: { label: "NIST Generative AI Profile (NIST AI 600-1, 2024)", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf" },
  colorado: {
    label: "Colorado Attorney General: Automated Decision-Making Technology Act (SB 26-189) rulemaking",
    url: "https://coag.gov/ai/",
  },
  fha: { label: "Fair Housing Act, 42 U.S.C. 3605 (residential real estate transactions)", url: "https://www.law.cornell.edu/uscode/text/42/3605" },
};

export type Step = {
  id: string;
  title: string;
  why: string;
  doThis: string[];
  owner: string;
  doneWhen: string[];
  watchOut: string;
  sources: SourceId[];
  widget?: "readiness" | "usecases" | "vendor" | "roi" | "maturity" | "decisionRights" | "integration" | "scorecard";
};

export type Path = { id: "new" | "scale"; label: string; who: string; promise: string; steps: Step[] };

export const paths: Path[] = [
  {
    id: "new",
    label: "New to AI",
    who: "You don't use AI yet, or only a few people use chat tools on their own.",
    promise: "Seven steps from a readiness check to a measured rollout, with what to do, who owns it and when each step is done.",
    steps: [
      {
        id: "readiness",
        title: "Check your readiness",
        why: "Most early AI problems are ownership and data problems, not model problems. Ten honest answers tell you where to start.",
        doThis: [
          "Name one executive owner and one compliance partner for AI. Without both, stop here.",
          "Find out what staff already paste into public chat tools. Unmanaged use is your first risk, and your first demand signal.",
          "List the systems that hold borrower data (LOS, POS, CRM, document storage, phone) and who can export from each.",
          "Write a one-page interim rule: no borrower nonpublic personal information in unapproved tools, effective now.",
        ],
        owner: "COO or President, with the Chief Compliance Officer",
        doneWhen: ["An owner and a compliance partner are named in writing", "The interim AI use rule has gone to all staff"],
        watchOut:
          "Staff pasting borrower data into consumer chat tools can be a GLBA privacy and safeguards problem before you've bought anything.",
        sources: ["glba", "safeguards", "freddie", "fannie"],
        widget: "readiness",
      },
      {
        id: "first-use-cases",
        title: "Pick 1-2 low-risk first use cases",
        why: "Start where AI drafts or sorts for a trained employee, and nothing reaches a borrower or a credit decision without a person.",
        doThis: [
          "Shortlist from the green rows below: internal, reviewable, measurable.",
          "Pick the one with the most repetitive hours behind it. Write down today's baseline (time, touches, error rate) before anything changes.",
          "Put credit decisions, pricing and marketing targeting on the 'not yet' list in writing.",
        ],
        owner: "Operations leader, with a processor and a loan officer who do the work today",
        doneWhen: ["One or two use cases chosen, each with a written baseline", "A 'not yet' list signed off by compliance"],
        watchOut:
          "Anything that decides or materially influences credit brings ECOA and Regulation B adverse-action duties and fair lending exposure. Leave it for later.",
        sources: ["ecoa", "regb9", "fha"],
        widget: "usecases",
      },
      {
        id: "data-compliance",
        title: "Prepare your data and compliance file",
        why: "Freddie Mac and Fannie Mae now require a governance framework for AI used in origination or servicing, including AI inside vendor tools. Build the file once, at the start.",
        doThis: [
          "Start an AI inventory: tool, vendor, purpose, data used, owner, risk tier, human reviewer.",
          "Map each use case to the rules it touches (the guardrails table below is a starting point).",
          "Decide data handling: what may be sent, retention, and whether a vendor may train on your data (default: no).",
          "Draft a short AI policy with an owner and an annual review date, and map it to the NIST AI RMF functions (Govern, Map, Measure, Manage).",
        ],
        owner: "Chief Compliance Officer, with IT/security",
        doneWhen: ["An AI inventory exists and is current", "A policy with a named owner is approved by senior management"],
        watchOut:
          "If you sell to the GSEs, AI governance is now part of your seller/servicer obligations, not just good practice. Read the Guide sections, not summaries.",
        sources: ["freddie", "fannie", "nistRmf", "regp", "safeguards"],
      },
      {
        id: "vendor",
        title: "Choose build, buy or configure, then vet the vendor",
        why: "Most lenders should buy or configure for a first use case. Vendor AI is still your AI in front of regulators and investors.",
        doThis: [
          "Check first whether your LOS, POS or document vendor already offers the feature. Configuring what you have is usually the fastest path.",
          "Send every finalist the vendor questions below and keep the answers in the inventory.",
          "Get contract terms for data use, retention, breach notice, model-change notice, audit rights and exit.",
        ],
        owner: "Operations leader and IT, with vendor management and legal",
        doneWhen: ["A vendor (or build plan) is selected with written answers to every question", "The contract covers data use, model changes, audit and exit"],
        watchOut:
          "Fannie Mae expects vendor and subcontractor AI to be governed no less protectively than your own. Banks also follow interagency third-party guidance.",
        sources: ["fannie", "freddie", "tprm2023", "tprm2026"],
        widget: "vendor",
      },
      {
        id: "pilot",
        title: "Run a supervised pilot",
        why: "A pilot is a measurement, not a launch. Run it where errors are caught before they matter.",
        doThis: [
          "Start in shadow mode: AI output sits beside the human's work, and only the human's work counts.",
          "Use 3-10 trained staff on real but non-urgent files for a fixed window (author's suggestion: 6-8 weeks).",
          "Log every AI output, every human edit and every override. Edits are your accuracy data.",
          "Hold a weekly 30-minute review with operations and compliance. Write down what changed and why.",
        ],
        owner: "Pilot lead (operations), with compliance reviewing samples",
        doneWhen: ["The pilot window has closed with complete logs", "Accuracy, time and override data exist for every pilot file"],
        watchOut: "Don't let pilot output reach borrowers or disclosures. TRID figures must come from your disclosure system, never from a model.",
        sources: ["trid", "nistGenai"],
        widget: "decisionRights",
      },
      {
        id: "measure",
        title: "Measure against your baseline",
        why: "Decide the go/no-go bar before you look at results, so the pilot can fail honestly.",
        doThis: [
          "Compare pilot files to the baseline: minutes per file, touches, rework and QC defects.",
          "Report accuracy two ways: how often the AI was right, and how often a reviewer had to fix it.",
          "Turn hours saved into dollars only if the capacity is reused (more files per person, less overtime, a hire you don't need).",
        ],
        owner: "Operations finance or the COO",
        doneWhen: ["A one-page result with go, fix or stop", "Compliance has signed off on the sample review"],
        watchOut: "Time saved isn't money saved. Vendors' ROI claims are their assumptions. Use your own numbers.",
        sources: ["nistRmf"],
        widget: "roi",
      },
      {
        id: "rollout",
        title: "Roll out and keep it governed",
        why: "Adoption fails when people think AI is being used to grade them or replace them. Say plainly what it's for.",
        doThis: [
          "Roll out team by team with a champion in each. Train on what the AI is for and what it must never be used for.",
          "Keep human review on every output that leaves the building.",
          "Set a monthly check: accuracy sample, override rate, complaints, incidents, vendor changes.",
          "Pick the next use case only after the first one holds its numbers for a quarter.",
        ],
        owner: "COO, with team champions and compliance",
        doneWhen: ["All target users are trained and using it", "Monthly monitoring is on the calendar with a named owner"],
        watchOut:
          "A borrower-facing tool that gives wrong answers or blocks a human can be a UDAAP issue. The CFPB's chatbot research flags exactly this.",
        sources: ["udaap", "cfpbChatbots"],
      },
    ],
  },
  {
    id: "scale",
    label: "Already using AI",
    who: "You have AI in production, or several pilots, and want more value without more risk.",
    promise: "Six steps from an honest maturity score to an operating model that can carry ten use cases instead of two.",
    steps: [
      {
        id: "maturity",
        title: "Score your maturity",
        why: "Scaling stalls at your weakest dimension. Score all five and fix the lowest one first.",
        doThis: [
          "Score each dimension below with the people who run it, not just leadership.",
          "Mark the lowest score as this quarter's constraint.",
          "Compare the AI inventory to reality. Shadow tools and vendor features turned on quietly are common.",
        ],
        owner: "AI owner (exec sponsor), with ops, compliance, IT and finance",
        doneWhen: ["All five dimensions scored and agreed", "One constraint named with an owner and a date"],
        watchOut: "If you can't list every AI system in use, including AI inside vendor products, you aren't ready to scale.",
        sources: ["freddie", "fannie", "nistRmf"],
        widget: "maturity",
      },
      {
        id: "expand",
        title: "Expand use cases by value and risk",
        why: "The next wave is usually borrower-facing or decision-adjacent, so each step up in value brings stronger controls.",
        doThis: [
          "Rank candidates on value and risk (table below). Move one tier at a time.",
          "For borrower-facing tools: answers grounded in your documents, a visible path to a human, and logs you can show an examiner.",
          "For decision-adjacent tools (fraud flags, income calculation, pricing): document the inputs, test outcomes for disparities, and keep a person accountable.",
        ],
        owner: "Product or operations lead, with compliance and fair lending",
        doneWhen: ["A ranked backlog with a control set for each item", "Fair lending review done for any decision-adjacent item"],
        watchOut:
          "Adverse-action reasons must reflect the factors actually used. Regulation B's adverse-action rules (§1002.9) didn't change, even though the CFPB withdrew its AI circulars in May 2025 and amended other parts of Regulation B in 2026.",
        sources: ["regb9", "regbAppC", "regbAmend2026", "cfpbWithdrawn", "fha"],
        widget: "usecases",
      },
      {
        id: "governance",
        title: "Govern and manage model risk at scale",
        why: "Ten use cases can't each get a bespoke review. Tier them so review effort follows risk.",
        doThis: [
          "Tier every inventory item: Tier 1 (credit, pricing, borrower-facing decisions), Tier 2 (borrower-facing information), Tier 3 (internal drafting).",
          "Set review depth by tier: independent validation and outcome testing for Tier 1; sampling and red-team prompts for Tier 2; spot checks for Tier 3.",
          "Require vendors to notify you of model changes, and re-test after each one.",
          "Report to the board or senior management on a fixed schedule: inventory, incidents, monitoring results, exceptions.",
        ],
        owner: "Chief Risk or Compliance Officer, with model risk / independent review",
        doneWhen: ["Every item is tiered with a review cadence", "Senior management receives a recurring AI risk report"],
        watchOut:
          "The April 2026 interagency model risk guidance replaced SR 11-7, and it puts generative and agentic AI outside its scope. Don't wait for a rule: use NIST's GenAI profile and the GSE requirements.",
        sources: ["mrm2026", "occ202613", "nistGenai", "freddie"],
      },
      {
        id: "integration",
        title: "Integrate across LOS, POS and servicing",
        why: "Value compounds when AI output lands in the system of record with an audit trail, not in a side window someone retypes.",
        doThis: [
          "Choose integration patterns per use case (below). Prefer vendor-supported APIs or events over screen scraping.",
          "Write AI outputs back as drafts or flags, with the source document, model/version and reviewer recorded.",
          "Extend the same controls to servicing (borrower communications, loss mitigation support). The GSE requirements cover servicing too.",
        ],
        owner: "IT/architecture, with LOS administrators and servicing operations",
        doneWhen: ["Each production use case writes to the system of record with an audit trail", "Access and data flows are documented for security review"],
        watchOut:
          "More integrations mean more places nonpublic personal information flows. Update your information security program and incident response to cover them.",
        sources: ["safeguards", "glba", "freddie", "fannie"],
        widget: "integration",
      },
      {
        id: "kpis",
        title: "Run one AI scorecard",
        why: "Executives need one page: value, quality and risk side by side, so a fast tool that causes complaints doesn't look like a win.",
        doThis: [
          "Track value, quality and risk metrics for every production use case (scorecard below).",
          "Set a stop rule for each use case: what result pauses it automatically.",
          "Review the scorecard monthly. Retire tools that don't hold their numbers.",
        ],
        owner: "COO, with finance and compliance",
        doneWhen: ["A monthly scorecard covers every production use case", "Each use case has a written stop rule"],
        watchOut: "Don't make 'AI usage' a staff performance metric. It invites rubber-stamping and hides errors.",
        sources: ["nistRmf"],
        widget: "scorecard",
      },
      {
        id: "operating-model",
        title: "Build the operating model",
        why: "At scale, AI is a capability with owners, intake, budget and a review rhythm, not a series of projects.",
        doThis: [
          "Stand up an AI council (operations, compliance, IT/security, legal, a front-line loan officer) with a monthly intake and review.",
          "Use one intake form: problem, data, risk tier, owner, baseline, success and stop rules.",
          "Keep training role-specific and recurring, including AI-specific threats such as deepfakes and prompt injection. Fannie Mae's Supplement (Section 4) lists prompt injection, model inversion and data leakage among the AI security risks to assess by Jan 18, 2027.",
          "Track state AI laws where you lend. Colorado's ADMT law takes effect Jan 1, 2027.",
        ],
        owner: "Exec sponsor, chairing the AI council",
        doneWhen: ["The council meets on a schedule and keeps minutes", "Intake, tiering and retirement follow one written process"],
        watchOut: "State requirements differ and are changing. Have counsel confirm which apply to your decisions and borrowers.",
        sources: ["freddie", "colorado", "nistRmf"],
      },
    ],
  },
];

// Value and risk are the author's judgment for a typical mid-size lender, not measured results.
export type UseCase = { name: string; example: string; value: "High" | "Medium" | "Lower"; risk: "Low" | "Medium" | "High"; tier: 1 | 2 | 3; controls: string; rules: SourceId[]; proof?: { label: string; href: string } };

export const useCases: UseCase[] = [
  { name: "Document sorting and data extraction", example: "Classify paystubs, W-2s and bank statements; pre-fill fields for a processor to confirm", value: "High", risk: "Low", tier: 3, controls: "Human confirms every extracted field; QC sample monthly", rules: ["safeguards"] },
  { name: "Condition summaries and checklists", example: "Summarize underwriting conditions into a processor to-do list", value: "High", risk: "Low", tier: 3, controls: "Processor reviews against the actual conditions", rules: ["safeguards"] },
  { name: "Internal policy and guideline Q&A", example: "Answers from your policies and investor guides, with citations", value: "Medium", risk: "Low", tier: 3, controls: "Answers must cite the source section; unanswerable questions route to a person", rules: ["nistGenai"] },
  { name: "Call notes and CRM summaries", example: "Draft notes after a loan officer's call", value: "Medium", risk: "Low", tier: 3, controls: "Recording consent per state law; LO edits before saving", rules: ["glba", "regp"] },
  { name: "Marketing copy drafting", example: "First drafts of emails and ads", value: "Medium", risk: "Medium", tier: 2, controls: "Compliance approves every piece; trigger-term checks", rules: ["regzAds", "udaap"] },
  { name: "Borrower status updates and FAQ assistant", example: "Answers 'where's my loan?' and explains next steps", value: "High", risk: "Medium", tier: 2, controls: "Grounded answers only, one-tap human handoff, logged conversations", rules: ["udaap", "cfpbChatbots"], proof: { label: "How I test borrower-facing AI before launch: Borrower Advice Eval", href: "/mortgage-advice-eval" } },
  { name: "Plain-English disclosure explainer", example: "Explains Loan Estimate and Closing Disclosure sections", value: "High", risk: "Medium", tier: 2, controls: "Explains, never changes, figures; points to the disclosure line", rules: ["trid", "udaap"], proof: { label: "A working example I built: Loan Estimate Advisor", href: "/loan-estimate-advisor" } },
  { name: "TRID tolerance pre-check", example: "Flags fee changes between LE and CD for QC review", value: "High", risk: "Medium", tier: 2, controls: "Flags only; compliance decides cures", rules: ["trid"], proof: { label: "A prototype I built (in development): ClearEstimate", href: "/#clearestimate" } },
  { name: "Fraud and anomaly flags", example: "Flags altered documents or mismatched data", value: "High", risk: "Medium", tier: 2, controls: "A person decides; test flags for disparities across groups", rules: ["ecoa", "fha"] },
  { name: "Income calculation support", example: "Drafts self-employed income worksheets", value: "High", risk: "High", tier: 1, controls: "Underwriter owns the number; validate against investor guidelines", rules: ["ecoa", "regb9"] },
  { name: "Credit decisioning or pricing models", example: "Approve, decline or price", value: "High", risk: "High", tier: 1, controls: "Independent validation, fair lending testing, explainable adverse-action reasons", rules: ["ecoa", "regb9", "regbAppC", "fha", "mrm2026"] },
  { name: "Lead scoring and marketing targeting", example: "Decide who sees which offer", value: "Medium", risk: "High", tier: 1, controls: "Fair lending review of inputs and reach (redlining and steering risk)", rules: ["ecoa", "fha"] },
];

export const guardrails: { area: string; rule: string; meaning: string; control: string; src: SourceId[] }[] = [
  {
    area: "Fair lending and adverse action",
    rule: "ECOA / Regulation B; Fair Housing Act",
    meaning:
      "A declined or counter-offered applicant must get the specific principal reasons, and reasons must reflect the factors actually used, however complex the model. Checking the closest box on the sample form isn't enough if it isn't the real reason. A 2026 amendment (effective Jul 21, 2026) removed the \"effects test\" from Regulation B; the adverse-action rules didn't change.",
    control: "Reason-code traceability before any model influences credit; disparity testing; a person accountable for each decision. Keep disparity testing after the 2026 amendment: Freddie Mac 1302.8 expects AI to be monitored for bias, the Fair Housing Act and state laws still apply, and criteria used as proxies for a protected trait still violate ECOA.",
    src: ["ecoa", "regb9", "regbAppC", "regbAmend2026", "cfpbWithdrawn", "fha"],
  },
  {
    area: "Unfair, deceptive or abusive practices",
    rule: "Dodd-Frank UDAAP",
    meaning: "Borrower-facing AI that gives wrong answers, overstates what it can do, or traps people away from a human creates UDAAP risk.",
    control: "Grounded answers, clear disclosure that it's automated, a visible human handoff, conversation logs and complaint monitoring.",
    src: ["udaap", "cfpbChatbots"],
  },
  {
    area: "Disclosures",
    rule: "TRID (Regulation Z)",
    meaning: "Loan Estimate and Closing Disclosure figures, timing and tolerances are regulated. A model must never produce or alter them.",
    control: "AI explains or flags only; disclosure figures come from the disclosure system; compliance owns cures.",
    src: ["trid"],
  },
  {
    area: "Privacy and security",
    rule: "GLBA, Regulation P, FTC Safeguards Rule (non-banks)",
    meaning: "Borrower nonpublic personal information sent to an AI tool is covered by your privacy notices and information security program.",
    control: "Approved tools only, no vendor training on your data, retention limits, access logs, incident response that covers AI vendors.",
    src: ["glba", "regp", "safeguards"],
  },
  {
    area: "Model risk",
    rule: "Interagency model risk guidance (SR 26-2 / OCC 2026-13, Apr 2026)",
    meaning:
      "Replaced SR 11-7 with a risk-based approach, aimed mainly at banks over $30B. Generative and agentic AI are outside its scope, so lenders need their own approach for those.",
    control: "Tiered inventory, validation depth by tier, ongoing monitoring; NIST AI RMF and its GenAI profile for generative tools.",
    src: ["mrm2026", "occ202613", "nistRmf", "nistGenai"],
  },
  {
    area: "Vendors",
    rule: "Interagency third-party guidance (banks); GSE requirements (sellers/servicers)",
    meaning: "AI inside a vendor's product is still your risk. The 2023 interagency guidance stays in effect while a 2026 replacement is proposed.",
    control: "Due diligence questions, contract terms for data and model changes, ongoing monitoring, exit plan.",
    src: ["tprm2023", "tprm2026", "fannie", "freddie"],
  },
  {
    area: "Investor (GSE) requirements",
    rule: "Freddie Mac Guide 1302.8; Fannie Mae Supplement Section 4 (by Jan 18, 2027)",
    meaning:
      "Sellers/servicers using AI in origination or servicing need a governance framework: policies, owners, risk tolerance, monitoring, audits, vendor oversight, and disclosure on request. Fannie Mae's Section 4 adds specifics due Jan 18, 2027: a use-case inventory, data governance, model testing and validation, post-deployment monitoring and retirement, change management, security risk assessment, segregation of duties and third-party AI oversight.",
    control: "One governance program mapped to both GSEs, kept current, with evidence ready to share.",
    src: ["freddie", "fannie"],
  },
  {
    area: "State AI laws",
    rule: "Example: Colorado SB 26-189 (effective Jan 1, 2027)",
    meaning: "Disclosure and consumer-rights duties for automated decision-making in consequential decisions. Rules were adopted Nov 19, 2026 and are pending final steps.",
    control: "Counsel tracks the states you lend in; your inventory shows which tools touch consequential decisions.",
    src: ["colorado"],
  },
];

export const vendorQuestions = [
  "Is our data used to train or improve your models, or anyone else's? Can we contractually prohibit it?",
  "Where is our data stored and processed, for how long, and how is it deleted at exit?",
  "Which subcontractors (including model providers) touch our data?",
  "Do you have a current independent security report (for example SOC 2 Type II), and will you notify us of incidents within a contractual deadline?",
  "How will you notify us before changing the underlying model or its behavior?",
  "What accuracy testing have you done on mortgage documents like ours, and can we run our own test set?",
  "What bias or disparity testing have you done, and can we see the method?",
  "Does every output carry a source citation and an audit log we can export?",
  "Can you support us when Fannie Mae or Freddie Mac asks what AI we use and what safeguards are in place?",
  "What happens to our workflows and data if we leave?",
];

export const readinessQuestions = [
  "One executive owns AI outcomes, in writing",
  "Compliance is involved from the start, not at the end",
  "We know which AI tools staff use today, including free ones",
  "Staff have a written rule on borrower data and AI tools",
  "We can export clean data from our LOS for one process",
  "We have a baseline (time, touches or error rate) for at least one process",
  "We have a vendor management process we actually follow",
  "Our information security program names who reviews new tools",
  "We know whether we sell to or service for Fannie Mae or Freddie Mac (their AI rules then apply)",
  "We can give one team 6-8 weeks to pilot without hurting production",
];

export const maturityDimensions = [
  { id: "strategy", name: "Strategy and ownership", levels: ["No owner; ad hoc use", "Exec sponsor, a few pilots", "Owned roadmap with budget", "AI council, portfolio managed like a product line"] },
  { id: "data", name: "Data and integration", levels: ["Data exported by hand", "One use case connected", "Writes back to LOS/POS with audit trail", "Shared integration pattern across origination and servicing"] },
  { id: "governance", name: "Governance and model risk", levels: ["No inventory", "Inventory exists", "Tiered inventory with review by tier", "Independent validation, monitoring and recurring reporting to management"] },
  { id: "people", name: "People and change", levels: ["Individuals experimenting", "Pilot users trained", "Role-based training and champions", "Recurring training; front-line staff help shape intake"] },
  { id: "measurement", name: "Measurement", levels: ["No baseline", "Pilot metrics only", "Scorecard per use case", "Portfolio scorecard with stop rules, reviewed monthly"] },
];

export const decisionRights = [
  { task: "Draft, summarize, sort, flag", ai: "Yes", human: "Reviews before use" },
  { task: "Anything a borrower reads about their loan terms", ai: "Draft only", human: "Licensed staff approve, or grounded templates only" },
  { task: "Loan Estimate / Closing Disclosure figures", ai: "No", human: "Disclosure system and compliance" },
  { task: "Approve, decline, price, counter-offer", ai: "No (until validated as Tier 1)", human: "Underwriter / credit policy decides" },
  { task: "Adverse-action reasons", ai: "No", human: "Reasons must reflect the factors actually used" },
];

export const integrationPatterns = [
  { name: "Inside the LOS/POS (vendor feature)", fit: "First use cases", note: "Fastest, least integration work; check the vendor's AI terms and model-change notices." },
  { name: "API or event-driven service", fit: "Scaling", note: "AI reads a document or event, writes a draft or flag back with source, version and reviewer." },
  { name: "Human handoff queue", fit: "Borrower-facing", note: "Anything uncertain or sensitive lands in a staffed queue with the conversation attached." },
  { name: "Copy-paste side window", fit: "Avoid", note: "No audit trail, data leaves controlled systems, edits aren't captured." },
];

export const scorecard = [
  { group: "Value", items: ["Minutes per file in the target step", "Touches per file", "Application-to-close days", "Files per FTE"] },
  { group: "Quality", items: ["Reviewer correction rate", "QC defect rate", "TRID cure dollars and count", "Borrower satisfaction"] },
  { group: "Risk", items: ["Complaints mentioning the tool", "Human-override and escalation rate", "Incidents and vendor model changes", "Outcome disparities (decision-adjacent tools)"] },
];
