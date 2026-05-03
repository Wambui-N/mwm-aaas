# Blog authoring guide

## Adding a new post

1. Open `/keystatic` in your browser (run `npm run dev` first)
2. Click **Blog Posts → Create**
3. Fill in all required fields (see reference below)
4. Write your content in the editor
5. Before publishing, run through the **Pre-publish checklist** below
6. Set **Published** to ✅ and save

The post appears on `/blog` automatically (sorted by date, newest first).

---

## Frontmatter reference

| Field | Required | Notes |
|---|---|---|
| `title` | Yes | Shown in page title, OG tags, listing cards. Keep under 60 characters. |
| `description` | Yes | 1–2 sentences. Used in meta description and listing card. Max 155 characters. |
| `date` | Yes | Format: `YYYY-MM-DD`. Controls sort order. |
| `author` | Recommended | Your name — defaults to "Wambui Ndung'u". |
| `image` | Recommended | Unsplash URL or `/images/blog/filename.jpg`. Displayed grayscale. 1200×630px. |
| `category` | Yes | One of: `Strategy`, `Tools`, `AI`, `Case Study`, `Operations`. |
| `tags` | Yes | 2–5 lowercase strings: `["Make.com", "automation"]`. |
| `published` | Yes | `true` to publish. `false` to save as draft. |
| `canonical` | Optional | Only set if republishing from another platform. |
| `seoTitle` | Optional | Override the title used in Google search results. Leave blank to use `title`. |
| `seoDescription` | Optional | Override the meta description. Leave blank to use `description`. |
| `seoImage` | Optional | Override the OG social image URL. Leave blank to use `image`. |
| `noIndex` | Optional | Set `true` to hide from search engines (noindex). Use only for test posts. |

---

## Category list (keep consistent)

- `Strategy` — general automation advice, prioritisation
- `Tools` — specific tool comparisons or walkthroughs (Make.com, Zapier, etc.)
- `AI` — AI-powered automations, prompts, LLM integrations
- `Case Study` — client stories with results (also appears on `/case-studies`)
- `Operations` — workflow design, process improvement

---

## Tags guidelines

- Use lowercase, hyphenated if multi-word: `make.com`, `no-code`, `error-handling`
- Keep to 3–5 tags per post
- Tags drive **related post** recommendations and tag filter pills on `/blog`
- Case studies: always include the `case-study` tag in addition to the category

---

## Images

- Preferred dimensions: `1200 × 630` (landscape)
- All images render in grayscale on the post page (colour on hover)
- Free sources: [Unsplash](https://unsplash.com), [Pexels](https://pexels.com)
- For Unsplash: copy the photo URL and append `?w=1200&q=80`

---

## Pre-publish checklist

Run through this before flipping **Published** to true:

**Content quality**
- [ ] Title is under 60 characters and includes the primary keyword
- [ ] Description is 1–2 sentences, under 155 characters, benefit-led
- [ ] Post has a clear H1 (the title) and H2s for each main section
- [ ] Post ends with a clear next action or takeaway
- [ ] At least 2 internal links to other posts or service pages

**SEO**
- [ ] `image` is set (1200×630, Unsplash URL or hosted)
- [ ] `tags` has 3–5 relevant lowercase tags
- [ ] `category` is set correctly
- [ ] `canonical` is set only if this was first published elsewhere
- [ ] `noIndex` is **not** ticked (unless this is a test post)

**Keystatic / MDX**
- [ ] No raw `{{placeholder}}` tokens in body text (use `&#123;&#123;placeholder&#125;&#125;` instead — see below)
- [ ] No unclosed HTML tags or JSX expressions in content

---

## Safe placeholder syntax (important for Keystatic compatibility)

If your post contains automation template variables like `{{client_name}}`, you **cannot** write them as raw curly braces in the MDX editor. MDX treats `{...}` as a JavaScript expression and will throw a parse error.

**Use HTML entities instead:**

| What you want to show | What to type in the editor |
|---|---|
| `{{client_name}}` | `&#123;&#123;client_name&#125;&#125;` |
| `{{first_name}}` | `&#123;&#123;first_name&#125;&#125;` |

Or wrap them in a code block (single backticks), which is usually more readable anyway:

```
`{{client_name}}`
```

This renders as inline code and clearly signals to readers that it's a template variable.

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

---

## LLMs.txt maintenance

When you publish a significant new post or case study, add it to `/public/llms-full.txt` under the relevant section. This file is read by AI assistants (ChatGPT, Perplexity, Claude) to understand your content and cite it accurately.

Format:

```
### [Post title]
URL: https://madewithmake.com/blog/[slug]
Summary: One to two sentences describing what the post covers and who it's for.
Topics: comma, separated, keywords
```
