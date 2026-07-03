"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";
import SectionHeading from "../ui/SectionHeading";

type Tech = { name: string; cat: string };

const CATEGORIES = ["All", "Frontend", "Backend", "Mobile", "Cloud", "DevOps", "Databases", "AI", "APIs"];

const RINGS: Tech[][] = [
  [
    { name: "React", cat: "Frontend" },
    { name: "Next.js", cat: "Frontend" },
    { name: "TypeScript", cat: "Frontend" },
    { name: "Flutter", cat: "Mobile" },
    { name: "Swift", cat: "Mobile" },
    { name: "Kotlin", cat: "Mobile" },
  ],
  [
    { name: "Node.js", cat: "Backend" },
    { name: "Python", cat: "Backend" },
    { name: ".NET", cat: "Backend" },
    { name: "Go", cat: "Backend" },
    { name: "GraphQL", cat: "APIs" },
    { name: "REST", cat: "APIs" },
    { name: "gRPC", cat: "APIs" },
    { name: "Laravel", cat: "Backend" },
  ],
  [
    { name: "AWS", cat: "Cloud" },
    { name: "Azure", cat: "Cloud" },
    { name: "GCP", cat: "Cloud" },
    { name: "Docker", cat: "DevOps" },
    { name: "Kubernetes", cat: "DevOps" },
    { name: "PostgreSQL", cat: "Databases" },
    { name: "MongoDB", cat: "Databases" },
    { name: "Redis", cat: "Databases" },
    { name: "OpenAI", cat: "AI" },
    { name: "TensorFlow", cat: "AI" },
  ],
];

const RING_STYLE = [
  { size: "min(52vw, 300px)", duration: 26, reverse: false },
  { size: "min(74vw, 460px)", duration: 38, reverse: true },
  { size: "min(96vw, 620px)", duration: 52, reverse: false },
];

export default function TechStack() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState("All");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-orbit-core]", {
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: "[data-orbits]", start: "top 75%", once: true },
      });
      gsap.from("[data-ring]", {
        scale: 0.4,
        opacity: 0,
        duration: 1.4,
        stagger: 0.18,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-orbits]", start: "top 75%", once: true },
      });
      // whole system tilts subtly with scroll for depth
      gsap.fromTo(
        "[data-orbits]",
        { rotateX: 18 },
        {
          rotateX: -6,
          ease: "none",
          scrollTrigger: { trigger: "[data-orbits]", start: "top bottom", end: "bottom top", scrub: 1 },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Technology"
          title="A stack that orbits your product"
          description="We choose tools for longevity and performance — not hype. Hover a category to see where we live."
        />

        {/* category filters */}
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              data-cursor="link"
              onMouseEnter={() => setActive(c)}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300",
                active === c
                  ? "bg-blue text-white glow-blue"
                  : "glass text-ice/60 hover:text-white hover:border-blue-soft/30"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* orbit system */}
        <div className="perspective-1200 mt-8 flex justify-center">
          <div
            data-orbits
            className="preserve-3d relative flex aspect-square w-full max-w-[640px] items-center justify-center"
          >
            {/* glowing core */}
            <div data-orbit-core className="absolute z-10 flex flex-col items-center justify-center">
              <div className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-blue to-navy shadow-[0_0_60px_rgba(21,101,255,0.55),inset_0_0_30px_rgba(255,255,255,0.15)] md:size-28">
                <span className="font-display text-sm font-bold tracking-widest text-white">SPIREX</span>
              </div>
            </div>

            {RINGS.map((techs, r) => {
              const { size, duration, reverse } = RING_STYLE[r];
              return (
                <div
                  key={r}
                  data-ring
                  className="absolute rounded-full border border-blue-soft/15"
                  style={{
                    width: size,
                    height: size,
                    animation: `${reverse ? "orbit-reverse" : "orbit"} ${duration}s linear infinite`,
                  }}
                >
                  {techs.map((t, i) => {
                    const angle = (i / techs.length) * 360;
                    const dim = active !== "All" && t.cat !== active;
                    return (
                      <span
                        key={t.name}
                        className="absolute left-1/2 top-1/2"
                        style={{
                          transform: `rotate(${angle}deg) translateX(calc(${size} / 2)) rotate(-${angle}deg)`,
                        }}
                      >
                        <span className="block -translate-x-1/2 -translate-y-1/2">
                          <span
                            className={cn(
                              "block whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all duration-500 md:text-xs",
                              dim
                                ? "glass scale-90 text-ice/25 blur-[1px]"
                                : "glass-strong text-white shadow-[0_0_20px_rgba(21,101,255,0.3)]"
                            )}
                            style={{
                              animation: `${reverse ? "orbit" : "orbit-reverse"} ${duration}s linear infinite`,
                            }}
                          >
                            {t.name}
                          </span>
                        </span>
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
