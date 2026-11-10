"use client";

import type { ReactNode } from "react";
import { useLenis } from "@/components/site/providers/SmoothScrollProvider";
import { SketchButton } from "@/components/site/SketchButton";

/**
 * In-page jumps that work with Lenis (like the homepage hero's "go to the next section"): scroll to the
 * element with the given id, leaving room for the fixed nav. Without Lenis (reduced motion, or before it
 * mounts) it falls back to the browser's scrollIntoView, and the plain `#id` href still works with no JS.
 */
function useJump(id: string) {
  const lenis = useLenis();
  return (e: React.MouseEvent) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -80 });
    else target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
}

export function JumpButton({ to, seed, children }: { to: string; seed: number; children: ReactNode }) {
  const jump = useJump(to);
  return (
    <SketchButton href={`#${to}`} onClick={jump} variant="marker" seed={seed} className="text-lg">
      {children}
    </SketchButton>
  );
}

export function JumpLink({ to, className, children }: { to: string; className?: string; children: ReactNode }) {
  const jump = useJump(to);
  return (
    <a href={`#${to}`} onClick={jump} className={className}>
      {children}
    </a>
  );
}
