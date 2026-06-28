"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HeroStoryboardLoop } from "@/components/sections/HeroStoryboardLoop";
import { RotatingHeroHeadline } from "@/components/sections/RotatingHeroHeadline";

/**
 * HeroVideoBackground — cinematic looping video hero for the homepage.
 *
 * Upload the approved VRV hero video to /public/videos/vrv-hero-supply-chain.mp4
 * Upload WebM version to /public/videos/vrv-hero-supply-chain.webm
 * Upload poster image to /public/images/hero/vrv-hero-poster.jpg
 *
 * Until those files are added, the section falls back to an existing commodity
 * image (never blank). The video is muted, looped, plays inline, preloads only
 * metadata, and is NOT autoplayed for prefers-reduced-motion users (they keep
 * the static poster/fallback image).
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
      // Only load + play the video when motion is allowed. play() rejects
      // silently if the source files are not present yet → poster/fallback stays.
      v.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden bg-ink-900 sm:min-h-[84vh] lg:min-h-[88vh]">
      {/* Animated SVG storyboard loop — the cinematic stopgap shown until the
          approved video files are uploaded (then the video below covers it).
          Also serves as the reduced-motion static fallback (shows scene 1). */}
      <HeroStoryboardLoop className="-z-20" />

      {/* Cinematic video — covers the storyboard once real files are uploaded.
          No `autoplay` attr: playback is started via effect (reduced-motion aware). */}
      {/* Video is sized to 112% height + anchored to the top so the bottom ~10%
          (unwanted footer content) is cropped out by the section's overflow. */}
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

      {/* Premium overlay — dark blue / charcoal gradient for readability + subtle brand tint */}
      <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink-900/92 via-ink-900/65 to-ink-900/25" />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-800/45 via-transparent to-ink-900/30" />

      {/* Content — in front of the video, left aligned */}
      <div className="container-x relative z-10 py-24 lg:py-28">
        <div className="max-w-[760px]">
          <p className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-label text-gold">
            <span aria-hidden className="h-px w-6 bg-gold" />
            Singapore-headquartered commodity supply chains
          </p>
          <div className="mt-6">
            <RotatingHeroHeadline />
          </div>
          <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-white/80 text-pretty">
            VRV Global connects natural rubber, industrial metals, mining-linked ventures and circular economy materials
            through responsible sourcing, disciplined execution and traceability-ready supply-chain systems.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/products" variant="primary" size="lg" withArrow>Explore Our Products</Button>
            <Button href="/contact?type=buyer" variant="outlineLight" size="lg">Start an Enquiry</Button>
          </div>
        </div>
      </div>

      {/* Subtle scroll indicator */}
      <a
        href="#main-content"
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-white/55 transition-colors hover:text-white sm:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-label">Scroll</span>
        <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/30 p-1">
          <span className="h-1.5 w-1 animate-bounce rounded-full bg-white/70" />
        </span>
      </a>
    </section>
  );
}
