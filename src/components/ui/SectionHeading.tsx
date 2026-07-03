import RevealText from "./RevealText";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({ eyebrow, title, description, align = "center", className }: Props) {
  return (
    <div className={cn("relative z-10", align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl", className)}>
      <RevealText
        as="p"
        split="chars"
        className="mb-4 text-xs font-normal uppercase tracking-[0.4em] text-blue-soft"
      >
        {eyebrow}
      </RevealText>
      <RevealText
        as="h2"
        split="words"
        className="font-display text-4xl font-normal leading-[1.08] tracking-tight text-white md:text-6xl"
      >
        {title}
      </RevealText>
      {description && (
        <RevealText as="p" split="lines" delay={0.15} className="mt-6 text-base leading-relaxed text-ice/60 md:text-lg">
          {description}
        </RevealText>
      )}
    </div>
  );
}
