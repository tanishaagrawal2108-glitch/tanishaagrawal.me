import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static portfolio — no server runtime. `next build` emits a static site to /out.
  output: "export",

  // Static export can't use the default (server) image optimizer, so images are
  // served as-authored. Optimization happens ahead of time via scripts/optimize-images.mjs
  // (sharp → WebP + thumbnails). next/image still handles sizing, lazy-loading and layout.
  images: {
    unoptimized: true,
  },

  // Emit /work/slug/index.html instead of /work/slug.html — cleaner on static hosts.
  trailingSlash: true,
};

export default nextConfig;
