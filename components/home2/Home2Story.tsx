"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EnterpriseSupplyChainScene, SCENE_VIEWBOXES } from "@/components/home2/EnterpriseSupplyChainScene";

/**
 * Home2Story — the connected /home2 scroll experience. One sticky master scene
 * (EnterpriseSupplyChainScene) whose camera (the <svg> viewBox) is interpolated
 * from scroll progress so the page zooms through the full responsible supply
 * chain: overview → rubber sourcing → drone traceability → digital records →
 * processing → quality assurance → shipment → ESG community → Singapore global
 * hub (zoom-out). Native scroll only (no hijacking). Reduced-motion: the camera
 * holds on the overview and the scene is static, while headlines still change.
 */
type Chapter = {
  id: string;
  title: string;
  subtitle?: string;
  accent: string;
  eyebrow: string;
};

const GREEN = "#2F7D5A";
const BLUE = "#0B2F44";
const GOLD = "#B8955B";
const COPPER = "#B87333";

const chapters: Chapter[] = [
  { id: "overview", eyebrow: "Source to destination", title: "Source to destination. Integrated responsibly.", subtitle: "VRV Global builds sustainable, integrated commodity supply chains from sourcing origins to final destinations — with traceability, transparency and responsible practices across every stage.", accent: GREEN },
  { id: "sourcing", eyebrow: "Source", title: "Sourcing begins at origin", accent: GREEN },
  { id: "verification", eyebrow: "Verify", title: "Traceability starts upstream", accent: GREEN },
  { id: "processing", eyebrow: "Process", title: "Processing turns origin into supply", accent: BLUE },
  { id: "quality", eyebrow: "Assure", title: "Quality is checked before movement", accent: GOLD },
  { id: "logistics", eyebrow: "Move", title: "Materials move through disciplined trade", accent: COPPER },
  { id: "buyer", eyebrow: "Deliver", title: "Delivered to global industry", accent: BLUE },
  { id: "community", eyebrow: "Reinvest", title: "Value returns to communities", accent: GOLD },
  { id: "singapore", eyebrow: "Coordinate", title: "Coordinated from Singapore", accent: COPPER },
];

const OVERVIEW = SCENE_VIEWBOXES.overview;
const smooth = (t: number) => t * t * (3 - 2 * t);

function CTA({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-[14px] font-semibold transition-colors",
        primary
          ? "bg-[#0B2F44] text-white hover:bg-[#0B2F44]/90"
          : "border border-[#0B2F44]/25 text-[#0B2F44] hover:border-[#0B2F44]/50 hover:bg-[#0B2F44]/[0.03]",
      )}
    >
      {children}
    </Link>
  );
}

export function Home2Story() {
  const reduce = !!useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [storyDone, setStoryDone] = useState(false);
  const N = chapters.length;

  // Immersive navbar hide: while the scroll story is active, hide the global
  // floating navbar via a scoped class on <html> (see globals.css). Removed on
  // unmount, so no other route is ever affected.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("home2-immersive", !storyDone);
    return () => root.classList.remove("home2-immersive");
  }, [storyDone]);

  useEffect(() => {
    const setVB = (x: number, y: number, w: number, h: number) =>
      svgRef.current?.setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
    if (reduce) setVB(OVERVIEW.x, OVERVIEW.y, OVERVIEW.w, OVERVIEW.h);

    let raf = 0;
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dist = rect.height - window.innerHeight;
      const p = dist > 0 ? Math.min(Math.max(-rect.top / dist, 0), 1) : 0;
      const t = p * (N - 1);
      const i = Math.min(Math.floor(t), N - 2);
      const f = smooth(t - i);
      if (!reduce) {
        const a = SCENE_VIEWBOXES[chapters[i].id];
        const b = SCENE_VIEWBOXES[chapters[i + 1].id];
        setVB(
          a.x + (b.x - a.x) * f,
          a.y + (b.y - a.y) * f,
          a.w + (b.w - a.w) * f,
          a.h + (b.h - a.h) * f,
        );
      }
      const idx = Math.round(t);
      setActive((prev) => (prev === idx ? prev : idx));

      // Story is "done" (navbar returns) once the end CTA rises into view.
      const cta = ctaRef.current;
      const done = cta ? cta.getBoundingClientRect().top <= window.innerHeight * 0.72 : false;
      setStoryDone((prev) => (prev === done ? prev : done));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduce, N]);

  const revealSite = () =>
    ctaRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  return (
    // Pull up under the reserved (hidden) navbar so the story is full-bleed.
    <div className="-mt-[72px] bg-[#F8F6F1] text-[#0B2F44] sm:-mt-[78px]">
      {/* Scroll journey — tall section drives the sticky camera */}
      <div ref={sectionRef} className="relative" style={{ height: `${N * 78}vh` }}>
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          <svg
            ref={svgRef}
            viewBox={`${OVERVIEW.x} ${OVERVIEW.y} ${OVERVIEW.w} ${OVERVIEW.h}`}
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <EnterpriseSupplyChainScene activeId={chapters[active].id} />
          </svg>

          {/* Soft cream scrim so the headline stays readable over the scene */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#F8F6F1] via-[#F8F6F1]/80 to-transparent" />
          <div aria-hidden className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[#F8F6F1]/70 to-transparent" />

          {/* Headline layers (crossfade with the active chapter) */}
          {chapters.map((c, i) => (
            <div
              key={c.id}
              className={cn(
                "absolute inset-0 flex items-end transition-opacity duration-500 ease-out",
                i === active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <div className="container-x w-full pb-16 sm:pb-20 lg:pb-24">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: c.accent }}>
                  {c.eyebrow}
                </p>
                <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2.1rem,5vw,4rem)] font-medium leading-[1.05] tracking-tight text-balance">
                  {c.title}
                </h2>
                {c.subtitle && (
                  <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[#0B2F44]/65 text-pretty">{c.subtitle}</p>
                )}
                {i === 0 && (
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <CTA href="/products" primary>Explore Products</CTA>
                    <CTA href="/contact?type=buyer">Start an Enquiry</CTA>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Scroll hint */}
          <div
            aria-hidden
            className={cn(
              "absolute inset-x-0 top-6 flex justify-center transition-opacity duration-500",
              active === 0 && !storyDone ? "opacity-100" : "opacity-0",
            )}
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0B2F44]/35">Scroll to explore</span>
          </div>
        </div>
      </div>

      {/* Immersive controls — hidden once the navbar returns (story complete) */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-[60] flex justify-end px-4 pt-4 transition-opacity duration-500 sm:px-6",
          storyDone ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <button
          type="button"
          onClick={revealSite}
          className="pointer-events-auto rounded-full border border-[#0B2F44]/15 bg-white/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0B2F44]/70 backdrop-blur-[10px] transition-colors hover:border-[#B8955B]/50 hover:text-[#0B2F44]"
        >
          Skip to site
        </button>
      </div>

      {/* Minimal progress indicator (vertical dots, right edge) */}
      <div
        aria-hidden
        className={cn(
          "fixed right-4 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-center gap-2.5 transition-opacity duration-500 sm:flex",
          storyDone ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        {chapters.map((c, i) => (
          <span
            key={c.id}
            className="block rounded-full transition-all duration-300"
            style={{
              width: i === active ? 8 : 5,
              height: i === active ? 8 : 5,
              backgroundColor: i === active ? c.accent : "rgba(11,47,68,0.22)",
            }}
          />
        ))}
      </div>

      {/* Compact end CTA */}
      <section ref={ctaRef} className="border-t border-[#0B2F44]/10 py-24">
        <div className="container-x text-center">
          <h2 className="mx-auto max-w-3xl font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] tracking-tight text-balance">
            From origin to destination, VRV builds responsible commodity supply chains.
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <CTA href="/products" primary>Explore Products</CTA>
            <CTA href="/contact?type=buyer">Start an Enquiry</CTA>
          </div>
        </div>
      </section>
    </div>
  );
}
