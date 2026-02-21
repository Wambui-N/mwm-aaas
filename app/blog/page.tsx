import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/content/blog";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { format } from "date-fns";

export const metadata: Metadata = generatePageMetadata(
  "Blog - Made with Make",
  "Insights on automation, AI, Make.com, and workflow design. Practical advice for founders and teams.",
  "blog",
  ["automation blog", "Make.com tips", "workflow automation", "AI consulting"]
);

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-12 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-black mb-6">
              Blog
            </h1>
            <p className="text-lg text-gray-600">
              Insights on automation, AI, and workflow design. Practical advice for founders and teams.
            </p>
          </div>

          <div className="space-y-8">
            {posts.length === 0 ? (
              <p className="text-gray-600">No posts yet. Check back soon.</p>
            ) : (
              posts.map((post) => (
                <article key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block border border-gray-100 rounded-xl p-6 hover:border-gray-200 hover:shadow-md transition-all"
                  >
                    <time
                      dateTime={post.date}
                      className="text-sm text-gray-500 block mb-2"
                    >
                      {format(new Date(post.date), "MMMM d, yyyy")}
                    </time>
                    <h2 className="text-xl font-display font-semibold text-black mb-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600">{post.description}</p>
                    {post.author && (
                      <p className="text-sm text-gray-500 mt-3">{post.author}</p>
                    )}
                  </Link>
                </article>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
