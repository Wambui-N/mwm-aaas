'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, CalendarDays, ArrowRight, CheckCircle2 } from 'lucide-react';

const TallyEmbed = dynamic(() => import('./TallyEmbed'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-24 text-sm text-ink/60">
      Loading form…
    </div>
  ),
});

const GoogleCalendarEmbed = dynamic(() => import('./GoogleCalendarEmbed'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-24 text-sm text-ink/60">
      Loading calendar…
    </div>
  ),
});

type Option = 'form' | 'book';

const OPTIONS: {
  id: Option;
  icon: React.ElementType;
  label: string;
  tagline: string;
  badge?: string;
}[] = [
  {
    id: 'form',
    icon: ClipboardList,
    label: 'Fill the form first',
    tagline: 'Answer a few quick questions so I can tailor the call to your situation.',
    badge: 'Recommended',
  },
  {
    id: 'book',
    icon: CalendarDays,
    label: 'Book directly',
    tagline: "Skip the form and grab a slot. You can share context during the call.",
  },
];

const panelVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export default function ContactPanel() {
  const [selected, setSelected] = useState<Option | null>(null);
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected && embedRef.current) {
      embedRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selected]);

  return (
    <div className="space-y-8">
      {/* Option cards: hairline boxes, the chosen one is solid ink */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {OPTIONS.map(({ id, icon: Icon, label, tagline, badge }) => {
          const on = selected === id;
          return (
            <button
              key={id}
              type="button"
              aria-pressed={on}
              onClick={() => setSelected(id)}
              className={`relative flex flex-col items-start gap-3 border p-5 text-left transition-colors md:p-6 ${
                on ? 'border-ink bg-ink text-sage' : 'border-ink/30 bg-white text-ink hover:border-ink hover:bg-sage/30'
              }`}
            >
              <span className="flex w-full items-center justify-between gap-3">
                <Icon className="h-5 w-5" aria-hidden />
                {badge && (
                  <span className={`gl-mono border px-2 py-1 ${on ? 'border-sage/60 text-sage' : 'border-ink/40 text-ink/80'}`}>{badge}</span>
                )}
              </span>
              <span>
                <span className="block font-[family-name:var(--font-brule)] text-[1.5rem] font-semibold leading-tight">{label}</span>
                <span className={`calm-body mt-2 block ${on ? 'text-sage/90' : 'text-ink/75'}`}>{tagline}</span>
              </span>
              {on && <CheckCircle2 className="absolute bottom-4 right-4 h-4 w-4" aria-hidden />}
            </button>
          );
        })}
      </div>

      {/* Why fill the form: shown when no choice made or form selected */}
      {selected !== 'book' && (
        <div className="flex gap-3 border border-ink/20 bg-sage/25 px-5 py-4">
          <ArrowRight className="mt-[0.2rem] h-4 w-4 shrink-0" aria-hidden />
          <p className="calm-body">
            <span className="font-bold">Why fill the form?</span> It takes less
            than 3 minutes and helps me understand your setup before we meet, so we spend the call
            solving your problems, not collecting background.
          </p>
        </div>
      )}

      {/* Embed area */}
      <div ref={embedRef}>
        <AnimatePresence mode="wait">
          {selected === 'form' && (
            <motion.div
              key="tally"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <p className="calm-body mb-4 text-ink/75">
                At the end of the form you&apos;ll be prompted to pick a time for our call.
              </p>
              <TallyEmbed />
            </motion.div>
          )}

          {selected === 'book' && (
            <motion.div
              key="calendar"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <GoogleCalendarEmbed />

              {/* Nudge to fill the form after booking */}
              <div className="mt-6 flex gap-3 border border-ink/20 bg-sage/25 px-5 py-4">
                <ClipboardList className="mt-[0.2rem] h-4 w-4 shrink-0" aria-hidden />
                <p className="calm-body">
                  <span className="font-bold">Make our meeting count.</span>{' '}
                  <button
                    type="button"
                    onClick={() => setSelected('form')}
                    className="font-bold underline underline-offset-4 hover:no-underline"
                  >
                    Fill the short form
                  </button>{' '}
                  so I can tailor the conversation to your business before we connect.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
