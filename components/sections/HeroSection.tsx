"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, CheckCircle, Settings, Sparkles } from "lucide-react";
import { scorecardUrl, calBookingAnchor } from "@/lib/links";

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
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
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
    <section className="pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >


          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-medium text-brand-black mb-6 leading-tight font-display"
          >
            Automation consulting for established teams
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 mb-2 max-w-4xl mx-auto leading-normal"
          >
            I automate <b>manual workflows</b> for established teams, so work runs smoother and you can focus on growth.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 mb-10 max-w-4xl mx-auto leading-normal"
          >
            At Made with Make, that means <b>auditing your processes</b>, designing <b>smart automations</b>, and implementing <b>systems that work in the background</b> while you focus on growing your business and serving customers.

          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button asChild variant="accent" className="px-8 py-3 text-base group">
                <a href="/contact-us">
                  Get a free consultation
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={scrollToBookCall}
                variant="outline"
                className="px-8 py-3 text-base border-brand-grey hover:border-brand-black text-brand-black"
              >
                Book a discovery call
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>


      </div>
    </section>
  );
}
