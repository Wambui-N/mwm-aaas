"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn, stagger } from "@/lib/animations";
import { Testimonial } from "@/components/ui/design-testimonial";
import SectionHeader from "../ui/section-header";

export default function TestimonialSection() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader title="Client feedback" />

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

