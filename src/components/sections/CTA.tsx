"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import RevealText from "../ui/RevealText";
import MagneticButton from "../ui/MagneticButton";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // glow pulse intensifies as the section fills the viewport
      gsap.fromTo(
        "[data-cta-glow]",
        { scale: 0.7, opacity: 0.3 },
        {
          scale: 1.15,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 90%", end: "center center", scrub: 1 },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden py-32 md:py-48">
      {/* animated grid + glow */}
      <div aria-hidden className="absolute inset-0 cta-grid" />
      <div
        data-cta-glow
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(21,101,255,0.28),transparent_60%)]"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <RevealText
          as="h2"
          split="words"
          className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-normal leading-[1.05] tracking-tight text-white"
        >
          Let&apos;s Build Something <span className="text-gradient">Extraordinary</span> Together
        </RevealText>

        <RevealText as="p" split="lines" delay={0.2} className="mx-auto mt-8 max-w-xl text-base text-ice/60 md:text-lg">
          Tell us where you want to go. We&apos;ll bring the map, the engineers, and the momentum.
        </RevealText>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <MagneticButton href="mailto:hello@spirexinfoways.com" strength={0.45}>
            Start Your Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7h10m0 0L8 3m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton href="mailto:hello@spirexinfoways.com" variant="ghost" strength={0.45}>
            Book a Call
          </MagneticButton>
        </div>

        <p className="mt-10 text-xs uppercase tracking-[0.3em] text-ice/35">
          Average first response — under 4 hours
        </p>
      </div>
    </section>
  );
}
