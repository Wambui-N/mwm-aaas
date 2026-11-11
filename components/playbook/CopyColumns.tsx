"use client";

import { useState } from "react";

/** Copies the column headings tab-separated, so they paste into Google Sheets or Excel as a header row. */
export function CopyColumns({ columns }: { columns: readonly string[] }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(columns.join("\t"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the headings are on the page to copy by hand */
    }
  }
  return (
    <button type="button" onClick={copy} className="gl-mono min-h-[44px] font-bold underline underline-offset-4 hover:no-underline focus-visible:no-underline print:hidden">
      {copied ? "Copied" : "Copy as a sheet header"}
    </button>
  );
}
