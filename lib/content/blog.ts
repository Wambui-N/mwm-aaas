import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const SITE_URL = "https://madewithmake.com";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  image?: string;
  category?: string;
  tags: string[];
  canonical?: string;
}

function parsePost(filename: string): BlogPost {
  const slug = filename.replace(/\.mdx?$/, "");
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "2025-01-01",
    author: data.author,
    image: data.image,
    category: data.category,
    tags: Array.isArray(data.tags) ? data.tags : [],
    canonical: data.canonical,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter(
    (f) => (f.endsWith(".mdx") || f.endsWith(".md")) && !f.startsWith("_")
  );
  return files
    .map(parsePost)
    .sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getPost(
  slug: string
): { data: BlogPost; content: string } | null {
  for (const ext of [".mdx", ".md"]) {
    const filePath = path.join(BLOG_DIR, `${slug}${ext}`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      return {
        data: {
          slug,
          title: data.title ?? slug,
          description: data.description ?? "",
          date: data.date ?? "2025-01-01",
          author: data.author,
          image: data.image,
          category: data.category,
          tags: Array.isArray(data.tags) ? data.tags : [],
          canonical: data.canonical,
        },
        content,
      };
    }
  }
  return null;
}

export function getRelatedPosts(currentSlug: string, count = 2): BlogPost[] {
  const current = getPost(currentSlug);
  if (!current) return [];
  const currentTags = new Set(current.data.tags);

  return getAllPosts()
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => currentTags.has(t)).length,
    }))
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))
    .slice(0, count)
    .map(({ post }) => post);
}

export function generateRss(): string {
  const posts = getAllPosts();
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const tags = post.tags
        .map((t) => `<category>${escapeXml(t)}</category>`)
        .join("\n        ");
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description)}</description>
      ${post.author ? `<author>${escapeXml(post.author)}</author>` : ""}
      ${post.category ? `<category>${escapeXml(post.category)}</category>` : ""}
      ${tags}
      ${post.image ? `<enclosure url="${post.image}" type="image/jpeg" length="0" />` : ""}
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Making IT Make Sense – Made with Make</title>
    <link>${SITE_URL}/blog</link>
    <description>Practical insights on automation, AI, and workflow design for founders and operators.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
