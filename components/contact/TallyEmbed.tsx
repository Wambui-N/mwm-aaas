'use client';

import Script from 'next/script';
import React, { useCallback, useEffect, useState } from 'react';

declare global {
  interface Window {
    Tally?: { loadEmbeds: () => void };
  }
}

const TALLY_EMBED_URL =
  'https://tally.so/embed/mDZWMb?alignLeft=1&hideTitle=1&dynamicHeight=1';

export default function TallyEmbed() {
  const [loaded, setLoaded] = useState(false);

  const loadEmbeds = useCallback(() => {
    window.Tally?.loadEmbeds();
  }, []);

  useEffect(() => {
    loadEmbeds();
  }, [loadEmbeds]);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-gray-100 bg-white">
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={loadEmbeds}
      />
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-brand-orange border-t-transparent" />
            <span className="text-sm">Loading form…</span>
          </div>
        </div>
      )}
      <iframe
        data-tally-src={TALLY_EMBED_URL}
        loading="lazy"
        width="100%"
        height={356}
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        title="Transform Your Processes"
        aria-label="Contact form — fill this to help us prepare for your meeting"
        onLoad={() => setLoaded(true)}
        className={loaded ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}
      />
    </div>
  );
}
