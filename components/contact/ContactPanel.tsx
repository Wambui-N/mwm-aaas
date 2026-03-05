'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, CalendarDays, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const TallyEmbed = dynamic(() => import('./TallyEmbed'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-24 text-gray-400 text-sm">
      Loading form…
    </div>
  ),
});

const GoogleCalendarEmbed = dynamic(() => import('./GoogleCalendarEmbed'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-24 text-gray-400 text-sm">
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
    <div className="mt-10 space-y-8">
      {/* Option cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {OPTIONS.map(({ id, icon: Icon, label, tagline, badge }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className={cn(
              'group relative flex flex-col items-start gap-3 rounded-2xl border p-6 text-left transition-all duration-200',
              selected === id
                ? 'border-brand-orange bg-brand-orange/5 shadow-sm'
                : 'border-gray-200 bg-white hover:border-brand-grey hover:shadow-sm'
            )}
          >
            {badge && (
              <span className="absolute top-4 right-4 rounded-full bg-brand-orange/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-brand-orange">
                {badge}
              </span>
            )}
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                selected === id
                  ? 'bg-brand-orange text-white'
                  : 'bg-brand-grey/30 text-brand-black group-hover:bg-brand-orange/10 group-hover:text-brand-orange'
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-brand-black text-sm leading-snug">{label}</p>
              <p className="mt-1 text-xs text-gray-500 leading-relaxed">{tagline}</p>
            </div>
            <span className="absolute bottom-4 right-4 flex items-center gap-1 text-brand-orange opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
              {selected === id ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </span>
          </button>
        ))}
      </div>

      {/* Why fill the form — shown when no choice made or form selected */}
      {selected !== 'book' && (
        <div className="flex gap-3 rounded-xl border border-brand-grey/40 bg-brand-grey/10 px-5 py-4">
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="font-medium text-brand-black">Why fill the form?</span> It takes less
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
            <p className="mb-4 text-sm text-gray-500">
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
            <div className="mt-6 flex gap-3 rounded-xl border border-brand-grey/40 bg-brand-grey/10 px-5 py-4">
              <ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
              <p className="text-sm text-gray-600 leading-relaxed">
                <span className="font-medium text-brand-black">Make our meeting count.</span>{' '}
                <button
                  onClick={() => setSelected('form')}
                  className="underline underline-offset-2 text-brand-orange hover:text-brand-orange/80 transition-colors"
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
