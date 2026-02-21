'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { scorecardUrl, bookingUrl } from '@/lib/links';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/resources', label: 'Resources' },
];

export default function Navigation() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            aria-label="Made with Make - Home"
            className="flex items-center space-x-2 focus:outline-none"
          >
            <span className="w-8 h-8 flex items-center justify-center">
              <svg
                width="32"
                height="28"
                viewBox="0 0 539 468"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M219.95 185.773C195.606 227.866 6.57676 154.931 0.175575 172.583C-1.66719 177.432 10.8442 188.198 44.8869 207.498C80.9172 227.851 110.851 257.466 131.587 293.277C152.323 329.088 163.108 369.792 162.824 411.172C162.824 449.967 165.539 466.358 170.68 467.134C189.204 470.238 220.434 270.249 269.122 270.249C317.81 270.249 349.04 470.238 367.565 467.134C372.705 466.358 375.809 450.064 375.421 410.881C375.136 369.501 385.921 328.797 406.657 292.986C427.394 257.176 457.327 227.56 493.358 207.207C527.4 187.81 540.009 177.141 538.166 172.292C531.474 154.64 342.736 227.575 318.392 185.482C294.048 143.39 451.556 16.2389 439.626 1.20579C436.329 -2.7707 420.229 2.75759 386.768 22.737C351.048 43.7885 310.342 54.891 268.88 54.891C227.418 54.891 186.712 43.7885 150.991 22.737C117.434 3.33952 101.916 -2.47973 98.618 1.49676C86.6885 16.7238 243.905 143.584 219.95 185.773Z"
                  fill="currentColor"
                  className="text-brand-black"
                />
              </svg>
            </span>
            <span className="text-lg font-semibold text-brand-black">Made with Make</span>
          </Link>
          <div className="flex items-center space-x-4 md:space-x-6">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(230, 80, 50, 0.4)",
                  "0 0 0 8px rgba(230, 80, 50, 0)",
                  "0 0 0 0 rgba(230, 80, 50, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-brand-grey/30 border border-brand-grey rounded-full"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-2 h-2 bg-brand-orange rounded-full"
              />
              <span className="text-xs font-medium text-brand-black">
                Start Today
              </span>
            </motion.div>
            <nav className="hidden sm:flex items-center space-x-4 md:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-brand-black transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {scorecardUrl ? (
                <Button asChild variant="accent" className="text-sm px-4 py-2 h-9">
                  <a
                    href={scorecardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Take the Scorecard
                  </a>
                </Button>
              ) : (
                <Button asChild variant="default" className="text-sm px-4 py-2 h-9">
                  <Link href={bookingUrl}>Book a discovery call</Link>
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
