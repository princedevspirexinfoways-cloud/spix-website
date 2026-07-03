"use client";

import SectionHeading from "../ui/SectionHeading";

type Quote = { text: string; name: string; role: string };

const ROW_A: Quote[] = [
  { text: "Spirex rebuilt our entire ERP in six months. The old system took three vendors and four years. Night and day.", name: "Rahul Mehta", role: "COO, LogiChain" },
  { text: "The website they built doubled our conversion rate in the first quarter. It genuinely feels like a product, not a brochure.", name: "Sarah Whitmore", role: "CMO, Northbeam Retail" },
  { text: "Their engineers pushed back on our spec — and they were right. That's the kind of partner you keep.", name: "Daniel Osei", role: "CTO, FinPulse" },
  { text: "24×7 support isn't marketing copy with Spirex. We've paged them at 3am. They answered.", name: "Priya Nair", role: "VP Engineering, MedServe" },
];

const ROW_B: Quote[] = [
  { text: "Our mobile app went from concept to App Store in 14 weeks with a 4.8 rating. Flawless execution.", name: "James Carter", role: "Founder, FitLoop" },
  { text: "The HRMS they delivered handles payroll for 2,000 employees across three countries without a hiccup.", name: "Aisha Rahman", role: "HR Director, TalentBridge" },
  { text: "Best agency experience we've had — transparent estimates, weekly demos, zero surprises at invoice time.", name: "Marco Bianchi", role: "CEO, Veloce Commerce" },
  { text: "They integrated five legacy systems through one clean API layer. Our ops team still talks about it.", name: "Elena Petrova", role: "Head of Ops, TransGlobal" },
];

function Card({ q }: { q: Quote }) {
  return (
    <figure className="glass group relative w-[340px] shrink-0 rounded-3xl p-7 transition-all duration-500 hover:border-blue-soft/35 hover:shadow-[0_16px_50px_-16px_rgba(21,101,255,0.4)] md:w-[420px]">
      <span aria-hidden className="absolute -left-1 -top-3 font-display text-6xl text-blue/40">&ldquo;</span>
      <blockquote className="relative text-sm leading-relaxed text-ice/75">{q.text}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-blue to-navy text-xs font-bold text-white">
          {q.name.split(" ").map((n) => n[0]).join("")}
        </span>
        <span>
          <span className="block text-sm font-semibold text-white">{q.name}</span>
          <span className="block text-xs text-ice/45">{q.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function Marquee({ quotes, reverse = false }: { quotes: Quote[]; reverse?: boolean }) {
  return (
    <div className="group/marquee flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex shrink-0 gap-6 pr-6 will-change-transform [animation-play-state:running] group-hover/marquee:[animation-play-state:paused] ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {[...quotes, ...quotes].map((q, i) => (
          <Card key={i} q={q} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-navy-deep/50 py-28 md:py-36">
      <div aria-hidden className="absolute left-1/2 top-0 h-[30vmax] w-[60vmax] -translate-x-1/2 rounded-full bg-blue/6 blur-[120px]" />

      <SectionHeading
        eyebrow="Testimonials"
        title="Trusted by teams who ship"
        className="px-6"
      />

      <div className="mt-16 space-y-6">
        <Marquee quotes={ROW_A} />
        <Marquee quotes={ROW_B} reverse />
      </div>
    </section>
  );
}
