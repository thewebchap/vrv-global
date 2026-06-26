import { esgPillars } from "@/lib/esg";
import { Icon, type IconName } from "@/components/ui/Icon";
import { TickList } from "@/components/ui/TickList";

const pillarIcon: Record<string, IconName> = {
  environment: "tree",
  social: "users",
  governance: "scale",
};

/** Three ESG pillar cards: Environment, Social, Governance. */
export function ESGPillars() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {esgPillars.map((p) => (
        <div
          key={p.key}
          id={p.key}
          className="scroll-mt-24 flex flex-col rounded-2xl border border-line bg-white p-7 shadow-soft"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
            <Icon name={pillarIcon[p.key]} />
          </span>
          <h3 className="mt-5 font-serif text-xl text-ink">{p.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink/60">{p.intro}</p>
          <TickList className="mt-5" items={p.points} />
        </div>
      ))}
    </div>
  );
}
