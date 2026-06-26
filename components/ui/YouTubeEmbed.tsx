"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Lightweight, responsive YouTube embed.
 *
 * Renders a click-to-load facade (thumbnail + play button) so the heavy
 * YouTube iframe is only fetched once the visitor chooses to watch — keeping
 * the page fast. The video never autoplays on load; autoplay only follows the
 * user's click. Always 16:9, with rounded corners, a subtle border and shadow.
 */
export function YouTubeEmbed({
  videoId,
  title,
  className,
}: {
  videoId: string;
  title: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.5rem] border border-white/10 bg-black shadow-2xl",
        className,
      )}
    >
      <div className="relative aspect-video">
        {active ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 h-full w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-hover transition-transform duration-300 ease-out-soft group-hover:scale-105"
            >
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-ink" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
