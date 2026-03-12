'use client';

import React, { useState } from 'react';

export default function TallyEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-gray-100 bg-white">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <div className="w-6 h-6 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Loading form…</span>
          </div>
        </div>
      )}
      <iframe
        src="https://tally.so/r/mDZWMb"
        width="100%"
        frameBorder={0}
        loading="lazy"
        title="Free consultation request form"
        aria-label="Contact form — fill this to help us prepare for your meeting"
        onLoad={() => setLoaded(true)}
        style={{ height: "min(720px, 70vh)" }}
        className={loaded ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}
      />
    </div>
  );
}
