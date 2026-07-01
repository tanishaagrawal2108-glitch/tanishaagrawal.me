/**
 * Seed Sanity with the current built-in content (9 projects + site + about),
 * so Tanisha opens the editor to everything already filled in — not a blank CMS.
 *
 * Run once, after creating .env.local with a write token:
 *   npm run seed
 *
 * Safe to re-run: it createOrReplace-s documents by stable id. It does NOT
 * touch images/resume (upload those in the Studio).
 */
import { createClient } from "@sanity/client";
import { about } from "../src/content/about";
import { projects } from "../src/content/projects";
import { site, SKILLS } from "../src/content/site";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing env. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN\n" +
      "in .env.local (see .env.example), then run `npm run seed` again.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01",
  useCdn: false,
});

const key = (prefix: string, i: number) => `${prefix}-${i}`;

async function run() {
  const tx = client.transaction();

  // Site settings (singleton)
  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    name: site.name,
    role: site.role,
    description: site.description,
    location: site.location,
    languages: site.languages,
    homeKicker: site.homeKicker,
    homeHeadline: site.homeHeadline,
    homeIntro: site.homeIntro,
    skills: [...SKILLS],
    email: site.email,
    linkedinLabel: site.linkedin.label,
    linkedinUrl: site.linkedin.url,
    githubLabel: site.github.label,
    githubUrl: site.github.url,
    contactHeadline: site.contactHeadline,
  });

  // About page (singleton)
  tx.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    headline: about.headline,
    bio: about.bio,
    educationDegree: about.educationDegree,
    educationDetail: about.educationDetail,
    educationDate: about.educationDate,
    skillsMatrix: about.skillsMatrix.map((g, i) => ({
      _key: key("grp", i),
      group: g.group,
      items: g.items,
    })),
  });

  // Projects
  projects.forEach((p, idx) => {
    tx.createOrReplace({
      _id: `project-${p.slug}`,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      featured: p.featured,
      order: idx,
      oneliner: p.oneliner,
      categories: p.categories,
      chips: p.chips,
      role: p.role,
      affiliation: p.affiliation,
      date: p.date,
      tools: p.tools,
      heroCaption: p.heroCaption,
      researchQuestion: p.researchQuestion,
      objective: p.objective,
      data: p.data.map((d, i) => ({ _key: key("data", i), label: d.label, href: d.href })),
      methodology: p.methodology,
      maps: p.maps.map((m, i) => ({
        _key: key("map", i),
        caption: m.caption,
        alt: m.alt,
      })),
      findings: p.findings,
      webMap: p.webMap,
      arcgisEmbedUrl: p.arcgisEmbedUrl ?? undefined,
    });
  });

  await tx.commit();
  console.log(
    `Seeded Sanity: site settings, about page, and ${projects.length} projects.\n` +
      "Open /admin to add hero/map images, your headshot, and the resume PDF.",
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
