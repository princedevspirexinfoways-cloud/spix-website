"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { gsap } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
};

/** 3D perspective tilt toward the cursor with a moving light reflection. */
export default function TiltCard({ children, className, maxTilt = 9, glare = true }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    if (prefersReducedMotion()) return;
    const rect = wrapRef.current!.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    gsap.to(cardRef.current, {
      rotateY: (px - 0.5) * 2 * maxTilt,
      rotateX: -(py - 0.5) * 2 * maxTilt,
      translateZ: 12,
      duration: 0.5,
      ease: "power2.out",
    });
    if (glare && glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 1,
        background: `radial-gradient(420px circle at ${px * 100}% ${py * 100}%, rgba(122,168,255,0.22), transparent 55%)`,
        duration: 0.3,
      });
    }
  };

  const onLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
      duration: 0.9,
      ease: "elastic.out(1, 0.4)",
    });
    if (glareRef.current) gsap.to(glareRef.current, { opacity: 0, duration: 0.5 });
  };

  return (
    <div ref={wrapRef} className="perspective-1200" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div ref={cardRef} className={cn("preserve-3d relative will-change-transform", className)}>
        {children}
        {glare && (
          <div
            ref={glareRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0"
          />
        )}
      </div>
    </div>
  );
}
