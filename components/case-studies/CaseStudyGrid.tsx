import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/content/blog";

type Props = {
  caseStudies: BlogPost[];
};

const isCaseStudyTag = (t: string) => t.toLowerCase() === "case-study" || t.toLowerCase() === "case study";

export default function CaseStudyGrid({ caseStudies }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
      {caseStudies.map((post) => (
        <article key={post.slug} className="calm-card group flex h-full flex-col">
          <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
            {post.image ? (
              <div className="h-52 w-full overflow-hidden border-b border-ink/20">
                <img src={post.image} alt={post.title} loading="lazy" className="h-full w-full object-cover grayscale" />
              </div>
            ) : (
              <div className="h-52 w-full border-b border-ink/20 bg-sage/30" />
            )}

            <div className="flex flex-1 flex-col p-5 md:p-6">
              <time dateTime={post.date} className="gl-mono text-ink/60">
                {format(new Date(post.date), "MMMM d, yyyy")}
              </time>
              <h2 className="calm-h3 mt-3 underline-offset-4 group-hover:underline group-focus-within:underline">{post.title}</h2>
              <p className="calm-body mt-3 flex-1 text-ink/75">{post.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-bold">
                Read <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </div>
          </Link>

          {post.tags.some((t) => !isCaseStudyTag(t)) && (
            <div className="flex flex-wrap gap-1.5 px-5 pb-5 md:px-6 md:pb-6">
              {post.tags
                .filter((t) => !isCaseStudyTag(t))
                .slice(0, 3)
                .map((tag) => (
                  <span key={tag} className="gl-mono border border-ink/30 px-2 py-1 text-ink/80">
                    {tag}
                  </span>
                ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
