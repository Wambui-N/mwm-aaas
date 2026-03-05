"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const testimonials = [
  {
    quote:
      "I enjoyed working with Wambui on automating our proposal process. She is honest, professional, and ensures that she follows through on what she promises. I would definitely recommend working with her.",
    author: "Joyce Kayima",
    company: "Founder's Freedom",
    initials: "JK",
  },
  {
    quote:
      "Collaborating with you was a highly professional and rewarding experience. The proposal automation solution has significantly enhanced our efficiency, reduced operational strain, and improved the overall quality of our proposals.",
    author: "Felix Kirui",
    company: "Triple C Advisory",
    initials: "FK",
  },
];

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transform for parallax on the large number
  const numberX = useTransform(x, [-200, 200], [-20, 20]);
  const numberY = useTransform(y, [-200, 200], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    }
  };

  const goNext = () =>
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const goPrev = () =>
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, []);

  const count = testimonials.length || 1;
  const safeIndex = ((activeIndex % count) + count) % count;
  const current = testimonials[safeIndex];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-5xl mx-auto h-[500px] overflow-hidden rounded-3xl border border-gray-100 bg-white/50 px-6 py-10 md:px-10 md:py-14 shadow-sm"
    >
      {/* Oversized index number - positioned to bleed off left edge */}
      <motion.div
        className="pointer-events-none absolute -left-6 top-1/2 -translate-y-1/2 select-none text-[18rem] font-bold leading-none tracking-tighter text-brand-black/5 md:-left-10 md:text-[22rem]"
        style={{ x: numberX, y: numberY }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* Main content - asymmetric layout */}
      <div className="relative flex">
        {/* Left column - vertical label */}
        <div className="flex flex-col items-center justify-center pr-10 border-r border-brand-grey/60">
          <motion.span
            className="font-display text-xs font-medium uppercase tracking-[0.2em] text-gray-500"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Testimonials
          </motion.span>

          {/* Vertical progress line */}
          <div className="relative mt-8 h-32 w-px bg-brand-grey/40">
            <motion.div
              className="absolute left-0 top-0 h-full w-full origin-top bg-brand-orange"
              animate={{
                scaleY: (safeIndex + 1) / count,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Center - main content */}
        <div className="flex-1 pl-10 py-4 md:py-6 h-full ">
          {/* Company badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full border bg-brand-grey/20 border-brand-grey/70 px-3 py-1 text-xs font-mono uppercase tracking-[0.16em] text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />
                {current.company}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Quote with character reveal */}
          <div className="relative mb-10 min-h-[120px] md:mb-12">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeIndex}
                className="font-display text-2xl leading-[1.3] tracking-tight text-brand-black md:text-3xl"
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {current.quote.split(" ").map((word, i) => (
                  <motion.span
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    className="mr-[0.3em] inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 16, rotateX: 90 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        transition: {
                          duration: 0.45,
                          delay: i * 0.04,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                      exit: {
                        opacity: 0,
                        y: -10,
                        transition: { duration: 0.2, delay: i * 0.02 },
                      },
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Author row + navigation */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="flex items-center gap-4"
              >
                {/* Animated line before name */}
                <motion.div
                  className="h-px w-8 bg-brand-black"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  style={{ originX: 0 }}
                />
                <div>
                  <p className="text-base font-semibold text-brand-black">
                    {current.author}
                  </p>
                  <p className="text-sm text-gray-500">{current.company}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                onClick={goPrev}
                className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-brand-grey/70 bg-brand-grey/20"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-brand-black"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                />
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="relative z-10 text-brand-black group-hover:text-white transition-colors"
                >
                  <path
                    d="M10 12L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>

              <motion.button
                type="button"
                onClick={goNext}
                className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-brand-grey/70 bg-brand-grey/20"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-brand-black"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                />
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="relative z-10 text-brand-black group-hover:text-white transition-colors"
                >
                  <path
                    d="M6 4L10 8L6 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom ticker - subtle repeating company names */}
      <div className="pointer-events-none absolute -bottom-12 left-0 right-0 overflow-hidden opacity-[0.06]">
        <motion.div
          className="flex whitespace-nowrap text-4xl font-semibold tracking-tight text-brand-black"
          animate={{ x: [0, -800] }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {[...Array(10)].map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <span key={i} className="mx-8">
              {testimonials.map((t) => t.company).join(" • ")} •
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

