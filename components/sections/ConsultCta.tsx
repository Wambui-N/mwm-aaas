import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ConsultCtaVariant = "light" | "dark";

type ConsultCtaProps = {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  href?: string;
  variant?: ConsultCtaVariant;
  className?: string;
};

const DEFAULT_HEADING = "Want more customised help?";
const DEFAULT_BODY =
  "If you’d like to talk through how this could work in your own business, you can request a free consultation and we’ll figure out what makes sense together.";
const DEFAULT_CTA = "Get a free consultation";
const DEFAULT_HREF = "/contact-us";

export function ConsultCta({
  heading = DEFAULT_HEADING,
  body = DEFAULT_BODY,
  ctaLabel = DEFAULT_CTA,
  href = DEFAULT_HREF,
  variant = "light",
  className = "",
}: ConsultCtaProps) {
  const isDark = variant === "dark";

  const containerClasses = isDark
    ? "rounded-2xl bg-brand-black px-6 py-6 text-left text-white"
    : "rounded-2xl border border-gray-100 bg-gray-50 p-8 text-left";

  const headingClasses = isDark
    ? "text-xl font-display font-semibold mb-2"
    : "text-xl font-display font-semibold text-brand-black mb-3";

  const bodyClasses = isDark
    ? "mt-1 text-sm text-gray-300 mb-4"
    : "text-gray-600 mb-6";

  const buttonClasses = isDark
    ? "inline-flex items-center justify-center rounded-lg bg-brand-orange px-4 py-2.5 text-xs font-medium text-brand-black transition-colors hover:bg-brand-orange/90"
    : "inline-flex items-center justify-center rounded-lg bg-brand-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-orange/90";

  return (
    <aside className={`${containerClasses} ${className}`}>
      <div className={isDark ? "grid gap-4 md:grid-cols-[1.6fr,auto] md:items-center" : ""}>
        <div>
          <h2 className={headingClasses}>{heading}</h2>
          <p className={bodyClasses}>{body}</p>
        </div>
        <div className={isDark ? "flex flex-col gap-2 sm:flex-row sm:items-center" : ""}>
          <Link href={href} className={buttonClasses}>
            {ctaLabel}
            <ArrowRight className={isDark ? "ml-1.5 h-3.5 w-3.5" : "ml-2 h-4 w-4"} />
          </Link>
        </div>
      </div>
    </aside>
  );
}

