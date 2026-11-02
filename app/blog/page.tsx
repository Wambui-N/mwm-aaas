import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/content/blog";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { MonoFilterRow, type FilterItem } from "@/components/site/MonoFilterRow";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = generatePageMetadata(
  "Making IT Make Sense - Made with Make",
  "Practical insights on automation, AI, and workflow design. The newsletter for founders and operators who want to build smarter.",
  "blog",
  ["automation blog", "Make.com tips", "workflow automation", "AI consulting", "making it make sense"]
);

type BlogPageProps = {
  searchParams?: Promise<{ tag?: string }>;
};

const CASE_STUDY_TAG = "case-study";

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams: { tag?: string } = await (searchParams ?? Promise.resolve({}));
  const activeTag = resolvedParams.tag ?? null;

  const allPosts = getAllPosts();
  const posts = activeTag
    ? allPosts.filter((p) => p.tags.includes(activeTag))
    : allPosts;

  // Compute most-used tags for the filter row
  const tagFrequency: Record<string, number> = {};
  for (const post of allPosts) {
    for (const tag of post.tags) {
      tagFrequency[tag] = (tagFrequency[tag] ?? 0) + 1;
    }
  }
  const tagChips = Object.entries(tagFrequency)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
    .slice(0, 6);

  // ALL, CASE STUDIES (the old nav's "Case studies" link), then the most-used tags.
  const filterItems: FilterItem[] = [
    { label: "All", href: "/blog", active: !activeTag },
    { label: "Case studies", href: `/blog?tag=${CASE_STUDY_TAG}`, active: activeTag === CASE_STUDY_TAG },
    ...tagChips
      .filter((tag) => tag !== CASE_STUDY_TAG)
      .map((tag) => ({ label: tag, href: `/blog?tag=${encodeURIComponent(tag)}`, active: activeTag === tag })),
  ];

  return (
    <SiteShell>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
          <PageHeader
            title="Making IT Make Sense"
            mark="Sense"
            seed={45}
            lede={
              activeTag
                ? "Browse articles on this topic, or switch back to all posts to keep exploring."
                : "Follow along as I share what I'm learning about automation, AI, and building smoother systems."
            }
          />

          <MonoFilterRow className="mt-10" label="Topics" items={filterItems} />

          {posts.length === 0 ? (
            <p className="calm-body mt-12">No posts yet. Check back soon.</p>
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.slug} className="calm-card group flex h-full flex-col">
                  <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
                    {post.image ? (
                      <div className="h-44 w-full overflow-hidden border-b border-ink/20">
                        <img src={post.image} alt={post.title} loading="lazy" className="h-full w-full object-cover grayscale" />
                      </div>
                    ) : (
                      <div className="h-44 w-full border-b border-ink/20 bg-sage/30" />
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

                  {(post.tags.length > 0 || post.author) && (
                    <div className="px-5 pb-5 md:px-6 md:pb-6">
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Link
                              key={tag}
                              href={`/blog?tag=${encodeURIComponent(tag)}`}
                              className="gl-mono border border-ink/30 px-2 py-1 text-ink/80 hover:border-ink hover:bg-sage/40"
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      )}
                      {post.author && <p className="gl-mono mt-4 border-t border-ink/20 pt-3 text-ink/60">{post.author}</p>}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </SiteShell>
  );
}
