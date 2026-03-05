import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/seo";
import { getPost, getAllPosts, getRelatedPosts } from "@/lib/content/blog";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PostLayout from "@/components/blog/PostLayout";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post Not Found" };

  const { data } = post;
  const url = `${siteConfig.url}/blog/${slug}`;
  const ogImage = data.image ?? siteConfig.ogImage;

  return {
    title: `${data.title} | ${siteConfig.name}`,
    description: data.description,
    alternates: {
      canonical: data.canonical ?? url,
    },
    keywords: data.tags.length > 0 ? data.tags : undefined,
    openGraph: {
      type: "article",
      url,
      title: data.title,
      description: data.description,
      publishedTime: data.date,
      authors: data.author ? [data.author] : undefined,
      tags: data.tags.length > 0 ? data.tags : undefined,
      images: [{ url: ogImage, width: 1200, height: 630, alt: data.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 2);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-12 pb-24">
        <PostLayout
          post={post.data}
          content={post.content}
          relatedPosts={related}
        />
      </main>
      <Footer />
    </div>
  );
}
