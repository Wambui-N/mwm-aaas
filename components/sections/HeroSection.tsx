"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { calBookingAnchor } from "@/lib/links";

// ─── Tools list (name + optional SVG icon from svgl.app) ───────────────────────

const TOOL_ICONS: Record<string, string> = {
  // SVGL has great brand SVGs for many tools, but not all.
  // For the ones SVGL doesn't have, we fall back to Google's favicon service.
  "Make.com": "https://www.google.com/s2/favicons?domain=make.com&sz=64",
  "Google Sheets": "https://svgl.app/library/google-sheets.svg",
  "Notion": "https://svgl.app/library/notion.svg",
  "Slack": "https://svgl.app/library/slack.svg",
  "Airtable": "https://www.google.com/s2/favicons?domain=airtable.com&sz=64",
  "Tally": "https://www.google.com/s2/favicons?domain=tally.so&sz=64",
  "Cal.com": "https://svgl.app/library/cal.svg",
  "ClickUp": "https://www.google.com/s2/favicons?domain=clickup.com&sz=64",
  "ChatGPT": "https://svgl.app/library/openai.svg",
  "Typeform": "https://www.google.com/s2/favicons?domain=typeform.com&sz=64",
  "WhatsApp": "https://svgl.app/library/whatsapp-icon.svg",
  // Claude is an Anthropic product; use the black mark for light backgrounds.
  "Claude": "https://svgl.app/library/anthropic_black.svg",
  "Calendly": "https://svgl.app/library/calendly.svg",
  "Google Drive": "https://svgl.app/library/drive.svg",
  "Google Forms": "https://www.google.com/s2/favicons?domain=forms.google.com&sz=64",
  "LinkedIn": "https://svgl.app/library/linkedin.svg",
  "Instagram": "https://svgl.app/library/instagram-icon.svg",
  "Perplexity": "https://svgl.app/library/perplexity.svg",
  "DeepSeek": "https://svgl.app/library/deepseek.svg",
  "Google Calendar": "https://svgl.app/library/google-calendar.svg",
};

const ORBIT_1 = [
  "Make.com",
  "Google Sheets",
  "Notion",
  "Slack",
  "Airtable",
  "Tally",
];

const ORBIT_2 = [
  "Cal.com",
  "ClickUp",
  "ChatGPT",
  "Typeform",
  "WhatsApp",
  "Claude",
  "Calendly",
];

const ORBIT_3 = [
  "Google Drive",
  "Google Forms",
  "LinkedIn",
  "Instagram",
  "Perplexity",
  "DeepSeek",
  "Google Calendar",
];

// ─── Orbit helpers ────────────────────────────────────────────────────────────

/**
 * Distribute N badges evenly around a circle.
 * Returns an array of {x, y} percentages relative to orbit centre (50%,50%).
 */
function orbitPositions(count: number, radiusPct: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2; // start at top
    return {
      left: `calc(50% + ${Math.cos(angle) * radiusPct}%)`,
      top: `calc(50% + ${Math.sin(angle) * radiusPct}%)`,
    };
  });
}

function ToolBadge({
  name,
  icon,
  pos,
  counterClass,
  className,
}: {
  name: string;
  icon?: string;
  pos: { left: string; top: string };
  counterClass: string;
  className?: string;
}) {
  if (!icon) return null;
  return (
    <span
      className={`absolute -translate-x-1/2 -translate-y-1/2 ${counterClass} flex size-11 items-center justify-center rounded-full border bg-white/70 shadow-sm backdrop-blur-sm ${className ?? ""}`}
      style={pos}
      title={name}
    >
      <img
        src={icon}
        alt=""
        aria-hidden
        className="h-5 w-5 object-contain"
      />
    </span>
  );
}

// ─── FloatingToolsBackground ──────────────────────────────────────────────────

function FloatingToolsBackground() {
  const orbit1 = ORBIT_1.filter((name) => TOOL_ICONS[name]);
  const orbit2 = ORBIT_2.filter((name) => TOOL_ICONS[name]);
  const orbit3 = ORBIT_3.filter((name) => TOOL_ICONS[name]);

  const pos1 = orbitPositions(orbit1.length, 38);
  const pos2 = orbitPositions(orbit2.length, 32);
  const pos3 = orbitPositions(orbit3.length, 28);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Soft radial gradient so text stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,white_30%,transparent_80%)] z-10" />

      {/* ── Orbit 1 (outer, clockwise) — hidden on mobile ── */}
      <div className="hidden sm:block absolute inset-0 hero-animate-spin-slow">
        {/* orbit ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-grey/30"
          style={{ width: "76%", paddingBottom: "76%" }}
        />
        {pos1.map((pos, i) => (
          <ToolBadge
            key={orbit1[i]}
            name={orbit1[i]}
            icon={TOOL_ICONS[orbit1[i]]}
            pos={pos}
            counterClass="hero-badge-counter"
            className="border-brand-grey/40 bg-white/70 text-brand-black/60"
          />
        ))}
      </div>

      {/* ── Orbit 2 (middle, counter-clockwise) ── */}
      <div className="absolute inset-0 hero-animate-spin-slow-reverse">
        {/* orbit ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-orange/15"
          style={{ width: "52%", paddingBottom: "52%" }}
        />
        {pos2.map((pos, i) => (
          <ToolBadge
            key={orbit2[i]}
            name={orbit2[i]}
            icon={TOOL_ICONS[orbit2[i]]}
            pos={pos}
            counterClass="hero-badge-counter-rev"
            className="border-brand-grey/30 bg-white/80 text-brand-black/70"
          />
        ))}
      </div>

      {/* ── Orbit 3 (inner, clockwise) — hidden on mobile ── */}
      <div className="hidden sm:block absolute inset-0 hero-animate-spin-slow">
        {/* orbit ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-grey/20"
          style={{ width: "44%", paddingBottom: "44%" }}
        />
        {pos3.map((pos, i) => (
          <ToolBadge
            key={orbit3[i]}
            name={orbit3[i]}
            icon={TOOL_ICONS[orbit3[i]]}
            pos={pos}
            counterClass="hero-badge-counter"
            className="border-brand-grey/30 bg-white/75 text-brand-black/60"
          />
        ))}
      </div>
    </div>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────

export default function HeroSection() {
  const scrollToBookCall = () => {
    const element = document.getElementById(calBookingAnchor.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative pt-24 pb-24 overflow-hidden">
      {/* Animated background layer */}
      <FloatingToolsBackground />

      {/* Content — sits above the background */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-medium text-brand-black mb-6 leading-tight font-display"
          >
            Automation consulting for established teams
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 mb-2 max-w-4xl mx-auto leading-normal"
          >
            I automate <b>manual workflows</b> for established teams, so work
            runs smoother and you can focus on growth.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-700 mb-10 max-w-4xl mx-auto leading-normal"
          >
            At Made with Make, that means <b>auditing your processes</b>,
            designing <b>smart automations</b>, and implementing{" "}
            <b>systems that work in the background</b> while you focus on
            growing your business and serving customers.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                variant="accent"
                className="px-8 py-3 text-base group"
              >
                <a href="/contact-us">
                  Get a free consultation
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
