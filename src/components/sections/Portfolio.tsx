"use client";

import { useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import SectionHeading from "../ui/SectionHeading";

type Project = {
  title: string;
  category: string;
  tagline: string;
  tags: string[];
  accent: string;
  backdrop: string;
  preview: ReactNode;
};

const FILTERS = ["All", "Fintech", "Marketing SaaS", "Legal Tech"];

/* ------------------------------------------------------------------ */
/*  Faithful mini-UI previews — reconstructed from each app's real     */
/*  palette, brand marks and in-product labels.                        */
/* ------------------------------------------------------------------ */

// Bizz Engager — WhatsApp campaign engine + Fabric.js frame studio (purple #8147FB)
function BizzPreview() {
  return (
    <div className="flex h-full flex-col bg-[#F7F7F7] text-[#2A2A2A]">
      <div className="flex items-center justify-between bg-white px-3 py-2 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="grid size-4 place-items-center rounded-md bg-[#8147FB] text-[8px] font-bold text-white">B</span>
          <span className="text-[10px] font-semibold">Bizz<span className="text-[#8147FB]">Engager</span></span>
        </div>
        <span className="rounded-full bg-[#EAFDEE] px-2 py-0.5 text-[7px] font-semibold text-[#147129]">● WhatsApp</span>
      </div>
      <div className="flex flex-1 gap-2 p-2.5">
        <div className="flex w-6 flex-col items-center gap-2 rounded-lg bg-white py-2">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={cn("size-2.5 rounded", i === 0 ? "bg-[#8147FB]" : "bg-[#9587E8]/30")} />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-white p-2">
              <p className="text-[7px] text-[#57595B]">Total Reach</p>
              <p className="text-[12px] font-bold leading-tight">48.2k</p>
            </div>
            <div className="rounded-lg bg-white p-2">
              <p className="text-[7px] text-[#57595B]">Delivered</p>
              <p className="text-[12px] font-bold leading-tight text-[#147129]">96%</p>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-5 gap-2">
            <div className="col-span-3 flex items-end gap-1 rounded-lg bg-white p-2">
              {[40, 72, 52, 90, 60, 82].map((h, i) => (
                <span key={i} className="flex-1 rounded-sm bg-gradient-to-t from-[#9587E8] to-[#8147FB]" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="col-span-2 flex flex-col overflow-hidden rounded-lg bg-gradient-to-br from-[#8147FB] to-[#9587E8] p-2">
              <p className="text-[7px] font-medium text-white/80">Frame Studio</p>
              <div className="mt-1 space-y-1">
                <span className="block h-1 w-3/4 rounded bg-white/50" />
                <span className="block h-1 w-1/2 rounded bg-white/40" />
              </div>
              <div className="mt-auto h-5 rounded bg-white/15 ring-1 ring-white/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Kesari Pay — retailer/distributor fintech suite (orange #FE8B3B, slate #3A4750)
function KesariPreview() {
  return (
    <div className="flex h-full flex-col bg-[#F4F5F7] text-[#3A4750]">
      <div className="flex items-center justify-between bg-[#3A4750] px-3 py-2">
        <span className="text-[10px] font-bold text-white">Kesari<span className="text-[#FE8B3B]">Pay</span></span>
        <span className="text-[7px] text-white/60">Retailer</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-2.5">
        <div className="rounded-xl bg-gradient-to-br from-[#FE8B3B] to-[#f76b1c] p-2.5 text-white shadow-sm">
          <p className="text-[7px] opacity-80">Wallet Balance</p>
          <p className="text-[15px] font-bold leading-tight">₹1,24,580</p>
          <p className="mt-0.5 text-[6px] opacity-90">Commission earned · ₹8,240</p>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {["Payout", "Recharge", "BBPS", "Bill Pay"].map((s) => (
            <div key={s} className="flex flex-col items-center gap-1 rounded-lg bg-white p-1.5">
              <span className="size-4 rounded-md bg-[#FE8B3B]/15 ring-1 ring-[#FE8B3B]/40" />
              <span className="text-[6px] font-medium">{s}</span>
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-1.5 rounded-lg bg-white p-2">
          {[
            ["AEPS Withdrawal", "+ ₹2,500", "#147129"],
            ["Payout Transfer", "− ₹5,000", "#3A4750"],
          ].map(([t, a, c]) => (
            <div key={t} className="flex items-center justify-between">
              <span className="text-[7px]">{t}</span>
              <span className="text-[7px] font-semibold" style={{ color: c }}>{a}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1.5 text-[6px] font-semibold uppercase tracking-wider text-[#3A4750]/50">
          <span>RBI</span>
          <span>·</span>
          <span>NPCI</span>
          <span>·</span>
          <span>BharatConnect</span>
        </div>
      </div>
    </div>
  );
}

// NDAtechnology — NDA e-signature + QR verification portal (blue #0066cc)
const QR = [
  1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1,
];
function NDAPreview() {
  return (
    <div className="flex h-full flex-col bg-[#f8fafc] text-[#0f172a]">
      <div className="flex items-center justify-between bg-white px-3 py-2 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="grid size-4 place-items-center rounded bg-[#0066cc] text-[8px] font-bold text-white">N</span>
          <span className="text-[10px] font-semibold">NDA<span className="text-[#0066cc]">technology</span></span>
        </div>
        <span className="rounded-full bg-[#dcfce7] px-2 py-0.5 text-[7px] font-semibold text-[#16a34a]">Signed</span>
      </div>
      <div className="flex flex-1 gap-2 p-2.5">
        <div className="flex flex-[1.4] flex-col rounded-lg bg-white p-2.5 shadow-sm ring-1 ring-black/5">
          <p className="text-[8px] font-bold leading-tight">Non-Disclosure Agreement</p>
          <div className="mt-1.5 space-y-1">
            {[100, 88, 94, 68, 82].map((w, i) => (
              <span key={i} className="block h-0.5 rounded bg-slate-200" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="mt-auto">
            <p className="text-[6px] text-slate-400">Signature</p>
            <svg viewBox="0 0 80 20" className="h-5 w-20">
              <path d="M2 14 C 10 2, 16 20, 24 10 S 38 2, 46 12 S 62 18, 78 5" fill="none" stroke="#0066cc" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="block h-px w-20 bg-slate-200" />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="rounded-lg bg-white p-2 shadow-sm ring-1 ring-black/5">
            <p className="mb-1 text-[6px] text-slate-400">Scan to verify</p>
            <div className="grid grid-cols-5 gap-px">
              {QR.map((on, i) => (
                <span key={i} className={cn("aspect-square rounded-[1px]", on ? "bg-[#0f172a]" : "bg-transparent")} />
              ))}
            </div>
          </div>
          <div className="mt-auto rounded-lg bg-[#f0f7ff] p-2">
            <p className="text-[6px] text-[#0066cc]/70">Status</p>
            <p className="text-[9px] font-bold text-[#0066cc]">Approved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const PROJECTS: Project[] = [
  {
    title: "Kesari Pay",
    category: "Fintech",
    tagline: "Retailer & distributor fintech suite — wallet, AEPS, payouts & BBPS.",
    tags: ["React 19", "AEPS · Payout", "Recharts", "Node.js"],
    accent: "#FE8B3B",
    backdrop: "linear-gradient(155deg, #3f2a12 0%, #1d1a16 52%, #050f28 100%)",
    preview: <KesariPreview />,
  },
  {
    title: "Bizz Engager",
    category: "Marketing SaaS",
    tagline: "WhatsApp campaign engine with a drag-and-drop frame studio & live analytics.",
    tags: ["React 19", "Fabric.js", "Socket.IO", "WhatsApp API"],
    accent: "#8147FB",
    backdrop: "linear-gradient(155deg, #2b1a52 0%, #16112b 52%, #050f28 100%)",
    preview: <BizzPreview />,
  },
  {
    title: "NDAtechnology",
    category: "Legal Tech",
    tagline: "NDA lifecycle portal with digital signing, QR verification & DOCX export.",
    tags: ["React 19", "e-Signature", "QR Verify", "DOCX"],
    accent: "#0066cc",
    backdrop: "linear-gradient(155deg, #0a2a55 0%, #0a1a38 52%, #050f28 100%)",
    preview: <NDAPreview />,
  },
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

        // subtle parallax on each card's brand glow while the track moves
        gsap.utils.toArray<HTMLElement>("[data-project-glow]").forEach((g) => {
          gsap.fromTo(
            g,
            { xPercent: -10 },
            {
              xPercent: 10,
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
              title="Products we've shipped"
              description="Real platforms we designed and built end-to-end — from fintech rails to campaign engines."
            />
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  data-cursor="link"
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-normal uppercase tracking-widest transition-all duration-300",
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
                    "group relative h-[440px] w-[85vw] max-w-[400px] shrink-0 snap-center overflow-hidden rounded-3xl transition-all duration-700 md:h-[500px]",
                    dim && "scale-[0.94] opacity-30 saturate-0"
                  )}
                >
                  {/* brand backdrop */}
                  <div className="absolute inset-0" style={{ background: p.backdrop }} />
                  <div
                    data-project-glow
                    aria-hidden
                    className="absolute -right-12 -top-12 size-48 rounded-full opacity-50 blur-3xl"
                    style={{ background: p.accent }}
                  />
                  <div aria-hidden className="absolute inset-0 rounded-3xl border border-white/10" />

                  {/* faithful app preview (looks like a real screenshot) */}
                  <div className="absolute inset-x-6 top-7 h-[54%] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 transition-all duration-700 group-hover:-translate-y-1 group-hover:scale-[1.03]">
                    {p.preview}
                  </div>

                  {/* category chip */}
                  <span className="absolute left-5 top-5 z-10 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-normal uppercase tracking-widest text-white/80 backdrop-blur-sm">
                    {p.category}
                  </span>

                  {/* info panel */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="glass rounded-2xl p-5">
                      <div className="flex items-center gap-2">
                        <span className="size-2 shrink-0 rounded-full" style={{ background: p.accent }} />
                        <h3 className="font-display text-xl font-normal text-white">{p.title}</h3>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-ice/60">{p.tagline}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <span key={t} className="rounded-full bg-white/8 px-2.5 py-1 text-[10px] font-normal text-ice/70">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* trailing CTA card */}
            <a
              href="#contact"
              data-cursor="link"
              className="glass-strong group relative flex h-[440px] w-[85vw] max-w-[400px] shrink-0 snap-center flex-col items-center justify-center gap-4 rounded-3xl md:h-[500px]"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-blue text-2xl text-white glow-blue transition-transform duration-500 group-hover:rotate-45">
                ↗
              </span>
              <p className="font-display text-xl font-normal text-white">Your project here</p>
              <p className="text-sm text-ice/50">Let&apos;s make it the next case study</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
