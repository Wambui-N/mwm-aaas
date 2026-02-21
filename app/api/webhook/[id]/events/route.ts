import { NextRequest, NextResponse } from "next/server";
import { getEvents, clearEvents } from "@/lib/webhook-store";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: Context) {
  const { id } = await context.params;
  const events = getEvents(id);
  return NextResponse.json({ events });
}

export async function DELETE(_request: NextRequest, context: Context) {
  const { id } = await context.params;
  clearEvents(id);
  return NextResponse.json({ cleared: true });
}
