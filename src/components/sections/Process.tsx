"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import SectionHeading from "../ui/SectionHeading";

const STEPS = [
  { n: "01", title: "Discovery", text: "We immerse ourselves in your business, users, and goals to define what success looks like." },
  { n: "02", title: "Planning", text: "Scope, architecture, and roadmap — a clear plan with milestones you can hold us to." },
  { n: "03", title: "Design", text: "Wireframes evolve into pixel-perfect interfaces and interactive prototypes." },
  { n: "04", title: "Development", text: "Senior engineers ship in agile sprints with demos at the end of every one." },
  { n: "05", title: "Testing", text: "Automated and manual QA across devices, load, and security before anything ships." },
  { n: "06", title: "Launch", text: "Zero-drama deployments with monitoring, rollbacks, and performance budgets." },
  { n: "07", title: "Support", text: "24×7 support, iterative improvements, and a partner invested in what happens next." },
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-step-line]", {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: { trigger: "[data-steps]", start: "top 70%", end: "bottom 70%", scrub: 0.5 },
      });

      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: step, start: "top 78%", once: true },
        });
        tl.from(step.querySelector("[data-step-dot]"), {
          scale: 0,
          duration: 0.5,
          ease: "back.out(3)",
        })
          .from(
            step.querySelector("[data-step-num]"),
            { opacity: 0, x: -30, filter: "blur(4px)", duration: 0.7, ease: "expo.out" },
            "-=0.25"
          )
          .from(
            step.querySelector("[data-step-body]"),
            { opacity: 0, y: 34, duration: 0.8, ease: "expo.out" },
            "-=0.5"
          );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="process" className="relative overflow-hidden bg-navy-deep/60 py-28 md:py-40">
      <div aria-hidden className="absolute right-[-10%] top-[-10%] h-[40vmax] w-[40vmax] rounded-full bg-blue/8 blur-[120px]" />

      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="How We Work"
          title="A process with no surprises"
          description="Seven deliberate steps take your idea from first conversation to long-term partnership."
        />

        <div data-steps className="relative mt-24">
          <span
            data-step-line
            aria-hidden
            className="absolute left-[27px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-blue via-blue-soft to-blue/20 shadow-[0_0_14px_rgba(21,101,255,0.55)]"
          />

          <ol className="space-y-16">
            {STEPS.map((s) => (
              <li data-step key={s.n} className="relative flex gap-8 pl-1 md:gap-12">
                <span
                  data-step-dot
                  aria-hidden
                  className="relative z-10 mt-1 flex size-[46px] shrink-0 items-center justify-center rounded-full glass-strong text-xs font-normal text-blue-soft shadow-[0_0_24px_rgba(21,101,255,0.35)]"
                >
                  {s.n}
                </span>
                <div className="flex flex-1 flex-col gap-6 md:flex-row md:items-baseline md:gap-12">
                  <span
                    data-step-num
                    className="font-display text-3xl font-normal tracking-tight text-white md:w-56 md:shrink-0 md:text-4xl"
                  >
                    {s.title}
                  </span>
                  <p data-step-body className="max-w-md text-sm leading-relaxed text-ice/60 md:text-base">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
