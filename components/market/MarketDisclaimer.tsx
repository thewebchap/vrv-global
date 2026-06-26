import { MARKET_DISCLAIMER } from "@/lib/integrations/market/disclaimer";
import { Icon } from "@/components/ui/Icon";

/** Market-data disclaimer block — render near any commodity price display. */
export function MarketDisclaimer({ lastUpdated, provider }: { lastUpdated?: string; provider?: string }) {
  return (
    <div className="rounded-xl border border-line bg-paper p-5 text-xs leading-relaxed text-ink/60">
      <p className="flex items-start gap-2">
        <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-ink/40" />
        <span>
          <span className="font-semibold text-ink/75">Market data disclaimer. </span>
          {MARKET_DISCLAIMER}
        </span>
      </p>
      {(lastUpdated || provider) && (
        <p className="mt-2 pl-6 text-ink/45">
          {provider && <>Source: {provider}. </>}
          {lastUpdated && <>Last updated: {lastUpdated}. </>}
          Labels indicate whether data is live, delayed, indicative or manually updated.
        </p>
      )}
    </div>
  );
}
