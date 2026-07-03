"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import SectionHeading from "../ui/SectionHeading";
import RevealText from "../ui/RevealText";
import CountUp from "../ui/CountUp";
import TiltCard from "../ui/TiltCard";

const STATS = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 60, suffix: "+", label: "Happy Clients" },
  { value: 12, suffix: "+", label: "Countries Served" },
  { value: 98, suffix: "%", label: "Client Retention" },
];

const PILLARS = [
  {
    title: "Our Vision",
    body: "To become the most trusted engineering partner for ambitious companies — building software that outlives trends and outperforms expectations.",
    icon: "◈",
  },
  {
    title: "Our Mission",
    body: "Deliver world-class digital products by pairing deep engineering craft with obsessive attention to design, performance, and detail.",
    icon: "◎",
  },
  {
    title: "Why Spirex",
    body: "Senior engineers on every project, transparent agile delivery, and architecture built to scale from your first user to your millionth.",
    icon: "✦",
  },
];

const TIMELINE = [
  { year: "2018", text: "Spirex Infoways founded with a two-person team and one big idea." },
  { year: "2020", text: "Expanded into ERP & CRM platforms serving enterprise clients." },
  { year: "2022", text: "Crossed 100 shipped projects across 10+ countries." },
  { year: "2024", text: "Launched AI-driven automation practice and cloud-native studio." },
  { year: "2026", text: "Building the next generation of intelligent digital products." },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // pillar cards rise out of depth
      gsap.from("[data-pillar]", {
        y: 90,
        opacity: 0,
        rotateX: -18,
        transformOrigin: "center bottom",
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-pillars]", start: "top 82%", once: true },
      });

      // stats panel
      gsap.from("[data-stat]", {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.6)",
        scrollTrigger: { trigger: "[data-stats]", start: "top 85%", once: true },
      });

      // timeline: line draws, entries slide in alternating
      gsap.from("[data-tl-line]", {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: { trigger: "[data-timeline]", start: "top 75%", end: "bottom 65%", scrub: 1 },
      });
      gsap.utils.toArray<HTMLElement>("[data-tl-item]").forEach((item, i) => {
        gsap.from(item, {
          x: i % 2 ? 70 : -70,
          opacity: 0,
          filter: "blur(6px)",
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });

      // background hue evolves through the story
      gsap.to(ref.current, {
        backgroundColor: "#071230",
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top 60%", end: "bottom bottom", scrub: true },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="about" className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div aria-hidden className="absolute right-[-20%] top-[10%] h-[50vmax] w-[50vmax] rounded-full bg-blue/8 blur-[130px]" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Who We Are"
          title="A studio engineered for the extraordinary"
          description="Spirex Infoways is a full-cycle software company blending strategy, design, and engineering to ship products that feel inevitable."
        />

        {/* pillars */}
        <div data-pillars className="perspective-1200 mt-20 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <TiltCard key={p.title} className="h-full rounded-3xl">
              <article data-pillar className="glass h-full rounded-3xl p-8 transition-colors duration-500 hover:border-blue-soft/30">
                <span className="mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-blue/15 text-xl text-blue-soft shadow-[inset_0_0_20px_rgba(21,101,255,0.25)]">
                  {p.icon}
                </span>
                <h3 className="font-display text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ice/60">{p.body}</p>
              </article>
            </TiltCard>
          ))}
        </div>

        {/* stats */}
        <div data-stats className="glass-strong mt-24 grid grid-cols-2 gap-y-10 rounded-3xl px-8 py-12 md:grid-cols-4">
          {STATS.map((s) => (
            <div data-stat key={s.label} className="text-center">
              <CountUp
                value={s.value}
                suffix={s.suffix}
                className="font-display text-4xl font-bold text-gradient md:text-6xl"
              />
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-ice/50">{s.label}</p>
            </div>
          ))}
        </div>

        {/* timeline */}
        <div data-timeline className="relative mx-auto mt-28 max-w-3xl">
          <RevealText
            as="h3"
            split="words"
            className="mb-16 text-center font-display text-3xl font-bold text-white md:text-4xl"
          >
            The journey so far
          </RevealText>

          <div className="relative">
            <span
              data-tl-line
              aria-hidden
              className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-blue via-blue-soft to-transparent shadow-[0_0_12px_rgba(21,101,255,0.6)] md:left-1/2"
            />
            <ol className="space-y-14">
              {TIMELINE.map((t, i) => (
                <li
                  key={t.year}
                  data-tl-item
                  className={`relative flex w-full pl-12 md:w-1/2 md:pl-0 ${
                    i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute top-1 size-3 rounded-full bg-blue shadow-[0_0_14px_rgba(21,101,255,0.9)] left-2.5 ${
                      i % 2 ? "md:left-[-7px]" : "md:left-auto md:right-[-7px]"
                    }`}
                  />
                  <div>
                    <span className="font-display text-sm font-bold tracking-widest text-blue-soft">{t.year}</span>
                    <p className="mt-1 text-sm leading-relaxed text-ice/65">{t.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
