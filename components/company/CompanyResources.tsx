import { Icon, type IconName } from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

export type Resource = { title: string; note: string; icon: IconName };

/** Company resources — documents are placeholders until approved files exist. */
export const COMPANY_RESOURCES: Resource[] = [
  { title: "Company Profile", note: "PDF · [Upload approved PDF]", icon: "doc" },
  { title: "Product Portfolio", note: "PDF · [Upload approved PDF]", icon: "cube" },
  { title: "Sustainability Overview", note: "PDF · [Upload approved PDF]", icon: "leaf" },
  { title: "Ventures Overview", note: "PDF · [Upload approved PDF]", icon: "spark" },
  { title: "Supplier Code of Conduct", note: "PDF · [Upload approved PDF]", icon: "shield" },
  { title: "Responsible Sourcing Policy", note: "PDF · [Upload approved PDF]", icon: "check" },
];

/** Resource cards — rendered as non-links until real files are uploaded. */
export function CompanyResourceCards({ items = COMPANY_RESOURCES, className }: { items?: Resource[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {items.map((r) => (
        <div key={r.title} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5 shadow-soft">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
            <Icon name={r.icon} className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="font-serif text-[16px] text-ink">{r.title}</p>
            <p className="mt-1 text-[12px] text-ink/45">{r.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Full "Company Resources" section (heading + cards). */
export function CompanyResources({
  id = "resources",
  tone = "paper",
  className,
}: {
  id?: string;
  tone?: "white" | "paper";
  className?: string;
}) {
  return (
    <Section id={id} tone={tone} bordered className={cn("scroll-mt-24", className)}>
      <SectionHeading
        eyebrow="Company resources"
        title="Documents & downloads"
        intro="Approved company documents and reference materials. Placeholders are shown until final PDFs are uploaded."
      />
      <div className="mt-10">
        <CompanyResourceCards />
      </div>
    </Section>
  );
}
