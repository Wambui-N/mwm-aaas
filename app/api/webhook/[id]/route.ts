import { NextRequest, NextResponse } from "next/server";
import { addEvent, type WebhookEvent } from "@/lib/webhook-store";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

async function handler(request: NextRequest, context: Context) {
  const { id } = await context.params;

  const body = await request.text();

  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    // strip sensitive forwarding headers
    if (!["host", "connection"].includes(key)) {
      headers[key] = value;
    }
  });

  const { searchParams } = new URL(request.url);
  const query: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    query[key] = value;
  });

  const event: WebhookEvent = {
    id: crypto.randomUUID(),
    method: request.method,
    headers,
    body,
    query,
    receivedAt: new Date().toISOString(),
    contentType: request.headers.get("content-type") ?? "",
    size: new TextEncoder().encode(body).length,
  };

  addEvent(id, event);

  return NextResponse.json({ received: true, id: event.id }, { status: 200 });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const HEAD = handler;
export const OPTIONS = handler;
