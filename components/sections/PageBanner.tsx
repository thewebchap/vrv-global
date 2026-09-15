import { cn } from "@/lib/cn";

/**
 * PageBanner — the standardized full-bleed image banner for inner pages: a
 * cover image behind a deep-blue (navy) readability layer, with a gold eyebrow,
 * white serif title and a muted subtitle, left-aligned within the page
 * container. Consistent height across all pages via a responsive min-height.
 * Optional children render CTAs (e.g. Ventures).
 *
 * Readability: the text stays white on every image — including bright/white
 * ones — via a left-heavy navy gradient (image → overlay → text), a bottom
 * scrim, a small-screen boost, and a subtle text-shadow. `overlay` tunes the
 * strength (default "medium"; use "strong" for very bright images), and an
 * optional `panel` adds a soft translucent copy panel for difficult images.
 *
 * A plain <img> is used (not next/image) to keep the supplied `/pictures/*`
 * filenames (spaces / ampersands) working reliably.
 */

// Deep navy (#081828) left-heavy gradients — image stays present, text stays readable.
const OVERLAY = {
  light: "from-[#081828]/68 via-[#081828]/38 to-[#081828]/10",
  medium: "from-[#081828]/82 via-[#081828]/52 to-[#081828]/18",
  strong: "from-[#081828]/90 via-[#081828]/66 to-[#081828]/30",
} as const;

export function PageBanner({
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  imagePosition = "center",
  overlay = "medium",
  panel = false,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  /** Overlay strength — use "strong" for bright / white-toned images. */
  overlay?: keyof typeof OVERLAY;
  /** Soft translucent copy panel for very bright images (off by default). */
  panel?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#081828]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: imagePosition }}
      />

      {/* Readability layers — paint order: image → overlay → text */}
      <span aria-hidden className={cn("absolute inset-0 -z-10 bg-gradient-to-r", OVERLAY[overlay])} />
      {/* Bottom scrim: depth + protects lower / stacked text */}
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#081828]/55 via-transparent to-transparent" />
      {/* Small-screen boost: text runs full-width on mobile, so add even cover */}
      <span aria-hidden className="absolute inset-0 -z-10 bg-[#081828]/28 sm:hidden" />
      {/* Subtle warm brand accent at the base (kept from the original design) */}
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-900/25 via-transparent to-transparent" />

      <div
        className="container-x flex flex-col justify-center py-16 lg:py-20"
        style={{ minHeight: "clamp(300px, 38vw, 460px)" }}
      >
        <div
          className={cn(
            panel &&
              "max-w-2xl rounded-[20px] border border-white/12 bg-[#081828]/36 p-7 shadow-soft backdrop-blur-md sm:p-8",
          )}
        >
          {eyebrow && (
            <p className="eyebrow !text-gold [text-shadow:0_2px_14px_rgba(0,0,0,0.40)]">{eyebrow}</p>
          )}
          <h1 className="mt-4 max-w-3xl text-display text-white text-balance [text-shadow:0_2px_18px_rgba(0,0,0,0.42)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-white/80 text-pretty [text-shadow:0_1px_14px_rgba(0,0,0,0.38)]">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
