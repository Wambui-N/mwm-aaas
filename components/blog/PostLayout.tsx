"use client";

import React, { useRef } from "react";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { PostCard } from "@/components/site/PostCard";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import { useHeavyScrollFeel } from "@/components/blog/useHeavyScrollFeel";
import { ConsultCard } from "@/components/site/ConsultCard";
import type { BlogPost } from "@/lib/content/blog";

interface Props {
  post: BlogPost;
  content: string;
  relatedPosts: BlogPost[];
}

const revealTransition = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.5, ease: "easeOut" as const },
};

function getPlainText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getPlainText).join("");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getPlainText(node.props.children);
  }
  return "";
}

function AnimatedBlockquote({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <motion.blockquote {...revealTransition} className={className}>
      {children}
    </motion.blockquote>
  );
}

function ResultParagraph({ children, className }: { children?: React.ReactNode; className?: string }) {
  const childArray = React.Children.toArray(children);
  const firstChild = childArray[0];
  const isResultLine =
    React.isValidElement(firstChild) &&
    firstChild.type === "strong" &&
    getPlainText(firstChild).trim().toLowerCase() === "result:";

  if (!isResultLine) {
    return <p className={className}>{children}</p>;
  }

  return (
    <motion.p {...revealTransition} className={className}>
      {children}
    </motion.p>
  );
}

// Every post: tables scroll sideways instead of overflowing the page; images load lazily.
const baseComponents: Components = {
  table: ({ node: _node, ...props }) => (
    <div className="rd-table">
      <table {...props} />
    </div>
  ),
  img: ({ node: _node, ...props }) => <img loading="lazy" {...props} />,
};

export default function PostLayout({ post, content, relatedPosts }: Props) {
  const articleRef = useRef<HTMLElement>(null);

  useHeavyScrollFeel();

  const isCaseStudy = post.category === "Case Study";
  const markdownComponents: Components = isCaseStudy
    ? { ...baseComponents, blockquote: AnimatedBlockquote, p: ResultParagraph }
    : baseComponents;

  return (
    <>
      {/* JSON-LD BlogPosting schema — picked up by Google rich results and LLM crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": post.category === "Case Study" ? "Article" : "BlogPosting",
            headline: post.seoTitle ?? post.title,
            description: post.seoDescription ?? post.description,
            image: post.seoImage ?? post.image ?? undefined,
            datePublished: post.date,
            dateModified: post.date,
            url: `https://madewithmake.com/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: post.author ?? "Wambui Ndung'u",
              url: "https://madewithmake.com",
            },
            publisher: {
              "@type": "Organization",
              name: "Made with Make",
              url: "https://madewithmake.com",
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
            ...(post.category && { articleSection: post.category }),
          }),
        }}
      />

      <article ref={articleRef} className="mx-auto max-w-[81.25rem]">
        <ReadingProgressBar targetRef={articleRef} />

        {/* Everything sits in columns 3-10 of the 12-column grid (full width on mobile), so it lines up with the background lines */}
        <div className="site-grid">
          <div className="col-span-4 md:col-span-8 md:col-start-3">
            {/* Back link */}
            <Link
              href="/blog"
              className="gl-mono inline-block py-2 text-ink/70 underline-offset-4 hover:text-ink hover:underline focus-visible:underline"
            >
              ← Making IT Make Sense
            </Link>

            {/* Post header */}
            <header className="mb-10 mt-6">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {post.category && <span className="gl-mono text-ink/70">{post.category}</span>}
                <time dateTime={post.date} className="gl-mono text-ink/60">
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </time>
              </div>

              <h1 className="sk-title mt-4">{post.title}</h1>
              <p className="pg-lede mt-5">{post.description}</p>

              {post.author && <p className="gl-mono mt-5 text-ink/60">{post.author}</p>}

              {/* Hero image */}
              {post.image && (
                <div className="mt-8 overflow-hidden border border-ink/20">
                  <img src={post.image} alt={post.title} className="h-56 w-full object-cover grayscale md:h-72" />
                </div>
              )}
            </header>

            {/* Body */}
            <div className="rd-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {content}
              </ReactMarkdown>
            </div>

            {/* Tags footer */}
            {post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-ink/25 pt-6">
                <span className="gl-mono mr-1 text-ink/60">Tagged:</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="gl-mono bg-sage px-2 py-1 text-ink hover:bg-signal"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Related posts: two cards, each four of the twelve columns (half of this block) */}
            {relatedPosts.length > 0 && (
              <section className="mt-16">
                <p className="gl-mono mb-5 text-ink/70">
                  Keep reading — <span className="normal-case">you might also like these</span>
                </p>
                <div className="grid gap-4 sm:grid-cols-2 md:gap-6">
                  {relatedPosts.map((related) => (
                    <PostCard
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      image={related.image ?? null}
                      imageAlt={related.title}
                      eyebrow={related.category ?? format(new Date(related.date), "MMMM d, yyyy")}
                      title={related.title}
                      description={related.description}
                      headingAs="h3"
                    />
                  ))}
                </div>
              </section>
            )}

            {/* booking CTA */}
            <ConsultCard
              heading="Want help automating your business?"
              body="If you'd like to talk through how this could work in your own business, you can request a free consultation and we'll figure out what makes sense together."
              className="mt-12"
            />
          </div>
        </div>
      </article>
    </>
  );
}
