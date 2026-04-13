"use client";

import React from "react";
import { motion } from "framer-motion";
import { Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FounderSection() {
  return (
    <section id="founder" className="py-20">
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-10 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,3fr)] lg:min-h-[360px]"
        >
          {/* Left: photo spanning the section height */}
          <div className="relative h-full">
            <div className="h-full max-h-[50vh] overflow-hidden rounded-2xl bg-gray-100 sm:max-h-none">
              <img
                src="/founder.jpg"
                alt="Wambui Ndung'u"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right: top intro + bottom story/actions */}
          <div className="flex h-full flex-col justify-between">
            {/* Top block: title + name + short line */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-brand-orange">
                Founder
              </p>
              <h2 className="mb-3 text-3xl font-display font-semibold text-brand-black md:text-4xl">
                Wambui Ndung&apos;u
              </h2>
              <p className="max-w-xl text-sm text-gray-500">
                Automation consultant &amp; problem solver for established teams.
              </p>
            </div>

            {/* Bottom block: story + social + CTA */}
            <div className="mt-8 space-y-5 text-base leading-normal text-brand-black/80">
              <div className="space-y-4">
                <p>
                I built my first automation to stop doing something I hated doing manually. That was it,
                no grand vision, just a problem I wanted to go away. It worked. Then I built another one.
                </p>
                <p>
                Turns out, finding a messy workflow and making the repetitive parts disappear is genuinely fun for me.
                That probably says something about me. It definitely explains the business.
                </p>
                {/* <p>
                  The right automation frees up your time to focus on what really matters: growing your
                  business and serving your customers.
                </p> */}
              </div>

              <div className="mt-4 flex flex-col items-start gap-3">
                <a
                  href="https://www.linkedin.com/in/wambui-ndungu-210409193/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-grey/60 bg-white text-brand-black shadow-sm hover:border-brand-black hover:bg-brand-grey/20 transition-colors"
                  aria-label="Connect with Wambui on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <Button
                  asChild
                  variant="accent"
                  className="px-5 py-2 text-xs md:text-sm"
                >
                  <a href="/assessment">
                  Take the Automation Gap Audit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
