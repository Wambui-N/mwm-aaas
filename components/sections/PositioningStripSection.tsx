'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function PositioningStripSection() {
  return (
    <section className="py-8 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center"
        >
          <span className="text-sm md:text-base font-medium text-gray-700">
            Strategy-led. Execution-driven.
          </span>
          <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full"></div>
          <span className="text-sm md:text-base font-medium text-gray-700">
            No handoffs.
          </span>
          <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full"></div>
          <span className="text-sm md:text-base font-medium text-gray-700">
            From insight to implementation.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
