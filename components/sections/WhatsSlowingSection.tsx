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
              What's slowing you down?
            </motion.h2>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div variants={fadeIn} className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Running a business comes with a lot of moving parts. You're
              managing leads, talking to customers, sending updates, chasing
              payments…
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              At first, it feels manageable. But over time, small tasks start
              piling up. You find yourself doing the same things over and over:
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-800">Following up with clients</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-800">Qualifying leads</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-800">
                  Drafting proposals or reports
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-800">
                  Moving data from one tool to another
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-800">
                  Sending invoices and tracking payments
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-800">
                  Remembering to post content or send emails
                </span>
              </li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              These bottlenecks don't just waste time. They slow your business
              down. That's where I come in.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              I partner with growing teams that want to scale without hiring
              more staff. I help you stay focused on the work that matters,
              while I quietly fix the backend, one automation at a time.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
