import { Icon } from "@/components/ui/Icon";
import { Container } from "@/components/ui/Container";

/**
 * Singapore positioning band — reinforces VRV Global's base in Singapore as a
 * regional commodity-trading and sustainable supply-chain hub.
 */
export function SingaporeHub({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="flex items-start gap-2 text-sm leading-relaxed text-ink/60">
        <Icon name="globe" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
        Headquartered in Singapore, VRV Global connects regional sourcing networks with global buyers through
        responsible trade, sustainable supply chain practices and market-aware commodity intelligence.
      </p>
    );
  }
  return (
    <section className="bg-eco">
      <Container className="grid grid-cols-1 gap-8 py-14 md:grid-cols-[1.5fr_1fr] md:items-center lg:py-16">
        <div>
          <p className="eyebrow no-flourish !text-gold">Singapore — regional commodity & supply chain hub</p>
          <h2 className="mt-4 text-h2 text-white text-balance">
            Headquartered in Singapore, built for responsible global trade
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/75">
            VRV Global connects regional sourcing networks with global buyers through responsible trade, sustainable
            supply chain practices and market-aware commodity intelligence — anchored in one of the world&apos;s leading
            trade, finance and rubber-benchmark hubs.
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-3">
          {[
            ["SGX / SICOM benchmarks", "Home of TSR20 & RSS3 rubber futures"],
            ["Neutral, well-regulated hub", "A trusted base for global counterparties"],
            ["Gateway to Asian demand", "Connecting origins to destination markets"],
          ].map(([t, d]) => (
            <li key={t} className="rounded-xl border border-white/12 bg-white/[0.04] p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-white">
                <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
                {t}
              </p>
              <p className="mt-1 pl-4 text-sm text-white/55">{d}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
