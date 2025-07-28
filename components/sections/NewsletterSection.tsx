"use client";

import { stagger } from "@/lib/animations";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    ml?: any;
  }
}

const NewsletterSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  
    function initMailerLite() {
        if (window.ml) {
          window.ml("account", "1316698");
          window.ml("form", "DlIfr4"); // ✅ this actually renders the form
        }
      }
  
      if (!document.getElementById("mailerlite-universal")) {
        const script = document.createElement("script");
        script.id = "mailerlite-universal";
        script.async = true;
        script.src = "https://assets.mailerlite.com/js/universal.js";
        script.onload = initMailerLite;
        document.body.appendChild(script);
      } else {
        initMailerLite(); // Run immediately if already loaded
      }
    }, []);

  if (!mounted) return null; // Prevent SSR mismatch

  return (
    <section id="expect" className="py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-16"
        >
          <div className="ml-embedded" data-form="DlIfr4"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
