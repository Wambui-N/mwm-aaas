import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { generatePageMetadata } from "@/lib/seo";
import { getPost } from "@/lib/content/blog";
import { scorecardUrl, bookingUrl } from "@/lib/links";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };
  return generatePageMetadata(
    post.data.title,
    post.data.description,
    `blog/${slug}`,
    []
  );
}

export async function generateStaticParams() {
  const { getAllPosts } = await import("@/lib/content/blog");
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-12 pb-24">
        <article className="max-w-3xl mx-auto px-6">
          <header className="mb-10">
            <Link
              href="/blog"
              className="text-sm text-gray-500 hover:text-black mb-6 inline-block"
            >
              ← Back to Blog
            </Link>
            <time
              dateTime={post.data.date}
              className="text-sm text-gray-500 block mb-2"
            >
              {format(new Date(post.data.date), "MMMM d, yyyy")}
            </time>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-black mb-4">
              {post.data.title}
            </h1>
            {post.data.author && (
              <p className="text-gray-600">{post.data.author}</p>
            )}
          </header>

          <div className="prose prose-lg max-w-none prose-headings:font-display prose-p:text-gray-700 prose-li:text-gray-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>

          <aside className="mt-16 p-8 bg-gray-50 rounded-2xl border border-gray-100">
            <h2 className="text-xl font-display font-semibold text-black mb-4">
              Ready to automate?
            </h2>
            <p className="text-gray-600 mb-6">
              Take the Automation Readiness Scorecard to see where you stand, or book a discovery call to discuss your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {scorecardUrl ? (
                <a
                  href={scorecardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Take the Scorecard
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              ) : null}
              <Link
                href={bookingUrl}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 font-medium rounded-lg hover:border-gray-400 transition-colors"
              >
                Book a Discovery Call
              </Link>
            </div>
          </aside>
        </article>
      </main>
      <Footer />
    </div>
  );
}
