# Blog authoring guide

## Adding a new post

1. Copy `_template.mdx` to a new file: `your-post-slug.mdx`
   - The filename becomes the URL: `/blog/your-post-slug`
2. Fill in the frontmatter fields (see below)
3. Write your content in Markdown below the `---` closing delimiter
4. Save — the post appears on `/blog` automatically (sorted by `date`, newest first)

---

## Frontmatter reference

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Shown in page title, OG tags, listing cards |
| `description` | Yes | 1–2 sentences. Used in meta description and listing card |
| `date` | Yes | Format: `YYYY-MM-DD`. Controls sort order |
| `author` | Recommended | Your name |
| `image` | Recommended | Unsplash URL or `/images/blog/filename.jpg`. Displayed grayscale |
| `category` | Yes | One word/phrase: `Strategy`, `Tools`, `AI`, `Case Study`, etc. |
| `tags` | Yes | Array of 2–5 lowercase strings: `["Make.com", "automation"]` |
| `canonical` | Optional | Only set if republishing from another platform |

---

## Category list (keep consistent)

- `Strategy` — general automation advice, prioritisation
- `Tools` — specific tool comparisons or walkthroughs (Make.com, Zapier, etc.)
- `AI` — AI-powered automations, prompts, LLM integrations
- `Case Study` — client stories with results
- `Operations` — workflow design, process improvement

---

## Tags guidelines

- Use lowercase, hyphenated if multi-word: `make.com`, `no-code`, `error-handling`
- Keep to 3–5 tags per post
- Tags drive **related post** recommendations — posts that share tags appear in "Keep reading"

---

## Images

- Preferred dimensions: `1200 × 630` (landscape)
- All images render in grayscale on the post page
- Free sources: [Unsplash](https://unsplash.com), [Pexels](https://pexels.com)
- For Unsplash: copy the photo URL and append `?w=1200&q=80`

---

## RSS & MailerLite

The RSS feed is at `/rss.xml` — point MailerLite's RSS-to-email campaign at:

```
https://madewithmake.com/rss.xml
```

To enable the inline MailerLite signup form on post pages, set these in your environment:

```
NEXT_PUBLIC_MAILERLITE_FORM_ID=your-form-id
NEXT_PUBLIC_MAILERLITE_LANDING_URL=https://your-mailerlite-landing-page
```

If these are not set, a fallback link to the landing page is shown automatically.
