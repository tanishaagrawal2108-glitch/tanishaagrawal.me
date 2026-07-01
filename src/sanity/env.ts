/**
 * Sanity connection settings, read from environment variables.
 *
 * The site is designed to work WITHOUT Sanity configured — in that case it
 * falls back to the seed content in src/content/*. Once these env vars are set
 * (locally in .env.local and in Vercel), content comes from Sanity instead.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** True once a Sanity project id is present — gates all live CMS reads. */
export const isSanityConfigured = projectId.length > 0;
