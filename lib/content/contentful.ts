import type { BlogPost } from "@/lib/content/blog";

/**
 * Blog posts from Contentful (content type "madeWithMakeBlog").
 *
 * Reads CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_TOKEN from the server environment. They are never
 * exposed to the browser (no NEXT_PUBLIC_ prefix). If either is missing, the blog falls back to the
 * MDX files only, so local builds without credentials still work.
 *
 * Requests go through fetch() so Next.js caches them and refreshes every REVALIDATE_SECONDS: a post
 * published in Contentful appears on the site within that window, without a redeploy.
 */

const CONTENT_TYPE = "madeWithMakeBlog";
const ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master";
export const REVALIDATE_SECONDS = 300;

type Link = { sys: { type: "Link"; linkType: string; id: string } };

type RichNode = {
  nodeType: string;
  value?: string;
  marks?: { type: string }[];
  data?: { uri?: string; target?: Link };
  content?: RichNode[];
};

type EntryFields = {
  title?: string;
  slug?: string;
  description?: string;
  date?: string;
  author?: string;
  image?: Link;
  tags?: string[];
  series?: string;
  seoTitle?: string;
  seoDescription?: string;
  content?: RichNode;
};

type Asset = {
  sys: { id: string };
  fields: { title?: string; description?: string; file?: { url?: string; contentType?: string } };
};

type EntriesResponse = {
  items: { sys: { id: string; createdAt: string; updatedAt: string }; fields: EntryFields }[];
  includes?: { Asset?: Asset[]; Entry?: { sys: { id: string }; fields: { slug?: string } }[] };
};

export type ContentfulPost = { data: BlogPost; content: string };

function credentials() {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const token = process.env.CONTENTFUL_DELIVERY_TOKEN;
  return space && token ? { space, token } : null;
}

let warned = false;

async function fetchEntries(): Promise<EntriesResponse | null> {
  const creds = credentials();
  if (!creds) {
    if (!warned) {
      console.warn("Contentful: CONTENTFUL_SPACE_ID or CONTENTFUL_DELIVERY_TOKEN not set; showing MDX posts only.");
      warned = true;
    }
    return null;
  }

  const params = new URLSearchParams({
    content_type: CONTENT_TYPE,
    order: "-fields.date,-sys.createdAt",
    include: "2",
    limit: "1000",
  });
  const url = `https://cdn.contentful.com/spaces/${creds.space}/environments/${ENVIRONMENT}/entries?${params}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${creds.token}` },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["contentful"] },
    });
    if (!res.ok) {
      console.error(`Contentful: request failed with ${res.status} ${res.statusText}`);
      return null;
    }
    return (await res.json()) as EntriesResponse;
  } catch (err) {
    console.error("Contentful: request failed", err);
    return null;
  }
}

function assetUrl(asset: Asset | undefined): string | undefined {
  const url = asset?.fields.file?.url;
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

/** Contentful image URLs accept resize parameters; serve a web-sized version instead of the original upload. */
function sizedImage(asset: Asset | undefined, width: number): string | undefined {
  const url = assetUrl(asset);
  if (!url) return undefined;
  return asset?.fields.file?.contentType?.startsWith("image/") ? `${url}?w=${width}&q=80` : url;
}

// ---------------------------------------------------------------------------------------------
// Rich text -> Markdown. The post page already renders Markdown (react-markdown + GFM) with the
// site's styling, so Contentful posts are converted here and render exactly like MDX posts.
// ---------------------------------------------------------------------------------------------

type Ctx = { assets: Map<string, Asset>; entrySlugs: Map<string, string> };

function escapeTableCell(s: string) {
  return s.replace(/\|/g, "\\|").replace(/\n+/g, " ");
}

function inline(nodes: RichNode[] | undefined, ctx: Ctx): string {
  return (nodes ?? []).map((n) => inlineNode(n, ctx)).join("");
}

function inlineNode(node: RichNode, ctx: Ctx): string {
  switch (node.nodeType) {
    case "text": {
      let text = node.value ?? "";
      if (!text.trim()) return text;
      const marks = new Set((node.marks ?? []).map((m) => m.type));
      // Keep surrounding spaces outside the markers so Markdown emphasis parses.
      const lead = text.match(/^\s*/)?.[0] ?? "";
      const trail = text.match(/\s*$/)?.[0] ?? "";
      text = text.trim();
      if (marks.has("code")) text = `\`${text}\``;
      if (marks.has("bold")) text = `**${text}**`;
      if (marks.has("italic")) text = `*${text}*`;
      if (marks.has("strikethrough")) text = `~~${text}~~`;
      if (marks.has("superscript")) text = `<sup>${text}</sup>`;
      if (marks.has("subscript")) text = `<sub>${text}</sub>`;
      return `${lead}${text}${trail}`;
    }
    case "hyperlink":
      return `[${inline(node.content, ctx)}](${node.data?.uri ?? "#"})`;
    case "entry-hyperlink": {
      const slug = node.data?.target ? ctx.entrySlugs.get(node.data.target.sys.id) : undefined;
      const label = inline(node.content, ctx);
      return slug ? `[${label}](/blog/${slug})` : label;
    }
    case "asset-hyperlink": {
      const asset = node.data?.target ? ctx.assets.get(node.data.target.sys.id) : undefined;
      const url = assetUrl(asset);
      const label = inline(node.content, ctx);
      return url ? `[${label}](${url})` : label;
    }
    default:
      return inline(node.content, ctx);
  }
}

function block(node: RichNode, ctx: Ctx, indent = ""): string {
  switch (node.nodeType) {
    case "paragraph":
      return indent + inline(node.content, ctx);
    case "heading-1":
    case "heading-2":
    case "heading-3":
    case "heading-4":
    case "heading-5":
    case "heading-6": {
      // The page already has the post title as its only H1, so body headings start at H2.
      const level = Math.max(2, Number(node.nodeType.slice(-1)));
      return `${"#".repeat(level)} ${inline(node.content, ctx)}`;
    }
    case "unordered-list":
    case "ordered-list":
      return (node.content ?? [])
        .map((item, i) => {
          const bullet = node.nodeType === "ordered-list" ? `${i + 1}. ` : "- ";
          const parts = (item.content ?? []).map((child) =>
            child.nodeType === "paragraph" ? inline(child.content, ctx) : "\n" + block(child, ctx, indent + "   ")
          );
          return `${indent}${bullet}${parts.join("")}`;
        })
        .join("\n");
    case "blockquote":
      return (node.content ?? [])
        .map((child) => block(child, ctx))
        .join("\n\n")
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");
    case "hr":
      return "---";
    case "table": {
      const rows = (node.content ?? []).map((row) =>
        (row.content ?? []).map((cell) =>
          escapeTableCell((cell.content ?? []).map((p) => inline(p.content, ctx)).join(" "))
        )
      );
      if (rows.length === 0) return "";
      const width = Math.max(...rows.map((r) => r.length));
      const pad = (r: string[]) => [...r, ...Array(width - r.length).fill("")];
      const line = (r: string[]) => `| ${pad(r).join(" | ")} |`;
      return [line(rows[0]), line(Array(width).fill("---")), ...rows.slice(1).map(line)].join("\n");
    }
    case "embedded-asset-block": {
      const asset = node.data?.target ? ctx.assets.get(node.data.target.sys.id) : undefined;
      const url = sizedImage(asset, 1600);
      if (!url) return "";
      const alt = (asset?.fields.description || asset?.fields.title || "").replace(/[\[\]]/g, "");
      return asset?.fields.file?.contentType?.startsWith("image/")
        ? `![${alt}](${url})`
        : `[${asset?.fields.title || "Download"}](${url})`;
    }
    case "embedded-entry-block": {
      const slug = node.data?.target ? ctx.entrySlugs.get(node.data.target.sys.id) : undefined;
      return slug ? `[Read more](/blog/${slug})` : "";
    }
    default:
      return inline(node.content, ctx);
  }
}

export function richTextToMarkdown(doc: RichNode | undefined, ctx: Ctx): string {
  if (!doc?.content) return "";
  return doc.content
    .map((n) => block(n, ctx))
    .filter((s) => s.trim() !== "")
    .join("\n\n");
}

/** Every published Contentful post, newest first. Returns [] when Contentful is unreachable or unset. */
export async function getContentfulPosts(): Promise<ContentfulPost[]> {
  const data = await fetchEntries();
  if (!data) return [];

  const assets = new Map((data.includes?.Asset ?? []).map((a) => [a.sys.id, a]));
  const entrySlugs = new Map<string, string>();
  for (const e of [...data.items, ...(data.includes?.Entry ?? [])]) {
    if (e.fields.slug) entrySlugs.set(e.sys.id, e.fields.slug);
  }
  const ctx: Ctx = { assets, entrySlugs };

  return data.items
    .filter((item) => item.fields.slug && item.fields.title)
    .map((item) => {
      const f = item.fields;
      const hero = f.image ? assets.get(f.image.sys.id) : undefined;
      return {
        data: {
          slug: f.slug!,
          title: f.title!,
          description: f.description ?? "",
          date: (f.date ?? item.sys.createdAt).slice(0, 10),
          author: f.author,
          image: sizedImage(hero, 1600),
          imageAlt: hero?.fields.description || undefined,
          category: f.series,
          seoTitle: f.seoTitle || undefined,
          seoDescription: f.seoDescription || undefined,
          tags: f.tags ?? [],
          published: true,
          source: "contentful" as const,
        },
        content: richTextToMarkdown(f.content, ctx),
      };
    });
}
