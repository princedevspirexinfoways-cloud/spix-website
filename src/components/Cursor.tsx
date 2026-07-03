"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Two-layer custom cursor: a tight dot and a springy glow ring.
 * Elements opt into states via data attributes:
 *   data-cursor="link"  → ring expands
 *   data-cursor="view"  → ring becomes a labeled pill ("View")
 *   data-cursor="drag"  → labeled "Drag"
 *   data-cursor="text"  → thin vertical beam
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;

    document.body.classList.add("custom-cursor");
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    let visible = false;
    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
    };

    const onMove = (e: MouseEvent) => {
      show();
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const setState = (state: string | null) => {
      const isLabel = state === "view" || state === "drag";
      label.textContent = state === "view" ? "View" : state === "drag" ? "Drag" : "";
      gsap.to(ring, {
        width: isLabel ? 84 : state === "link" ? 64 : state === "text" ? 4 : 36,
        height: isLabel ? 84 : state === "link" ? 64 : state === "text" ? 44 : 36,
        backgroundColor: isLabel ? "rgba(21,101,255,0.9)" : "rgba(21,101,255,0)",
        borderColor: state === "link" ? "rgba(122,168,255,0.9)" : "rgba(122,168,255,0.45)",
        duration: 0.35,
        ease: "back.out(2)",
      });
      gsap.to(label, { autoAlpha: isLabel ? 1 : 0, scale: isLabel ? 1 : 0.6, duration: 0.25 });
      gsap.to(dot, { scale: state ? 0 : 1, duration: 0.25 });
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button");
      if (!el) return setState(null);
      setState(el.dataset.cursor ?? "link");
    };
    const onOut = (e: MouseEvent) => {
      const to = e.relatedTarget as HTMLElement | null;
      if (!to || !to.closest("[data-cursor], a, button")) setState(null);
    };

    const onDown = () => gsap.to(ring, { scale: 0.82, duration: 0.18 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.5)" });
    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[120] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[119] flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue-soft/45 opacity-0 shadow-[0_0_30px_rgba(21,101,255,0.35)] backdrop-blur-[2px]"
      >
        <span
          ref={labelRef}
          className="text-[11px] font-semibold uppercase tracking-widest text-white opacity-0"
        />
      </div>
    </>
  );
}
