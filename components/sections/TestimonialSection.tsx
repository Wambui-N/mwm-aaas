"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn, stagger } from "@/lib/animations";
import { Testimonial } from "@/components/ui/design-testimonial";

export default function TestimonialSection() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="mb-12 text-center md:mb-16"
        >
          <motion.h2
            variants={fadeIn}
            className="mb-4 text-3xl font-display font-semibold text-brand-black md:text-4xl"
          >
            Client feedback
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="mx-auto max-w-2xl text-sm text-gray-600 md:text-base"
          >
            Real results from founders and teams who trusted us to design and
            automate their systems.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Testimonial />
        </motion.div>
      </div>
    </section>
  );
}

