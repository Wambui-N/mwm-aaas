import type { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ReadArrow } from "@/components/site/ReadArrow";

/**
 * The one card for posts, case studies, related posts and resources: solid ink (or sage for a featured item),
 * hairline-square, with an orange "Read" and a hand-drawn arrow that redraws on hover or focus.
 * Give it a grid column span (4 of 12 for three across) so its edges sit on the background lines.
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
  tone = "dark",
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
  tone?: "dark" | "sage";
  footer?: ReactNode;
}) {
  const dark = tone === "dark";
  const body = (
    <>
      {image !== undefined &&
        (image ? (
          <div className={`h-44 w-full overflow-hidden border-b ${dark ? "border-sage/20" : "border-ink/30"}`}>
            <img src={image} alt={imageAlt} loading="lazy" className="h-full w-full object-cover grayscale" />
          </div>
        ) : (
          <div className={`h-44 w-full border-b ${dark ? "border-sage/20 bg-sage/10" : "border-ink/30 bg-ink/10"}`} />
        ))}
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className={`gl-mono ${dark ? "text-sage/70" : "text-ink/70"}`}>{eyebrow}</span>
          {badge}
        </div>
        <h2
          className={`calm-h3 mt-3 underline-offset-4 group-hover:underline ${dark ? "text-[color:var(--paper)]" : "text-ink"}`}
        >
          {title}
        </h2>
        <p className={`calm-body mt-3 flex-1 ${dark ? "text-sage/85" : "text-ink/80"}`}>{description}</p>
        <span className={`mt-5 inline-flex items-center gap-2 font-bold ${dark ? "text-signal" : "text-ink"}`}>
          {cta}
          {external ? <ExternalLink className="h-3.5 w-3.5" aria-hidden /> : <ReadArrow className={dark ? "" : "text-signal"} />}
        </span>
      </div>
    </>
  );
  const linkClass = "group flex flex-1 flex-col";

  return (
    <article className={`pc flex h-full flex-col border ${dark ? "border-ink bg-ink text-sage" : "border-ink bg-sage text-ink"}`}>
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

/** Small mono chip for tags on a dark card. Pass `href` to make it a filter link. */
export function CardTag({ children, href }: { children: ReactNode; href?: string }) {
  const cls = "gl-mono border border-sage/40 px-2 py-1 text-sage/90";
  return href ? (
    <Link href={href} className={`${cls} hover:bg-sage hover:text-ink`}>
      {children}
    </Link>
  ) : (
    <span className={cls}>{children}</span>
  );
}
