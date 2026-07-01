# tanishaagrawal.me

Portfolio for **Tanisha Agrawal** — Spatial & Data Analyst. Built from the
approved Claude Design mockup (`Tanisha Agrawal Portfolio.dc.html`), with a
no-code editor so Tanisha can update everything herself.

- **Stack:** Next.js (App Router, TypeScript) · Tailwind CSS v4 · shadcn/ui · **Sanity CMS**
- **Editing:** Sanity Studio embedded at **`/admin`** (login required)
- **Host:** Vercel (auto-deploys on push to `main`)
- **Content:** served from Sanity when configured; otherwise falls back to the
  built-in content in `src/content/*`, so the site always builds and renders.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000  (site)  ·  /admin  (editor)
npm run build      # production build
```

| Script                 | What it does                                            |
| ---------------------- | ------------------------------------------------------- |
| `npm run seed`         | Load the built-in content into Sanity (one time)        |
| `npm run images`       | Optimize local map exports in `/images-src` → WebP       |
| `npm run placeholders` | Regenerate `public/og.png` and the placeholder resume   |
| `npm run lint`         | ESLint                                                   |

---

## Content editing (Sanity) — how Tanisha updates the site

Once set up, **she never touches code**:

1. Go to **`tanishaagrawal.me/admin`** and log in (Google / GitHub / email).
2. Edit any section — **Site Settings** (name, hero, contact, skills), **About
   Page**, or **Projects**. Text is plain form fields.
3. **Add a project:** Projects → **＋** → fill in the fields, drag-and-drop the
   hero and map images (each map has its own caption + alt-text box).
4. Click **Publish**. The live site updates within about a minute.

### One-time setup (developer)

1. **Create a Sanity project** at [sanity.io/manage](https://www.sanity.io/manage)
   (or `npm create sanity@latest`). Note the **Project ID** and dataset
   (`production`).
2. **CORS origins** — in Sanity → **API → CORS origins**, add
   `http://localhost:3000` and `https://tanishaagrawal.me` (plus your Vercel
   preview URL) with **Allow credentials** checked. This lets the embedded
   Studio log in.
3. **Local env** — copy `.env.example` to `.env.local` and fill in
   `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and a
   `SANITY_API_WRITE_TOKEN` (Sanity → **API → Tokens**, "Editor" permission).
4. **Seed** the current content so the editor opens fully populated:
   ```bash
   npm run seed
   ```
5. **Vercel env** — in the Vercel project → **Settings → Environment Variables**,
   add `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, and
   `NEXT_PUBLIC_SANITY_API_VERSION`, then redeploy. (Do **not** add the write
   token to Vercel — it's only for local seeding.)
6. **Invite Tanisha** as a member (Editor) of the Sanity project so she can log
   in at `/admin`.

> Until step 5 is done, the site still works — it serves the built-in content
> and `/admin` shows a short "connect Sanity" notice.

### Uploading her map images

Just drag them into the image fields in `/admin` — Sanity stores and optimizes
them on its CDN (no size limits to worry about; no build step). The local
`npm run images` pipeline (`/images-src` → WebP) remains available if you ever
want to reference images from `/public` instead.

---

## How it's structured

```
src/
  app/
    (site)/                marketing pages (home, work, work/[slug], about, resume, contact)
    admin/[[...tool]]/     embedded Sanity Studio  → /admin
    layout.tsx             fonts + metadata
    globals.css            design tokens
    sitemap.ts, robots.ts
  components/              header, footer, globe, cards, work grid, lightbox, arcgis embed
  content/                 built-in fallback content (also the seed source)
    site.ts, about.ts, projects.ts
  lib/content.ts           data layer: Sanity when configured, else fallback
  sanity/                  client, schemas, queries, image URLs, Studio config
```

Design tokens (Paper `#FAFAF8`, Surface `#F4F3EE`, Ink `#1A1A1A`, Muted
`#6A6A64`, Teal `#0E6E6A`; Newsreader / Geist / Geist Mono) are lifted verbatim
from the mockup into `globals.css`.

### Editing content in code (advanced / fallback)

`src/content/*.ts` holds the built-in content used when Sanity isn't connected,
and is the source `npm run seed` pushes to Sanity. To change the fallback (or
add a project without the CMS), edit `src/content/projects.ts` and commit — see
the field comments there.

---

## Deploying to Vercel

Connected to Vercel and **auto-deploys on push to `main`**. Framework preset
**Next.js**, build command `next build` (defaults). Set the Sanity env vars
(above) in Vercel so the CMS is active in production.

### Connect the domain (tanishaagrawal.me)

1. Vercel project → **Settings → Domains** → add `tanishaagrawal.me` and
   `www.tanishaagrawal.me`.
2. At your registrar, add the records Vercel shows — typically:

   | Type    | Name  | Value                  |
   | ------- | ----- | ---------------------- |
   | `A`     | `@`   | `76.76.21.21`          |
   | `CNAME` | `www` | `cname.vercel-dns.com` |

   > Use the exact values from your Vercel dashboard.
3. Set the primary domain and let Vercel provision HTTPS automatically.

---

## Accessibility & SEO

Semantic landmarks, skip link, keyboard-navigable lightbox (Esc / arrows),
required alt text on every map, AA-contrast palette, per-page metadata, Open
Graph image, `sitemap.xml`, `robots.txt`, and a branded favicon. `/admin` is
`noindex`.
