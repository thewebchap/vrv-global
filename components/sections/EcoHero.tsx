"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { heroSlides } from "@/data/heroSlides";
import { heroTrust } from "@/lib/site";
import { cn } from "@/lib/cn";

const INTERVAL = 7000;

/**
 * Home rolling hero — keeps the sustainability-led design language (eco-soft
 * band, leaf grid, gold accents, headline beside a cinematic image) but rotates
 * through strategic theme slides. Headline text sits beside the image (never
 * over it) for guaranteed contrast. Auto-rotates every 7s, pauses on hover,
 * supports manual dots/arrows and honours prefers-reduced-motion.
 */
export function EcoHero() {
  const n = heroSlides.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || reduce.current) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % n), INTERVAL);
    return () => clearInterval(id);
  }, [paused, n]);

  const go = (i: number) => setActive((i + n) % n);
  const slide = heroSlides[active];

  return (
    <section
      className="relative overflow-hidden bg-eco-soft"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="VRV Global highlights"
    >
      <span aria-hidden className="pointer-events-none absolute inset-0 leaf-grid opacity-70" />
      <span aria-hidden className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-brand-100/50 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-ocean-100/40 blur-3xl" />

      <Container className="relative grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        {/* Text — keyed to re-animate softly on each slide */}
        <div>
          <div key={active} className="animate-fade-up">
            <p className="eyebrow">{slide.eyebrow}</p>
            <h1 className="mt-6 max-w-2xl text-display text-balance">{slide.title}</h1>
            <div className="mt-5 gold-rule" />
            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-ink/65 text-pretty">{slide.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={slide.primaryCta.href} variant="primary" size="lg" withArrow>
                {slide.primaryCta.label}
              </Button>
              <Button href={slide.secondaryCta.href} variant="link">
                {slide.secondaryCta.label}
              </Button>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="mt-9 flex items-center gap-3">
            <div className="flex gap-2" role="tablist" aria-label="Choose hero slide">
              {heroSlides.map((s, i) => (
                <button
                  key={s.eyebrow}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={s.eyebrow}
                  onClick={() => go(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 ease-out-soft",
                    i === active ? "w-7 bg-brand" : "w-2 bg-brand/25 hover:bg-brand/45",
                  )}
                />
              ))}
            </div>
            <span className="ml-1 text-xs font-medium tabular-nums text-ink/40">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Image — stacked slides crossfade */}
        <div className="relative animate-fade-up">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-sand shadow-card">
            {heroSlides.map((s, i) => (
              <Image
                key={s.image + i}
                src={s.image}
                alt={s.imageAlt}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 600px"
                style={{ objectPosition: s.imagePosition ?? "center" }}
                className={cn(
                  "object-cover transition-opacity duration-700 ease-out-soft",
                  i === active ? "opacity-100" : "opacity-0",
                )}
              />
            ))}
            {/* Soft gradient so the caption stays legible */}
            <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/55 via-ink-900/10 to-transparent" />

            {/* Manual prev/next */}
            <div className="absolute bottom-3 right-3 flex gap-2">
              <button
                onClick={() => go(active - 1)}
                aria-label="Previous slide"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30"
              >
                <Icon name="arrowRight" className="h-4 w-4 rotate-180" />
              </button>
              <button
                onClick={() => go(active + 1)}
                aria-label="Next slide"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30"
              >
                <Icon name="arrowRight" className="h-4 w-4" />
              </button>
            </div>
          </div>

          <span aria-hidden className="absolute -left-3 -top-3 h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-gold" />
          <span aria-hidden className="absolute -bottom-3 -right-3 h-16 w-16 rounded-br-2xl border-b-2 border-r-2 border-ocean/40" />

          <div className="absolute -bottom-6 left-6 rounded-xl border border-line bg-white/95 px-5 py-3 shadow-card backdrop-blur">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Icon name="leaf" className="h-4 w-4 text-brand" /> Traceable · Responsible · Circular
            </p>
            <p className="mt-0.5 text-xs text-ink/55">Origin to destination, with ESG built in</p>
          </div>
        </div>
      </Container>

      {/* Trust indicators */}
      <div className="relative border-t border-line/70 bg-white/50 backdrop-blur">
        <Container className="grid grid-cols-1 divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {heroTrust.map((t) => (
            <div key={t.value} className="flex items-center gap-3 py-5 sm:justify-center sm:px-4">
              <span aria-hidden className="h-2 w-2 shrink-0 rotate-45 bg-gold" />
              <div>
                <p className="text-sm font-semibold text-ink">{t.value}</p>
                <p className="text-xs text-ink/55">{t.note}</p>
              </div>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}
