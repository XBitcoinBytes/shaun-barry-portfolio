import { mortgageEvalSite } from "@/content/siteLinks";
import { Arrow } from "@/components/ui";

export function MortgageEvalLaunchCta({
  className = "",
}: {
  className?: string;
}) {
  if (!mortgageEvalSite.href) {
    return (
      <span
        className={`inline-flex items-center gap-2 rounded-full border border-dashed border-ink/25 bg-white px-5 py-3 text-sm font-medium text-muted ${className}`}
      >
        {mortgageEvalSite.status}
      </span>
    );
  }

  return (
    <a
      href={mortgageEvalSite.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent ${className}`}
    >
      Open {mortgageEvalSite.label} <Arrow />
    </a>
  );
}
