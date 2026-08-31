"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * TraceabilityVideo — "Origin-to-End-User Traceability" video block shown beside
 * the Our Commitment paragraph (replaces the previous static image).
 *
 * Behaviour: muted, looped, playsInline, poster fallback, responsive, autoplay
 * ONLY when muted (started via effect, and skipped for prefers-reduced-motion).
 * If the video/poster files are missing the branded panel + label still render,
 * so the layout never breaks.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * REQUIRED VIDEO STORYBOARD (for the video to be produced later)
 * File:   /public/videos/origin-to-end-user-traceability.mp4
 * Poster: /public/pictures/Traceability and Technology Page - Banner.jpg
 *
 * Flow:  Certificate → QR scan → farmer KYC → farm polygons → supply chain →
 *        factory → end user
 *
 * 1. OPENING
 *    - Start on a TRST01 traceability certificate.
 *    - Show the certificate, its QR code, and the QR code being scanned.
 *
 * 2. TRACEABILITY FLOW OPENS (after the scan)
 *    - Digital traceability dashboard.
 *    - Chain-of-custody flow.
 *    - Origin-to-end-user journey.
 *
 * 3. BACKEND ACTIVITIES AT EACH STEP (what sits behind the certificate)
 *    a) Farmer KYC        — farmer identity verification, supplier onboarding, origin-level records.
 *    b) Farm land polygons — one farm polygon on a map, then zoom out to many; satellite / GIS style.
 *    c) Supply-chain movement — aggregation, processing, documentation, shipment records, custody transitions.
 *    d) Factory           — processing factory, quality checks, packaging / dispatch.
 *    e) End users          — industrial buyer / end-user visibility; certificate linked to product flow.
 *
 * Avoid: generic ESG animations, random leaves, abstract green visuals,
 *        unsupported certification claims, fake legal/compliance claims.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const VIDEO_MP4 = "/videos/origin-to-end-user-traceability.mp4";
const POSTER = "/pictures/Traceability and Technology Page - Banner.jpg";

export function TraceabilityVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const v = videoRef.current;
    // Autoplay only when muted + motion allowed; rejects silently if the file
    // is not present yet → poster / branded panel stays.
    if (v && !reduce) v.play().catch(() => {});
  }, []);

  return (
    <figure className="m-0">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-eco-soft shadow-card">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster={POSTER}
          aria-label="Origin-to-end-user traceability film"
        >
          <source src={VIDEO_MP4} type="video/mp4" />
        </video>

        {/* Label — always visible, so the block reads clearly even before the
            approved video/poster are uploaded. */}
        <span className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink-900/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-label text-white backdrop-blur">
          <Icon name="qr" className="h-3.5 w-3.5 text-gold" />
          Origin-to-end-user traceability
        </span>
        <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/25 to-transparent" />
      </div>
      <figcaption className="mt-3 text-[13.5px] leading-relaxed text-ink/55">
        Origin-to-end-user traceability: from certificate and QR scan to farmer KYC, farm mapping, supply-chain movement,
        factory processing and end-user visibility.
      </figcaption>
    </figure>
  );
}
