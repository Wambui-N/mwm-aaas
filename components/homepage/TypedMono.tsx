"use client";

import { useRef, type ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/** Mono text that types in character by character when scrolled into view. Full text is in the server HTML. */
export function TypedMono({ children, as: Tag = "span", speed = 0.02, className = "" }: { children: string; as?: ElementType; speed?: number; className?: string }) {
  const el = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const split = SplitText.create(el.current!, { type: "chars" });
      gsap.fromTo(
        split.chars,
        { opacity: 0 },
        { opacity: 1, duration: 0.01, ease: "none", stagger: speed, scrollTrigger: { trigger: el.current, start: "top 90%", once: true } },
      );
    },
    { scope: el },
  );

  return (
    <Tag ref={el} className={`gl-mono ${className}`}>
      {children}
    </Tag>
  );
}
