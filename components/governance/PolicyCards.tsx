import { Icon } from "@/components/ui/Icon";
import { policyCards, type PolicyCard } from "@/data/governance";
import { cn } from "@/lib/cn";

/** Governance policy cards — clean document-style cards, premium and serious. */
export function PolicyCards({ items = policyCards, className }: { items?: PolicyCard[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", className)}>
      {items.map((p) => (
        <div key={p.title} className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-soft">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ocean-50 text-ocean">
            <Icon name={p.icon} className="h-5 w-5" />
          </span>
          <h3 className="mt-4 font-serif text-[16px] text-ink">{p.title}</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink/60">{p.description}</p>
        </div>
      ))}
    </div>
  );
}
