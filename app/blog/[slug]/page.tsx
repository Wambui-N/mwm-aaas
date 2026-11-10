import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/seo";
import { getPost, getAllPosts, getRelatedPosts } from "@/lib/content/blog";
import { SiteShell } from "@/components/site/SiteShell";
import PostLayout from "@/components/blog/PostLayout";

// Re-check Contentful every 5 minutes; new slugs published after the build are rendered on first visit.
export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post Not Found" };

  const { data } = post;
  const url = `${siteConfig.url}/blog/${slug}`;

  // SEO overrides take precedence; fall back to base fields
  const metaTitle = data.seoTitle || data.title;
  const metaDescription = data.seoDescription || data.description;
  const ogImage = data.seoImage ?? data.image ?? siteConfig.ogImage;

  return {
    title: `${metaTitle} | ${siteConfig.name}`,
    description: metaDescription,
    robots: data.noIndex ? "noindex, nofollow" : "index, follow",
    alternates: {
      canonical: data.canonical ?? url,
    },
    keywords: data.tags.length > 0 ? data.tags : undefined,
    openGraph: {
      type: "article",
      url,
      title: metaTitle,
      description: metaDescription,
      publishedTime: data.date,
      authors: data.author ? [data.author] : undefined,
      tags: data.tags.length > 0 ? data.tags : undefined,
      images: [{ url: ogImage, width: 1200, height: 630, alt: data.imageAlt ?? metaTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, 2);

  return (
    <SiteShell>
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <PostLayout
          post={post.data}
          content={post.content}
          relatedPosts={related}
        />
      </main>
    </SiteShell>
  );
}
