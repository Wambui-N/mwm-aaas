"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";
import { calBookingAnchor } from "@/lib/links";

// ─── HeroSection ──────────────────────────────────────────────────────────────

export default function HeroSection() {
  const scrollToBookCall = () => {
    const element = document.getElementById(calBookingAnchor.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative pt-16 pb-16 sm:pt-24 sm:pb-24 overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-4xl md:text-5xl font-medium text-brand-black mb-6 leading-tight font-display"
          >
            Your team is too good <br /> to be doing this manually.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed text-balance"
          >
            You've built a real business. But somewhere between growing from 5 people to 25, 
            <b> the operations stopped keeping up</b>. Now your best people are spending their mornings 
            on admin that <b> a well-built system could do overnight</b>.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mt-10 justify-center"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                variant="accent"
                className="w-full sm:w-auto px-8 py-4 text-base group"
              >
                <a href="/assessment">
                  Take the Automation Gap Audit
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                variant="outline"
                className="w-full sm:w-auto px-8 py-4 text-base group"
              >
                <a href="/resources">
                  See how it works
                  <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
