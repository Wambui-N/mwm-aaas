"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";
import { useReady } from "@/components/site/providers/SmoothScrollProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

type Props = {
  children: ReactNode;
  className?: string;
  /** wrapper element; use "span" inside headings, links and paragraphs so the HTML stays valid */
  as?: ElementType;
  /** "scroll": draw when it enters; "ready": once the page is ready; "mount": immediately; "hover": on pointer enter */
  on?: "scroll" | "ready" | "mount" | "hover";
  start?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  /** also fade children matching this selector in (tiny settle, no bounce) */
  settle?: string;
};

/**
 * Draws every `.sk-stroke` inside it with DrawSVG, as if by hand. With reduced motion the
 * drawings stay fully drawn and nothing animates. Before JS runs they are fully drawn too.
 */
export function DrawIn({ children, className, as: Tag = "div", on = "scroll", start = "top 82%", delay = 0, duration = 1, stagger = 0.12, settle }: Props) {
  const root = useRef<HTMLElement>(null);
  const ready = useReady();

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (on === "ready" && !ready) return;
      const strokes = gsap.utils.toArray<SVGGeometryElement>(".sk-stroke", root.current);
      if (!strokes.length) return;

      const tl = gsap.timeline({
        paused: on === "hover",
        scrollTrigger: on === "scroll" ? { trigger: root.current, start, once: true } : undefined,
        delay: on === "hover" ? 0 : delay,
      });
      tl.fromTo(strokes, { drawSVG: "0%" }, { drawSVG: "100%", duration, ease: "power1.inOut", stagger });
      if (settle) {
        tl.from(gsap.utils.toArray(settle, root.current), { opacity: 0, rotation: "-=2", y: 6, duration: 0.5, ease: "back.out(1.2)" }, 0.2);
      }

      if (on === "hover") {
        const el = root.current!;
        const enter = () => tl.restart();
        el.addEventListener("pointerenter", enter);
        return () => el.removeEventListener("pointerenter", enter);
      }
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <Tag ref={root} className={className}>
      {children}
    </Tag>
  );
}
