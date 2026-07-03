"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

declare global {
  interface Window {
    __spirexReady?: boolean;
  }
}

const WORDS = ["INNOVATE", "DESIGN", "ENGINEER", "SPIREX"];

export default function Loader() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finish = () => {
      window.__spirexReady = true;
      window.dispatchEvent(new Event("spirex:ready"));
      setGone(true);
    };

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    const root = rootRef.current!;
    const progress = { value: 0 };

    // Morphing keywords while "loading"
    const wordTl = gsap.timeline({ repeat: -1 });
    WORDS.forEach((w) => {
      wordTl
        .call(() => {
          if (wordRef.current) wordRef.current.textContent = w;
        })
        .fromTo(
          wordRef.current,
          { yPercent: 110, filter: "blur(8px)", opacity: 0 },
          { yPercent: 0, filter: "blur(0px)", opacity: 1, duration: 0.4, ease: "power3.out" }
        )
        .to(wordRef.current, {
          yPercent: -110,
          filter: "blur(8px)",
          opacity: 0,
          duration: 0.35,
          ease: "power3.in",
          delay: 0.25,
        });
    });

    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        finish();
      },
    });

    tl.fromTo(
      logoRef.current!.children,
      { yPercent: 120, opacity: 0, rotateX: -80 },
      { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.055, ease: "expo.out" }
    )
      .to(
        progress,
        {
          value: 100,
          duration: 2.1,
          ease: "power2.inOut",
          onUpdate: () => {
            const v = Math.round(progress.value);
            if (counterRef.current) counterRef.current.textContent = String(v).padStart(3, "0");
            if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
          },
        },
        "<0.2"
      )
      .call(() => wordTl.kill())
      .to(root.querySelectorAll("[data-loader-fade]"), {
        opacity: 0,
        y: -24,
        duration: 0.45,
        stagger: 0.06,
        ease: "power2.in",
      })
      .to(root, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut",
        borderBottomLeftRadius: "50% 12%",
        borderBottomRightRadius: "50% 12%",
      });

    return () => {
      document.documentElement.style.overflow = "";
      tl.kill();
      wordTl.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      aria-label="Loading Spirex Infoways"
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center overflow-hidden bg-ink"
    >
      {/* glowing particles */}
      <div aria-hidden className="absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute size-1 rounded-full bg-blue-soft/80 blur-[1px] animate-float-slow"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 31) % 100}%`,
              animationDelay: `${i * 0.35}s`,
              animationDuration: `${5 + (i % 4)}s`,
              boxShadow: "0 0 12px rgba(21,101,255,0.9)",
            }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 h-[40vmax] w-[40vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue/15 blur-[120px]" />
      </div>

      <div data-loader-fade ref={logoRef} className="perspective-1200 flex overflow-hidden font-display text-5xl font-normal tracking-tight text-white md:text-7xl">
        {"SPIREX".split("").map((c, i) => (
          <span key={i} className={`inline-block ${i >= 3 ? "text-gradient-blue" : ""}`}>
            {c}
          </span>
        ))}
      </div>

      <div data-loader-fade className="mt-4 h-6 overflow-hidden text-xs font-normal uppercase tracking-[0.5em] text-blue-soft/70">
        <span ref={wordRef} className="inline-block">
          INNOVATE
        </span>
      </div>

      <div data-loader-fade className="mt-10 w-56">
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-blue to-blue-soft shadow-[0_0_16px_rgba(21,101,255,0.8)]" />
        </div>
      </div>

      <span
        data-loader-fade
        ref={counterRef}
        className="absolute bottom-8 right-8 font-display text-6xl font-normal tabular-nums text-white/15 md:text-8xl"
      >
        000
      </span>
    </div>
  );
}
