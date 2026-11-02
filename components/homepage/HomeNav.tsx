"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLenis } from "@/components/homepage/providers/SmoothScrollProvider";
import { ARIA } from "@/lib/homepage/labels";
import { AUDIT_HREF, audit, nav } from "@/lib/homepage/copy";
import { SketchUnderline } from "@/components/homepage/draw/primitives";
import { SketchButton } from "@/components/homepage/SketchButton";

/** Paper strip with a hairline underneath. Links get a marker underline on hover. Hides on scroll down. */
export function HomeNav() {
  const lenis = useLenis();
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useEffect(() => {
    const update = (y: number) => {
      const dy = y - last.current;
      if (Math.abs(dy) < 4) return;
      setHidden(dy > 0 && y > 80);
      last.current = y;
    };
    if (lenis) {
      const onScroll = () => update(lenis.scroll);
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }
    const onScroll = () => update(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  return (
    <header
      className="sk-sheet fixed inset-x-0 top-0 z-40 transition-transform duration-500 ease-out"
      style={{ transform: hidden ? "translateY(-110%)" : "translateY(0)" }}
    >
      <div className="relative mx-auto flex h-16 max-w-[81.25rem] items-center justify-between px-4 md:px-8">
        <Link href="/" className="font-[family-name:var(--font-brule)] text-xl font-bold">
          {nav.brand}
        </Link>
        <nav aria-label={ARIA.primaryNav} className="flex items-center gap-5 md:gap-8">
          {nav.links.map((l) => (
            <Link key={l.href} href={l.href} className="hidden font-bold sm:inline">
              <span className="sk-scribble">
                {l.label}
                <SketchUnderline seed={l.label.length} w={120} h={20} stroke="var(--signal)" strokeWidth={3} />
              </span>
            </Link>
          ))}
          <SketchButton href={AUDIT_HREF} variant="marker" seed={8} className="!px-4 !py-2.5 text-sm md:text-base">
            {audit.cta}
          </SketchButton>
        </nav>
      </div>
      {/* below 640px the three links move to their own row (the live site has a mobile menu; this is the minimal equivalent) */}
      <nav aria-label={`${ARIA.primaryNav} links`} className="mx-auto flex max-w-[81.25rem] gap-6 px-4 pb-1 sm:hidden">
        {nav.links.map((l) => (
          <Link key={l.href} href={l.href} className="text-sm font-bold">
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="relative mx-auto h-3 max-w-[81.25rem]">
        <div className="h-px bg-ink/30" />
      </div>
    </header>
  );
}
