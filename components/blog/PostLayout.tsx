import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import { ArrowRight, Tag } from "lucide-react";
import { scorecardUrl, bookingUrl } from "@/lib/links";
import NewsletterSection from "@/components/sections/NewsletterSection";
import type { BlogPost } from "@/lib/content/blog";

interface Props {
  post: BlogPost;
  content: string;
  relatedPosts: BlogPost[];
}

export default function PostLayout({ post, content, relatedPosts }: Props) {
  return (
    <>
      {/* JSON-LD Article schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            image: post.image ?? undefined,
            datePublished: post.date,
            dateModified: post.date,
            author: {
              "@type": "Person",
              name: post.author ?? "Made with Make",
            },
            publisher: {
              "@type": "Organization",
              name: "Made with Make",
              logo: {
                "@type": "ImageObject",
                url: "https://madewithmake.com/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://madewithmake.com/blog/${post.slug}`,
            },
            ...(post.tags.length > 0 && { keywords: post.tags.join(", ") }),
          }),
        }}
      />

      <article className="max-w-3xl mx-auto px-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="text-sm text-gray-500 hover:text-brand-black inline-flex items-center gap-1 transition-colors"
        >
          ← Making IT Make Sense
        </Link>

        {/* Post header */}
        <header className="mt-8 mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {post.category && (
              <span className="text-xs font-semibold text-brand-orange uppercase tracking-widest">
                {post.category}
              </span>
            )}
            <time
              dateTime={post.date}
              className="text-sm text-gray-400"
            >
              {format(new Date(post.date), "MMMM d, yyyy")}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-semibold text-brand-black mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-6">
            {post.description}
          </p>

          {post.author && (
            <p className="text-sm text-gray-400 mb-6">{post.author}</p>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-grey/30 border border-brand-grey/60 text-brand-black rounded-full text-xs font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Hero image */}
          {post.image && (
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover grayscale"
              />
            </div>
          )}
        </header>

        {/* Body */}
        <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-brand-black prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-brand-orange prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-black prose-code:text-brand-orange prose-code:bg-brand-grey/20 prose-code:rounded prose-code:px-1">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>

        {/* Tags footer */}
        {post.tags.length > 0 && (
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 uppercase tracking-wide font-medium mr-1">
              Tagged:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-grey/20 border border-brand-grey/50 text-gray-600 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <p className="text-xs font-bold text-brand-black uppercase tracking-widest mb-6">
              Keep reading —{" "}
              <span className="font-normal normal-case text-gray-500">
                you might also like these
              </span>
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group flex flex-col border border-gray-100 rounded-xl overflow-hidden hover:border-brand-grey hover:shadow-sm transition-all"
                >
                  {related.image && (
                    <div className="w-full h-36 overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    {related.category && (
                      <span className="text-[10px] font-semibold text-brand-orange uppercase tracking-widest mb-1">
                        {related.category}
                      </span>
                    )}
                    <h3 className="text-base font-display font-semibold text-brand-black group-hover:text-brand-orange transition-colors leading-snug mb-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-2">
                      {related.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-brand-orange">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter subscribe */}
        <div className="mt-16 -mx-6">
          <NewsletterSection />
        </div>

        {/* Scorecard / booking CTA */}
        <aside className="mt-8 p-8 bg-gray-50 rounded-2xl border border-gray-100">
          <h2 className="text-xl font-display font-semibold text-brand-black mb-3">
            Ready to automate?
          </h2>
          <p className="text-gray-600 mb-6">
            Take the Automation Readiness Scorecard to see where you stand, or
            book a discovery call to discuss your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {scorecardUrl ? (
              <a
                href={scorecardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-orange text-white font-medium rounded-lg hover:bg-brand-orange/90 transition-colors"
              >
                Take the Scorecard
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            ) : null}
            <Link
              href={bookingUrl}
              className="inline-flex items-center justify-center px-6 py-3 border border-brand-grey font-medium rounded-lg hover:border-brand-black text-brand-black transition-colors"
            >
              Book a Discovery Call
            </Link>
          </div>
        </aside>
      </article>
    </>
  );
}
