import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";

/**
 * Minimal inner-page hero — light, with breadcrumbs, eyebrow, a calm serif
 * title and intro, closed by a hairline rule. Optionally pairs the heading
 * with a quiet placeholder image.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  phLabel, // kept for API compatibility; not rendered in the minimal hero
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  phLabel?: string;
}) {
  return (
    <section className="border-b border-line bg-paper">
      <Container className="py-12 sm:py-16 lg:py-20">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-h1 text-balance">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink/65 text-pretty">{intro}</p>}
        </div>
      </Container>
    </section>
  );
}
