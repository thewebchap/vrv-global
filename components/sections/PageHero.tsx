import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { cn } from "@/lib/cn";

/**
 * Minimal inner-page hero — light, with breadcrumbs, eyebrow, a calm serif
 * title and intro, closed by a hairline rule. Optionally pairs the heading
 * with a title picture on the right (elegant, responsive, not too tall).
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  phLabel, // kept for API compatibility; not rendered in the minimal hero
  image,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  phLabel?: string;
  image?: { src: string; alt: string; position?: string };
}) {
  return (
    <section className="border-b border-line bg-paper">
      <Container className="py-12 sm:py-16 lg:py-20">
        <Breadcrumbs items={crumbs} />
        <div
          className={cn(
            "mt-8",
            image
              ? "grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12"
              : "max-w-3xl",
          )}
        >
          <div className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-5 text-h1 text-balance">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink/65 text-pretty">{intro}</p>}
          </div>
          {image && (
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line shadow-card lg:aspect-[4/3]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                style={{ objectPosition: image.position ?? "center" }}
                priority
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
