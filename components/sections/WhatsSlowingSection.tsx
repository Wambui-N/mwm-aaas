"use client";

import React from "react";
import { motion } from "framer-motion";

import { fadeIn, stagger } from "@/lib/animations";

export default function WhatsSlowingSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Left Column - Sticky Title */}
          <motion.div
            variants={fadeIn}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-display font-semibold text-black"
            >
              Most automation projects fail before they start
            </motion.h2>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div variants={fadeIn} className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Not because tools don't exist , but because:
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-800">Teams don't know what to automate first</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-800">Advice is given without ownership of execution</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-800">
                  Systems are built without understanding real workflows
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-800">
                  Automations break, stall, or never get adopted
                </span>
              </li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed font-semibold">
              Automation needs thinking and doing , not one or the other.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
