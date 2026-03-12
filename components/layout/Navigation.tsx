'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { scorecardUrl } from '@/lib/links';
import { cn } from '@/lib/utils';
import { Menu, X, BookOpen, Tag, Layers, Wrench, FileText, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

// ─── Static nav data ──────────────────────────────────────────────────────────

const CASE_STUDY_TAG = 'case-study';

// These tags are embedded at build time via Server Component data passed as props.
// The navigation itself is a client component; top tags are passed from the layout.
const ARTICLES_STATIC = [
  {
    label: 'All articles',
    href: '/blog',
    description: 'Browse every post — strategy, tools, AI and case studies.',
    icon: BookOpen,
  },
  {
    label: 'Case studies',
    href: `/blog?tag=${CASE_STUDY_TAG}`,
    description: 'Real client projects with measurable results.',
    icon: Layers,
  },
];

const RESOURCES_ITEMS = [
  {
    label: 'All resources',
    href: '/resources',
    description: 'Free tools, templates, and checklists.',
    icon: Layers,
  },
  {
    label: 'Tools',
    href: '/resources?type=tool',
    description: 'Interactive browser-based utilities.',
    icon: Wrench,
  },
  {
    label: 'Templates',
    href: '/resources?type=template',
    description: 'Ready-to-use workflow templates.',
    icon: FileText,
  },
  {
    label: 'Checklists',
    href: '/resources?type=checklist',
    description: 'Step-by-step checklists to help you choose what to automate first.',
    icon: FileText,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function DropdownItem({
  href,
  label,
  description,
  icon: Icon,
}: {
  href: string;
  label: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            'group flex select-none gap-3 rounded-lg p-3 leading-none no-underline outline-none transition-colors',
            'hover:bg-brand-grey/20 focus:bg-brand-grey/20'
          )}
        >
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-grey/30 group-hover:bg-brand-orange/10 transition-colors">
            <Icon className="h-4 w-4 text-brand-black group-hover:text-brand-orange transition-colors" />
          </div>
          <div>
            <div className="text-sm font-medium text-brand-black leading-none mb-1">
              {label}
            </div>
            <p className="line-clamp-2 text-xs leading-snug text-gray-500">
              {description}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

// ─── Main Navigation ──────────────────────────────────────────────────────────

export interface NavigationProps {
  /** Top tags passed from a server parent; falls back to empty array */
  topTags?: string[];
}

export default function Navigation({ topTags = [] }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const tagItems = topTags.map((tag) => ({
    label: tag.charAt(0).toUpperCase() + tag.slice(1),
    href: `/blog?tag=${encodeURIComponent(tag)}`,
    description: `Posts tagged "${tag}"`,
    icon: Tag,
  }));

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-gray/50 backdrop-blur-md border-b border-brand-grey/20"
    >
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            aria-label="Made with Make — Home"
            className="flex min-w-0 items-center space-x-2 focus:outline-none"
          >
            <span className="w-8 h-8 flex items-center justify-center">
              <svg width="32" height="28" viewBox="0 0 539 468" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M219.95 185.773C195.606 227.866 6.57676 154.931 0.175575 172.583C-1.66719 177.432 10.8442 188.198 44.8869 207.498C80.9172 227.851 110.851 257.466 131.587 293.277C152.323 329.088 163.108 369.792 162.824 411.172C162.824 449.967 165.539 466.358 170.68 467.134C189.204 470.238 220.434 270.249 269.122 270.249C317.81 270.249 349.04 470.238 367.565 467.134C372.705 466.358 375.809 450.064 375.421 410.881C375.136 369.501 385.921 328.797 406.657 292.986C427.394 257.176 457.327 227.56 493.358 207.207C527.4 187.81 540.009 177.141 538.166 172.292C531.474 154.64 342.736 227.575 318.392 185.482C294.048 143.39 451.556 16.2389 439.626 1.20579C436.329 -2.7707 420.229 2.75759 386.768 22.737C351.048 43.7885 310.342 54.891 268.88 54.891C227.418 54.891 186.712 43.7885 150.991 22.737C117.434 3.33952 101.916 -2.47973 98.618 1.49676C86.6885 16.7238 243.905 143.584 219.95 185.773Z"
                  fill="currentColor"
                  className="text-brand-black"
                />
              </svg>
            </span>
            <span className="truncate text-base font-semibold text-brand-black sm:text-lg">
              Made with Make
            </span>
          </Link>

          {/* Right side: desktop nav + CTA + mobile toggle */}
          <div className="flex items-center gap-4">

            {/* ── Desktop NavigationMenu ── */}
            <nav className="hidden sm:block">
              <NavigationMenu>
                <NavigationMenuList className="gap-0">

                  {/* Articles dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'bg-transparent text-sm font-medium text-gray-600',
                        'hover:bg-brand-grey/20 hover:text-brand-black',
                        'data-[state=open]:bg-brand-grey/20 data-[state=open]:text-brand-black',
                        'focus:bg-brand-grey/20 h-9 px-3'
                      )}
                      onClick={(event) => {
                        event.preventDefault();
                        router.push('/blog');
                      }}
                    >
                      Articles
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-[320px] p-3 space-y-0.5">
                        {/* All articles + Case studies */}
                        {ARTICLES_STATIC.map((item) => (
                          <DropdownItem key={item.href} {...item} />
                        ))}

                        {/* Top tags divider */}
                        {tagItems.length > 0 && (
                          <>
                            <li className="px-3 pt-2 pb-1">
                              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                                Topics
                              </span>
                            </li>
                            {tagItems.map((item) => (
                              <DropdownItem key={item.href} {...item} />
                            ))}
                          </>
                        )}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Resources dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'bg-transparent text-sm font-medium text-gray-600',
                        'hover:bg-brand-grey/20 hover:text-brand-black',
                        'data-[state=open]:bg-brand-grey/20 data-[state=open]:text-brand-black',
                        'focus:bg-brand-grey/20 h-9 px-3'
                      )}
                      onClick={(event) => {
                        event.preventDefault();
                        router.push('/resources');
                      }}
                    >
                      Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-[320px] p-3 space-y-0.5">
                        {RESOURCES_ITEMS.map((item) => (
                          <DropdownItem key={item.href} {...item} />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* CTA button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="hidden sm:block">
              {scorecardUrl ? (
                <Button asChild variant="accent" className="text-sm px-4 py-2 h-9">
                  <a href={scorecardUrl} target="_blank" rel="noopener noreferrer">
                    Take the Scorecard
                  </a>
                </Button>
              ) : (
                <Button asChild variant="default" className="text-sm px-4 py-2 h-9">
                  <Link href="/contact-us">Contact us</Link>
                </Button>
              )}
            </motion.div>

            {/* Mobile hamburger (phones only) */}
            <button
              className="sm:hidden min-h-[44px] min-w-[44px] p-2.5 rounded-md text-brand-black hover:bg-brand-grey/20 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="sm:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 space-y-1">

              {/* Articles section */}
              <MobileSection label="Articles">
                {ARTICLES_STATIC.map((item) => (
                  <MobileLink key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </MobileLink>
                ))}
                {tagItems.map((item) => (
                  <MobileLink key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </MobileLink>
                ))}
              </MobileSection>

              {/* Resources section */}
              <MobileSection label="Resources">
                {RESOURCES_ITEMS.map((item) => (
                  <MobileLink key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </MobileLink>
                ))}
              </MobileSection>

              {/* CTA */}
              <div className="pt-3 border-t border-gray-100">
                {scorecardUrl ? (
                  <a
                    href={scorecardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-4 py-2.5 bg-brand-orange text-white rounded-lg text-sm font-medium hover:bg-brand-orange/90 transition-colors"
                  >
                    Take the Scorecard
                  </a>
                ) : (
                  <Link
                    href="/contact-us"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-4 py-2.5 bg-brand-black text-white rounded-lg text-sm font-medium hover:bg-brand-black/90 transition-colors"
                  >
                    Contact us
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── Mobile helpers ───────────────────────────────────────────────────────────

function MobileSection({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="flex min-h-[44px] w-full items-center justify-between py-3 text-sm font-semibold text-brand-black"
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden pl-3 pb-1 space-y-0.5"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block min-h-[44px] py-3 text-sm text-gray-600 hover:text-brand-black transition-colors"
    >
      {children}
    </Link>
  );
}
