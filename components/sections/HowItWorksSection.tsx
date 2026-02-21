"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Brain, Gauge } from "lucide-react";
import { fadeIn, stagger } from "@/lib/animations";
import { scorecardUrl } from "@/lib/links";

const steps = [
  {
    step: "01",
    title: "Discovery & Consulting",
    description:
      "We start with a deep dive into your operations, goals, and constraints to understand where automation will actually create value.",
    icon: <Target className="w-6 h-6" />,
  },
  {
    step: "02",
    title: "Automation Strategy & Roadmap",
    description:
      "We map opportunities, prioritize by impact, and define a clear execution plan.",
    icon: <Brain className="w-6 h-6" />,
  },
  {
    step: "03",
    title: "System Design",
    description:
      "We design workflows, integrations, and data flows before implementation begins.",
    icon: <Gauge className="w-6 h-6" />,
  },
  {
    step: "04",
    title: "Execution & Implementation",
    description:
      "We build, test, and deploy automations using Make, AI tools, APIs, and modern platforms.",
    icon: <Gauge className="w-6 h-6" />,
  },
  {
    step: "05",
    title: "Review & Handover",
    description:
      "We validate performance, document systems, and ensure your team understands what was built.",
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
            Our approach
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            From insight to implementation , a proven process
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {steps.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ y: -4 }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 transition-colors h-full flex flex-col">
                <div className="w-12 h-12 bg-brand-black rounded-xl flex items-center justify-center text-white mx-auto mb-6">
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
              Ready to get started?
            </h3>
            <p className="text-gray-600 mb-6">
              Take the Automation Readiness Scorecard first, or book a discovery call to discuss your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {scorecardUrl && (
                <a
                  href={scorecardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-brand-orange text-white font-medium rounded-lg hover:bg-brand-orange/90 transition-colors"
                >
                  Take the Scorecard
                </a>
              )}
                <a
                  href="#book-call"
                  className="inline-flex items-center justify-center px-8 py-3 border border-brand-grey font-medium rounded-lg hover:border-brand-black text-brand-black transition-colors"
                >
                Book a discovery call
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
