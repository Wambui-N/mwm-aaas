import React from "react";
import { format } from "date-fns";
import { PostCard, CardTag } from "@/components/site/PostCard";
import type { BlogPost } from "@/lib/content/blog";

type Props = {
  caseStudies: BlogPost[];
};

const isCaseStudyTag = (t: string) => t.toLowerCase() === "case-study" || t.toLowerCase() === "case study";

export default function CaseStudyGrid({ caseStudies }: Props) {
  return (
    // two across on desktop: each card spans 6 of the 12 columns
    <div className="site-grid gap-y-4 md:gap-y-6">
      {caseStudies.map((post) => {
        const tags = post.tags.filter((t) => !isCaseStudyTag(t)).slice(0, 3);
        return (
          <div key={post.slug} className="col-span-4 sm:col-span-2 md:col-span-6">
            <PostCard
              href={`/blog/${post.slug}`}
              image={post.image ?? null}
              imageAlt={post.title}
              eyebrow={<time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>}
              title={post.title}
              description={post.description}
              footer={
                tags.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <CardTag key={tag}>{tag}</CardTag>
                    ))}
                  </div>
                ) : undefined
              }
            />
          </div>
        );
      })}
    </div>
  );
}
