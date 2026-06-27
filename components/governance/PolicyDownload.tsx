import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Ethics & Governance policy-pack download. Renders a real download link only
 * when the PDF exists; otherwise shows a clear placeholder. Never links to a
 * broken PDF.
 */
export function PolicyDownload({
  exists,
  href,
  className,
}: {
  exists: boolean;
  href: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-brand/20 bg-eco-soft p-6 shadow-soft sm:p-7", className)}>
      <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-brand">
        <Icon name="doc" className="h-4 w-4 text-gold" />
        Ethics &amp; Governance policies
      </p>
      <h3 className="mt-3 font-serif text-xl text-ink">Policy pack</h3>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink/70">
        Download VRV Global&apos;s ethics and governance policy pack for details on conduct expectations, responsible
        sourcing, trade compliance, supplier accountability, anti-bribery controls, and traceability-related
        documentation practices.
      </p>

      {exists ? (
        <a
          href={href}
          download
          className="group mt-5 inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 text-[15px] font-semibold text-white shadow-soft transition-all hover:bg-flame-600 hover:shadow-hover"
        >
          <Icon name="doc" className="h-4 w-4" />
          Download Ethics &amp; Governance Policy Pack
        </a>
      ) : (
        <div className="mt-5 flex items-start gap-2 rounded-xl border border-dashed border-ink/20 bg-white px-4 py-3 text-[13px] leading-relaxed text-ink/55">
          <Icon name="doc" className="mt-0.5 h-4 w-4 shrink-0 text-ink/30" />
          <span>
            Policy PDF coming soon. Upload the approved document to{" "}
            <code className="rounded bg-paper px-1 py-0.5 text-[12px] text-ink/70">/public/policies/vrv-ethics-governance-policy-pack.pdf</code>.
          </span>
        </div>
      )}
    </div>
  );
}
