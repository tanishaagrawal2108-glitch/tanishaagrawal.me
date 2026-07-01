// @ts-check
/**
 * Generates committed placeholder assets so the site builds and looks complete
 * before Tanisha supplies the real files:
 *   - public/og.png                       social share image (1200×630)
 *   - public/tanisha-agrawal-resume.pdf   labelled placeholder resume (1 page)
 *
 * Run:  npm run placeholders
 * The OG image is real artwork; the PDF is a clearly-labelled stand-in — replace
 * it with the actual resume export at the same path.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = path.resolve(__dirname, "..", "public");

const PAPER = "#FAFAF8";
const INK = "#1A1A1A";
const BRAND = "#0E6E6A";
const MUTED = "#6A6A64";

async function ogImage() {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <g fill="${BRAND}" opacity="0.5">
    ${Array.from({ length: 220 })
      .map(() => "")
      .map((_, i) => {
        const angle = i * 2.399963;
        const r = 8 * Math.sqrt(i);
        const cx = 980 + r * Math.cos(angle);
        const cy = 315 + r * Math.sin(angle);
        const rad = 1 + (i / 220) * 2.2;
        return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rad.toFixed(2)}"/>`;
      })
      .join("")}
  </g>
  <text x="90" y="150" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="${BRAND}" letter-spacing="4">SPATIAL &amp; DATA ANALYST</text>
  <text x="86" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="82" font-weight="500" fill="${INK}">Tanisha Agrawal</text>
  <text x="90" y="380" font-family="Arial, sans-serif" font-size="30" fill="${MUTED}">Maps that inform environmental &amp; fiscal decisions.</text>
  <circle cx="712" cy="288" r="10" fill="${BRAND}"/>
</svg>`;
  const out = path.join(pub, "og.png");
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log(`✓ ${path.relative(path.resolve(__dirname, ".."), out)}`);
}

/** Build a minimal, valid single-page PDF with correct xref offsets. */
function buildPdf(lines) {
  const content =
    "BT /F1 24 Tf 72 720 Td (Tanisha Agrawal) Tj ET\n" +
    "BT /F1 12 Tf 72 700 Td (Spatial & Data Analyst) Tj ET\n" +
    lines
      .map(
        (l, i) =>
          `BT /F1 11 Tf 72 ${660 - i * 20} Td (${l.replace(/([()\\])/g, "\\$1")}) Tj ET`,
      )
      .join("\n") +
    "\n";

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${content.length} >>\nstream\n${content}endstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((body, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefPos = pdf.length;
  const total = objects.length + 1;
  pdf += `xref\n0 ${total}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${total} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;
  return Buffer.from(pdf, "latin1");
}

async function resumePdf() {
  const out = path.join(pub, "tanisha-agrawal-resume.pdf");
  const pdf = buildPdf([
    "",
    "PLACEHOLDER RESUME",
    "Replace this file at /public/tanisha-agrawal-resume.pdf",
    "with the real resume export (same filename).",
    "",
    "tanisha@tanishaagrawal.me",
  ]);
  await fs.writeFile(out, pdf);
  console.log(`✓ ${path.relative(path.resolve(__dirname, ".."), out)}`);
}

async function run() {
  await fs.mkdir(pub, { recursive: true });
  await ogImage();
  await resumePdf();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
