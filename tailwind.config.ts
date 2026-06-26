import type { Config } from "tailwindcss";

/**
 * VRV Global — Design System (Sustainability-led, white base)
 * ------------------------------------------------------------------
 * Premium, investor-ready system for a sustainable supply-chain integrator.
 * White / off-white background, deep forest GREEN as the primary brand,
 * deep OCEAN blue as the trust secondary, warm AMBER/GOLD + ORANGE accents.
 * Elegant serif headings, refined sans body, soft shadows, thin dividers.
 *
 * Tokens are semantic: components reference `brand`, `ocean`, `gold`,
 * `amber`, `flame`, `ink`, `paper`, `line` — so the whole site re-themes
 * by editing the hex values here.
 *
 *   brand  → primary action / links / eyebrows   (forest green = sustainability)
 *   ocean  → trust, data, traceability, finance   (deep blue)
 *   gold   → flourishes, rules, ticks, nodes       (amber accent)
 *   flame  → primary CTA buttons                    (warm orange)
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — forest / evergreen. Sustainability + growth.
        brand: {
          DEFAULT: "#15724E",
          50: "#EAF5EF",
          100: "#D2EADE",
          400: "#3D9E78",
          500: "#1F8459",
          600: "#0F5C3E",
          700: "#0B472F",
          800: "#083322",
        },
        // Secondary — deep ocean blue. Trust, data, capital markets.
        ocean: {
          DEFAULT: "#14587A",
          50: "#E9F2F7",
          100: "#D0E4EE",
          400: "#2E84AC",
          600: "#104A66",
          700: "#0C384E",
          800: "#082838",
        },
        flame: { DEFAULT: "#F2742B", 600: "#DB5E16" }, // Orange — primary CTA
        gold: {
          DEFAULT: "#F0A92B", // Amber / gold accent
          400: "#F7C25C",
          600: "#D18C12",
          700: "#A86E0C",
        },
        // Alias so existing `amber` utility references keep working
        amber: { DEFAULT: "#F0A92B", 400: "#F7C25C", 600: "#D18C12" },
        ink: { DEFAULT: "#22302B", 700: "#2C3A34", 800: "#16201C", 900: "#0E1714" },
        paper: "#F7FAF8",
        sand: { DEFAULT: "#EEF4F0", 100: "#F7FAF8", 200: "#EEF4F0", 300: "#E0EAE4" },
        line: "#DCE7E1",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display": ["clamp(2.5rem, 5vw, 4.25rem)", { lineHeight: "1.04", letterSpacing: "-0.02em" }],
        "h1": ["clamp(2.1rem, 3.6vw, 3.1rem)", { lineHeight: "1.08", letterSpacing: "-0.018em" }],
        "h2": ["clamp(1.6rem, 2.6vw, 2.35rem)", { lineHeight: "1.14", letterSpacing: "-0.012em" }],
      },
      maxWidth: { container: "1240px", prose: "66ch" },
      borderRadius: { lg: "0.625rem", xl: "0.875rem", "2xl": "1.125rem" },
      boxShadow: {
        soft: "0 1px 2px rgba(14,23,20,0.04), 0 8px 24px -16px rgba(14,23,20,0.18)",
        card: "0 2px 6px -2px rgba(14,23,20,0.08), 0 18px 40px -24px rgba(14,23,20,0.30)",
        hover: "0 8px 18px -8px rgba(14,23,20,0.16), 0 30px 60px -28px rgba(21,114,78,0.28)",
      },
      letterSpacing: { label: "0.2em" },
      transitionTimingFunction: { "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)" },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "draw": { to: { strokeDashoffset: "0" } },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        // Slow highlight sweeping along the growth-flow connector (journey).
        "growth-flow": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "20%": { opacity: "0.8" },
          "80%": { opacity: "0.8" },
          "100%": { transform: "translateX(300%)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "spin-slow": "spin-slow 28s linear infinite",
        "growth-flow": "growth-flow 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
