import { ArrowRight } from "lucide-react";
import { SketchButton } from "@/components/site/SketchButton";

/** The dark "talk to us" card that ends posts and resource pages: ink block, one orange button. */
export function ConsultCard({
  heading = "Want more customised help?",
  body = "If you’d like to talk through how this could work in your own business, you can request a free consultation and we’ll figure out what makes sense together.",
  ctaLabel = "Book a consultation",
  href = "/contact-us",
  className = "",
}: {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  href?: string;
  className?: string;
}) {
  return (
    <aside className={`bg-ink p-6 text-sage md:p-8 ${className}`}>
      <h2 className="font-[family-name:var(--font-brule)] text-[clamp(1.4rem,2vw,1.8rem)] font-semibold leading-tight">{heading}</h2>
      <p className="calm-body mt-4 max-w-xl text-sage/90">{body}</p>
      <div className="mt-6">
        <SketchButton href={href} variant="marker" seed={14} className="text-lg">
          <span className="inline-flex items-center gap-2">
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </SketchButton>
      </div>
    </aside>
  );
}
