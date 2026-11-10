"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "@/components/site/providers/SmoothScrollProvider";
import { ARIA } from "@/lib/site/labels";
import { AUDIT_CTA, AUDIT_HREF, siteNav as nav } from "@/lib/site/shell";
import type { NavMenuItem, NavMenus } from "@/lib/site/menus";
import { SketchUnderline } from "@/components/site/draw/primitives";
import { SketchButton } from "@/components/site/SketchButton";

/** Is `href` the page we are on (or a parent of it)? "/" only matches itself. */
const isCurrent = (pathname: string | null, href: string) =>
  !!pathname && (pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)));

const Caret = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden
    viewBox="0 0 12 12"
    className="h-3 w-3 transition-transform duration-200"
    style={{ transform: open ? "rotate(180deg)" : "none" }}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 4.2 6 8l4-3.8" />
  </svg>
);

/**
 * A nav link with a dropdown. The label is still a real link (to the section's index page); the caret button
 * opens the panel. Hover opens it too on desktop. Escape and an outside click close it.
 */
function NavDropdown({ label, href, items, current }: { label: string; href: string; items: NavMenuItem[]; current: boolean }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const caret = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const id = `menu-${label.toLowerCase()}`;

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        caret.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className="relative hidden sm:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="inline-flex items-center gap-1.5">
        <Link href={href} aria-current={current ? "page" : undefined} className={`font-bold${current ? " underline underline-offset-[0.4em]" : ""}`}>
          <span className="sk-scribble">
            {label}
            <SketchUnderline seed={label.length} w={120} h={20} stroke="var(--signal)" strokeWidth={3} />
          </span>
        </Link>
        <button
          ref={caret}
          type="button"
          aria-label={`${label} menu`}
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="-m-1.5 p-1.5"
        >
          <Caret open={open} />
        </button>
      </span>

      {open && (
        // the padding bridges the gap between the link and the panel so the hover is not lost
        <div id={id} className="absolute left-0 top-full z-50 pt-3">
          <ul className="calm-card min-w-[15rem] p-1.5">
            {items.map((it) => (
              <li key={it.href}>
                <Link href={it.href} className="gl-mono block px-3 py-2.5 text-ink hover:bg-sage focus-visible:bg-sage">
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * Paper strip with a hairline underneath. Articles and Resources are dropdowns. Links get a marker underline
 * on hover; the current page's link is underlined in ink and marked aria-current. Hides on scroll down.
 * Below 640px the links live in a menu (Articles and Resources expand in place).
 */
export function SiteNav({ menus }: { menus?: NavMenus }) {
  const lenis = useLenis();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);
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
  useEffect(() => {
    setOpen(false);
    setOpenSub(null);
  }, [pathname]);
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
        <Link href="/" className="inline-flex items-center gap-2.5 font-[family-name:var(--font-brule)] text-xl font-bold">
          {/* the brand mark, in the signal orange; decorative (the name beside it is the link text) */}
          <svg aria-hidden focusable="false" viewBox="0 0 539 468" className="h-[2rem] w-auto shrink-0" fill="var(--signal)">
            <path d="M219.95 185.773C195.606 227.866 6.57676 154.931 0.175575 172.583C-1.66719 177.432 10.8442 188.198 44.8869 207.498C80.9172 227.851 110.851 257.466 131.587 293.277C152.323 329.088 163.108 369.792 162.824 411.172C162.824 449.967 165.539 466.358 170.68 467.134C189.204 470.238 220.434 270.249 269.122 270.249C317.81 270.249 349.04 470.238 367.565 467.134C372.705 466.358 375.809 450.064 375.421 410.881C375.136 369.501 385.921 328.797 406.657 292.986C427.394 257.176 457.327 227.56 493.358 207.207C527.4 187.81 540.009 177.141 538.166 172.292C531.474 154.64 342.736 227.575 318.392 185.482C294.048 143.39 451.556 16.2389 439.626 1.20579C436.329 -2.7707 420.229 2.75759 386.768 22.737C351.048 43.7885 310.342 54.891 268.88 54.891C227.418 54.891 186.712 43.7885 150.991 22.737C117.434 3.33952 101.916 -2.47973 98.618 1.49676C86.6885 16.7238 243.905 143.584 219.95 185.773Z" />
          </svg>
          {nav.brand}
        </Link>
        <nav aria-label={ARIA.primaryNav} className="flex items-center gap-5 md:gap-8">
          {nav.links.map((l) => {
            const current = isCurrent(pathname, l.href);
            const items = l.menu ? menus?.[l.menu] : undefined;
            if (items && items.length > 0) {
              return <NavDropdown key={l.href} label={l.label} href={l.href} items={items} current={current} />;
            }
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
        <nav
          id="site-menu"
          aria-label={`${ARIA.primaryNav} menu`}
          className="mx-auto max-h-[calc(100svh-5rem)] max-w-[81.25rem] overflow-y-auto px-4 pb-3 sm:hidden"
        >
          <ul className="border-t border-ink/30">
            {nav.links.map((l) => {
              const current = isCurrent(pathname, l.href);
              const items = l.menu ? menus?.[l.menu] : undefined;
              const hasSub = !!items && items.length > 0;
              const subOpen = openSub === l.label;
              return (
                <li key={l.href} className="border-b border-ink/20">
                  <div className="flex items-center justify-between">
                    <Link
                      href={l.href}
                      aria-current={current ? "page" : undefined}
                      className={`block flex-1 py-3 font-[family-name:var(--font-brule)] text-2xl font-semibold${current ? " underline underline-offset-[0.25em]" : ""}`}
                    >
                      {l.label}
                    </Link>
                    {hasSub && (
                      <button
                        type="button"
                        aria-label={`${l.label} menu`}
                        aria-expanded={subOpen}
                        onClick={() => setOpenSub(subOpen ? null : l.label)}
                        className="-mr-2 p-3"
                      >
                        <Caret open={subOpen} />
                      </button>
                    )}
                  </div>
                  {hasSub && subOpen && (
                    <ul className="mb-2 ml-1 border-l border-ink/30 pl-4">
                      {items!.map((it) => (
                        <li key={it.href}>
                          <Link href={it.href} className="gl-mono block py-2.5 text-ink">
                            {it.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
