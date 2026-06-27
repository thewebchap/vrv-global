import { TeamImage } from "@/components/ui/TeamImage";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { founder } from "@/data/leadershipTeam";

/**
 * Premium founder spotlight — a dark, investor-grade split band pairing Manoj's
 * portrait + details (left) with his "Founder's Message" and an embedded video
 * (right). Echoes the dark metrics band elsewhere on the About page.
 */
export function FounderSpotlight({ image = founder.mainImage }: { image?: string }) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-ink-900 p-6 text-white shadow-card sm:p-10 lg:p-12">
      {/* Soft gradient texture + glow for depth */}
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-700/30 via-transparent to-ocean-700/25" />
      <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />

      {/* Subtle commodity-trade pattern — flowing routes, nodes and a circular
          loop, suggesting flows of commodities, capital and responsibility
          moving through an integrated supply chain. Kept very low opacity. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <svg className="h-full w-full" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M80 520 C260 380 420 620 620 430 S920 260 1120 360" stroke="#34D399" strokeWidth="1.5" />
          <path d="M120 180 C320 120 450 300 640 210 S940 100 1100 190" stroke="#34D399" strokeWidth="1" />
          <path d="M60 360 C300 300 520 440 760 360 S1040 300 1160 340" stroke="#34D399" strokeWidth="0.75" strokeDasharray="2 10" />
          <circle cx="180" cy="480" r="4" fill="#34D399" />
          <circle cx="420" cy="520" r="3" fill="#34D399" />
          <circle cx="700" cy="360" r="4" fill="#34D399" />
          <circle cx="980" cy="260" r="3" fill="#34D399" />
          <circle cx="1040" cy="540" r="46" stroke="#34D399" strokeWidth="1" />
          <circle cx="160" cy="150" r="30" stroke="#34D399" strokeWidth="0.75" />
        </svg>
      </span>

      <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[38%_62%] lg:items-start">
        {/* Left — portrait + founder details */}
        <div>
          <TeamImage
            src={image}
            alt={`${founder.name}, ${founder.role}`}
            objectPosition={founder.mainImagePosition}
            sizes="(max-width: 1024px) 100vw, 420px"
            rounded="rounded-[2rem]"
            className="border border-white/10 shadow-card"
          />
          <div className="mt-6">
            <h3 className="font-serif text-2xl text-white">{founder.name}</h3>
            <p className="mt-1 text-sm font-medium text-emerald-300">{founder.role}</p>
            <p className="mt-4 text-[14px] leading-relaxed text-white/60">{founder.bio}</p>
            {/* LinkedIn — shown only when a valid (non-placeholder) URL exists. */}
            {founder.linkedin && founder.linkedin !== "#" && (
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${founder.name} on LinkedIn`}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:border-emerald-300 hover:text-emerald-300"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-white/10 text-[10px] font-bold">in</span>
                LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Right — founder's message + video */}
        <div className="space-y-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-label text-emerald-300">
              Founder&apos;s message
            </p>
            <h2 className="mt-3 text-balance font-serif text-h2 text-white">
              Building resilient, responsible and future-ready supply chains
            </h2>
            <blockquote className="mt-5 space-y-4">
              {founder.message.map((p, i) => (
                <p key={i} className="text-pretty text-[16px] leading-relaxed text-white/75 sm:text-[17px]">
                  {p}
                </p>
              ))}
            </blockquote>
          </div>

          <YouTubeEmbed
            videoId="woz9l6Bahvg"
            title="Founder's Message - Manoj Vembu"
            className="max-w-2xl"
          />
        </div>
      </div>
    </div>
  );
}
