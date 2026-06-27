import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** Default entity description — factual, reusable across key pages. */
export const ENTITY_SUMMARY =
  "VRV Global Pte Ltd is a Singapore-based commodity trading and integrated supply chain company. It operates across agro commodities, natural rubber, block rubber / TSR, industrial metals, mining ventures, and circular economy materials. VRV Global focuses on responsible sourcing, traceability, sustainable supply chains, and long-term commodity partnerships across global markets.";

/**
 * Entity Summary block — a clear, self-contained description of the company so
 * AI/answer engines can identify and summarise the entity. Optional descriptive
 * internal links reinforce the site's topic graph.
 */
export function EntitySummary({
  text = ENTITY_SUMMARY,
  links,
  className,
}: {
  text?: string;
  links?: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-line bg-paper p-6 shadow-soft sm:p-7", className)}>
      <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-brand">
        <Icon name="globe" className="h-4 w-4 text-gold" />
        About VRV Global
      </p>
      <p className="mt-3 text-[15.5px] leading-relaxed text-ink/75 text-pretty">{text}</p>
      {links && links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-600">
              {l.label}
              <Icon name="arrowRight" className="h-3.5 w-3.5" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
