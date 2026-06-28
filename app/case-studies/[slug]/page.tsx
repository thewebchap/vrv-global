import { notFound } from "next/navigation";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import {
  caseStudies,
  getCaseStudy,
  caseStudyCategoryLabels,
} from "@/data/caseStudies";
import { pageMeta } from "@/lib/seo";

const dateFmt = new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "long", day: "numeric" });
const fmtDate = (iso: string) => dateFmt.format(new Date(iso));

export function generateStaticParams() {
  return caseStudies
    .filter((c) => c.status === "Published")
    .map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) return pageMeta({ title: "Case Study", description: "VRV Global case study.", path: "/case-studies" });
  return pageMeta({
    title: cs.title,
    description: cs.summary,
    path: `/case-studies/${cs.slug}`,
  });
}

export default function CaseStudyDetailPage({ params }: { params: { slug: string } }) {
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();

  // Only render sections that actually have content (no empty headings).
  const sections: { heading: string; body?: string }[] = [
    { heading: "Problem", body: cs.content.problem },
    { heading: "VRV Role", body: cs.content.vrvRole },
    { heading: "Supply Chain Process", body: cs.content.process },
    { heading: "Traceability / Documentation", body: cs.content.traceability },
    { heading: "Outcome", body: cs.content.outcome },
    { heading: "Sustainability Angle", body: cs.content.sustainability },
  ].filter((s) => s.body && s.body.trim().length > 0);

  const images = cs.images?.filter(Boolean) ?? [];
  const files = cs.files?.filter((f) => f?.url) ?? [];

  return (
    <>
      <PageHero
        eyebrow={`${caseStudyCategoryLabels[cs.category]} · ${fmtDate(cs.date)}`}
        title={cs.title}
        intro={cs.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Case Studies", href: "/case-studies" },
          { label: cs.title, href: `/case-studies/${cs.slug}` },
        ]}
      />

      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          {/* Main content */}
          {sections.length > 0 && (
            <div className="space-y-10">
              {sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="text-2xl font-serif text-ink">{s.heading}</h2>
                  <p className="mt-3 text-[16px] leading-relaxed text-ink/70 text-pretty">{s.body}</p>
                </div>
              ))}
            </div>
          )}

          {/* Images / uploaded files */}
          {images.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-serif text-ink">Images</h2>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {images.map((src) => (
                  <span key={src} className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line bg-sand">
                    <Image src={src} alt="" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related documents */}
          {files.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-serif text-ink">Related Documents</h2>
              <ul className="mt-5 divide-y divide-line border-y border-line">
                {files.map((f) => (
                  <li key={f.url}>
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-3 py-4 text-[15px] text-ink/80 hover:text-brand"
                    >
                      <span className="inline-flex items-center gap-3">
                        <Icon name="doc" className="h-5 w-5 text-brand" />
                        {f.name || f.url}
                      </span>
                      <Icon name="arrowRight" className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-line pt-8">
            <Button href="/contact?type=buyer" variant="primary" withArrow>Discuss a similar requirement</Button>
            <Button href="/case-studies" variant="link">Back to all case studies</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
