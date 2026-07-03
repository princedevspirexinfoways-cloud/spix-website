"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import MagneticButton from "../ui/MagneticButton";

const HeroScene = dynamic(() => import("../three/HeroScene"), { ssr: false });

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    if (window.__spirexReady) start();
    else window.addEventListener("spirex:ready", start, { once: true });
    return () => window.removeEventListener("spirex:ready", start);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const content = contentRef.current!;
    content.style.visibility = "visible";
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const h1 = content.querySelector("h1")!;
      const split = SplitText.create(h1, { type: "words,lines", linesClass: "line", mask: "lines" });
      // background-clip:text doesn't survive SplitText's wrappers — re-apply per word
      split.words.forEach((w) => {
        const el = w as HTMLElement;
        if (el.closest(".text-gradient")) el.classList.add("text-gradient");
        else if (el.closest(".text-gradient-blue")) el.classList.add("text-gradient-blue");
      });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(split.words, {
        yPercent: 130,
        rotateX: -60,
        filter: "blur(10px)",
        opacity: 0,
        duration: 1.3,
        stagger: 0.09,
      })
        .from(
          "[data-hero-sub]",
          { y: 40, opacity: 0, filter: "blur(6px)", duration: 1 },
          "-=0.7"
        )
        .from("[data-hero-cta] > *", { y: 30, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.6")
        .from("[data-hero-meta]", { opacity: 0, duration: 1 }, "-=0.4");

      // cinematic scroll-out: content recedes into depth as you leave the hero
      gsap.to(content, {
        yPercent: -18,
        opacity: 0,
        scale: 0.94,
        filter: "blur(8px)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 40%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section ref={sectionRef} id="top" className="relative flex min-h-svh items-center justify-center overflow-hidden">
      <HeroScene />

      {/* aurora + vignette over the 3D scene */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 top-0 h-[70vmax] w-[70vmax] rounded-full bg-blue/12 blur-[140px] animate-aurora" />
        <div className="absolute -right-1/4 bottom-0 h-[55vmax] w-[55vmax] rounded-full bg-blue-soft/8 blur-[120px] animate-aurora [animation-delay:-7s]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#030918_92%)]" />
      </div>

      <div
        ref={contentRef}
        style={{ visibility: "hidden" }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <p data-hero-meta className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.35em] text-blue-soft glass">
          <span className="size-1.5 animate-pulse rounded-full bg-blue-soft shadow-[0_0_8px_#4d8dff]" />
          Software · Design · Innovation
        </p>

        <h1 className="split-parent perspective-1200 font-display text-[clamp(2.6rem,8vw,6.5rem)] font-bold leading-[1.02] tracking-tight text-white">
          Transforming <span className="text-gradient">Ideas</span> Into{" "}
          <span className="text-gradient-blue">Digital Reality</span>
        </h1>

        <p data-hero-sub className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ice/65 md:text-xl">
          We craft premium digital experiences, scalable software, and innovative technology
          solutions for businesses worldwide.
        </p>

        <div data-hero-cta className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <MagneticButton href="#services">
            Explore Services
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7h10m0 0L8 3m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#work" variant="ghost">
            View Portfolio
          </MagneticButton>
        </div>

        <div data-hero-meta className="pointer-events-none mt-20 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.3em] text-ice/35">
          <span className="h-px w-10 bg-ice/20" />
          Scroll to explore
          <span className="h-px w-10 bg-ice/20" />
        </div>
      </div>
    </section>
  );
}
