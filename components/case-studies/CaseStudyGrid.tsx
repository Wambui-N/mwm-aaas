"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/content/blog";

type Props = {
  caseStudies: BlogPost[];
};

export default function CaseStudyGrid({ caseStudies }: Props) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {caseStudies.map((post) => (
        <motion.article
          key={post.slug}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-all hover:border-brand-grey hover:shadow-sm"
        >
          <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
            {post.image ? (
              <div className="h-52 w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </div>
            ) : (
              <div className="h-52 w-full bg-brand-grey/20" />
            )}

            <div className="flex flex-1 flex-col p-6">
              <time
                dateTime={post.date}
                className="mb-3 block text-xs text-gray-400"
              >
                {format(new Date(post.date), "MMMM d, yyyy")}
              </time>
              <h2 className="mb-3 text-xl font-display font-semibold leading-snug text-brand-black transition-colors group-hover:text-brand-orange">
                {post.title}
              </h2>
              <p className="flex-1 text-sm leading-relaxed text-gray-500">
                {post.description}
              </p>
            </div>
          </Link>

          <div className="flex items-center justify-between px-6 pb-5">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.tags.filter((t) => t.toLowerCase() !== "case-study" && t.toLowerCase() !== "case study").slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-brand-grey/30 text-brand-black"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <Link
              href={`/blog/${post.slug}`}
              className="ml-auto flex items-center gap-1 text-xs font-medium text-brand-orange"
            >
              Read <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
