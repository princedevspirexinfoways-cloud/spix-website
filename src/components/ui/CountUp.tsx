"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

type Props = {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
};

export default function CountUp({ value, suffix = "", className, duration = 2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current!;
    if (prefersReducedMotion()) {
      el.textContent = `${value}${suffix}`;
      return;
    }
    const counter = { v: 0 };
    gsap.to(counter, {
      v: value,
      duration,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onUpdate: () => {
        el.textContent = `${Math.round(counter.v)}${suffix}`;
      },
    });
  });

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
