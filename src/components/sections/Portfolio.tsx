"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import SectionHeading from "../ui/SectionHeading";

type Project = {
  title: string;
  category: string;
  tags: string[];
  hue: string;
  glyph: string;
};

const FILTERS = ["All", "Web", "Mobile", "ERP", "E-commerce"];

const PROJECTS: Project[] = [
  { title: "Fintech Dashboard", category: "Web", tags: ["Next.js", "Analytics"], hue: "from-blue/40 via-navy to-ink", glyph: "◧" },
  { title: "Logistics ERP Suite", category: "ERP", tags: [".NET", "PostgreSQL"], hue: "from-blue-soft/30 via-navy-deep to-ink", glyph: "◨" },
  { title: "Health & Fitness App", category: "Mobile", tags: ["Flutter", "AI"], hue: "from-blue/35 via-navy to-navy-deep", glyph: "◍" },
  { title: "Luxury Fashion Store", category: "E-commerce", tags: ["Headless", "Stripe"], hue: "from-blue-glow/30 via-navy to-ink", glyph: "◫" },
  { title: "EdTech LMS Platform", category: "Web", tags: ["React", "Video"], hue: "from-blue/30 via-navy-deep to-ink", glyph: "◭" },
  { title: "Fleet CRM System", category: "ERP", tags: ["Node.js", "Maps"], hue: "from-blue-soft/25 via-navy to-ink", glyph: "◮" },
];

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("All");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // pinned horizontal scroll on desktop, natural swipe-scroll elsewhere
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current!;
        const getDistance = () => track.scrollWidth - track.parentElement!.clientWidth + 96;

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // subtle parallax inside each card while the track moves
        gsap.utils.toArray<HTMLElement>("[data-project-glyph]").forEach((g) => {
          gsap.fromTo(
            g,
            { xPercent: -14 },
            {
              xPercent: 14,
              ease: "none",
              scrollTrigger: { trigger: ref.current, start: "top top", end: () => `+=${getDistance()}`, scrub: 1 },
            }
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="work" className="relative overflow-hidden bg-navy-deep/40 py-28 lg:h-svh lg:py-0">
      <div className="flex h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-6xl px-6 lg:pt-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Selected Work"
              title="Projects that ship and scale"
              description="A rotating selection of what we've been building. Full case studies coming soon."
            />
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  data-cursor="link"
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300",
                    filter === f ? "bg-blue text-white glow-blue" : "glass text-ice/60 hover:text-white"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 overflow-hidden lg:overflow-visible" data-cursor="drag">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 will-change-transform [scrollbar-width:none] lg:snap-none lg:overflow-visible lg:px-[max(1.5rem,calc((100vw-72rem)/2))]"
          >
            {PROJECTS.map((p) => {
              const dim = filter !== "All" && p.category !== filter;
              return (
                <article
                  key={p.title}
                  data-cursor="view"
                  className={cn(
                    "group relative h-[420px] w-[85vw] max-w-[420px] shrink-0 snap-center overflow-hidden rounded-3xl transition-all duration-700 md:h-[480px]",
                    dim && "scale-[0.94] opacity-30 saturate-0"
                  )}
                >
                  {/* placeholder "preview" — gradient scene with floating glyph */}
                  <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105", p.hue)} />
                  <span
                    data-project-glyph
                    aria-hidden
                    className="absolute right-6 top-10 font-display text-[9rem] leading-none text-white/8 transition-all duration-700 group-hover:text-white/15"
                  >
                    {p.glyph}
                  </span>
                  <div aria-hidden className="absolute inset-0 border border-white/10 rounded-3xl" />
                  <div aria-hidden className="absolute -bottom-24 left-1/2 h-48 w-[120%] -translate-x-1/2 rounded-full bg-blue/25 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  {/* hover reveal info */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-7 opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="glass rounded-2xl p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-soft">{p.category}</p>
                      <h3 className="mt-1.5 font-display text-xl font-semibold text-white">{p.title}</h3>
                      <div className="mt-3 flex max-h-0 gap-2 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-10 group-hover:opacity-100">
                        {p.tags.map((t) => (
                          <span key={t} className="rounded-full bg-white/8 px-3 py-1 text-[10px] font-medium text-ice/70">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span className="absolute left-6 top-6 rounded-full glass px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-ice/60">
                    Coming soon
                  </span>
                </article>
              );
            })}

            {/* trailing CTA card */}
            <a
              href="#contact"
              data-cursor="link"
              className="glass-strong group relative flex h-[420px] w-[85vw] max-w-[420px] shrink-0 snap-center flex-col items-center justify-center gap-4 rounded-3xl md:h-[480px]"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-blue text-2xl text-white glow-blue transition-transform duration-500 group-hover:rotate-45">
                ↗
              </span>
              <p className="font-display text-xl font-semibold text-white">Your project here</p>
              <p className="text-sm text-ice/50">Let&apos;s make it the next case study</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
