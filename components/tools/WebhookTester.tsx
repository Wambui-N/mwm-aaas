"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Trash2,
  ChevronDown,
  ChevronRight,
  Circle,
  ExternalLink,
} from "lucide-react";

interface WebhookEvent {
  id: string;
  method: string;
  headers: Record<string, string>;
  body: string;
  query: Record<string, string>;
  receivedAt: string;
  contentType: string;
  size: number;
}

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-blue-100 text-blue-700",
  POST: "bg-green-100 text-green-700",
  PUT: "bg-yellow-100 text-yellow-700",
  PATCH: "bg-orange-100 text-orange-700",
  DELETE: "bg-red-100 text-red-700",
  HEAD: "bg-purple-100 text-purple-700",
  OPTIONS: "bg-gray-100 text-gray-600",
};

function prettyJson(str: string): string | null {
  try {
    return JSON.stringify(JSON.parse(str), null, 2);
  } catch {
    return null;
  }
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(1)} KB`;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function generateId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length: 12 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1 px-2 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 transition-colors text-gray-500"
    >
      {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function EventRow({ event }: { event: WebhookEvent }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"body" | "headers" | "query">("body");

  const pretty = useMemo(() => prettyJson(event.body), [event.body]);
  const bodyDisplay = pretty ?? event.body;
  const hasQuery = Object.keys(event.query).length > 0;
  const methodColor = METHOD_COLORS[event.method] ?? "bg-gray-100 text-gray-600";

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        {open ? (
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
        )}
        <span
          className={`px-2 py-0.5 rounded text-xs font-bold font-mono flex-shrink-0 ${methodColor}`}
        >
          {event.method}
        </span>
        <span className="text-xs text-gray-400 flex-shrink-0">
          {formatTime(event.receivedAt)}
        </span>
        {event.contentType && (
          <span className="text-xs text-gray-400 truncate hidden sm:block">
            {event.contentType.split(";")[0]}
          </span>
        )}
        <span className="ml-auto text-xs text-gray-400 flex-shrink-0">
          {formatBytes(event.size)}
        </span>
      </button>

      {open && (
        <div className="border-t border-gray-100 bg-gray-50/50">
          {/* Tab bar */}
          <div className="flex gap-0 border-b border-gray-100 px-4">
            {(["body", "headers", "query"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-2 text-xs font-medium capitalize transition-colors border-b-2 -mb-px ${
                  tab === t
                    ? "border-brand-orange text-brand-orange"
                    : "border-transparent text-gray-500 hover:text-brand-black"
                }`}
              >
                {t}
                {t === "query" && hasQuery && (
                  <span className="ml-1 bg-brand-grey/50 text-brand-black rounded-full px-1 text-[10px]">
                    {Object.keys(event.query).length}
                  </span>
                )}
                {t === "headers" && (
                  <span className="ml-1 bg-brand-grey/50 text-brand-black rounded-full px-1 text-[10px]">
                    {Object.keys(event.headers).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="p-4">
            {tab === "body" && (
              <div>
                {bodyDisplay ? (
                  <div className="relative">
                    <div className="absolute top-2 right-2">
                      <CopyButton text={bodyDisplay} />
                    </div>
                    <pre className="bg-white border border-gray-100 rounded-lg p-4 text-xs font-mono text-gray-700 overflow-auto max-h-80 whitespace-pre-wrap break-all">
                      {bodyDisplay}
                    </pre>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">Empty body</p>
                )}
              </div>
            )}

            {tab === "headers" && (
              <div className="overflow-auto">
                <table className="min-w-full text-xs">
                  <thead>
                    <tr>
                      <th className="text-left text-gray-500 font-medium pb-2 pr-6 uppercase tracking-wide text-[10px] w-1/3">
                        Header
                      </th>
                      <th className="text-left text-gray-500 font-medium pb-2 uppercase tracking-wide text-[10px]">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {Object.entries(event.headers).map(([k, v]) => (
                      <tr key={k}>
                        <td className="py-1.5 pr-6 font-mono text-brand-black font-medium align-top">
                          {k}
                        </td>
                        <td className="py-1.5 font-mono text-gray-600 break-all">
                          {v}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "query" && (
              <div>
                {hasQuery ? (
                  <table className="min-w-full text-xs">
                    <thead>
                      <tr>
                        <th className="text-left text-gray-500 font-medium pb-2 pr-6 uppercase tracking-wide text-[10px] w-1/3">
                          Param
                        </th>
                        <th className="text-left text-gray-500 font-medium pb-2 uppercase tracking-wide text-[10px]">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {Object.entries(event.query).map(([k, v]) => (
                        <tr key={k}>
                          <td className="py-1.5 pr-6 font-mono text-brand-black font-medium">
                            {k}
                          </td>
                          <td className="py-1.5 font-mono text-gray-600">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-xs text-gray-400 italic">No query parameters</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function WebhookTester() {
  const [webhookId] = useState<string>(() => generateId());
  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [urlCopied, setUrlCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastPoll, setLastPoll] = useState<Date | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const webhookUrl = typeof window !== "undefined"
    ? `${window.location.origin}/api/webhook/${webhookId}`
    : `/api/webhook/${webhookId}`;

  const poll = useCallback(async () => {
    try {
      const res = await fetch(`/api/webhook/${webhookId}/events`);
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events ?? []);
        setLastPoll(new Date());
      }
    } catch {
      // silently ignore network errors
    }
  }, [webhookId]);

  const manualRefresh = useCallback(async () => {
    setLoading(true);
    await poll();
    setLoading(false);
  }, [poll]);

  const clearAll = useCallback(async () => {
    await fetch(`/api/webhook/${webhookId}/events`, { method: "DELETE" });
    setEvents([]);
  }, [webhookId]);

  const copyUrl = useCallback(() => {
    navigator.clipboard?.writeText(webhookUrl);
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 1500);
  }, [webhookUrl]);

  // Start/stop auto-refresh
  useEffect(() => {
    if (autoRefresh) {
      poll(); // immediate first poll
      intervalRef.current = setInterval(poll, 3000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoRefresh, poll]);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-display font-semibold text-brand-black mb-1">
          Webhook Tester / Inspector
        </h3>
        <p className="text-sm text-gray-500">
          Send any HTTP request to the URL below and inspect the payload in real time.
        </p>
      </div>

      {/* Webhook URL */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Your webhook URL
        </label>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
          <code className="flex-1 text-sm font-mono text-brand-black break-all">
            {webhookUrl}
          </code>
          <button
            onClick={copyUrl}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-orange text-white rounded-md text-xs font-medium hover:bg-brand-orange/90 transition-colors"
          >
            {urlCopied ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {urlCopied ? "Copied!" : "Copy"}
          </button>
        </div>
        <p className="mt-1.5 text-xs text-gray-400">
          Accepts GET, POST, PUT, PATCH, DELETE — any content type. URL is unique to this session.
        </p>
      </div>

      {/* Quick-test snippet */}
      <details className="mb-6 group">
        <summary className="cursor-pointer text-xs font-medium text-gray-500 hover:text-brand-black transition-colors list-none flex items-center gap-1.5">
          <ExternalLink className="w-3.5 h-3.5" />
          Test it with curl
        </summary>
        <div className="mt-2 relative">
          <div className="absolute top-2 right-2">
            <CopyButton
              text={`curl -X POST "${webhookUrl}" \\\n  -H "Content-Type: application/json" \\\n  -d '{"hello":"world"}'`}
            />
          </div>
          <pre className="bg-gray-900 text-green-400 text-xs font-mono rounded-lg p-4 overflow-auto">
            {`curl -X POST "${webhookUrl}" \\
  -H "Content-Type: application/json" \\
  -d '{"hello":"world"}'`}
          </pre>
        </div>
      </details>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button
          onClick={manualRefresh}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>

        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
            className="w-4 h-4 accent-brand-orange"
          />
          <span className="text-sm text-gray-600">Auto-refresh</span>
          {autoRefresh && (
            <Circle className="w-2 h-2 fill-green-500 text-green-500 animate-pulse" />
          )}
        </label>

        {events.length > 0 && (
          <button
            onClick={clearAll}
            className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear ({events.length})
          </button>
        )}
      </div>

      {/* Last poll time */}
      {lastPoll && (
        <p className="text-xs text-gray-400 mb-3">
          Last checked {formatTime(lastPoll.toISOString())}
        </p>
      )}

      {/* Events list */}
      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-100 rounded-xl">
          <div className="w-12 h-12 bg-brand-grey/20 rounded-full flex items-center justify-center mb-3">
            <RefreshCw className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-500">Waiting for requests…</p>
          <p className="text-xs text-gray-400 mt-1 max-w-xs">
            Copy the URL above and send a request from Make.com, Zapier, curl, or any HTTP client.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide font-medium">
            {events.length} request{events.length !== 1 ? "s" : ""} received
            {events.length === 50 ? " (max 50, oldest removed)" : ""}
          </p>
          {events.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
