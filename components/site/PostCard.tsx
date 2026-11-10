import type { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ReadArrow } from "@/components/site/ReadArrow";

/**
 * The one card for posts, case studies, related posts and resources: a bright white hairline card (sage with a
 * heavier border for a featured item), with an orange "Read" and a hand-drawn arrow that redraws on hover or
 * focus. Give it a grid column span (4 of 12 for three across) so its edges sit on the background lines.
 * `footer` (tags, author) renders below the link so nested links are valid.
 */
export function PostCard({
  href,
  external = false,
  image,
  imageAlt = "",
  eyebrow,
  badge,
  title,
  description,
  cta = "Read",
  tone = "white",
  headingAs: Heading = "h2",
  footer,
}: {
  href: string;
  external?: boolean;
  image?: string | null;
  imageAlt?: string;
  eyebrow: ReactNode;
  badge?: ReactNode;
  title: string;
  description: string;
  cta?: string;
  tone?: "white" | "sage";
  /** Heading level of the title, so the page's outline stays as it was (h3 for related posts). */
  headingAs?: "h2" | "h3";
  footer?: ReactNode;
}) {
  const featured = tone === "sage";
  const body = (
    <>
      {image !== undefined &&
        (image ? (
          <div className="aspect-[1200/630] w-full overflow-hidden border-b border-ink/20">
            <img src={image} alt={imageAlt} loading="lazy" className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className={`aspect-[1200/630] w-full border-b border-ink/20 ${featured ? "bg-ink/10" : "bg-sage/30"}`} />
        ))}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="gl-mono text-ink/70">{eyebrow}</span>
          {badge}
        </div>
        <Heading className="calm-h3 mt-3 text-ink underline-offset-4 group-hover:underline">{title}</Heading>
        <p className="calm-body mt-3 flex-1 text-ink/80">{description}</p>
        <span className={`mt-5 inline-flex items-center gap-2 font-bold ${featured ? "text-ink" : "text-signal"}`}>
          {cta}
          {external ? <ExternalLink className="h-3.5 w-3.5" aria-hidden /> : <ReadArrow className={featured ? "text-signal" : ""} />}
        </span>
      </div>
    </>
  );
  const linkClass = "group flex flex-1 flex-col";

  return (
    <article
      className={`pc flex h-full flex-col text-ink ${
        featured ? "border-2 border-ink bg-sage" : "border border-ink/[0.22] bg-white"
      }`}
    >
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {body}
        </a>
      ) : (
        <Link href={href} className={linkClass}>
          {body}
        </Link>
      )}
      {footer && <div className="px-5 pb-5 md:px-6 md:pb-6">{footer}</div>}
    </article>
  );
}

/** Small mono chip for tags on a card, matching the filter chips (sage, orange on hover). Pass `href` to make it a filter link. */
export function CardTag({ children, href }: { children: ReactNode; href?: string }) {
  const cls = "gl-mono bg-sage px-2 py-1 text-ink";
  return href ? (
    <Link href={href} className={`${cls} hover:bg-signal`}>
      {children}
    </Link>
  ) : (
    <span className={cls}>{children}</span>
  );
}
