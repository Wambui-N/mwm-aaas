import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/content/blog";
import NavigationWrapper from "@/components/layout/NavigationWrapper";
import Footer from "@/components/layout/Footer";
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

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams = await (searchParams ?? Promise.resolve({}));
  const activeTag = resolvedParams.tag ?? null;

  const allPosts = getAllPosts();
  const posts = activeTag
    ? allPosts.filter((p) => p.tags.includes(activeTag))
    : allPosts;
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-white">
      <NavigationWrapper />
      <main className="pt-12 pb-24">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div className="mb-16 max-w-2xl">
            <p className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">
              Newsletter &amp; Blog
            </p>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-brand-black mb-4">
              {activeTag
                ? `Posts tagged "${activeTag}"`
                : 'Making IT Make Sense'}
            </h1>
            {activeTag ? (
              <div className="flex items-center gap-3">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Showing articles tagged with{' '}
                  <span className="font-medium text-brand-black">{activeTag}</span>.
                </p>
                <Link
                  href="/blog"
                  className="text-sm text-brand-orange hover:underline shrink-0"
                >
                  Clear filter
                </Link>
              </div>
            ) : (
              <p className="text-lg text-gray-600 leading-relaxed">
                Practical insights on automation, AI, and workflow design,
                for founders and operators who want to build smarter.
              </p>
            )}
          </div>

          {posts.length === 0 ? (
            <p className="text-gray-500">No posts yet. Check back soon.</p>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block mb-12 border border-gray-100 rounded-2xl overflow-hidden hover:border-brand-grey hover:shadow-sm transition-all"
                >
                  {featured.image && (
                    <div className="w-full h-56 md:h-72 overflow-hidden">
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  )}
                  <div className="p-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-semibold text-brand-orange uppercase tracking-widest">
                          Latest
                        </span>
                        <time
                          dateTime={featured.date}
                          className="text-sm text-gray-400"
                        >
                          {format(new Date(featured.date), "MMMM d, yyyy")}
                        </time>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-display font-semibold text-brand-black mb-3 group-hover:text-brand-orange transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed mb-4 max-w-xl">
                        {featured.description}
                      </p>
                      {featured.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {featured.tags.slice(0, 4).map((tag) => (
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
                      {featured.author && (
                        <p className="text-sm text-gray-400">{featured.author}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1.5 text-sm font-medium text-brand-orange group-hover:gap-3 transition-all">
                      Read post <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              )}

              {/* 3-column grid */}
              {rest.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <article key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col h-full border border-gray-100 rounded-xl overflow-hidden hover:border-brand-grey hover:shadow-sm transition-all"
                      >
                        {post.image ? (
                          <div className="w-full h-44 overflow-hidden">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-44 bg-brand-grey/20" />
                        )}
                        <div className="flex flex-col flex-1 p-6">
                          <time
                            dateTime={post.date}
                            className="text-xs text-gray-400 mb-3 block"
                          >
                            {format(new Date(post.date), "MMMM d, yyyy")}
                          </time>
                          <h2 className="text-lg font-display font-semibold text-brand-black mb-2 group-hover:text-brand-orange transition-colors leading-snug">
                            {post.title}
                          </h2>
                          <p className="text-sm text-gray-500 leading-relaxed flex-1">
                            {post.description}
                          </p>
                          {post.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
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
                          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">
                            Read <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                          {post.author && (
                            <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-50">
                              {post.author}
                            </p>
                          )}
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
