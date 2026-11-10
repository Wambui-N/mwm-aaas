import { NextResponse } from "next/server";
import { generateRss } from "@/lib/content/blog";

export const dynamic = "force-static";
export const revalidate = 300;

export async function GET() {
  const rss = await generateRss();
  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
