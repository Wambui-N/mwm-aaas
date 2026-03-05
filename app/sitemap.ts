import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { getAllPosts, getTopTags } from "@/lib/content/blog";
import { getAllResources } from "@/lib/content/resources";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const currentDate = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const resources: MetadataRoute.Sitemap = getAllResources().map((r) => ({
    url: `${baseUrl}/resources/${r.type}/${r.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Tag filter pages (navigated to via /blog?tag=...)
  const tagPages: MetadataRoute.Sitemap = getTopTags(10).map((tag) => ({
    url: `${baseUrl}/blog?tag=${encodeURIComponent(tag)}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPosts, ...resources, ...tagPages];
}
