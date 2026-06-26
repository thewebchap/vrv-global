import { cn } from "@/lib/cn";

/**
 * Premium line-icon set — single-colour stroke icons (currentColor) used
 * across cards, pillars and flows. Keeps the bundle dependency-free.
 */
export type IconName =
  | "leaf"
  | "recycle"
  | "route"
  | "shield"
  | "globe"
  | "chart"
  | "link"
  | "scale"
  | "handshake"
  | "spark"
  | "doc"
  | "truck"
  | "factory"
  | "search"
  | "check"
  | "tree"
  | "cube"
  | "users"
  | "lock"
  | "qr"
  | "arrowRight";

const paths: Record<IconName, React.ReactNode> = {
  leaf: <path d="M5 21c0-7 4-13 14-15 0 9-4 15-14 15Zm0 0c2-5 5-8 9-10" />,
  recycle: (
    <>
      <path d="m7 19-3-5 4-2" />
      <path d="M10.5 5.5 12 3l2.5 4" />
      <path d="m20 14-2 5h-5" />
      <path d="M8 14 4.5 14M16 9l2.5 4M9 19h3" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="18" r="2.4" />
      <path d="M8.4 6H14a4 4 0 0 1 0 8H9a4 4 0 0 0 0 0" />
      <path d="M8.4 6H14a4 4 0 0 1 0 8h-4.2" />
    </>
  ),
  shield: <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  link: <path d="M9 15l6-6M8 9H6a3 3 0 0 0 0 6h2m8-6h2a3 3 0 0 1 0 6h-2" />,
  scale: <path d="M12 3v18M5 21h14M7 3h10M5 7l-2 6h6L7 7Zm12 0-2 6h6l-2-6" />,
  handshake: <path d="m11 17 2 2 4-4 3 3M3 11l4-4 4 4 2-2M3 11l5 5a2 2 0 0 0 3 0" />,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />,
  doc: <path d="M7 3h7l4 4v14H7V3Zm7 0v4h4M9 12h6M9 16h6" />,
  truck: (
    <>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </>
  ),
  factory: <path d="M3 21V9l6 4V9l6 4V5l6 0v16H3Zm4-4h2m4 0h2" />,
  search: <path d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm6 3-4.5-4.5" />,
  check: <path d="m5 13 4 4L19 7" />,
  tree: <path d="M12 21v-5m0 0 4-3h-2.5L16 9h-2l2-4H8l2 4H8l2.5 4H8l4 3Z" />,
  cube: <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 0v18M4 7.5l8 4.5 8-4.5" />,
  users: <path d="M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6.5 9v-1a4 4 0 0 0-3-3.9M15 4.1a3 3 0 0 1 0 5.8" />,
  lock: <path d="M6 11h12v9H6v-9Zm2 0V8a4 4 0 0 1 8 0v3" />,
  qr: <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h2v2h-2v-2Zm4 0h2v2h-2v-2Zm-4 4h6v2h-6v-2Z" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("h-6 w-6", className)}
    >
      {paths[name]}
    </svg>
  );
}

/** Rounded icon badge — green-tinted by default, ocean optional. */
export function IconBadge({
  name,
  tone = "brand",
  className,
}: {
  name: IconName;
  tone?: "brand" | "ocean" | "gold";
  className?: string;
}) {
  const tones = {
    brand: "bg-brand-50 text-brand",
    ocean: "bg-ocean-50 text-ocean",
    gold: "bg-gold/15 text-gold-700",
  } as const;
  return (
    <span className={cn("inline-flex h-12 w-12 items-center justify-center rounded-xl", tones[tone], className)}>
      <Icon name={name} />
    </span>
  );
}
