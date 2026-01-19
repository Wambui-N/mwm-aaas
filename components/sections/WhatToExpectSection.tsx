'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { fadeIn, stagger } from '@/lib/animations';

const whatWeOffer = [
  {
    category: "Automation & AI Consulting",
    items: [
      "Process audits",
      "Automation opportunity assessment",
      "Architecture & tool selection",
      "Strategy and roadmap design"
    ]
  },
  {
    category: "Automation Execution",
    items: [
      "Make.com workflows",
      "AI integrations",
      "API connections",
      "Process automation"
    ]
  },
  {
    category: "Optimization & Scaling",
    items: [
      "Performance improvements",
      "System refinement",
      "Expansion as your business grows"
    ]
  }
];

const whoWeWorkWith = {
  goodFit: [
    "Founders and leadership teams",
    "Growing businesses",
    "Organizations seeking operational efficiency",
    "Teams that want a partner, not just advice"
  ],
  notAFit: "If you're only looking for ideas or templates, we're not the right fit."
};

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
            What we offer
          </motion.h2>
          <motion.p variants={fadeIn} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Consulting and execution services designed for real results
          </motion.p>
        </motion.div>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Services Column */}
          <motion.div variants={fadeIn} className="space-y-6">
            {whatWeOffer.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-black mb-4">{service.category}</h3>
                <ul className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Who We Work With Column */}
          <motion.div variants={fadeIn} className="space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="flex items-center space-x-2 mb-6">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-semibold text-black">Who we work with</h3>
              </div>
              <p className="text-gray-600 mb-4">We work best with:</p>
              <ul className="space-y-3">
                {whoWeWorkWith.goodFit.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-600 italic">{whoWeWorkWith.notAFit}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-black mb-4">How engagements work</h3>
              <p className="text-gray-600">
                Each engagement is structured around your needs and may include a consulting phase, an implementation phase, and an optimization phase. Projects are scoped clearly and priced transparently.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 