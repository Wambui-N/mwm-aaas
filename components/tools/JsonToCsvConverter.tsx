"use client";

import React, { useState, useRef } from "react";
import { Download, ClipboardCopy, Trash2 } from "lucide-react";

function flatten(obj: Record<string, unknown>, prefix = ""): Record<string, unknown> {
  const res: Record<string, unknown> = {};
  for (const key of Object.keys(obj || {})) {
    const val = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(res, flatten(val as Record<string, unknown>, path));
    } else {
      res[path] = val;
    }
  }
  return res;
}

function arrayUnion(arrays: string[][]): string[] {
  const set = new Set<string>();
  for (const a of arrays) for (const v of a) set.add(v);
  return Array.from(set);
}

function toCsv(rows: Record<string, unknown>[], headers: string[]): string {
  const escape = (val: unknown): string => {
    if (val === null || val === undefined) return '""';
    const s = typeof val === "string" ? val : String(val);
    return `"${s.replace(/"/g, '""')}"`;
  };
  const lines = [headers.map(escape).join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => escape(row[h])).join(","));
  }
  return lines.join("\n");
}

const SAMPLE = `[
  { "name": "Alice", "email": "alice@example.com" },
  { "name": "Bob",   "email": "bob@example.com", "age": 32 }
]`;

export default function JsonToCsvConverter() {
  const [input, setInput] = useState(SAMPLE);
  const [error, setError] = useState<string | null>(null);
  const [previewRows, setPreviewRows] = useState<Record<string, unknown>[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const downloadRef = useRef<HTMLAnchorElement | null>(null);

  function parseAndBuild(shouldDownload = false) {
    setError(null);
    try {
      const data: unknown = JSON.parse(input);
      let items: Record<string, unknown>[] = [];
      if (Array.isArray(data)) {
        items = data as Record<string, unknown>[];
      } else if (typeof data === "object" && data !== null) {
        items = [data as Record<string, unknown>];
      } else {
        throw new Error("JSON must be an object or array of objects.");
      }

      const flat = items.map((it) => flatten(it));
      const keys = arrayUnion(flat.map((f) => Object.keys(f))).sort();
      const rows = flat.map((f) => {
        const out: Record<string, unknown> = {};
        for (const k of keys) {
          const val = f[k];
          out[k] =
            Array.isArray(val) || (typeof val === "object" && val !== null)
              ? JSON.stringify(val)
              : (val ?? "");
        }
        return out;
      });

      setPreviewRows(rows.slice(0, 50));
      setHeaders(keys);

      if (shouldDownload) {
        const csv = toCsv(rows, keys);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        if (downloadRef.current) {
          downloadRef.current.href = url;
          downloadRef.current.download = "data.csv";
          downloadRef.current.click();
          URL.revokeObjectURL(url);
        }
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setPreviewRows([]);
      setHeaders([]);
    }
  }

  function clearAll() {
    setInput("");
    setPreviewRows([]);
    setHeaders([]);
    setError(null);
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-display font-semibold text-brand-black">
          JSON → CSV Converter
        </h3>
        <button
          onClick={clearAll}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear
        </button>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={8}
        spellCheck={false}
        className="w-full border border-gray-200 rounded-lg p-3 font-mono text-sm text-gray-700 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange resize-y"
        placeholder='Paste JSON array of objects, e.g. [{"name":"Alice","email":"a@x.com"}]'
      />

      {error && (
        <p className="mt-2 text-sm text-red-500 bg-red-50 border border-red-100 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => parseAndBuild(false)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-black text-white rounded-md text-sm font-medium hover:bg-brand-black/90 transition-colors"
        >
          Preview
        </button>
        <button
          onClick={() => parseAndBuild(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange text-white rounded-md text-sm font-medium hover:bg-brand-orange/90 transition-colors"
        >
          <Download className="w-4 h-4" /> Download CSV
        </button>
        <button
          onClick={() => navigator.clipboard?.writeText(input)}
          className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ClipboardCopy className="w-4 h-4" /> Copy JSON
        </button>
      </div>

      {headers.length > 0 && (
        <div className="mt-6">
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">
            Preview — {previewRows.length} row{previewRows.length !== 1 ? "s" : ""}
            {previewRows.length === 50 ? " (first 50 shown)" : ""}
          </p>
          <div className="overflow-auto rounded-lg border border-gray-100 max-h-72">
            <table className="min-w-full text-sm">
              <thead className="bg-brand-grey sticky top-0">
                <tr>
                  {headers.map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left text-xs font-semibold text-brand-black uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewRows.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}
                  >
                    {headers.map((h) => (
                      <td
                        key={h}
                        className="px-3 py-1.5 text-gray-700 align-top max-w-[200px] truncate"
                        title={String(row[h] ?? "")}
                      >
                        {String(row[h] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Hidden anchor for triggering download */}
      <a ref={downloadRef} className="hidden" />
    </div>
  );
}
