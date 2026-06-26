"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Premium image with graceful fallback.
 * - Renders a real <img> (royalty-free registry or current-site asset).
 * - If the image fails to load, degrades to a branded maroon→charcoal panel
 *   with a discreet label, so the UI is never broken.
 * - Optional gradient overlay for legible text-over-image.
 */
export function Media({
  src,
  alt,
  label,
  className,
  imgClassName,
  ratio = "16/9",
  overlay = false,
  priority = false,
  rounded = "rounded-xl",
}: {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  imgClassName?: string;
  ratio?: "16/9" | "4/3" | "1/1" | "3/4" | "21/9" | "3/2" | "none";
  overlay?: boolean;
  priority?: boolean;
  rounded?: string;
}) {
  const [failed, setFailed] = useState(false);

  const ratioCls =
    ratio === "none"
      ? ""
      : {
          "16/9": "aspect-video",
          "4/3": "aspect-[4/3]",
          "3/2": "aspect-[3/2]",
          "1/1": "aspect-square",
          "3/4": "aspect-[3/4]",
          "21/9": "aspect-[21/9]",
        }[ratio];

  const showImg = src && !failed;

  return (
    <div className={cn("relative overflow-hidden bg-ink-900", rounded, ratioCls, className)}>
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-700 via-ink-800 to-ink-900 route-pattern-ink">
          <span className="max-w-[80%] text-center text-[11px] font-medium uppercase tracking-label text-white/55">
            {label ?? alt}
          </span>
        </div>
      )}

      {overlay && showImg && (
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink-900/75 via-ink-900/15 to-transparent" />
      )}
    </div>
  );
}
