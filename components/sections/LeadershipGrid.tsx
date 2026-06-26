"use client";

import { useEffect, useState } from "react";
import { TeamImage } from "@/components/ui/TeamImage";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { LeadershipImage } from "@/data/companyImages";

function initialsOf(name: string) {
  return name.split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

/** A LinkedIn URL counts only if it's a real link (not a "#"/empty placeholder). */
function hasLinkedIn(url?: string) {
  return !!url && url !== "#";
}

/** Stable portrait — optimised next/image when a photo exists, else initials. */
function Portrait({ leader, className }: { leader: LeadershipImage; className?: string }) {
  if (leader.image) {
    return (
      <TeamImage
        src={leader.image}
        alt={`${leader.name}, ${leader.role}`}
        objectPosition={leader.imagePosition ?? "center top"}
        rounded="rounded-none"
        className={className}
      />
    );
  }
  return (
    <div className={cn("flex aspect-[4/5] w-full items-center justify-center bg-eco", className)}>
      <span className="font-serif text-5xl font-semibold text-white/90">{initialsOf(leader.name)}</span>
    </div>
  );
}

/** Subtle LinkedIn pill used on cards and in the modal. */
function LinkedInLink({ leader, label = false }: { leader: LeadershipImage; label?: boolean }) {
  if (!hasLinkedIn(leader.linkedin)) return null;
  return (
    <a
      href={leader.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      aria-label={`${leader.name} on LinkedIn`}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line text-sm font-medium text-ink/70 transition-colors hover:border-ocean hover:text-ocean",
        label ? "px-4 py-2" : "h-9 w-9 justify-center",
      )}
    >
      <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-ocean-50 text-[10px] font-bold text-ocean">in</span>
      {label && "LinkedIn"}
    </a>
  );
}

/** Leadership cards with a short bio preview; click opens the full-bio modal. */
export function LeadershipGrid({ members, compact = false }: { members: LeadershipImage[]; compact?: boolean }) {
  const [open, setOpen] = useState<LeadershipImage | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className={cn("mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3", compact && "max-w-5xl")}>
        {members.map((m) => (
          // Card is a div (not a button) so it can hold a real LinkedIn link.
          // Mouse click opens the modal; keyboard users use the explicit
          // "Read full bio" button below.
          <article
            key={m.name}
            onClick={() => setOpen(m)}
            className="group relative flex h-full min-h-[520px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-white text-left shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-hover"
          >
            <div className="relative">
              <Portrait leader={m} />
              <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gold/80" />
            </div>
            <div className={cn("flex flex-1 flex-col", compact ? "p-5" : "p-6")}>
              <p className="eyebrow no-flourish">{m.role}</p>
              <h3 className={cn("mt-2 font-serif text-ink", compact ? "text-lg" : "text-xl")}>{m.name}</h3>
              <p className="mt-2 flex items-start gap-1.5 text-[13px] font-medium text-brand">
                <Icon name="leaf" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {m.focus}
              </p>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink/60 line-clamp-3">{m.bio}</p>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(m)}
                  aria-label={`Read ${m.name}'s full profile`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
                >
                  Read full bio
                  <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <LinkedInLink leader={m} />
              </div>
            </div>
          </article>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-ink-900/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${open.name} profile`}
          onClick={() => setOpen(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-line bg-white shadow-hover sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header — eyebrow + close button */}
            <div className="flex shrink-0 items-center justify-between border-b border-line px-6 py-4 sm:px-8">
              <p className="eyebrow no-flourish">Leadership Profile</p>
              <button
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink/60 transition-colors hover:border-brand/30 hover:text-brand"
              >
                ✕
              </button>
            </div>

            {/* Body — scrolls; two columns on desktop, stacked on mobile */}
            <div className="overflow-y-auto overscroll-contain">
              <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-[340px_1fr] lg:items-start">
                {/* Left — image card with basic details */}
                <aside className="mx-auto w-full max-w-sm lg:sticky lg:top-0 lg:mx-0 lg:max-w-none">
                  <div className="overflow-hidden rounded-3xl border border-line bg-eco-soft">
                    <Portrait leader={open} />
                    <div className="p-5">
                      <h3 className="font-serif text-lg text-ink">{open.name}</h3>
                      <p className="mt-1 text-[13px] font-medium text-ink/55">{open.role}</p>
                      {hasLinkedIn(open.linkedin) && (
                        <div className="mt-4">
                          <LinkedInLink leader={open} label />
                        </div>
                      )}
                    </div>
                  </div>
                </aside>

                {/* Right — full bio, message, focus area */}
                <article className="min-w-0 space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl text-ink">{open.name}</h2>
                    <p className="mt-1 text-[13px] font-medium text-ink/55">{open.role}</p>
                  </div>

                  {open.message && (
                    <blockquote className="border-l-2 border-gold pl-4 font-serif text-[17px] leading-relaxed text-ink/80">
                      “{open.message}”
                    </blockquote>
                  )}

                  <div>
                    <h4 className="text-[11px] font-semibold uppercase tracking-label text-brand">Biography</h4>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{open.bio}</p>
                  </div>

                  {open.focus && (
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-label text-brand">Focus Area</h4>
                      <p className="mt-3 flex items-start gap-2 text-[15px] leading-relaxed text-ink/70">
                        <Icon name="leaf" className="mt-1 h-4 w-4 shrink-0 text-brand" />
                        {open.focus}
                      </p>
                    </div>
                  )}
                </article>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
