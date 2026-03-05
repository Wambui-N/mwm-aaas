"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";

/**
 * Set NEXT_PUBLIC_MAILERLITE_FORM_ID to your MailerLite embedded form ID.
 * Set NEXT_PUBLIC_MAILERLITE_LANDING_URL to your MailerLite landing page URL as fallback.
 *
 * MailerLite universal script is injected once per page mount.
 * If the env vars are not set the component renders a plain link fallback.
 */
const FORM_ID = process.env.NEXT_PUBLIC_MAILERLITE_FORM_ID ?? "";
const LANDING_URL =
  process.env.NEXT_PUBLIC_MAILERLITE_LANDING_URL ?? "https://landing.mailerlite.com";

declare global {
  interface Window {
    ml?: (...args: unknown[]) => void;
    ml_webforms?: Record<string, unknown>;
  }
}

function injectMailerLiteScript() {
  if (typeof window === "undefined") return;
  if (document.getElementById("mailerlite-universal")) return;
  const s = document.createElement("script");
  s.id = "mailerlite-universal";
  s.src = "https://assets.mailerlite.com/js/universal.js";
  s.async = true;
  document.head.appendChild(s);
}

export default function MailerLiteEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!FORM_ID) return;
    injectMailerLiteScript();
    const timeout = window.setTimeout(() => {
      setLoaded(true);
    }, 800);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!FORM_ID) {
    return <FallbackLink />;
  }

  return (
    <div>
      {/* MailerLite embed target — the universal script looks for this class */}
      <div
        ref={containerRef}
        className={`ml-embedded transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        data-form={FORM_ID}
      />
      {/* Fallback shown until JS loads or if blocked */}
      {!loaded && <FallbackLink />}
    </div>
  );
}

function FallbackLink() {
  return (
    <a
      href={LANDING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-black text-white font-medium rounded-lg hover:bg-brand-black/90 transition-colors text-sm"
    >
      <Mail className="w-4 h-4" />
      Subscribe to Making IT Make Sense
    </a>
  );
}
