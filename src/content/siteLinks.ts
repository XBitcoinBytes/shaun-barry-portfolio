/**
 * Public URL for MortgageEval.com.
 *
 * Keep MORTGAGEEVAL_SITE_URL null until the site is deployed. The portfolio
 * then shows a "Launching soon" / "Coming soon" placeholder and never renders
 * a clickable dead link. After deploy, set this to the live URL (for example
 * "https://mortgageeval.com") and the same CTA becomes a live link everywhere
 * it is used.
 */
export const MORTGAGEEVAL_SITE_URL: string | null = null;

export const mortgageEvalSite = {
  href: MORTGAGEEVAL_SITE_URL,
  label: "MortgageEval.com",
  status: "Launching soon",
};
