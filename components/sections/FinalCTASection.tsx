"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function FinalCTASection() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30-min-discovery-meeting" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#292929" },
          dark: { "cal-brand": "#fafafa" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section id="book-call" className="py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-black mb-6">
            Ready to automate with clarity and execution?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            If you want automation that actually works , let's talk.
          </p>

          <div className="h-[600px] w-full">
            <Cal
              namespace="30-min-discovery-meeting"
              calLink="madewithmake/30-min-discovery-meeting"
              style={{
                width: "100%",
                height: "100%",
                overflow: "scroll",
              }}
              config={{
                layout: "month_view",
                theme: "light",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
