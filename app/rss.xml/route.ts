import { NextResponse } from "next/server";
import { generateRss } from "@/lib/content/blog";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  const rss = generateRss();
  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
