"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";

type Service = {
  title: string;
  blurb: string;
  detail: string;
  points: string[];
  icon: React.ReactNode;
};

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden>
    <path d={d} />
  </svg>
);

const SERVICES: Service[] = [
  {
    title: "Website Design & Development",
    blurb: "Custom, responsive, and SEO-friendly websites tailored to your brand identity.",
    detail: "From marketing sites to complex web platforms, we design and engineer fast, accessible experiences that convert visitors into customers.",
    points: ["Next.js & modern frameworks", "Pixel-perfect responsive UI", "Core Web Vitals optimized", "Headless CMS integration"],
    icon: icon("M3 5h18v12H3zM3 17l4 4h10l4-4M8 9h8M8 12h5"),
  },
  {
    title: "Mobile App Development",
    blurb: "Native and hybrid mobile applications for iOS and Android.",
    detail: "We ship polished mobile products with native performance, offline support, and delightful micro-interactions across both ecosystems.",
    points: ["React Native & Flutter", "Native iOS / Android", "App Store launch support", "Push, payments & analytics"],
    icon: icon("M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2"),
  },
  {
    title: "Custom ERP Software",
    blurb: "Powerful ERP systems that streamline operations.",
    detail: "Unify finance, inventory, procurement, and reporting into one tailored system that mirrors exactly how your business runs.",
    points: ["Modular architecture", "Role-based access control", "Real-time dashboards", "Legacy system migration"],
    icon: icon("M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"),
  },
  {
    title: "CRM Solutions",
    blurb: "Customer relationship platforms with analytics.",
    detail: "Track every lead, automate every follow-up, and understand your pipeline with CRM platforms built around your sales motion.",
    points: ["Pipeline automation", "360° customer views", "Sales forecasting", "Email & telephony integration"],
    icon: icon("M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"),
  },
  {
    title: "HRMS Systems",
    blurb: "Attendance, payroll, and recruitment automation.",
    detail: "End-to-end people operations — from biometric attendance to payroll runs and hiring pipelines — in one secure platform.",
    points: ["Payroll & compliance", "Attendance & leave", "Recruitment ATS", "Employee self-service"],
    icon: icon("M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0M12 12v3"),
  },
  {
    title: "LMS Platforms",
    blurb: "Interactive learning systems.",
    detail: "Engaging learning platforms with courses, assessments, certifications, and progress analytics for schools and enterprises.",
    points: ["Course authoring tools", "Live classes & video", "Quizzes & certification", "Learner analytics"],
    icon: icon("M2 6l10-4 10 4-10 4L2 6zM6 8.5V15c0 1.5 3 3 6 3s6-1.5 6-3V8.5M22 6v6"),
  },
  {
    title: "E-commerce Development",
    blurb: "Scalable online stores with secure payments.",
    detail: "High-converting storefronts with lightning-fast catalogs, secure checkout, and integrations with your logistics stack.",
    points: ["Headless commerce", "Payment gateways", "Inventory sync", "Conversion optimization"],
    icon: icon("M6 6h15l-1.5 9h-12zM6 6L5 3H2M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"),
  },
  {
    title: "Automation Tools",
    blurb: "Business automation dashboards.",
    detail: "Kill repetitive work with custom automation — approval flows, report generation, data pipelines, and AI-assisted operations.",
    points: ["Workflow engines", "AI-powered agents", "Custom dashboards", "Notifications & alerts"],
    icon: icon("M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"),
  },
  {
    title: "API Integrations",
    blurb: "Integrate third-party systems seamlessly.",
    detail: "Connect your product to the tools your business depends on — payments, maps, messaging, ERPs — with robust, documented APIs.",
    points: ["REST & GraphQL", "Webhooks & events", "Third-party connectors", "API design & docs"],
    icon: icon("M9 12h6M7 8a4 4 0 0 0 0 8h2M17 8a4 4 0 0 1 0 8h-2"),
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          rotateY: i % 2 ? 10 : -10,
          duration: 1.1,
          delay: (i % 3) * 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        });
      });
    },
    { scope: ref }
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIdx(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = openIdx !== null ? SERVICES[openIdx] : null;

  return (
    <section ref={ref} id="services" className="relative overflow-hidden py-28 md:py-40">
      <div aria-hidden className="absolute left-[-15%] top-[30%] h-[45vmax] w-[45vmax] rounded-full bg-blue/7 blur-[130px]" />

      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="What We Do"
          title="Services built like products"
          description="Nine disciplines, one standard: every engagement gets senior engineers, real design thinking, and code built to last."
        />

        <div className="perspective-1200 mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <TiltCard key={s.title} className="h-full rounded-3xl">
              <button
                type="button"
                data-service-card
                data-cursor="view"
                onClick={() => setOpenIdx(i)}
                className="group glass relative h-full w-full overflow-hidden rounded-3xl p-8 text-left transition-all duration-500 hover:border-blue-soft/35 hover:shadow-[0_20px_60px_-20px_rgba(21,101,255,0.35)]"
              >
                {/* gradient lighting sweep */}
                <span aria-hidden className="absolute -right-16 -top-16 size-40 rounded-full bg-blue/20 blur-3xl transition-all duration-700 group-hover:bg-blue/35 group-hover:blur-2xl" />

                <span className="relative mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue/25 to-blue/5 text-blue-soft transition-transform duration-500 group-hover:scale-110 group-hover:text-white group-hover:shadow-[0_0_30px_rgba(21,101,255,0.5)]">
                  {s.icon}
                </span>
                <h3 className="relative font-display text-lg font-normal text-white">{s.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-ice/55">{s.blurb}</p>

                <span className="relative mt-6 inline-flex items-center gap-2 text-xs font-normal uppercase tracking-widest text-blue-soft opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                  Explore
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M2 7h10m0 0L8 3m4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-end justify-center bg-ink/70 p-4 backdrop-blur-md sm:items-center"
            onClick={() => setOpenIdx(null)}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.95, rotateX: -8 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ y: 60, opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-xl overflow-hidden rounded-3xl p-8 md:p-10"
            >
              <span aria-hidden className="absolute -right-20 -top-20 size-56 rounded-full bg-blue/25 blur-3xl" />
              <button
                type="button"
                onClick={() => setOpenIdx(null)}
                aria-label="Close"
                className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full glass text-ice/70 transition-colors hover:text-white"
              >
                ✕
              </button>

              <span className="relative mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-blue/20 text-blue-soft">
                {open.icon}
              </span>
              <h3 className="relative font-display text-2xl font-normal text-white md:text-3xl">{open.title}</h3>
              <p className="relative mt-4 leading-relaxed text-ice/65">{open.detail}</p>

              <ul className="relative mt-6 grid gap-3 sm:grid-cols-2">
                {open.points.map((pt, i) => (
                  <motion.li
                    key={pt}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07 }}
                    className="flex items-center gap-2.5 text-sm text-ice/75"
                  >
                    <span className="size-1.5 rounded-full bg-blue-soft shadow-[0_0_8px_#4d8dff]" />
                    {pt}
                  </motion.li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={() => setOpenIdx(null)}
                className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3 text-sm font-normal text-white glow-blue transition-shadow hover:shadow-[0_0_40px_rgba(21,101,255,0.6)]"
              >
                Discuss this service
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
