/**
 * Sample data for the Loan Estimate Advisor demo.
 * Everything here is FICTIONAL and for education only — not a loan offer, rate quote, or advice.
 */

export type Offer = {
  id: "A" | "B";
  lender: string;
  issued: string;
  closingCostsExpire: string;
  rateLock: { locked: boolean; until?: string };
  loanAmount: number;
  rate: number; // annual, e.g. 0.06625
  termYears: number;
  points: number; // dollars of discount points (part of Section A)
  originationOther: number; // application/underwriting/processing (rest of Section A)
  originationItems: [string, number][];
  cannotShop: number; // Section B
  canShop: number; // Section C
  taxesGov: number; // Section E
  prepaids: number; // Section F
  initialEscrow: number; // Section G
  lenderCredits: number; // Section J (positive number = credit to you)
  monthlyEscrow: number;
  apr: number; // percent, e.g. 6.734
  tip: number; // percent
  in5Total: number;
  in5Principal: number;
};

export const borrower = {
  names: "Jordan & Taylor Rivera",
  note: "Fictional borrowers",
  property: "1234 Sample Lane, Anytown, MI",
  purchasePrice: 400_000,
  downPayment: 80_000,
  deposit: 5_000,
  product: "Fixed Rate",
  loanType: "Conventional",
  purpose: "Purchase",
};

export const offers: Record<"A" | "B", Offer> = {
  A: {
    id: "A",
    lender: "Sample Lender A",
    issued: "10/26/2026",
    closingCostsExpire: "11/09/2026 at 5:00 p.m. EST",
    rateLock: { locked: false },
    loanAmount: 320_000,
    rate: 0.06625,
    termYears: 30,
    points: 0,
    originationOther: 1_790,
    originationItems: [
      ["Underwriting fee", 1_195],
      ["Processing fee", 595],
    ],
    cannotShop: 805,
    canShop: 2_770,
    taxesGov: 150,
    prepaids: 2_551,
    initialEscrow: 1_780,
    lenderCredits: 0,
    monthlyEscrow: 640,
    apr: 6.734,
    tip: 130.51,
    in5Total: 128_305,
    in5Principal: 20_018,
  },
  B: {
    id: "B",
    lender: "Sample Lender B",
    issued: "10/27/2026",
    closingCostsExpire: "11/10/2026 at 5:00 p.m. EST",
    rateLock: { locked: true, until: "12/10/2026 at 5:00 p.m. EST" },
    loanAmount: 320_000,
    rate: 0.06375,
    termYears: 30,
    points: 3_200,
    originationOther: 1_295,
    originationItems: [
      ["Underwriting fee", 995],
      ["Processing fee", 300],
    ],
    cannotShop: 805,
    canShop: 2_770,
    taxesGov: 150,
    prepaids: 2_518,
    initialEscrow: 1_780,
    lenderCredits: 0,
    monthlyEscrow: 640,
    apr: 6.564,
    tip: 124.59,
    in5Total: 127_853,
    in5Principal: 20_879,
  },
};

/* ---------------- math helpers ---------------- */

export function monthlyPI(o: Pick<Offer, "loanAmount" | "rate" | "termYears">) {
  const i = o.rate / 12;
  const n = o.termYears * 12;
  return (o.loanAmount * i) / (1 - Math.pow(1 + i, -n));
}

/** Interest paid over the first `months` payments. */
export function interestPaid(o: Offer, months: number) {
  const i = o.rate / 12;
  const p = monthlyPI(o);
  let bal = o.loanAmount;
  let total = 0;
  for (let m = 0; m < months; m++) {
    const int = bal * i;
    total += int;
    bal -= p - int;
  }
  return total;
}

export const originationTotal = (o: Offer) => o.points + o.originationOther; // A
export const loanCosts = (o: Offer) => originationTotal(o) + o.cannotShop + o.canShop; // D
export const otherCosts = (o: Offer) => o.taxesGov + o.prepaids + o.initialEscrow; // I
export const closingCosts = (o: Offer) => loanCosts(o) + otherCosts(o) - o.lenderCredits; // J
export const cashToClose = (o: Offer) => closingCosts(o) + borrower.downPayment - borrower.deposit;
export const totalMonthly = (o: Offer) => Math.round(monthlyPI(o)) + o.monthlyEscrow;

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
export const pct = (rate: number, digits = 3) => `${(rate * 100).toFixed(digits)}%`;

/* ---------------- hotspots ---------------- */

export type Flag = "ask" | "key" | "good";

export type Hotspot = {
  id: string;
  page: 1 | 2 | 3;
  section: string;
  label: string;
  what: string;
  why: string;
  ask: string;
  flag: Flag;
  /** optional extra tip shown in the advisor panel */
  tip?: string;
};

export const hotspots: Hotspot[] = [
  // ---------- Page 1 ----------
  {
    id: "terms",
    page: 1,
    section: "Page 1 · Header",
    label: "Loan term, product & type",
    what: "The basic shape of the loan: 30 years, a fixed rate (the rate never changes), and a conventional loan (not FHA, VA, or USDA).",
    why: "You can only compare estimates fairly when these match. A 15-year or adjustable-rate offer can look cheaper or pricier for reasons that have nothing to do with the lender.",
    ask: "Is this the loan type and term you'd recommend for my situation — and what would a 15-year or a different loan program look like side by side?",
    flag: "key",
  },
  {
    id: "rateLock",
    page: 1,
    section: "Page 1 · Header",
    label: "Rate lock",
    what: "“NO” means your interest rate is not locked. Until it’s locked, the rate — and the points or credits tied to it — can change with the market.",
    why: "This is one of the most important lines on the page. An unlocked rate is a quote, not a promise. Also note the date the estimated closing costs expire.",
    ask: "When can I lock this rate, how long is the lock, and is there any cost to lock or to extend it if closing is delayed?",
    flag: "ask",
    tip: "Comparing an unlocked estimate with a locked one? Ask both lenders for pricing on the same day so you’re comparing like with like.",
  },
  {
    id: "loanAmount",
    page: 1,
    section: "Page 1 · Loan Terms",
    label: "Loan amount",
    what: "The amount you’re borrowing — here, the $400,000 purchase price minus a $80,000 (20%) down payment.",
    why: "If this number doesn’t match what you expected, everything else on the form is off too. With 20% down, this conventional loan carries no mortgage insurance.",
    ask: "Is my loan amount final, and would a different down payment change my rate or require mortgage insurance?",
    flag: "key",
  },
  {
    id: "rate",
    page: 1,
    section: "Page 1 · Loan Terms",
    label: "Interest rate",
    what: "The yearly rate used to calculate your interest. It is not the same as the APR (on page 3), which also folds in certain fees.",
    why: "A lower rate can be ‘bought’ with discount points. Always look at the rate together with Section A on page 2 to see what you’re paying for it.",
    ask: "Does this rate include any discount points? What would the rate be with zero points — and with a lender credit instead?",
    flag: "key",
  },
  {
    id: "monthlyPI",
    page: 1,
    section: "Page 1 · Loan Terms",
    label: "Monthly principal & interest",
    what: "The part of your payment that repays the loan plus interest. It doesn’t include property taxes or homeowner’s insurance.",
    why: "With a fixed rate this number stays the same for 30 years — but your total payment can still change if taxes or insurance go up.",
    ask: "What will my total monthly payment be once taxes, insurance, and any HOA dues are included?",
    flag: "good",
  },
  {
    id: "prepay",
    page: 1,
    section: "Page 1 · Loan Terms",
    label: "Prepayment penalty",
    what: "Whether you’d owe a fee for paying the loan off early — for example by refinancing or selling.",
    why: "“NO” is what you want. It means you can make extra payments or refinance later without a penalty.",
    ask: "Can you confirm in writing that there’s no prepayment penalty, including if I refinance in the first few years?",
    flag: "good",
  },
  {
    id: "balloon",
    page: 1,
    section: "Page 1 · Loan Terms",
    label: "Balloon payment",
    what: "Whether a large lump-sum payment comes due at some point, instead of the loan paying down evenly.",
    why: "“NO” means the loan is fully paid off by the regular monthly payments. A YES here would be a big deal worth slowing down for.",
    ask: "Are there any features of this loan that could change my payment or require a lump sum later?",
    flag: "good",
  },
  {
    id: "projected",
    page: 1,
    section: "Page 1 · Projected Payments",
    label: "Estimated total monthly payment",
    what: "Principal & interest plus estimated escrow — the property taxes and homeowner’s insurance the lender collects monthly and pays for you.",
    why: "This is closer to what actually leaves your bank account each month. Escrow estimates are based on today’s tax and insurance numbers and can rise.",
    ask: "What property tax and insurance figures did you use for escrow, and how often will escrow be re-analyzed?",
    flag: "key",
    tip: "Get your own homeowner’s insurance quote early. It’s a common source of payment surprises.",
  },
  {
    id: "costsAtClosing",
    page: 1,
    section: "Page 1 · Costs at Closing",
    label: "Estimated cash to close",
    what: "Roughly how much money you’ll bring to closing: closing costs plus your down payment, minus your earnest-money deposit and any credits.",
    why: "This is the number to plan savings around. Page 2 shows exactly how it’s built.",
    ask: "How and when will I need to send funds to closing — and can I verify the wiring instructions by phone with someone I already know?",
    flag: "ask",
    tip: "Wire fraud is real. Never trust wiring instructions from an email alone — call a number you already have to confirm.",
  },
  // ---------- Page 2 ----------
  {
    id: "origination",
    page: 2,
    section: "Page 2 · Section A",
    label: "Origination charges",
    what: "What the lender charges to make the loan: application, underwriting, and processing fees, plus any discount points (1 point = 1% of the loan amount).",
    why: "Section A is the cleanest apples-to-apples comparison between lenders — it’s their own price. Generally these fees can’t go up later unless there’s a valid changed circumstance.",
    ask: "Can you walk me through each fee in Section A? Are any of them negotiable or waivable?",
    flag: "ask",
  },
  {
    id: "cannotShop",
    page: 2,
    section: "Page 2 · Section B",
    label: "Services you cannot shop for",
    what: "Third-party services the lender picks for you — like the appraisal and credit report.",
    why: "You can’t choose the provider, but these should be similar from lender to lender. A big difference here is worth asking about.",
    ask: "Which of these fees are paid to companies affiliated with you, and could any of them change before closing?",
    flag: "key",
  },
  {
    id: "canShop",
    page: 2,
    section: "Page 2 · Section C",
    label: "Services you can shop for",
    what: "Services like title insurance, settlement/closing agent, and survey — where you’re allowed to pick your own provider.",
    why: "Real savings can hide here. The lender must give you a list of providers. Pick from that list and these fees generally have limits on how much they can rise; choose your own and there’s no limit — but you may find a lower price.",
    ask: "Can I get the written list of providers for Section C, and do you know which ones are usually the most affordable?",
    flag: "ask",
  },
  {
    id: "prepaidsEscrow",
    page: 2,
    section: "Page 2 · Sections F & G",
    label: "Prepaids & initial escrow",
    what: "Upfront items that aren’t lender fees: your first year of homeowner’s insurance, a few days of prepaid interest, and a starting cushion for your escrow account.",
    why: "These change with your closing date and insurance policy — not with the lender. Don’t pick one lender over another because these look lower.",
    ask: "What closing date did you assume for prepaid interest, and what insurance premium did you estimate?",
    flag: "good",
  },
  {
    id: "cashCalc",
    page: 2,
    section: "Page 2 · Calculating Cash to Close",
    label: "Calculating cash to close",
    what: "The math behind the big number on page 1: total closing costs + down payment − your deposit − any seller or lender credits.",
    why: "Check that your earnest-money deposit and any seller credits you negotiated actually show up here.",
    ask: "Is my earnest-money deposit credited here, and are there any seller credits I should see on this estimate?",
    flag: "key",
  },
  // ---------- Page 3 ----------
  {
    id: "in5",
    page: 3,
    section: "Page 3 · Comparisons",
    label: "In 5 years",
    what: "What you’d pay over the first five years (principal, interest, mortgage insurance, and loan costs) and how much principal you’d have paid off.",
    why: "Many people sell or refinance within 5–10 years. This line helps show whether paying more upfront (like points) actually pays off over your real time horizon.",
    ask: "If I expect to keep this loan about five years, which option — points, no points, or lender credit — is the better deal?",
    flag: "key",
  },
  {
    id: "apr",
    page: 3,
    section: "Page 3 · Comparisons",
    label: "Annual Percentage Rate (APR)",
    what: "Your cost of borrowing over the full term, expressed as a yearly rate — it includes the interest rate plus certain fees.",
    why: "APR is useful for comparing offers of the same loan type and term. It assumes you keep the loan for the full 30 years, which most people don’t.",
    ask: "Why is the APR different from the interest rate here, and which fees are driving the gap?",
    flag: "key",
  },
  {
    id: "tip",
    page: 3,
    section: "Page 3 · Comparisons",
    label: "Total Interest Percentage (TIP)",
    what: "The total interest you’d pay over the life of the loan as a percentage of the loan amount.",
    why: "130% means you’d pay more in interest than you borrowed if you kept the loan all 30 years. Extra principal payments can bring this down.",
    ask: "If I paid an extra amount toward principal each month, how much interest and time would that save?",
    flag: "good",
  },
];

export const compareQuestions = [
  "Can you price both options on the same day, for the same loan amount, term, and lock period?",
  "If I pay points, how many months until the lower payment makes up the upfront cost?",
  "What would my cash to close be with zero points, and with a lender credit instead?",
];
