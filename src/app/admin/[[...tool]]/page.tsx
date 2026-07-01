"use client";

import { NextStudio } from "next-sanity/studio";
import { sanityConfig } from "@/sanity/config";
import { isSanityConfigured } from "@/sanity/env";

/**
 * Sanity Studio, embedded at /admin. Tanisha logs in here to edit every
 * section and upload maps. It's a client-side app; content is served by Sanity.
 * Until a Sanity project id is set, we show a short setup notice instead of a
 * hard error.
 */
export default function AdminPage() {
  if (!isSanityConfigured) {
    return (
      <div className="mx-auto flex min-h-screen max-w-[36rem] flex-col justify-center gap-4 px-6 text-center">
        <h1 className="font-display text-2xl">Editor not connected yet</h1>
        <p className="text-muted-ink">
          Add your Sanity project ID to the environment variable{" "}
          <code className="rounded bg-surface-2 px-1.5 py-0.5">
            NEXT_PUBLIC_SANITY_PROJECT_ID
          </code>{" "}
          (locally in <code>.env.local</code> and in Vercel), then reload this
          page. See the README&rsquo;s &ldquo;Content editing (Sanity)&rdquo;
          section.
        </p>
      </div>
    );
  }

  return <NextStudio config={sanityConfig} />;
}
