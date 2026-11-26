/**
 * Public URL for MortgageEval.com.
 *
 * Live production URL. The CTA renders as a live "Open MortgageEval.com" link
 * when this is set. If it is ever unset, the portfolio shows a "Launching soon"
 * placeholder instead of a dead link.
 */
export const MORTGAGEEVAL_SITE_URL: string | null = "https://mortgageeval.com";

export const mortgageEvalSite = {
  href: MORTGAGEEVAL_SITE_URL,
  label: "MortgageEval.com",
  status: "Live",
};

/** Public URL for Loan Estimate Check (powered by the ClearEstimate engine). */
export const LOAN_ESTIMATE_CHECK_URL = "https://loanestimatecheck.com";

export const loanEstimateCheckSite = {
  href: LOAN_ESTIMATE_CHECK_URL,
  label: "Loan Estimate Check",
  status: "Live",
};
