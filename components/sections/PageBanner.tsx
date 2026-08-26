/**
 * PageBanner — the standardized full-bleed image banner for inner pages,
 * matching the Ventures-page style: a cover image behind a dark blue/charcoal
 * gradient, with a gold eyebrow, white serif title and a muted subtitle,
 * left-aligned within the page container. Consistent height across all pages
 * via a responsive min-height. Optional children render CTAs (e.g. Ventures).
 *
 * A plain <img> is used (not next/image) to match the Ventures hero and to keep
 * the supplied `/pictures/*` filenames (spaces / ampersands) working reliably.
 */
export function PageBanner({
  eyebrow,
  title,
  subtitle,
  imageSrc,
  imageAlt,
  imagePosition = "center",
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: imagePosition }}
      />
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900/92 via-ink-900/72 to-ink-900/35" />
      <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-800/55 via-transparent to-transparent" />

      <div
        className="container-x flex flex-col justify-center py-16 lg:py-20"
        style={{ minHeight: "clamp(300px, 38vw, 460px)" }}
      >
        {eyebrow && <p className="eyebrow !text-gold">{eyebrow}</p>}
        <h1 className="mt-4 max-w-3xl text-display text-white text-balance">{title}</h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-white/75 text-pretty">{subtitle}</p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
