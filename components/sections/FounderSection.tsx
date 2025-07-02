"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

export default function FounderSection() {
  return (
    <section id="founder" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-5 gap-12 items-center"
        >
          {/* Photo */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="aspect-square bg-none rounded-2xl overflow-hidden">
                <img
                  src="/founder.png"
                  alt="Wambui Ndung'u"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.a
                href="https://www.linkedin.com/in/wambui-ndungu-210409193/"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 p-2 bg-white/50 rounded-full hover:bg-white/80 transition-colors"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 1, scale: 1.1 }}
              >
                <Linkedin className="w-6 h-6 text-gray-800" />
              </motion.a>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-black mb-4">
                Meet Wambui Ndung'u
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  I enjoy problem solving. I probably took apart one too many
                  devices as a kid, but instead of becoming an engineer, I fell
                  in love with programming. So I studied mathematics and
                  computer science.
                </p>

                <p>
                  After my brief encounter with a corporate job, I decided to
                  take the leap and start a business.
                </p>

                <p>
                  Made With Make started from my obsession with breaking things
                  down to understand how they work, and my constant mission to
                  find the simplest way to get the best result.
                </p>

                <p>
                  Now I help founders streamline their operations, free up their
                  time, and finally scale without burning out.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
