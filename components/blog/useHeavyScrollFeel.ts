"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

const READING_LERP = 0.075;

// Nudges the shared Lenis instance to a slightly heavier feel while a long-form
// post is being read, restoring the site default on unmount. No-ops safely if
// Lenis isn't mounted (e.g. this ever renders outside SmoothScrollProvider).
export function useHeavyScrollFeel() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const previousLerp = lenis.options.lerp;
    lenis.options.lerp = READING_LERP;
    return () => {
      lenis.options.lerp = previousLerp;
    };
  }, [lenis]);
}
