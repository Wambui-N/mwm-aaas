"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Brain, Gauge } from "lucide-react";
import { fadeIn, stagger } from "@/lib/animations";

const steps = [
  {
    step: "01",
    title: "Subscribe",
    description:
      "Join the subscription starting with a brief strategy call where we'll identify your workflows, goals, and bottlenecks.",
    icon: <Target className="w-6 h-6" />,
  },
  {
    step: "02",
    title: "Identify",
    description:
    "We meet weekly (or as need) to review what’s working and what need to be automated. ",
    icon: <Brain className="w-6 h-6" />,
  },
  {
    step: "03",
    title: "Automate",
    description:
      "I will build, test, and launch one automation at a time, tailored to your exact workflow.",
    icon: <Gauge className="w-6 h-6" />,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeIn}
            className="text-3xl md:text-4xl font-display font-semibold text-black mb-4"
          >
            How it works
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Three simple steps to automate your business operations
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -4 }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-colors h-full flex flex-col">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white mx-auto mb-6">
                  {item.icon}
                </div>
                <div className="text-sm text-gray-500 mb-2">{item.step}</div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-display font-semibold text-black mb-4">
              Find out what you could automate first
            </h3>
            <p className="text-gray-600 mb-6">
              Free 30-minute strategy call to identify your biggest automation opportunities
            </p>
            <a
              href="#book-call"
              className="inline-flex items-center justify-center px-8 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Let's talk
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
