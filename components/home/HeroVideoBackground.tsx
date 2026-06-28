"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { HeroStoryboardLoop } from "@/components/sections/HeroStoryboardLoop";
import { RotatingHeroHeadline } from "@/components/home/RotatingHeroHeadline";

/**
 * HeroVideoBackground — full-bleed cinematic video hero for the homepage.
 *
 * The video covers the entire hero background; the text overlays it directly on
 * the left / centre-left over a premium dark gradient. The video is muted,
 * looped, plays inline and preloads only metadata. It is NOT autoplayed for
 * prefers-reduced-motion users (they keep the static poster / storyboard).
 *
 * The video is sized to 112% height and anchored to the top so the unwanted
 * bottom ~10% is cropped by the section's overflow (no blank gap).
 *
 * The animated SVG storyboard sits behind the video as a graceful fallback (and
 * the reduced-motion still) so the hero is never blank if the video/poster are
 * unavailable. Add a WebM at the path below to serve it where supported.
 */
const VIDEO_MP4 = "/videos/vrv-hero-supply-chain.mp4";
const VIDEO_WEBM = "/videos/vrv-hero-supply-chain.webm";
const POSTER = "/images/hero/vrv-hero-poster.jpg";

export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const v = videoRef.current;
    if (v && !reduce) {
      // Start playback only when motion is allowed. play() rejects silently if
      // the sources are unavailable → poster / storyboard stays visible.
      v.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden bg-ink-900 lg:min-h-[92vh]">
      {/* Animated storyboard fallback (and reduced-motion still). */}
      <HeroStoryboardLoop className="-z-20" />

      {/* Full-bleed video — bottom ~10% cropped via h-[112%] + object-top. */}
      <video
        ref={videoRef}
        className="absolute left-0 top-0 -z-10 h-[112%] w-full object-cover object-top"
        muted
        loop
        playsInline
        preload="metadata"
        poster={POSTER}
        aria-hidden="true"
      >
        <source src={VIDEO_WEBM} type="video/webm" />
        <source src={VIDEO_MP4} type="video/mp4" />
      </video>

      {/* Premium dark gradient overlays for readability. */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink-900/88 via-ink-900/55 to-ink-900/20" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-900/70 to-transparent" />

      {/* Text overlay — left aligned, centre-left vertically. */}
      <div className="container-x relative z-10 py-24 lg:py-28">
        <div className="max-w-[720px]">
          <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-label text-gold">
            <span aria-hidden className="h-px w-6 bg-gold" />
            Singapore-headquartered commodity supply-chain integrator
          </p>

          <div className="mt-6">
            <RotatingHeroHeadline />
          </div>

          <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-white/80 text-pretty">
            VRV Global connects natural rubber, industrial metals, mining-linked ventures and circular economy materials
            through responsible sourcing, disciplined execution and traceability-ready supply-chain systems.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Button href="/products" variant="primary" size="lg" withArrow>Explore Products</Button>
            <Button href="/contact?type=buyer" variant="outlineLight" size="lg">Start an Enquiry</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
