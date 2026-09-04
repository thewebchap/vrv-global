"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { RotatingHeroHeadline } from "@/components/home/RotatingHeroHeadline";
import { heroSlides, HERO_INTERVAL_MS } from "@/data/heroSequence";

/**
 * HeroVideoBackground — the homepage's full-screen image hero.
 *
 * Six approved hero slides rotate every 5s (30s cycle) with a smooth crossfade;
 * each slide's image covers the full hero area (object-cover) under a premium
 * left-weighted dark gradient, with the headline / supporting line + CTAs over
 * it. Reduced-motion holds the first slide (no auto-rotation, no fade). Content
 * and CTAs are unchanged; only the hero visual treatment lives here.
 */
export function HeroVideoBackground() {
  // One index drives both the background image and the rotating headline.
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // reduced motion → hold on the first slide
    const interval = window.setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), HERO_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden bg-ink-900 lg:min-h-[92vh]">
      {/* Full-bleed rotating hero images (crossfade, object-cover, no crop of subjects). */}
      {heroSlides.map((slide, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={slide.image}
          src={slide.image}
          alt={i === index ? slide.imageAlt : ""}
          aria-hidden={i === index ? undefined : true}
          loading={i === 0 ? "eager" : "lazy"}
          fetchPriority={i === 0 ? "high" : "low"}
          className="absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out motion-reduce:transition-none"
          style={{ objectPosition: slide.imagePosition, opacity: i === index ? 1 : 0 }}
        />
      ))}

      {/* Premium dark gradient overlays for text readability. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900/85 via-ink-900/58 to-ink-900/20" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-900/70 to-transparent" />

      {/* Hero text — left / centre-left, contained width. */}
      <div className="container-x relative z-10 py-24 lg:py-28">
        <div className="max-w-[760px]">
          <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-label text-gold">
            <span aria-hidden className="h-px w-6 bg-gold" />
            Singapore-headquartered commodity supply-chain integrator
          </p>

          <div className="mt-6">
            <RotatingHeroHeadline index={index} />
          </div>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href="/products" variant="primary" size="lg" withArrow>Explore Products</Button>
            <Button href="/contact?type=buyer" variant="outlineLight" size="lg">Start an Enquiry</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
