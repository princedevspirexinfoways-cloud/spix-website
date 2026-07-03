"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { gsap } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: "primary" | "ghost";
  strength?: number;
  onClick?: () => void;
};

export default function MagneticButton({
  children,
  className,
  href,
  variant = "primary",
  strength = 0.35,
  onClick,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const onMove = (e: MouseEvent) => {
    if (prefersReducedMotion()) return;
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: "power3.out" });
    gsap.to(innerRef.current, { x: x * strength * 0.4, y: y * strength * 0.4, duration: 0.4 });
  };

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)" });
    gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)" });
  };

  const styles = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-normal tracking-wide transition-shadow duration-500 will-change-transform",
    variant === "primary"
      ? "bg-blue text-white glow-blue hover:shadow-[0_0_40px_rgba(21,101,255,0.6),0_0_120px_rgba(21,101,255,0.25)]"
      : "glass text-ice hover:border-blue-soft/40",
    className
  );

  const content = (
    <>
      {/* sweeping sheen */}
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span ref={innerRef} className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  const shared = {
    ref: ref as never,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: styles,
    "data-cursor": "link",
  };

  return href ? (
    <a href={href} {...shared} onClick={onClick}>
      {content}
    </a>
  ) : (
    <button type="button" {...shared} onClick={onClick}>
      {content}
    </button>
  );
}
