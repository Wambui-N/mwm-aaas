"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export default function AboutSnapshotSection() {
  const scrollToFounder = () => {
    const element = document.getElementById("founder");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-black mb-4">
            Who we are
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Founded by Wambui Ndung&apos;u, with a background in mathematics and computer science
            and a passion for breaking down complex problems into elegant solutions.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            We exist to close the gap between automation advice and real implementation—
            helping teams identify high-impact opportunities and build systems that work.
          </p>
          <button
            onClick={scrollToFounder}
            className="text-black font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            Learn more about Made with Make
          </button>
        </motion.div>
      </div>
    </section>
  );
}
