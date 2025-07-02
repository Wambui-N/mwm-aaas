'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, stagger } from '@/lib/animations';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <motion.div 
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={stagger}
      className={`text-center mb-16 ${className}`}
    >
      <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold text-black mb-4">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={fadeIn} className="text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
} 