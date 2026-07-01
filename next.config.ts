import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server-rendered on Vercel so the /admin Studio and live CMS content work.
  // Pages use short revalidation (see src/lib/content.ts) — fast + auto-updating.
  images: {
    // Map images are served from Sanity's image CDN (auto-optimized there).
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },

  // Keep clean, trailing-slash URLs (matches the existing deploy).
  trailingSlash: true,
};

export default nextConfig;
