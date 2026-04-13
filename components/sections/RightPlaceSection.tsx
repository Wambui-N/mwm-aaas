"use client";

import React from "react";
import { motion } from "framer-motion";

const FIT_POINTS = [
  "Your team has grown past 10 people but you're still running on the same processes you used when it was just you.",
  "You suspect you're losing time - or clients - to things that should be automatic by now.",
  "You've tried to fix it before (Zapier, a VA, a spreadsheet) and it didn't stick.",
  "You want something built and handed over - not a consultant who tells you what to do and leaves.",
  "You run most of your business on Google Workspace and want your tools to actually work together.",
];

export default function RightPlaceSection() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className=" p-5 sm:p-6"
        >
          <p className="text-[11px] text-center font-semibold uppercase tracking-[0.16em] text-brand-orange">
            Is this for you?
          </p>

          <h2 className="mt-4 text-3xl text-center font-display font-semibold leading-tight text-brand-black md:text-4xl">
            You&apos;re in the right place if...
          </h2>

          <ul className="mt-8 divide-y divide-brand-grey/50 border-y border-brand-grey/50">
            {FIT_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 py-5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                <p className="text-base leading-relaxed text-brand-black">{point}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
