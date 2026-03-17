'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scorecardUrl, bookingUrl } from '@/lib/links';
import { LogoCloud } from '@/components/ui/logo-cloud-3';

// ─── Automation + integration logos ──────────────────────────────────────────

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

// ─── Problem bullets ──────────────────────────────────────────────────────────

const PROBLEMS = [
  'You spend hours on tasks you know could be automated',
  'Leads, proposals, or follow-ups fall through the cracks',
  "Your tools don't talk to each other, so data lives everywhere",
  'Manual errors slow you down and erode client trust',
  "You know there's a better way, but don't know where to start",
  "Your team is growing and the current processes won't scale",
];

// ─── Section ──────────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function ProspectFitSection() {
  return (
    <section className="py-10 border-t border-brand-grey/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <p className="text-xs font-semibold text-brand-orange uppercase tracking-widest mb-3">
              Is this for you?
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-brand-black mb-4">
              If any of this sounds familiar,
              <br className="hidden md:block" /> you're in the right place.
            </h2>
            <p className="text-gray-700 max-w-xl mx-auto text-base leading-relaxed">
              Automation works best when it solves real, recurring pain. Here's
              what I help teams fix:
            </p>
          </motion.div>

          {/* Problem grid */}
          <motion.ul
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
          >
            {PROBLEMS.map((problem) => (
              <motion.li
                key={problem}
                variants={itemVariants}
                className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-4 hover:border-brand-grey hover:bg-brand-grey/10 transition-colors"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                <span className="text-sm text-brand-black leading-snug">{problem}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA */}
          {/* <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            {scorecardUrl ? (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild variant="accent" className="px-7 py-3 text-sm group">
                  <a href={scorecardUrl} target="_blank" rel="noopener noreferrer">
                    Take the Automation Readiness Scorecard
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild variant="default" className="px-7 py-3 text-sm group">
                  <a href={bookingUrl}>
                    Book a discovery call
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </motion.div>
            )}
            <a
              href={bookingUrl}
              className="text-sm text-gray-500 hover:text-brand-black underline underline-offset-4 transition-colors"
            >
              Or book a free discovery call
            </a>
          </motion.div> */}

          {/* Logo cloud divider */}
          <motion.div variants={itemVariants}>
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
