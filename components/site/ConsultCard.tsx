import { ArrowRight } from "lucide-react";
import { SketchButton } from "@/components/site/SketchButton";

/**
 * The "talk to us" block that ends posts and resource pages. Styled like a cell of the footer title block:
 * a solid ink panel with a sage hairline inset, text on the left and the one orange button on the right
 * (stacked on mobile), so it reads as part of the same system as the footer.
 */
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
    <aside className={`border border-ink bg-ink p-2 text-sage ${className}`}>
      <div className="grid gap-6 border border-sage/30 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8 md:p-7">
        <div>
          <h2 className="font-[family-name:var(--font-brule)] text-[clamp(1.4rem,2vw,1.8rem)] font-semibold leading-tight text-[color:var(--paper)]">
            {heading}
          </h2>
          <p className="calm-body mt-3 max-w-xl text-sage/85">{body}</p>
        </div>
        <div>
          <SketchButton href={href} variant="marker" seed={14} className="whitespace-nowrap text-lg">
            <span className="inline-flex items-center gap-2">
              {ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </SketchButton>
        </div>
      </div>
    </aside>
  );
}
