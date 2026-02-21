export interface WebhookEvent {
  id: string;
  method: string;
  headers: Record<string, string>;
  body: string;
  query: Record<string, string>;
  receivedAt: string;
  contentType: string;
  size: number;
}

const MAX_EVENTS_PER_ID = 50;
const MAX_IDS = 500;

/** Use globalThis so the Map survives hot-reloads and persists within a Node.js worker. */
const g = globalThis as typeof globalThis & {
  _webhookStore?: Map<string, WebhookEvent[]>;
};
if (!g._webhookStore) {
  g._webhookStore = new Map();
}
const store = g._webhookStore;

export function addEvent(webhookId: string, event: WebhookEvent): void {
  if (!store.has(webhookId)) {
    if (store.size >= MAX_IDS) {
      const oldest = store.keys().next().value;
      if (oldest) store.delete(oldest);
    }
    store.set(webhookId, []);
  }
  const events = store.get(webhookId)!;
  events.unshift(event); // newest first
  if (events.length > MAX_EVENTS_PER_ID) {
    events.splice(MAX_EVENTS_PER_ID);
  }
}

export function getEvents(webhookId: string): WebhookEvent[] {
  return store.get(webhookId) ?? [];
}

export function clearEvents(webhookId: string): void {
  store.delete(webhookId);
}
