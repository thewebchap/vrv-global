import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export type DecisionPath = { label: string; href: string; icon: IconName };

/** Intent-based decision paths — route visitors and agents to the right place. */
export const DECISION_PATHS: DecisionPath[] = [
  { label: "I want to buy a commodity", href: "/contact?type=product", icon: "cube" },
  { label: "I want to discuss a venture", href: "/contact?type=ventures", icon: "spark" },
  { label: "I want to partner with VRV", href: "/contact?type=partnership", icon: "handshake" },
  { label: "I want sustainability information", href: "/sustainability", icon: "leaf" },
  { label: "I want company information", href: "/about", icon: "globe" },
];

/**
 * Decision-Path CTA — replaces generic buttons with clear, intent-based routes.
 * Premium card grid; agentic-friendly (each path is a real link).
 */
export function DecisionPathCTA({
  items = DECISION_PATHS,
  title = "What would you like to do?",
  intro,
  className,
}: {
  items?: DecisionPath[];
  title?: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {title && <h3 className="font-serif text-xl text-ink">{title}</h3>}
      {intro && <p className="mt-2 text-[15px] leading-relaxed text-ink/60">{intro}</p>}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((d) => (
          <Link
            key={d.label}
            href={d.href}
            className="group flex items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-hover"
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ocean-50 text-ocean">
              <Icon name={d.icon} className="h-5 w-5" />
            </span>
            <span className="flex-1 text-[14.5px] font-medium leading-snug text-ink group-hover:text-brand">{d.label}</span>
            <Icon name="arrowRight" className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}
