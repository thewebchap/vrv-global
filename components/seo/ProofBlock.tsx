import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export type Proof = { claim: string; proof: string; icon?: IconName };

/** Default, supportable proof points (no invented metrics or certifications). */
export const DEFAULT_PROOFS: Proof[] = [
  {
    icon: "globe",
    claim: "Singapore-based commodity platform",
    proof: "Founded in Singapore and built around global trade, sourcing, and supply chain coordination.",
  },
  {
    icon: "cube",
    claim: "Multi-segment commodity platform",
    proof: "Operating across agro commodities, natural rubber, industrial metals, mining, ventures, and circular economy materials.",
  },
  {
    icon: "leaf",
    claim: "Sustainability-led supply chains",
    proof: "Responsible sourcing, traceability readiness, supplier engagement, and ESG-oriented reporting discipline.",
  },
];

/** A single claim → proof card. */
export function ProofBlock({ claim, proof, icon = "check", className }: Proof & { className?: string }) {
  return (
    <div className={cn("flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-soft", className)}>
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <p className="mt-4 font-serif text-[17px] leading-snug text-ink">{claim}</p>
      <p className="mt-2 text-[14px] leading-relaxed text-ink/60">{proof}</p>
    </div>
  );
}

/** A responsive grid of proof blocks. */
export function ProofBlocks({ items = DEFAULT_PROOFS, className }: { items?: Proof[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-5 md:grid-cols-3", className)}>
      {items.map((p) => (
        <ProofBlock key={p.claim} {...p} />
      ))}
    </div>
  );
}
