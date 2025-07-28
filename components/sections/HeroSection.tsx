"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, CheckCircle, Settings, Sparkles } from "lucide-react";

export default function HeroSection() {
  const scrollToBookCall = () => {
    const element = document.getElementById("book-call");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPricing = () => {
    const element = document.getElementById("pricing");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 mb-8">
            <Sparkles className="w-3 h-3 mr-2" />
            Automation subscription for busy founders
          </div>

          <h1 className="text-5xl md:text-6xl font-medium text-black mb-6 leading-tight font-display">
          Sick of doing work
            <br />
            that software should handle?
          </h1>

          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          I partner with lean teams to remove their bottlenecks, one automation at a time, so they can <strong>scale without hiring more people</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={scrollToBookCall}
                className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-base group"
              >
               Apply to Work With Me
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={scrollToPricing}
                variant="outline"
                className="px-8 py-3 text-base border-gray-300 hover:border-gray-400"
              >
                See pricing
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Simple visual element */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-500">
                Automation Dashboard
              </span>
            </div>

            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">
                    Lead qualification
                  </span>
                </div>
                <span className="text-sm text-gray-600">94% accuracy</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Email sequences</span>
                </div>
                <span className="text-sm text-gray-600">847 sent today</span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <Settings className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">CRM sync</span>
                </div>
                <span className="text-sm text-gray-600">Real-time</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
