"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
const ReadyContext = createContext(false);
const SetReadyContext = createContext<(v: boolean) => void>(() => {});

/** The Lenis instance, or null (SSR, reduced motion, before mount). */
export const useLenis = () => useContext(LenisContext);
/** True once the page has mounted (set by ReadyOnMount). The hero intro waits on this. */
export const useReady = () => useContext(ReadyContext);
export const useSetReady = () => useContext(SetReadyContext);

export function SmoothScrollProvider({ children, enabled = true }: { children: ReactNode; enabled?: boolean }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [ready, setReady] = useState(false);

  // Layout shifts break trigger positions: refresh after fonts and images load.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  useEffect(() => {
    // `enabled={false}` keeps native scrolling (form-heavy and embed pages); reduced motion does too.
    if (!enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({ autoRaf: false });
    const tick = (time: number) => instance.raf(time * 1000);

    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      instance.destroy();
      setLenis(null);
    };
  }, [enabled]);

  return (
    <LenisContext.Provider value={lenis}>
      <SetReadyContext.Provider value={setReady}>
        <ReadyContext.Provider value={ready}>{children}</ReadyContext.Provider>
      </SetReadyContext.Provider>
    </LenisContext.Provider>
  );
}
