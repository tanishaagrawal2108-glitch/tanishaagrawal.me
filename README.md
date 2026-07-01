# tanishaagrawal.me

Portfolio for **Tanisha Agrawal** — Spatial & Data Analyst. A static site built
from the approved Claude Design mockup (`Tanisha Agrawal Portfolio.dc.html`).

- **Stack:** Next.js (App Router, TypeScript) · Tailwind CSS v4 · shadcn/ui
- **Output:** static export (`output: "export"`) — no server runtime
- **Host:** Vercel (auto-deploys on push to `main`)

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build → static site in ./out
```

Other scripts:

| Script                 | What it does                                             |
| ---------------------- | ------------------------------------------------------- |
| `npm run images`       | Optimize map exports in `/images-src` → WebP + thumbs   |
| `npm run placeholders` | Regenerate `public/og.png` and the placeholder resume   |
| `npm run lint`         | ESLint                                                   |

---

## Project structure

```
src/
  app/                     routes (home, work, work/[slug], about, resume, contact)
    layout.tsx             fonts, metadata, header + footer
    globals.css            design tokens (colors, fonts, radii)
    sitemap.ts, robots.ts  SEO
    icon.svg               favicon
  components/              header, footer, globe, cards, work grid, gallery/lightbox, arcgis embed
  content/
    site.ts                name, contact links, skills, nav
    projects.ts            ← all project data lives here
  lib/utils.ts             cn() helper
images-src/                drop raw map exports here (git-ignored inputs)
public/images/             optimized outputs referenced by next/image
scripts/                   image pipeline + placeholder generators
```

The design tokens (Paper `#FAFAF8`, Surface `#F4F3EE`, Ink `#1A1A1A`, Muted
`#6A6A64`, Teal accent `#0E6E6A`; fonts Newsreader / Geist / Geist Mono) are
lifted verbatim from the mockup into `globals.css`.

---

## How to add a new project (map)

Everything is data-driven — you add an entry, not a page.

### 1. Add the images

Put your ArcGIS/QGIS map exports in a per-project folder under `images-src/`,
then optimize them:

```
images-src/
  my-new-project/
    hero.png
    figure-1.png
    figure-2.png
```

```bash
npm run images
```

This writes `public/images/my-new-project/hero.webp` (+ a `.thumb.webp`) for each
source image. Large TIFF/PNG exports are handled fine.

### 2. Add the entry

Append an object to the `projects` array in [`src/content/projects.ts`](src/content/projects.ts):

```ts
{
  slug: "my-new-project",          // URL: /work/my-new-project
  featured: false,                  // true → also shown on the home page (feature 8–10)
  title: "My New Project",
  oneliner: "One-line description shown on cards and as the subtitle.",
  categories: ["Spatial Analysis"], // filter tags — see CAPABILITIES in site.ts
  chips: ["ArcGIS Pro", "Raster"],  // small skill chips on the card
  role: "Sole analyst",
  affiliation: "GEOG 4xx — Course",
  date: "2025",
  tools: ["ArcGIS Pro", "Python"],
  heroCaption: "Describe the hero map.",
  heroImage: "/images/my-new-project/hero.webp", // omit to show a placeholder
  researchQuestion: "…",
  objective: "…",
  data: [{ label: "Source name", href: "https://…" }],
  methodology: ["Step one.", "Step two."],
  maps: [
    {
      src: "/images/my-new-project/figure-1.webp", // omit for a placeholder
      caption: "Fig. 1 — caption shown under the figure.",
      alt: "Descriptive alt text (required for accessibility).",
    },
  ],
  findings: ["Key finding one.", "Key finding two."],
  webMap: true,                     // true → shows the ArcGIS embed block
  arcgisEmbedUrl: null,             // paste the share URL (see below) or leave null
},
```

Cards, the `/work` filter, the detail page, prev/next nav, and the sitemap all
update automatically.

> **Placeholders:** `heroImage` / `maps[].src` are optional. Until you supply an
> image, the UI renders the design's captioned hatch placeholder — never blank.
> `alt` text is always required (508 / WCAG AA).

---

## How to set the ArcGIS embed URL

For any project with `webMap: true`, the detail page shows an interactive web-map
block. To make it live:

1. Open the web map in **ArcGIS Online → Share → Embed**.
2. Copy the iframe `src` (looks like `https://arcg.is/…` or
   `https://www.arcgis.com/apps/Embed/index.html?webmap=…`).
3. Paste it into that project's `arcgisEmbedUrl` in `projects.ts`:

   ```ts
   arcgisEmbedUrl: "https://www.arcgis.com/apps/Embed/index.html?webmap=abc123",
   ```

Until a URL is set, a documented placeholder block is shown (no broken embed).

---

## Adding the resume

Replace `public/tanisha-agrawal-resume.pdf` with the real PDF (keep the same
filename). The `/resume` page embeds it and offers a download button. A
clearly-labelled placeholder ships until then — regenerate it with
`npm run placeholders`.

---

## Deploying to Vercel

The repo is connected to Vercel and **auto-deploys on push to `main`**.

- **Framework preset:** Next.js (auto-detected)
- **Build command:** `next build` (default)
- **Output:** with `output: "export"`, Vercel serves the generated static site.

Verify locally before pushing:

```bash
npm run build
```

### Connect the domain (tanishaagrawal.me)

1. In the Vercel project → **Settings → Domains**, add `tanishaagrawal.me` and
   `www.tanishaagrawal.me`.
2. At your DNS registrar, create the records Vercel shows. Typically:

   | Type    | Name   | Value                    |
   | ------- | ------ | ------------------------ |
   | `A`     | `@`    | `76.76.21.21`            |
   | `CNAME` | `www`  | `cname.vercel-dns.com`   |

   > Use the exact values shown in your Vercel dashboard — they can differ. If
   > your registrar supports it, an `ALIAS`/`ANAME` on the apex pointing at
   > `cname.vercel-dns.com` also works.
3. Set the primary domain (redirect `www` → apex, or vice-versa) in Vercel.
4. Wait for DNS to propagate; Vercel provisions HTTPS automatically.

---

## Accessibility & SEO

- Semantic landmarks, skip-to-content link, keyboard-navigable lightbox
  (Esc / arrows), focus management, `alt` on every map, AA-contrast palette.
- Per-page `<title>`/description, Open Graph image (`/og.png`), `sitemap.xml`,
  `robots.txt`, and a branded favicon.
