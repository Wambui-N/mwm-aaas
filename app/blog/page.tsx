import React from "react";
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/content/blog";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";
import { MonoFilterRow, type FilterItem } from "@/components/site/MonoFilterRow";
import { PostCard, CardTag } from "@/components/site/PostCard";
import { format } from "date-fns";

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
            // three across on desktop: each card spans 4 of the 12 columns, so edges sit on the background lines
            <div className="site-grid mt-10 gap-y-4 md:gap-y-6">
              {posts.map((post) => (
                <div key={post.slug} className="col-span-4 sm:col-span-2 md:col-span-4">
                  <PostCard
                    href={`/blog/${post.slug}`}
                    image={post.image ?? null}
                    imageAlt={post.title}
                    eyebrow={<time dateTime={post.date}>{format(new Date(post.date), "MMMM d, yyyy")}</time>}
                    title={post.title}
                    description={post.description}
                    footer={
                      post.tags.length > 0 || post.author ? (
                        <>
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {post.tags.slice(0, 3).map((tag) => (
                                <CardTag key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                                  {tag}
                                </CardTag>
                              ))}
                            </div>
                          )}
                          {post.author && <p className="gl-mono mt-4 border-t border-ink/20 pt-3 text-ink/60">{post.author}</p>}
                        </>
                      ) : undefined
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </SiteShell>
  );
}
