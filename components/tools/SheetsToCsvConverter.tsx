"use client";

import React, { useState, useRef, useCallback } from "react";
import { Download, ClipboardPaste, Trash2, Info } from "lucide-react";

type Delimiter = "tab" | "comma" | "semicolon" | "pipe";

const DELIMITER_CHARS: Record<Delimiter, string> = {
  tab: "\t",
  comma: ",",
  semicolon: ";",
  pipe: "|",
};

const DELIMITER_LABELS: Record<Delimiter, string> = {
  tab: "Tab (Google Sheets / Excel copy-paste)",
  comma: "Comma (CSV)",
  semicolon: "Semicolon",
  pipe: "Pipe  |",
};

const SAMPLE =
  "Name\tEmail\tRole\n" +
  "Alice\talice@example.com\tDesigner\n" +
  "Bob\tbob@example.com\tEngineer\n" +
  "Carol\tcarol@example.com\tProduct";

function detectDelimiter(text: string): Delimiter {
  const firstLine = text.split("\n")[0] ?? "";
  if (firstLine.includes("\t")) return "tab";
  if (firstLine.includes(";")) return "semicolon";
  if (firstLine.includes("|")) return "pipe";
  return "comma";
}

function parseSheet(text: string, delim: string, hasHeader: boolean) {
  const rawLines = text
    .split("\n")
    .map((l) => l.replace(/\r$/, ""))
    .filter((l) => l.trim() !== "");

  if (rawLines.length === 0) return { headers: [], rows: [] };

  const split = (line: string) => line.split(delim);

  const firstRow = split(rawLines[0]);
  const headers: string[] = hasHeader
    ? firstRow.map((h) => h.trim())
    : firstRow.map((_, i) => `Column ${i + 1}`);

  const dataLines = hasHeader ? rawLines.slice(1) : rawLines;
  const rows = dataLines.map((line) => {
    const cells = split(line);
    // pad short rows
    while (cells.length < headers.length) cells.push("");
    return cells;
  });

  return { headers, rows };
}

function toCsvLine(cells: string[]): string {
  return cells
    .map((cell) => {
      const s = cell ?? "";
      if (s.includes(",") || s.includes('"') || s.includes("\n")) {
        return `"${s.replace(/"/g, '""')}"`;
      }
      return s;
    })
    .join(",");
}

export default function SheetsToCsvConverter() {
  const [input, setInput] = useState(SAMPLE);
  const [delimiter, setDelimiter] = useState<Delimiter>("tab");
  const [hasHeader, setHasHeader] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const downloadRef = useRef<HTMLAnchorElement | null>(null);

  const process = useCallback(
    (shouldDownload = false, textOverride?: string, delimOverride?: Delimiter) => {
      const text = textOverride ?? input;
      const delim = DELIMITER_CHARS[delimOverride ?? delimiter];
      setError(null);

      try {
        if (!text.trim()) throw new Error("Paste some data first.");
        const parsed = parseSheet(text, delim, hasHeader);
        if (parsed.headers.length === 0) throw new Error("No data found.");

        setHeaders(parsed.headers);
        setRows(parsed.rows.slice(0, 200));

        if (shouldDownload) {
          const csvLines = [
            toCsvLine(parsed.headers),
            ...parsed.rows.map(toCsvLine),
          ];
          const csv = csvLines.join("\n");
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
        setError(e instanceof Error ? e.message : "Something went wrong.");
        setHeaders([]);
        setRows([]);
      }
    },
    [input, delimiter, hasHeader]
  );

  function handlePaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const text = e.clipboardData.getData("text");
    const detected = detectDelimiter(text);
    setDelimiter(detected);
    // let the default paste update the textarea value, then process
    setTimeout(() => process(false, text, detected), 0);
  }

  function clearAll() {
    setInput("");
    setHeaders([]);
    setRows([]);
    setError(null);
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-display font-semibold text-brand-black">
            Sheets → CSV Converter
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Copy cells from Google Sheets or Excel and paste below.
          </p>
        </div>
        <button
          onClick={clearAll}
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear
        </button>
      </div>

      {/* Options row */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Input delimiter
          </label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value as Delimiter)}
            className="border border-gray-200 rounded-md px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
          >
            {(Object.keys(DELIMITER_LABELS) as Delimiter[]).map((d) => (
              <option key={d} value={d}>
                {DELIMITER_LABELS[d]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            id="hasHeader"
            type="checkbox"
            checked={hasHeader}
            onChange={(e) => setHasHeader(e.target.checked)}
            className="w-4 h-4 accent-brand-orange"
          />
          <label htmlFor="hasHeader" className="text-sm text-gray-700">
            First row is a header
          </label>
        </div>
      </div>

      {/* Tip */}
      <div className="flex items-start gap-2 mb-3 text-xs text-gray-400">
        <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
        <span>
          Tip: copy cells directly from Google Sheets or Excel — delimiter is
          auto-detected on paste.
        </span>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onPaste={handlePaste}
        rows={7}
        spellCheck={false}
        className="w-full border border-gray-200 rounded-lg p-3 font-mono text-sm text-gray-700 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange resize-y"
        placeholder={"Name\tEmail\tRole\nAlice\talice@example.com\tDesigner"}
      />

      {error && (
        <p className="mt-2 text-sm text-red-500 bg-red-50 border border-red-100 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => process(false)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-black text-white rounded-md text-sm font-medium hover:bg-brand-black/90 transition-colors"
        >
          Preview
        </button>
        <button
          onClick={() => process(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange text-white rounded-md text-sm font-medium hover:bg-brand-orange/90 transition-colors"
        >
          <Download className="w-4 h-4" /> Download CSV
        </button>
        <button
          onClick={() => navigator.clipboard?.writeText(input)}
          className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ClipboardPaste className="w-4 h-4" /> Copy raw
        </button>
      </div>

      {headers.length > 0 && (
        <div className="mt-6">
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide font-medium">
            Preview — {rows.length} row{rows.length !== 1 ? "s" : ""}
            {rows.length === 200 ? " (first 200 shown)" : ""}
          </p>
          <div className="overflow-auto rounded-lg border border-gray-100 max-h-72">
            <table className="min-w-full text-sm">
              <thead className="bg-brand-grey/20 sticky top-0">
                <tr>
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      className="px-3 py-2 text-left text-xs font-semibold text-brand-black uppercase tracking-wide whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={ri % 2 === 0 ? "bg-white" : "bg-gray-50/60"}
                  >
                    {headers.map((_, ci) => (
                      <td
                        key={ci}
                        className="px-3 py-1.5 text-gray-700 align-top max-w-[200px] truncate"
                        title={row[ci] ?? ""}
                      >
                        {row[ci] ?? ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <a ref={downloadRef} className="hidden" />
    </div>
  );
}
