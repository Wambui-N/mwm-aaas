import { config, collection, fields } from '@keystatic/core'

function keystaticStorage():
  | { kind: 'local' }
  | {
      kind: 'github'
      repo: { owner: string; name: string }
    } {
  if (process.env.NODE_ENV === 'development') {
    return { kind: 'local' }
  }

  const id = process.env.KEYSTATIC_GITHUB_CLIENT_ID
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET
  const secret = process.env.KEYSTATIC_SECRET

  if (id && clientSecret && secret) {
    return {
      kind: 'github',
      repo: {
        owner: 'Wambui-N',
        name: 'mwm-aaas',
      },
    }
  }

  // `next build` runs with NODE_ENV=production but often without OAuth secrets (local/CI).
  // GitHub mode throws at init if these are missing — fall back so the build can finish.
  // Set KEYSTATIC_* + GitHub app vars on the host (e.g. Vercel) for the Keystatic admin.
  if (process.env.VERCEL === '1' || process.env.CI) {
    console.warn(
      '[keystatic] GitHub storage skipped: set KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, and KEYSTATIC_SECRET for production CMS auth.'
    )
  }

  return { kind: 'local' }
}

export default config({
  storage: keystaticStorage(),
  ui: {
    brand: {
      name: 'Made with Make — Blog',
    },
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: { label: 'Slug (URL)', description: 'Auto-generated from title. Edit only to customise the URL.' },
        }),
        description: fields.text({
          label: 'Description',
          description: '1–2 sentences. Used in search results and the listing card.',
          multiline: true,
          validation: { isRequired: true },
        }),
        date: fields.date({
          label: 'Publish Date',
          validation: { isRequired: true },
        }),
        author: fields.text({
          label: 'Author',
          defaultValue: "Wambui Ndung'u",
        }),
        image: fields.url({
          label: 'Cover Image URL',
          description: 'Unsplash or hosted image. Recommended size: 1200×630.',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Automation', value: 'Automation' },
            { label: 'Strategy', value: 'Strategy' },
            { label: 'Tools', value: 'Tools' },
            { label: 'AI', value: 'AI' },
            { label: 'Case Study', value: 'Case Study' },
            { label: 'Operations', value: 'Operations' },
            { label: 'Client Management', value: 'Client Management' },
            { label: 'Marketing', value: 'Marketing' },
          ],
          defaultValue: 'Automation',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            description: 'Use only approved tags: Automation, Make.com, Google Workspace, Operations, Client Management, Case Studies',
            itemLabel: (props) => props.value ?? 'Tag',
          }
        ),
        published: fields.checkbox({
          label: 'Published',
          description: 'Uncheck to save as a draft — the post will not appear on the site.',
          defaultValue: true,
        }),
        canonical: fields.url({
          label: 'Canonical URL',
          description: 'Only set this if you are republishing content from another platform.',
        }),

        // ── SEO overrides (leave blank to inherit from title/description/image) ──
        seoTitle: fields.text({
          label: 'SEO title override',
          description: 'Leave blank to use the post title. Only set if you want a different title in search results. Max 60 characters.',
        }),
        seoDescription: fields.text({
          label: 'SEO description override',
          multiline: true,
          description: 'Leave blank to use the post description. Max 155 characters.',
        }),
        seoImage: fields.url({
          label: 'SEO / OG image override',
          description: 'Leave blank to use the cover image. Use only if you want a different image when shared on social. 1200×630px.',
        }),
        noIndex: fields.checkbox({
          label: 'Hide from search engines (noindex)',
          description: 'Tick this to prevent Google indexing. Use for drafts or low-quality duplicates only.',
          defaultValue: false,
        }),

        content: fields.mdx({
          label: 'Content',
          options: {
            heading: [2, 3, 4],
            image: {
              directory: 'public/images/blog',
              publicPath: '/images/blog',
            },
          },
        }),
      },
    }),
  },
})
