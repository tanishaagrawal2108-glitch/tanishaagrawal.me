/**
 * Site-wide configuration and contact details.
 *
 * TODO(tanisha): confirm the LinkedIn and GitHub handles below and swap in your
 * production email if it differs from the domain address.
 */
export const site = {
  name: "Tanisha Agrawal",
  role: "Spatial & Data Analyst",
  description:
    "Finance & Environmental Studies student on the CPA track, working at the bridge between spatial analysis and fiscal data — suitability modeling, cartography, and web GIS.",
  url: "https://tanishaagrawal.me",
  location: "South Carolina, USA",
  languages: "English & Hindi (bilingual)",
  email: "tanisha@tanishaagrawal.me",
  // TODO(tanisha): replace with your real profile URLs.
  linkedin: {
    label: "/in/tanishaagrawal",
    url: "https://www.linkedin.com/in/tanishaagrawal",
  },
  github: {
    label: "@tanishaagrawal",
    url: "https://github.com/tanishaagrawal",
  },
  resumeFile: "/tanisha-agrawal-resume.pdf",

  // Home hero + contact copy (editable in Sanity once configured).
  homeKicker: "Spatial & Data Analyst",
  homeHeadline:
    "I turn environmental and financial data into maps that inform decisions.",
  homeIntro:
    "Finance & Environmental Studies student on the CPA track, working at the bridge between spatial analysis and fiscal data — suitability modeling, cartography, and web GIS.",
  contactHeadline: "Open to GIS-analyst and spatial × fiscal roles.",
} as const;

/** Capability filters, in display order. "All" is the default view. */
export const CAPABILITIES = [
  "Spatial Analysis",
  "Suitability Modeling",
  "Cartography",
  "Web GIS",
  "Remote Sensing",
] as const;

export type Capability = (typeof CAPABILITIES)[number];

/** Tools & capabilities strip shown on the home page. */
export const SKILLS = [
  "ArcGIS Pro",
  "ArcGIS Online",
  "QGIS",
  "Python",
  "SQL",
  "JavaScript",
  "Suitability Modeling",
  "Raster Analysis",
  "Remote Sensing",
  "Spatial Statistics",
] as const;

export const nav = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
] as const;
