import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/content/blog";
import NavigationWrapper from "@/components/layout/NavigationWrapper";
import Footer from "@/components/layout/Footer";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import NewsletterSection from "@/components/sections/NewsletterSection";

export const metadata: Metadata = generatePageMetadata(
  "Making IT Make Sense - Made with Make",
  "Practical insights on automation, AI, and workflow design. The newsletter for founders and operators who want to build smarter.",
  "blog",
  ["automation blog", "Make.com tips", "workflow automation", "AI consulting", "making it make sense"]
);

type BlogPageProps = {
  searchParams?: Promise<{ tag?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams: { tag?: string } = await (searchParams ?? Promise.resolve({}));
  const activeTag = resolvedParams.tag ?? null;

  const allPosts = getAllPosts();
  const posts = activeTag
    ? allPosts.filter((p) => p.tags.includes(activeTag))
    : allPosts;

  // Compute most-used tags for the filter pills
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

  return (
    <div className="min-h-screen bg-brand-grey/10">
      <NavigationWrapper />
      <main className="pt-12 pb-24">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-3 text-4xl font-display font-semibold text-brand-black md:text-5xl">
              Making IT Make Sense
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
              {activeTag
                ? "Browse articles on this topic, or switch back to all posts to keep exploring."
                : "Follow along as I share what I'm learning about automation, AI, and building smoother systems."}
            </p>
          </div>

          {/* Tag filter pills */}
          {tagChips.length > 0 && (
            <div className="mb-12">
              <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-black/70">
                Topics
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link
                  href="/blog"
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${!activeTag
                      ? "bg-brand-orange text-white"
                      : "bg-brand-grey/30 text-brand-black hover:bg-brand-orange/10 hover:text-brand-orange"
                    }`}
                >
                  All
                </Link>
                {tagChips.map((tag) => {
                  const isActive = activeTag === tag;
                  return (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${isActive
                          ? "bg-brand-orange text-white"
                          : "bg-brand-grey/30 text-brand-black hover:bg-brand-orange/10 hover:text-brand-orange"
                        }`}
                    >
                      {tag}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {posts.length === 0 ? (
            <p className="text-gray-500">No posts yet. Check back soon.</p>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 transition-all hover:border-brand-grey hover:shadow-sm"
                  >
                    <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
                      {post.image ? (
                        <div className="h-44 w-full overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                          />
                        </div>
                      ) : (
                        <div className="h-44 w-full bg-brand-grey/20" />
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <time
                          dateTime={post.date}
                          className="mb-3 block text-xs text-gray-400"
                        >
                          {format(new Date(post.date), "MMMM d, yyyy")}
                        </time>
                        <h2 className="mb-2 text-lg font-display font-semibold leading-snug text-brand-black transition-colors group-hover:text-brand-orange">
                          {post.title}
                        </h2>
                        <p className="flex-1 text-sm leading-relaxed text-gray-500">
                          {post.description}
                        </p>
                      </div>
                    </Link>

                    <div className="flex flex-col px-6 pb-4">
                      {post.tags.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Link
                              key={tag}
                              href={`/blog?tag=${encodeURIComponent(tag)}`}
                              className="text-xs px-2 py-0.5 rounded-full bg-brand-grey/30 text-brand-black hover:bg-brand-orange/10 hover:text-brand-orange transition-colors"
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      )}
                      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-brand-orange opacity-0 transition-opacity group-hover:opacity-100">
                        Read <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                      {post.author && (
                        <p className="mt-3 border-t border-gray-50 pt-3 text-xs text-gray-400">
                          {post.author}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
        {/* Newsletter subscribe */}
        <div className="mt-16 -mx-6">
          <NewsletterSection />
        </div>``
      </main>
      <Footer />
    </div>
  );
}
