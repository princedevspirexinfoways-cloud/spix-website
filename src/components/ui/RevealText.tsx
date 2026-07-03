"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** "chars" | "words" | "lines" */
  split?: "chars" | "words" | "lines";
  delay?: number;
  /** start animation on scroll into view (default) or immediately on mount */
  trigger?: "scroll" | "mount";
  stagger?: number;
  blur?: boolean;
};

export default function RevealText({
  children,
  as: Tag = "div",
  className,
  split = "words",
  delay = 0,
  trigger = "scroll",
  stagger,
  blur = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const Comp = Tag as "div";

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const el = ref.current;
      if (!el) return;

      const splitter = SplitText.create(el, {
        type: split === "lines" ? "lines" : `${split},lines`,
        linesClass: "line",
        mask: "lines",
        autoSplit: true,
      });

      const targets =
        split === "chars" ? splitter.chars : split === "words" ? splitter.words : splitter.lines;

      // background-clip:text doesn't survive SplitText's wrappers — re-apply per target
      targets.forEach((t) => {
        const node = t as HTMLElement;
        if (node.closest(".text-gradient")) node.classList.add("text-gradient");
        else if (node.closest(".text-gradient-blue")) node.classList.add("text-gradient-blue");
      });

      gsap.from(targets, {
        yPercent: 120,
        opacity: 0,
        rotateX: split === "chars" ? -50 : 0,
        filter: blur ? "blur(6px)" : "none",
        duration: split === "chars" ? 0.7 : 1,
        ease: "expo.out",
        stagger: stagger ?? (split === "chars" ? 0.02 : split === "words" ? 0.06 : 0.12),
        delay,
        scrollTrigger:
          trigger === "scroll"
            ? { trigger: el, start: "top 88%", once: true }
            : undefined,
      });
    },
    { scope: ref }
  );

  return (
    <Comp ref={ref as React.Ref<HTMLDivElement>} className={cn("split-parent", className)}>
      {children}
    </Comp>
  );
}
