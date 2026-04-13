"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hourglass, FolderKanban, ReceiptText, Wrench } from "lucide-react";
import { LogoCloud } from "@/components/ui/logo-cloud-3";

const LOGOS = [
  {
    src: 'https://www.google.com/s2/favicons?domain=shelfcue.com&sz=64',
    alt: 'ShelfCue',
  },
  {
    src: 'https://www.google.com/s2/favicons?domain=make.com&sz=64',
    alt: 'Make.com',
  },
  {
    src: 'https://svgl.app/library/google-sheets.svg',
    alt: 'Google Sheets',
  },
  {
    src: 'https://svgl.app/library/slack.svg',
    alt: 'Slack',
  },
  {
    src: 'https://www.google.com/s2/favicons?domain=airtable.com&sz=64',
    alt: 'Airtable',
  },
  {
    src: 'https://svgl.app/library/notion.svg',
    alt: 'Notion',
  },
  {
    src: 'https://www.google.com/s2/favicons?domain=tally.so&sz=64',
    alt: 'Tally',
  },
  {
    src: 'https://svgl.app/library/cal.svg',
    alt: 'Cal.com',
  },
  {
    src: 'https://www.google.com/s2/favicons?domain=clickup.com&sz=64',
    alt: 'ClickUp',
  },
  {
    src: 'https://svgl.app/library/openai.svg',
    alt: 'ChatGPT',
  },
  {
    src: 'https://www.google.com/s2/favicons?domain=typeform.com&sz=64',
    alt: 'Typeform',
  },
  {
    src: 'https://svgl.app/library/whatsapp-icon.svg',
    alt: 'WhatsApp',
  },
  {
    src: 'https://svgl.app/library/anthropic_black.svg',
    alt: 'Claude',
  },
  {
    src: 'https://svgl.app/library/calendly.svg',
    alt: 'Calendly',
  },
  {
    src: 'https://svgl.app/library/drive.svg',
    alt: 'Google Drive',
  },
  {
    src: 'https://www.google.com/s2/favicons?domain=forms.google.com&sz=64',
    alt: 'Google Forms',
  },
  {
    src: 'https://svgl.app/library/linkedin.svg',
    alt: 'LinkedIn',
  },
  {
    src: 'https://svgl.app/library/instagram-icon.svg',
    alt: 'Instagram',
  },
  {
    src: 'https://svgl.app/library/perplexity.svg',
    alt: 'Perplexity',
  },
  {
    src: 'https://svgl.app/library/deepseek.svg',
    alt: 'DeepSeek',
  },
  {
    src: 'https://svgl.app/library/google-calendar.svg',
    alt: 'Google Calendar',
  },
];

const PAIN_POINTS = [
  {
    title: "Skilled people doing admin",
    body: "You're paying experienced people to copy data between tools, chase approvals, and send the same email for the fifth time this week.",
    icon: Hourglass,
  },
  {
    title: "Data living everywhere",
    body: "Six tools, four spreadsheets, one group chat. Nobody knows which version is current. Things fall through the cracks and nobody notices until it's too late.",
    icon: FolderKanban,
  },
  {
    title: "Leads and revenue leaking",
    body: "Follow-ups that didn't happen. Proposals that went out late. Clients who went quiet because nobody caught it in time.",
    icon: ReceiptText,
  },
  {
    title: "DIY automations that broke",
    body: "You or someone on your team tried to fix it with Zapier or Make. It worked for two weeks, then broke - because the underlying process was never fixed first.",
    icon: Wrench,
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function GrowthPainSection() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl p-5 sm:p-6"
        >
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-orange">
            Sound familiar?
          </p>
          <h2 className="my-6 text-center text-3xl font-display font-semibold leading-tight text-brand-black md:text-4xl">
            The business grew.
            <br />
            The processes didn&apos;t.
          </h2>
          <p className="my-3 mx-auto max-w-2xl text-center text-base leading-relaxed text-gray-700">
            At some point, running on memory and goodwill stops working.
            Here&apos;s what that usually looks like.
          </p>

          <div className="mt-8 grid grid-cols-1 overflow-hidden rounded-lg border border-brand-grey/50 bg-white sm:grid-cols-2">
            {PAIN_POINTS.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="border-brand-grey/50 p-5 sm:p-6 odd:border-b even:border-b sm:odd:border-r sm:even:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <div className="mb-4 inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-orange/50 text-brand-black">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-semibold text-brand-black">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-700">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
          {/* Logo cloud divider */}
          <motion.div variants={itemVariants} className="mt-8">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-brand-black/80 mb-4">
            Some of the tools I work with
            </p>
            <div className="mx-auto mb-4 h-px max-w-xs bg-gray-200 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
            <LogoCloud logos={LOGOS} className="max-w-3xl mx-auto" />
            <div className="mx-auto mt-4 h-px max-w-xs bg-gray-200 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
