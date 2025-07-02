'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { fadeIn, stagger } from '@/lib/animations';

const includedItems = [
  "Weekly strategy/check-in calls",
  "One active automation request at a time",
  "Unlimited backlog requests (we'll queue them)",
  "Tailored automations built around your tools and workflows",
  "Revisions, testing, and ongoing improvements",
  "Full support and documentation for each automation"
];

const notIncludedItems = [
  "Multiple active builds at the same time",
  "Full-scale software/app development",
  "Tech support for tools outside your automations",
  "Marketing or copywriting services",
  "Team training (unless part of the automation delivery)"
];

export default function WhatToExpectSection() {
  return (
    <section id="expect" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-semibold text-black mb-4">
            Service Details
          </motion.h2>
          <motion.p variants={fadeIn} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Clear expectations for a successful partnership
          </motion.p>
        </motion.div>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* What's Included */}
          <motion.div variants={fadeIn} className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="flex items-center space-x-2 mb-6">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-semibold text-black">What's Included</h3>
            </div>
            <ul className="space-y-4">
              {includedItems.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* What's Not Included */}
          <motion.div variants={fadeIn} className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="flex items-center space-x-2 mb-6">
              <XCircle className="w-6 h-6 text-red-500" />
              <h3 className="text-xl font-semibold text-black">What's Not Included</h3>
            </div>
            <ul className="space-y-4">
              {notIncludedItems.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 