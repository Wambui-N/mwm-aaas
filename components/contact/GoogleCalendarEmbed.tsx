'use client';

import React, { useState } from 'react';

export default function GoogleCalendarEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-gray-100 bg-white">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white" style={{ height: 600 }}>
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <div className="w-6 h-6 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Loading calendar…</span>
          </div>
        </div>
      )}
      <iframe
        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3IyUTXZbXnr4LfWUkBOCp-WVVw06GgAr1YBMsNnnObpc76RKIEtGchs8oFcvk4aldbutadnyW2?gv=true"
        style={{ border: 0 }}
        width="100%"
        height={600}
        frameBorder={0}
        loading="lazy"
        title="Book a discovery call"
        aria-label="Google Calendar scheduling — pick a time for your discovery call"
        onLoad={() => setLoaded(true)}
        className={loaded ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}
      />
    </div>
  );
}
