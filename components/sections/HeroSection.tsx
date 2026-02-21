"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, CheckCircle, Settings, Sparkles } from "lucide-react";
import { scorecardUrl, calBookingAnchor } from "@/lib/links";

export default function HeroSection() {
  const scrollToBookCall = () => {
    const element = document.getElementById(calBookingAnchor.replace("#", ""));
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
          <div className="inline-flex items-center px-3 py-1 bg-brand-grey/40 rounded-full text-sm text-brand-black mb-8">
            <Sparkles className="w-3 h-3 mr-2" />
            Automation & AI Consulting , with Execution
          </div>

          <h1 className="text-5xl md:text-6xl font-medium text-brand-black mb-6 leading-tight font-display">
            We consult and execute
            <br />
            automation solutions that work
          </h1>

          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            MadewithMake helps teams identify what to automate, design the right systems, and implement scalable AI-powered workflows , end to end.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {scorecardUrl ? (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  variant="accent"
                  className="px-8 py-3 text-base group"
                >
                  <a href={scorecardUrl} target="_blank" rel="noopener noreferrer">
                    Take the Scorecard
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={scrollToBookCall}
                  variant="default"
                  className="px-8 py-3 text-base group"
                >
                  Book a discovery call
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            )}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={scrollToBookCall}
                variant="outline"
                className="px-8 py-3 text-base border-brand-grey hover:border-brand-black text-brand-black"
              >
                Book a discovery call
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
          <div className="bg-brand-grey/20 rounded-2xl p-8 max-w-2xl mx-auto border border-brand-grey/50">
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
