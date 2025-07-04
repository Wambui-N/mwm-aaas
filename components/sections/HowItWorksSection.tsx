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
      "Join the automation subscription and kick things off with a quick strategy call. We’ll get clear on your workflows, goals, and the repetitive tasks holding you back.",
    icon: <Target className="w-6 h-6" />,
  },
  {
    step: "02",
    title: "Identify",
    description:
      "We meet weekly to review what’s working and what’s wasting your time. Together, we’ll prioritize automations that free you up and move the business forward.",
    icon: <Brain className="w-6 h-6" />,
  },
  {
    step: "03",
    title: "Automate",
    description:
      "I build, test, and launch one custom automation at a time—tailored to your exact workflow.It runs quietly in the background, saving you hours each week.",
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
              <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white mx-auto mb-6">
                  {item.icon}
                </div>
                <div className="text-sm text-gray-500 mb-2">{item.step}</div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
