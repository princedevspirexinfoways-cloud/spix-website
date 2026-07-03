"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import SectionHeading from "../ui/SectionHeading";
import CountUp from "../ui/CountUp";
import TiltCard from "../ui/TiltCard";

const FEATURES = [
  {
    title: "Expert Developers",
    text: "Senior engineers only — every line of code reviewed, every decision defensible.",
    stat: { value: 40, suffix: "+" },
    statLabel: "Engineers",
  },
  {
    title: "Agile Process",
    text: "Two-week sprints, live demos, and a roadmap you can actually read.",
    stat: { value: 14, suffix: "d" },
    statLabel: "Sprint cadence",
  },
  {
    title: "Modern Technologies",
    text: "We build on the stack the next decade runs on — not the last one.",
    stat: { value: 30, suffix: "+" },
    statLabel: "Core technologies",
  },
  {
    title: "24×7 Support",
    text: "Real humans on call around the clock, with SLAs we honor in writing.",
    stat: { value: 24, suffix: "/7" },
    statLabel: "Availability",
  },
  {
    title: "Scalable Architecture",
    text: "Cloud-native systems designed for your millionth user on day one.",
    stat: { value: 99, suffix: ".9%" },
    statLabel: "Uptime target",
  },
  {
    title: "Affordable Solutions",
    text: "Transparent pricing that scales with you — no surprise invoices, ever.",
    stat: { value: 0, suffix: "" },
    statLabel: "Hidden costs",
  },
];

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-why-card]", {
        y: 70,
        opacity: 0,
        rotateX: -14,
        transformOrigin: "center bottom",
        duration: 1.1,
        stagger: { each: 0.1, grid: [2, 3], from: "start" },
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-why-grid]", start: "top 82%", once: true },
      });
      // floating badges drift at different speeds for depth
      gsap.utils.toArray<HTMLElement>("[data-badge]").forEach((b, i) => {
        gsap.to(b, {
          y: (i % 2 ? -1 : 1) * (30 + i * 10),
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-40">
      {/* floating badges */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {["ISO Ready", "Agile Certified", "Cloud Native", "AI First"].map((b, i) => (
          <span
            key={b}
            data-badge
            className="glass absolute rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-soft/70"
            style={{ left: `${8 + i * 24}%`, top: i % 2 ? "12%" : "78%" }}
          >
            {b}
          </span>
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="The difference is in the details"
          description="Plenty of agencies write code. We engineer outcomes — and hold ourselves to numbers, not adjectives."
        />

        <div data-why-grid className="perspective-1200 mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <TiltCard key={f.title} className="h-full rounded-3xl" maxTilt={7}>
              <article
                data-why-card
                className="glass group flex h-full flex-col justify-between rounded-3xl p-8 transition-colors duration-500 hover:border-blue-soft/30"
              >
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ice/55">{f.text}</p>
                </div>
                <div className="mt-8 flex items-end justify-between border-t border-white/8 pt-5">
                  <CountUp
                    value={f.stat.value}
                    suffix={f.stat.suffix}
                    className="font-display text-3xl font-bold text-gradient-blue"
                  />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-ice/40">{f.statLabel}</span>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
