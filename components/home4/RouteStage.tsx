import { cn } from "@/lib/cn";
import type { Stage } from "@/components/home4/route";

/**
 * RouteStage — one clean split stage: a text panel one side, a premium image
 * card the other, never overlapping. On mobile they stack (text, then image),
 * with the harbour label above the photo so no text sits over the image.
 */
export function RouteStage({ stage, index, active }: { stage: Stage; index: number; active: boolean }) {
  const imageRight = stage.imageSide === "right";
  return (
    <section className="flex min-h-screen items-center py-24">
      <div className="container-x grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className={cn("order-1", imageRight ? "lg:order-1 lg:col-span-5 lg:col-start-1" : "lg:order-2 lg:col-span-5 lg:col-start-8")}>
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-semibold tabular-nums tracking-[0.2em]" style={{ color: stage.accent }}>0{index + 1}</span>
            <span className="h-px w-8" style={{ backgroundColor: stage.accent, opacity: 0.5 }} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: stage.accent }}>{stage.eyebrow}</p>
          </div>
          <h2 className="mt-5 font-serif text-[clamp(2rem,4.4vw,3.5rem)] font-medium leading-[1.05] tracking-tight text-balance">{stage.title}</h2>
          {stage.tag && <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.24em] text-[#0B2F44]/55">{stage.tag}</p>}
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-[#0B2F44]/65 text-pretty">{stage.sub}</p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {stage.keywords.map((k) => (
              <li key={k} className="rounded-full border border-[#0B2F44]/12 bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0B2F44]/60">{k}</li>
            ))}
          </ul>
        </div>

        <div className={cn("order-2", imageRight ? "lg:order-2 lg:col-span-6 lg:col-start-7" : "lg:order-1 lg:col-span-6 lg:col-start-1")}>
          <div className={cn("mb-3 flex items-center gap-2", imageRight ? "lg:justify-start" : "lg:justify-end")}>
            <span className="inline-block h-2.5 w-2.5 rounded-full transition-all" style={{ backgroundColor: active ? stage.accent : "transparent", boxShadow: `inset 0 0 0 1.5px ${stage.accent}` }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0B2F44]/55">{stage.harbour} Harbour</span>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-[0_24px_60px_rgba(7,31,46,0.14)]">
            <div className="aspect-[16/11] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={stage.img.src}
                alt={stage.img.alt}
                loading="lazy"
                className="h-full w-full object-cover"
                onError={(e) => {
                  const el = e.currentTarget;
                  if (el.dataset.fallback) return;
                  el.dataset.fallback = "1";
                  el.src = "/pictures/Home page - Agro products.png";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
