"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "@/components/site/providers/SmoothScrollProvider";
import { ARIA } from "@/lib/site/labels";
import { AUDIT_CTA, AUDIT_HREF, siteNav as nav } from "@/lib/site/shell";
import { SketchUnderline } from "@/components/site/draw/primitives";
import { SketchButton } from "@/components/site/SketchButton";

/** Is `href` the page we are on (or a parent of it)? "/" only matches itself. */
const isCurrent = (pathname: string | null, href: string) =>
  !!pathname && (pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)));

/**
 * Paper strip with a hairline underneath. Links get a marker underline on hover; the current page's link is
 * underlined in ink and marked aria-current. Hides on scroll down. Below 640px the links live in a menu.
 */
export function SiteNav() {
  const lenis = useLenis();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
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

  // the menu closes on navigation and on Escape
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className="sk-sheet fixed inset-x-0 top-0 z-40 transition-transform duration-500 ease-out"
      style={{ transform: hidden && !open ? "translateY(-110%)" : "translateY(0)" }}
    >
      <div className="relative mx-auto flex h-16 max-w-[81.25rem] items-center justify-between px-4 md:px-8">
        <Link href="/" className="font-[family-name:var(--font-brule)] text-xl font-bold">
          {nav.brand}
        </Link>
        <nav aria-label={ARIA.primaryNav} className="flex items-center gap-5 md:gap-8">
          {nav.links.map((l) => {
            const current = isCurrent(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={current ? "page" : undefined}
                className={`hidden font-bold sm:inline${current ? " underline underline-offset-[0.4em]" : ""}`}
              >
                <span className="sk-scribble">
                  {l.label}
                  <SketchUnderline seed={l.label.length} w={120} h={20} stroke="var(--signal)" strokeWidth={3} />
                </span>
              </Link>
            );
          })}
          <SketchButton href={AUDIT_HREF} variant="marker" seed={8} className="!px-4 !py-2.5 text-sm md:text-base">
            {AUDIT_CTA}
          </SketchButton>
          <button
            type="button"
            className="gl-mono -mr-2 px-2 py-3 font-bold sm:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </nav>
      </div>

      {open && (
        <nav id="site-menu" aria-label={`${ARIA.primaryNav} menu`} className="mx-auto max-w-[81.25rem] px-4 pb-3 sm:hidden">
          <ul className="border-t border-ink/30">
            {nav.links.map((l) => {
              const current = isCurrent(pathname, l.href);
              return (
                <li key={l.href} className="border-b border-ink/20">
                  <Link
                    href={l.href}
                    aria-current={current ? "page" : undefined}
                    className={`block py-3 font-[family-name:var(--font-brule)] text-2xl font-semibold${current ? " underline underline-offset-[0.25em]" : ""}`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <div className="relative mx-auto h-3 max-w-[81.25rem]">
        <div className="h-px bg-ink/30" />
      </div>
    </header>
  );
}
