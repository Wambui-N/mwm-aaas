"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";



export default function FounderSection() {
  return (
    <section id="founder" className="py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Wambui Ndung'u",
            "jobTitle": "Founder & Automation Specialist",
            "worksFor": {
              "@type": "Organization",
              "name": "Made with Make"
            },
            "description": "Founder of Made with Make, helping founders streamline operations through automation",
            "image": "https://madewithmake.com/founder.png",
            "url": "https://madewithmake.com",
            "sameAs": [
              "https://www.linkedin.com/in/wambui-ndungu-210409193/"
            ],
            "knowsAbout": [
              "Business Automation",
              "Workflow Optimization",
              "Make.com",
              "Process Automation",
              "Founder Operations"
            ]
          })
        }}
      />
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
                About MadewithMake
              </h2>

              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  MadewithMake exists to close the gap between automation advice and real implementation.
                </p>

                <p>
                  We believe automation should simplify work , not create more confusion. That's why we work across both consulting and execution, ensuring ideas become reliable systems.
                </p>

                <p>
                  Founded by Wambui Ndung'u, who brings a background in mathematics, computer science, and a passion for breaking down complex problems into elegant solutions.
                </p>

                <p>
                  We help teams understand their processes, identify high-impact opportunities, and build automation systems that actually work in the real world.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
