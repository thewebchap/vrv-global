import { Icon, type IconName } from "@/components/ui/Icon";

const steps: { label: string; icon: IconName; note: string }[] = [
  { label: "Source", icon: "leaf", note: "Responsible origin sourcing" },
  { label: "Verify", icon: "search", note: "Supplier KYC & due diligence" },
  { label: "Move", icon: "truck", note: "Lower-impact logistics" },
  { label: "Track", icon: "route", note: "Material traceability" },
  { label: "Report", icon: "chart", note: "ESG data & audit trail" },
  { label: "Recycle / Reuse", icon: "recycle", note: "Circular material flows" },
];

/** Horizontal supply-chain journey: Source → Verify → Move → Track → Report → Recycle/Reuse. */
export function TraceabilityFlow({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {steps.map((s, i) => (
        <div key={s.label} className="relative">
          <div
            className={
              dark
                ? "flex h-full flex-col rounded-xl border border-white/12 bg-white/[0.04] p-4"
                : "flex h-full flex-col rounded-xl border border-line bg-white p-4 shadow-soft"
            }
          >
            <span
              className={
                dark
                  ? "inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-gold"
                  : "inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand"
              }
            >
              <Icon name={s.icon} className="h-5 w-5" />
            </span>
            <p className={dark ? "mt-3 text-sm font-semibold text-white" : "mt-3 text-sm font-semibold text-ink"}>
              {s.label}
            </p>
            <p className={dark ? "mt-1 text-xs leading-snug text-white/55" : "mt-1 text-xs leading-snug text-ink/55"}>
              {s.note}
            </p>
            <span className={dark ? "mt-3 text-[11px] font-semibold text-white/30" : "mt-3 text-[11px] font-semibold text-ink/30"}>
              0{i + 1}
            </span>
          </div>
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-brand/40 lg:block"
            >
              <Icon name="arrowRight" className="h-4 w-4" />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
