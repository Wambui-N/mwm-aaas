"use client";

import React from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    number: "1",
    title: "Find where you're bleeding time and money",
    body: "We start with the Automation Gap Audit - a fast diagnostic that shows exactly which processes are costing you the most, and which ones are ready to automate right now. No fluff, no 40-page report.",
  },
  {
    number: "2",
    title: "Fix the process before we automate it",
    body: "Most automations break because people automate a broken process. Before anything gets built, we map out what the workflow should actually look like - so the system we build doesn't just run faster, it runs right.",
  },
  {
    number: "3",
    title: "Build it. Test it. Hand it over.",
    body: "Then we build - on Make.com, Google Workspace, and whatever tools your team already uses. Everything gets documented so your non-technical team can maintain it without calling anyone.",
  },
  {
    number: "4",
    title: "Your team focuses on work that actually needs them",
    body: "The system runs. The admin disappears. Your people do the work they were hired to do. And when you're ready to scale the next thing, you know where to come.",
  },
];

export default function DeliveryProcessSection() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="p-5 sm:p-6"
        >
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
            How it works
          </p>
          <h2 className="my-6 text-center text-2xl font-display font-semibold leading-tight text-brand-black md:text-4xl">
            From "we&apos;re drowning"
            <br />
            to "it just runs."
          </h2>
          <p className="my-3 mx-auto max-w-3xl text-center text-base leading-relaxed text-gray-700">
            This isn&apos;t consulting where you get a strategy deck and a
            handshake. Every engagement ends with a working system your team can
            actually maintain.
          </p>

          <div className="mx-auto mt-8 max-w-2xl">
            {STEPS.map((step, index) => (
              <div key={step.number} className="relative pl-12 pb-10 last:pb-0">
                {index < STEPS.length - 1 && (
                  <span className="absolute left-[15px] top-8 h-[calc(100%-0.5rem)] w-px bg-brand-grey/60" />
                )}

                <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange text-sm font-semibold text-white">
                  {step.number}
                </div>

                <h3 className="text-2xl font-medium text-brand-black">
                  {step.title}
                </h3>
                <p className="mt-2 mb-6 text-base leading-relaxed text-gray-700">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
