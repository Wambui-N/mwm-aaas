'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Settings, CheckCircle } from 'lucide-react';
import { fadeIn, stagger } from '@/lib/animations';

const features = [
  {
    title: "Lightning fast",
    description: "Most automations delivered within 48-72 hours",
    icon: <Zap className="w-5 h-5" />
  },
  {
    title: "Zero learning curve", 
    description: "You focus on business. I handle the technical complexity",
    icon: <Shield className="w-5 h-5" />
  },
  {
    title: "Full management",
    description: "Build, deploy, monitor, maintain, and optimize everything", 
    icon: <Settings className="w-5 h-5" />
  },
  {
    title: "Transparent pricing",
    description: "One flat rate. No hidden fees or surprise charges",
    icon: <CheckCircle className="w-5 h-5" />
  }
];

export default function WhyChooseSection() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-semibold text-black mb-4">
            Why choose Made with Make
          </motion.h2>
          <motion.p variants={fadeIn} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built specifically for founders who need results, not excuses
          </motion.p>
        </motion.div>

        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -2 }}
              className="p-6 bg-white border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-black mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 