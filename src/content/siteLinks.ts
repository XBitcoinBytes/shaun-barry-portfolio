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
