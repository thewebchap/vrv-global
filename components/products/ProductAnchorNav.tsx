"use client";

import { useEffect, useRef, useState } from "react";
import { productAnchors } from "@/data/productSegments";
import { cn } from "@/lib/cn";

/**
 * Compact, sticky sub-navigation for the Products page. Sits beneath the main
 * header, scrolls horizontally on small screens, and highlights the section
 * currently in view via an IntersectionObserver scroll-spy. Plain anchor links
 * keep deep-linking and keyboard access working without JS.
 */
export function ProductAnchorNav() {
  const [active, setActive] = useState<string>(productAnchors[0].slug);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = productAnchors
      .map((a) => document.getElementById(a.slug))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px", threshold: [0.1, 0.5, 1] },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Keep the active pill in view within the horizontal scroller.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const el = bar.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    if (el) {
      const left = el.offsetLeft - bar.offsetWidth / 2 + el.offsetWidth / 2;
      bar.scrollTo({ left, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav
      aria-label="Product sections"
      className="sticky top-[70px] z-40 border-y border-line bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80"
    >
      <div ref={barRef} className="container-x no-scrollbar flex gap-1.5 overflow-x-auto py-3">
        {productAnchors.map((a) => (
          <a
            key={a.slug}
            href={`#${a.slug}`}
            data-slug={a.slug}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
              a.lead && "font-semibold",
              active === a.slug
                ? "bg-brand text-white"
                : a.lead
                  ? "text-ink hover:bg-paper"
                  : "text-ink/60 hover:bg-paper hover:text-brand",
            )}
          >
            {a.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
