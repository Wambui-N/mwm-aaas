"use client";

import ScrollVelocity from "@/components/homepage/reactbits/ScrollVelocity";
import { DrawIn } from "@/components/homepage/draw/DrawIn";
import { ScrawlUnderline } from "@/components/homepage/ScrawlStrike";
import { tools } from "@/lib/homepage/copy";

// Proper SVG logos only (no favicons), all drawn in one ink tone. Tools without an SVG show as a text chip.
const LOGOS: Record<string, string> = {
  "Make.com": "/logos/make.svg",
  "Google Sheets": "/logos/google-sheets.svg",
  Slack: "/logos/slack.svg",
  Notion: "/logos/notion.svg",
  "Cal.com": "/logos/cal-com.svg",
  ClickUp: "/logos/clickup.svg",
  ChatGPT: "/logos/chatgpt.svg",
  WhatsApp: "/logos/whatsapp.svg",
  Claude: "/logos/claude.svg",
  Calendly: "/logos/calendly.svg",
  "Google Drive": "/logos/google-drive.svg",
  LinkedIn: "/logos/linkedin.svg",
  Instagram: "/logos/instagram.svg",
  Perplexity: "/logos/perplexity.svg",
  DeepSeek: "/logos/deepseek.svg",
  "Google Calendar": "/logos/google-calendar.svg",
};

// Make.com leads the strip; the rest keep the order from lib/copy.ts.
const ITEMS = [...tools.items].sort((a, b) => Number(b === "Make.com") - Number(a === "Make.com"));

function Chip({ name }: { name: string }) {
  const src = LOGOS[name];
  return (
    <span className="calm-card mx-2 inline-flex items-center gap-3 px-4 py-3 align-middle md:mx-3">
      {src && <span aria-hidden className="calm-logo" style={{ ["--src" as string]: `url(${src})` }} />}
      <span className="gl-mono">{name}</span>
    </span>
  );
}

export function Tools() {
  const [before, after] = tools.heading.split("tools");

  return (
    <section className="py-[3.75rem] md:py-[5.25rem]">
      <div className="mx-auto mb-8 max-w-[81.25rem] px-4 md:px-8">
        <p className="gl-mono mb-5 text-ink/60">{tools.label}</p>

        {/* one orange marker underline, under "tools" only */}
        <h2 className="sk-h2">
          {before}
          <span className="relative inline-block">
            tools
            <DrawIn as="span" on="scroll" duration={0.5} stagger={0.2} className="pointer-events-none absolute -inset-x-[0.05em] -bottom-[0.14em] block h-[0.3em]">
              <ScrawlUnderline seed={12} />
            </DrawIn>
          </span>
          {after}
        </h2>
      </div>

      {/* a plain strip of chips that speeds up as you scroll faster */}
      <ScrollVelocity
        texts={[
          <span key="row" className="inline-block whitespace-nowrap py-2">
            {ITEMS.map((t) => (
              <Chip key={t} name={t} />
            ))}
          </span>,
        ]}
        velocity={35}
        numCopies={4}
        velocityMapping={{ input: [0, 1000], output: [0, 4] }}
      />
    </section>
  );
}
