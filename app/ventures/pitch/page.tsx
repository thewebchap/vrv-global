import { Section, SectionHeading } from "@/components/ui/Section";
import { PageBanner } from "@/components/sections/PageBanner";
import { Icon } from "@/components/ui/Icon";
import { PitchForm } from "@/components/forms/PitchForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { pitchIntro } from "@/data/venturesContent";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Submit Venture Pitch",
  description:
    "Fast-track pitch submission for VRV Ventures. Applications are screened directly by our investment committee; you will receive an initial status within 10 business days.",
  path: "/ventures/pitch",
});

const ASSURANCES = [
  { icon: "shield" as const, t: "Committee-screened", d: "Applications are reviewed directly by our investment committee." },
  { icon: "check" as const, t: "10 business days", d: "You will receive an initial status within 10 business days." },
  { icon: "lock" as const, t: "Founder-first", d: "Share your value proposition and how you integrate with VRV's physical flows." },
];

export default function PitchPage() {
  return (
    <>
      <PageBanner
        eyebrow={pitchIntro.eyebrow}
        title={pitchIntro.title}
        subtitle={pitchIntro.lead}
        imageSrc="/pictures/Ventures Page - Banner.jpg"
        imageAlt="Founders portal for submitting a venture pitch to VRV Ventures"
        imagePosition="center"
      />

      <Section tone="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionHeading eyebrow={pitchIntro.eyebrow} title={pitchIntro.title} intro={pitchIntro.lead} />
            <ul className="mt-8 space-y-4">
              {ASSURANCES.map((a) => (
                <li key={a.t} className="flex items-start gap-4 rounded-2xl border border-line bg-paper p-5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                    <Icon name={a.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{a.t}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink/60">{a.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-7 shadow-soft sm:p-9">
            <PitchForm />
          </div>
        </div>
      </Section>

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Ventures", path: "/ventures" },
            { name: "Submit Venture Pitch", path: "/ventures/pitch" },
          ]),
        ]}
      />
    </>
  );
}
