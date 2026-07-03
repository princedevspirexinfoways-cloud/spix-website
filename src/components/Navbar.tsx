"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "./ui/MagneticButton";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current!;
    gsap.set(el, { y: -96, opacity: 0 });
    const enter = () => gsap.to(el, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", delay: 0.15 });
    if (window.__spirexReady) enter();
    else window.addEventListener("spirex:ready", enter, { once: true });

    // hide on scroll down, reveal on scroll up
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (!open) gsap.to(el, { y: y > last && y > 140 ? -96 : 0, duration: 0.5, ease: "power3.out" });
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("spirex:ready", enter);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-[80]">
      <nav className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 glass mx-4 lg:mx-auto">
        <a href="#top" className="font-display text-lg font-bold tracking-tight text-white" data-cursor="link">
          SPI<span className="text-gradient-blue">REX</span>
          <span className="ml-1.5 hidden text-[10px] font-medium uppercase tracking-[0.3em] text-ice/40 sm:inline">
            Infoways
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-cursor="link"
                className="group relative text-sm font-medium text-ice/70 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-blue to-blue-soft transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <MagneticButton href="#contact" className="!px-6 !py-2.5 text-xs">
            Start a Project
          </MagneticButton>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "translate-y-1 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* mobile menu */}
      <div
        className={`mx-4 mt-2 overflow-hidden rounded-2xl glass transition-all duration-500 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 p-4">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-ice/80 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
