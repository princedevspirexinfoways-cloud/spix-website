"use client";

import { useState, type FormEvent } from "react";

const QUICK_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const SERVICE_LINKS = [
  "Web Development",
  "Mobile Apps",
  "ERP & CRM",
  "HRMS & LMS",
  "E-commerce",
  "API Integrations",
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "#",
    path: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.02 8h4.96V24H.02V8zM7.98 8h4.76v2.2h.07c.66-1.26 2.28-2.58 4.7-2.58 5.02 0 5.95 3.3 5.95 7.6V24h-4.96v-7.7c0-1.84-.03-4.2-2.56-4.2-2.56 0-2.95 2-2.95 4.06V24H7.98V8z",
  },
  {
    label: "X",
    href: "#",
    path: "M18.24 2H21.5l-7.1 8.1L22.75 22h-6.56l-5.14-6.7L5.16 22H1.88l7.6-8.68L.75 2h6.72l4.64 6.14L18.24 2zm-1.15 18h1.81L6.49 3.86H4.55L17.09 20z",
  },
  {
    label: "GitHub",
    href: "#",
    path: "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.15c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.77 1.05.77 2.13v3.16c0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z",
  },
];

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="relative overflow-hidden bg-navy-deep">
      {/* animated wave divider */}
      <div aria-hidden className="relative h-24 w-full overflow-hidden">
        <svg
          className="absolute bottom-0 h-full w-[200%] animate-[wave-slide_14s_linear_infinite]"
          viewBox="0 0 2880 96"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60 C240 20 480 90 720 60 C960 30 1200 90 1440 60 C1680 20 1920 90 2160 60 C2400 30 2640 90 2880 60 L2880 96 L0 96 Z"
            fill="rgba(21,101,255,0.10)"
          />
          <path
            d="M0 72 C240 40 480 100 720 72 C960 48 1200 100 1440 72 C1680 40 1920 100 2160 72 C2400 48 2640 100 2880 72 L2880 96 L0 96 Z"
            fill="rgba(21,101,255,0.16)"
          />
        </svg>
        <style>{`@keyframes wave-slide { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-10 pt-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* brand + newsletter */}
          <div className="lg:col-span-2 lg:pr-12">
            <a href="#top" className="font-display text-2xl font-bold text-white" data-cursor="link">
              SPI<span className="text-gradient-blue">REX</span>
              <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.3em] text-ice/40">Infoways</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ice/50">
              A software development company crafting premium digital experiences, scalable platforms,
              and intelligent automation for businesses worldwide.
            </p>

            <form onSubmit={onSubscribe} className="mt-8 max-w-sm">
              <label htmlFor="newsletter" className="text-xs font-semibold uppercase tracking-[0.25em] text-ice/60">
                Get engineering insights
              </label>
              <div className="glass mt-3 flex overflow-hidden rounded-full p-1.5 focus-within:border-blue-soft/50">
                <input
                  id="newsletter"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full bg-transparent px-4 text-sm text-white placeholder:text-ice/30 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-blue px-5 py-2.5 text-xs font-semibold text-white transition-shadow hover:glow-blue"
                >
                  {subscribed ? "Subscribed ✓" : "Subscribe"}
                </button>
              </div>
            </form>
          </div>

          <nav aria-label="Quick links">
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-ice/60">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="group inline-flex items-center gap-2 text-sm text-ice/55 transition-colors hover:text-white">
                    <span className="h-px w-0 bg-blue-soft transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-ice/60">Services</h3>
            <ul className="mt-5 space-y-3">
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-sm text-ice/55 transition-colors hover:text-white">
                    {s}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-ice/60">Contact</h3>
            <a href="mailto:hello@spirexinfoways.com" className="mt-3 block text-sm text-blue-soft hover:text-white">
              hello@spirexinfoways.com
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/8 pt-8 sm:flex-row">
          <p className="text-xs text-ice/35">
            © {new Date().getFullYear()} Spirex Infoways. All rights reserved.
          </p>
          <div className="flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                data-cursor="link"
                className="glass flex size-10 items-center justify-center rounded-full text-ice/60 transition-all duration-300 hover:-translate-y-1 hover:text-white hover:glow-blue"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
