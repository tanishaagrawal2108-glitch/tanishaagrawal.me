// @ts-check
/**
 * Image pipeline for the portfolio.
 *
 * Tanisha's map exports are large (often 20–60 MB TIFF/PNG). This script turns
 * everything in /images-src into web-ready WebP + thumbnail variants under
 * /public/images, preserving the per-project folder structure.
 *
 *   images-src/pm25-health/composite-risk.png
 *     → public/images/pm25-health/composite-risk.webp        (full, max 1600px)
 *     → public/images/pm25-health/composite-risk.thumb.webp  (card, max 800px)
 *
 * Reference the outputs from content/projects.ts, e.g.:
 *   heroImage: "/images/pm25-health/composite-risk.webp"
 *   maps: [{ src: "/images/pm25-health/composite-risk.webp", ... }]
 *
 * Run:  npm run images
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const SRC = path.join(root, "images-src");
const OUT = path.join(root, "public", "images");

const FULL_WIDTH = 1600;
const THUMB_WIDTH = 800;
const QUALITY = 80;
const EXTS = new Set([".png", ".jpg", ".jpeg", ".tif", ".tiff", ".webp"]);

/** @param {string} dir */
async function* walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function run() {
  let count = 0;
  for await (const file of walk(SRC)) {
    const ext = path.extname(file).toLowerCase();
    if (!EXTS.has(ext)) continue;

    const rel = path.relative(SRC, file);
    const relNoExt = rel.slice(0, -ext.length);
    const outFull = path.join(OUT, `${relNoExt}.webp`);
    const outThumb = path.join(OUT, `${relNoExt}.thumb.webp`);
    await fs.mkdir(path.dirname(outFull), { recursive: true });

    const img = sharp(file, { limitInputPixels: false }).rotate();
    await img
      .clone()
      .resize({ width: FULL_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outFull);
    await img
      .clone()
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outThumb);

    count++;
    console.log(`✓ ${rel} → ${path.relative(root, outFull)} (+ thumbnail)`);
  }

  if (count === 0) {
    console.log(
      "No source images found in /images-src. Add map exports in per-project\n" +
        "folders (e.g. images-src/pm25-health/…) and re-run `npm run images`.",
    );
  } else {
    console.log(`\nDone — optimized ${count} image(s).`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
