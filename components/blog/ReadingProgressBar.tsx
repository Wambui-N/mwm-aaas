"use client";

import React from "react";
import { motion, useScroll } from "framer-motion";

type Props = {
  targetRef: React.RefObject<HTMLElement>;
};

export default function ReadingProgressBar({ targetRef }: Props) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-[2px] md:h-[3px] bg-brand-orange origin-left z-[60]"
    />
  );
}
