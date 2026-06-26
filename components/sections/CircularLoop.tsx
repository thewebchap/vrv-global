import { Icon } from "@/components/ui/Icon";

const nodes = [
  { label: "Source", angle: -90 },
  { label: "Use", angle: -18 },
  { label: "Recover", angle: 54 },
  { label: "Recycle", angle: 126 },
  { label: "Remanufacture", angle: 198 },
];

/** Circular economy loop diagram — a rotating ring with five stages. */
export function CircularLoop({ className }: { className?: string }) {
  const R = 132;
  const cx = 160;
  const cy = 160;
  return (
    <div className={className}>
      <div className="relative mx-auto aspect-square w-full max-w-[340px]">
        <svg viewBox="0 0 320 320" className="h-full w-full">
          <defs>
            <linearGradient id="loopGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#15724E" />
              <stop offset="100%" stopColor="#14587A" />
            </linearGradient>
          </defs>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="url(#loopGrad)" strokeWidth="2" strokeDasharray="4 6" className="animate-spin-slow [transform-origin:center]" />
          <circle cx={cx} cy={cy} r={R - 26} fill="none" stroke="#DCE7E1" strokeWidth="1.5" />
        </svg>

        {/* Centre badge */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-eco text-center text-white shadow-card">
            <Icon name="recycle" className="h-7 w-7 text-gold" />
            <span className="mt-1.5 px-2 text-[11px] font-semibold leading-tight">Circular Economy Loop</span>
          </div>
        </div>

        {/* Nodes */}
        {nodes.map((n) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = 50 + (R / 160) * 50 * Math.cos(rad);
          const y = 50 + (R / 160) * 50 * Math.sin(rad);
          return (
            <div
              key={n.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className="whitespace-nowrap rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-soft">
                {n.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
