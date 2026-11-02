"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { annotate } from "rough-notation";
import type { RoughAnnotationType } from "rough-notation/lib/model";
import { useReady } from "@/components/site/providers/SmoothScrollProvider";

type Props = {
  children: ReactNode;
  type: RoughAnnotationType;
  /** marker colour; orange only as a stroke or low-opacity highlight behind ink text */
  color?: string;
  strokeWidth?: number;
  padding?: number | [number, number, number, number];
  iterations?: number;
  duration?: number;
  delay?: number;
  multiline?: boolean;
  brackets?: ("left" | "right" | "top" | "bottom")[];
  /** "view": when scrolled into view; "ready": once the page is ready */
  when?: "view" | "ready";
  className?: string;
};

/**
 * rough-notation on a word or phrase. It measures the DOM, so it only runs after mount (no
 * hydration mismatch). With reduced motion it appears already drawn.
 */
export function Annotate({
  children,
  type,
  color = "#e65032",
  strokeWidth = 3,
  padding = 4,
  iterations = 2,
  duration = 700,
  delay = 0,
  multiline = false,
  brackets,
  when = "view",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const ready = useReady();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (when === "ready" && !ready) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const a = annotate(el, {
      type,
      color,
      strokeWidth,
      padding,
      iterations,
      animate: !reduced,
      animationDuration: duration,
      multiline,
      brackets,
    });

    let io: IntersectionObserver | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const show = () => {
      timer = setTimeout(() => a.show(), reduced ? 0 : delay);
    };
    if (when === "view" && !reduced) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            show();
            io?.disconnect();
          }
        },
        { threshold: 0.6 },
      );
      io.observe(el);
    } else {
      show();
    }
    return () => {
      io?.disconnect();
      clearTimeout(timer);
      a.remove();
    };
  }, [type, color, strokeWidth, padding, iterations, duration, delay, multiline, brackets, when, ready]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
