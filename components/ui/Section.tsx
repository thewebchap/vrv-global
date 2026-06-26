import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Tone = "white" | "paper" | "ink";

const tones: Record<Tone, string> = {
  white: "bg-white text-ink",
  paper: "bg-paper text-ink",
  ink: "bg-ink-900 text-white", // flat charcoal — used sparingly
};

export function Section({
  tone = "white",
  className,
  containerClassName,
  id,
  bordered = false,
  children,
}: {
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  id?: string;
  bordered?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-24 lg:py-28",
        tones[tone],
        bordered && "border-t border-line",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "ink",
  className,
}: {
  children: React.ReactNode;
  tone?: "ink" | "white";
  className?: string;
}) {
  return (
    <span className={cn("eyebrow", tone === "white" && "text-gold", className)}>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "ink",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "ink" | "white";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl", className)}>
      {eyebrow && (
        <Eyebrow tone={tone === "white" ? "white" : "ink"} className={align === "center" ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className={cn("mt-5 text-h2 text-balance", tone === "white" && "text-white")}>{title}</h2>
      {intro && (
        <p className={cn("mt-5 text-[17px] leading-relaxed text-pretty", tone === "white" ? "text-white/65" : "text-ink/65")}>
          {intro}
        </p>
      )}
    </div>
  );
}
