# Component structure

Every page shares one shell, one nav, one footer and one scoped stylesheet.

## Layout of the code

```
app/
├── page.tsx                  # Homepage: metadata + JSON-LD, renders HomeShell
├── blog/, case-studies/      # Index, filters (?tag=), post template
├── resources/                # Index (?type=) and tool/resource detail pages
├── contact-us/, assessment/  # Contact options; the Automation Gap Audit and its results
└── terms/, privacy/, not-found.tsx

components/
├── site/                     # The shared shell and design system (used by every page)
│   ├── SiteShell.tsx         # Scoped wrapper, fonts, scroll provider, nav, footer
│   ├── SiteNav.tsx           # Flat nav + mobile menu
│   ├── SiteFooter.tsx        # Title-block footer: "curtain" (homepage) or "static" (inner pages)
│   ├── PageHeader.tsx        # Label + title (one marker underline) + lede
│   ├── MonoFilterRow.tsx     # ALL / CASE STUDIES / tags style filter links
│   ├── Underlined.tsx, SectionLabel.tsx, SketchButton.tsx (+ SketchSubmit), ConsultCard.tsx
│   ├── draw/, providers/     # Hand-drawn primitives; Lenis + GSAP scroll provider
│   └── site.css              # All styles, scoped to [data-sketch][data-calm]
├── homepage/                 # HomeShell + the ten homepage sections (homepage-only)
├── blog/, case-studies/      # Post template, reading progress bar, case-study grid
├── assessment/, contact/     # The audit flow; contact panel and embeds
└── tools/, ui/               # Interactive tools; shadcn primitives still in use

lib/
├── site/                     # fonts, mono/aria labels, shell.ts (nav + footer data), drawing generators
├── homepage/copy.ts          # Homepage copy
├── content/                  # Blog (MDX frontmatter) and resources data
└── seo.ts                    # Site metadata and structured data
```

## How a page is built

```tsx
import { SiteShell } from "@/components/site/SiteShell";
import { PageHeader } from "@/components/site/PageHeader";

export default function Page() {
  return (
    <SiteShell>                       {/* smoothScroll={false} for form-heavy pages */}
      <main className="px-4 pb-[4.5rem] pt-8 md:px-8 md:pt-12">
        <div className="mx-auto max-w-[81.25rem]">
          <PageHeader title="Resources" mark="Resources" />
          {/* ... */}
        </div>
      </main>
    </SiteShell>
  );
}
```

Page metadata, canonicals and structured data stay in each `page.tsx`.

## Design rules

- Fonts: Brule (headings), Satoshi (body), Geist Mono (labels). Colours: `ink`, `sage`, `signal` (orange).
- Orange is a stroke, a highlight or a button fill, never text on paper. At most one marker underline per page title.
- Hairlines, no shadows, no tilt, no tape. Entrance-only motion that respects `prefers-reduced-motion`.
- The whole site runs at a 12px root (`html:has([data-calm])` in `site.css`), so `rem` values are 3/4 of the usual.
  Form controls use px sizes (16px text, 44px tap targets); read the comment above `.fm-control`.
- Long reading uses `.rd-prose` (about 66 characters per line). Do not add Tailwind `prose`.

## Adding things

- New page: wrap it in `SiteShell`; add its route to nothing else (the shell brings its own scroll provider).
- New nav or footer link: edit `lib/site/shell.ts`.
- Colours with an opacity must use a valid Tailwind 3.3 step (`/20`, `/25`, `/30`, `/40`, `/60`, `/70`, `/75`, `/80`, `/90`) or an arbitrary one such as `/[0.15]`.
