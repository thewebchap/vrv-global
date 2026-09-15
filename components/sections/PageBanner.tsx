import { cn } from "@/lib/cn";

/**
 * PageBanner — the standardized full-bleed image banner for inner pages: a
 * cover image behind a deep-navy readability system, with a gold eyebrow, white
 * serif title and a muted subtitle, left-aligned within the page container.
 * Consistent height across pages via a responsive min-height. Optional children
 * render CTAs.
 *
 * Readability (works even on bright / white / sky-toned or high-detail images,
 * paint order image → overlay → text):
 *   1. a left-heavy navy gradient (`overlayStrength`: light | medium | strong),
 *   2. a bottom scrim + small-screen boost,
 *   3. an always-on soft LOCAL scrim behind the copy so both the headline AND
 *      the thinner subtitle sit on a protected patch regardless of the image,
 *   4. an optional translucent text card (`useTextCard`) for the hardest images,
 *   5. a subtle text-shadow as backup (never the primary mechanism).
 *
 * A plain <img> is used (not next/image) to keep the supplied `/pictures/*`
 * filenames (spaces / ampersands) working reliably.
 */

// Deep navy (#071626) left-heavy gradients — image stays present, text readable.
const OVERLAY = {
  light: "from-[#071626]/62 via-[#071626]/34 to-[#071626]/10",
  medium: "from-[#071626]/80 via-[#071626]/52 to-[#071626]/16",
  strong: "from-[#071626]/90 via-[#071626]/66 to-[#071626]/24",
} as const;

export function PageBanner({
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  imagePosition = "center",
  overlayStrength,
  useTextCard,
  // Back-compat aliases for earlier call sites.
  overlay,
  panel,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  /** Overlay strength — use "strong" for bright / white / sky-toned images. */
  overlayStrength?: keyof typeof OVERLAY;
  /** Translucent readability card behind the copy — for the hardest images. */
  useTextCard?: boolean;
  /** @deprecated alias of overlayStrength */
  overlay?: keyof typeof OVERLAY;
  /** @deprecated alias of useTextCard */
  panel?: boolean;
  children?: React.ReactNode;
}) {
  const strength = overlayStrength ?? overlay ?? "medium";
  const card = useTextCard ?? panel ?? false;

  return (
    <section className="relative isolate overflow-hidden bg-[#071626]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: imagePosition }}
      />

      {/* Readability layers — image → overlay → text */}
      <span aria-hidden className={cn("absolute inset-0 -z-10 bg-gradient-to-r", OVERLAY[strength])} />
      {/* Bottom scrim: depth + protects lower / stacked text */}
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071626]/55 via-transparent to-transparent" />
      {/* Small-screen boost: text runs full-width on mobile, so add even cover */}
      <span aria-hidden className="absolute inset-0 -z-10 bg-[#071626]/30 sm:hidden" />
      {/* Subtle warm brand accent at the base (kept from the original design) */}
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-900/22 via-transparent to-transparent" />

      <div
        className="container-x flex flex-col justify-center py-16 lg:py-20"
        style={{ minHeight: "clamp(300px, 38vw, 460px)" }}
      >
        {/* Copy wrapper is its own stacking context so the local scrim (or card)
            sits behind the text but above the section overlays. */}
        <div
          className={cn(
            "relative isolate max-w-3xl",
            card &&
              "rounded-3xl border border-white/16 bg-gradient-to-br from-[#071626]/62 to-[#071626]/36 p-7 shadow-[0_18px_44px_rgba(0,0,0,0.18)] backdrop-blur-md sm:p-9",
          )}
        >
          {/* Always-on soft local scrim — protects the copy without a hard box.
              Hidden behind the card when one is used. */}
          {!card && (
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-x-6 -inset-y-5 -z-10 rounded-[32px]"
              style={{
                background:
                  "radial-gradient(115% 130% at 18% 50%, rgba(7,22,38,0.55) 0%, rgba(7,22,38,0.24) 52%, rgba(7,22,38,0) 100%)",
              }}
            />
          )}

          {eyebrow && (
            <p className="eyebrow !text-gold [text-shadow:0_2px_14px_rgba(0,0,0,0.42)]">{eyebrow}</p>
          )}
          <h1 className="mt-4 text-display text-white text-balance [text-shadow:0_3px_20px_rgba(0,0,0,0.50)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-white/90 text-pretty [text-shadow:0_2px_14px_rgba(0,0,0,0.46)]">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
