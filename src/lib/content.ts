import "server-only";
import { about as fallbackAbout, type SkillGroup } from "@/content/about";
import {
  projects as fallbackProjects,
  type Project,
} from "@/content/projects";
import { SKILLS as fallbackSkills, site as fallbackSite } from "@/content/site";
import { client } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import {
  ABOUT_QUERY,
  PROJECT_QUERY,
  PROJECTS_QUERY,
  SITE_QUERY,
} from "@/sanity/queries";

export type { Project } from "@/content/projects";

/** Content changes on the CMS go live within this window (seconds). */
const REVALIDATE = 60;
const fetchOpts = { next: { revalidate: REVALIDATE } } as const;

// ── Site settings ──────────────────────────────────────────────────────────
export type SiteContent = {
  name: string;
  role: string;
  description: string;
  location: string;
  languages: string;
  resumeUrl: string;
  homeKicker: string;
  homeHeadline: string;
  homeIntro: string;
  skills: string[];
  email: string;
  linkedin: { label: string; url: string };
  github: { label: string; url: string };
  contactHeadline: string;
  url: string;
};

const fallbackSiteContent: SiteContent = {
  name: fallbackSite.name,
  role: fallbackSite.role,
  description: fallbackSite.description,
  location: fallbackSite.location,
  languages: fallbackSite.languages,
  resumeUrl: fallbackSite.resumeFile,
  homeKicker: fallbackSite.homeKicker,
  homeHeadline: fallbackSite.homeHeadline,
  homeIntro: fallbackSite.homeIntro,
  skills: [...fallbackSkills],
  email: fallbackSite.email,
  linkedin: { label: fallbackSite.linkedin.label, url: fallbackSite.linkedin.url },
  github: { label: fallbackSite.github.label, url: fallbackSite.github.url },
  contactHeadline: fallbackSite.contactHeadline,
  url: fallbackSite.url,
};

export async function getSiteContent(): Promise<SiteContent> {
  if (!client) return fallbackSiteContent;
  try {
    const d = await client.fetch(SITE_QUERY, {}, fetchOpts);
    if (!d) return fallbackSiteContent;
    const f = fallbackSiteContent;
    return {
      name: d.name || f.name,
      role: d.role || f.role,
      description: d.description || f.description,
      location: d.location || f.location,
      languages: d.languages || f.languages,
      resumeUrl: d.resumeUrl || f.resumeUrl,
      homeKicker: d.homeKicker || f.homeKicker,
      homeHeadline: d.homeHeadline || f.homeHeadline,
      homeIntro: d.homeIntro || f.homeIntro,
      skills: d.skills?.length ? d.skills : f.skills,
      email: d.email || f.email,
      linkedin: {
        label: d.linkedinLabel || f.linkedin.label,
        url: d.linkedinUrl || f.linkedin.url,
      },
      github: {
        label: d.githubLabel || f.github.label,
        url: d.githubUrl || f.github.url,
      },
      contactHeadline: d.contactHeadline || f.contactHeadline,
      url: f.url,
    };
  } catch {
    return fallbackSiteContent;
  }
}

// ── Projects ───────────────────────────────────────────────────────────────
/* eslint-disable @typescript-eslint/no-explicit-any */
function mapProject(d: any): Project {
  return {
    slug: d.slug,
    featured: !!d.featured,
    title: d.title ?? "",
    oneliner: d.oneliner ?? "",
    categories: d.categories ?? [],
    chips: d.chips ?? [],
    role: d.role ?? "",
    affiliation: d.affiliation ?? "",
    date: d.date ?? "",
    tools: d.tools ?? [],
    heroCaption: d.heroCaption ?? "",
    heroImage: d.heroImage?.asset ? urlForImage(d.heroImage) : undefined,
    researchQuestion: d.researchQuestion ?? "",
    objective: d.objective ?? "",
    data: d.data ?? [],
    methodology: d.methodology ?? [],
    maps: (d.maps ?? []).map((m: any) => ({
      src: m.image?.asset ? urlForImage(m.image) : undefined,
      caption: m.caption ?? "",
      alt: m.alt ?? "",
    })),
    findings: d.findings ?? [],
    webMap: !!d.webMap,
    arcgisEmbedUrl: d.arcgisEmbedUrl ?? null,
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function getProjects(): Promise<Project[]> {
  if (!client) return fallbackProjects;
  try {
    const data = await client.fetch(PROJECTS_QUERY, {}, fetchOpts);
    if (!data?.length) return fallbackProjects;
    return data.map(mapProject);
  } catch {
    return fallbackProjects;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.featured);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  if (!client) return fallbackProjects.find((p) => p.slug === slug);
  try {
    const d = await client.fetch(PROJECT_QUERY, { slug }, fetchOpts);
    return d ? mapProject(d) : undefined;
  } catch {
    return fallbackProjects.find((p) => p.slug === slug);
  }
}

export async function getAdjacent(
  slug: string,
): Promise<{ prev: Project; next: Project }> {
  const list = await getProjects();
  const i = list.findIndex((p) => p.slug === slug);
  const prev = i > 0 ? list[i - 1] : list[list.length - 1];
  const next = i < list.length - 1 ? list[i + 1] : list[0];
  return { prev, next };
}

// ── About page ──────────────────────────────────────────────────────────────
export type AboutContent = {
  headshotUrl?: string;
  headline: string;
  bio: string[];
  educationDegree: string;
  educationDetail: string;
  educationDate: string;
  skillsMatrix: SkillGroup[];
};

export async function getAbout(): Promise<AboutContent> {
  if (!client) return fallbackAbout;
  try {
    const d = await client.fetch(ABOUT_QUERY, {}, fetchOpts);
    if (!d) return fallbackAbout;
    const f = fallbackAbout;
    return {
      headshotUrl: d.headshot?.asset ? urlForImage(d.headshot) : f.headshotUrl,
      headline: d.headline || f.headline,
      bio: d.bio?.length ? d.bio : f.bio,
      educationDegree: d.educationDegree || f.educationDegree,
      educationDetail: d.educationDetail || f.educationDetail,
      educationDate: d.educationDate || f.educationDate,
      skillsMatrix: d.skillsMatrix?.length ? d.skillsMatrix : f.skillsMatrix,
    };
  } catch {
    return fallbackAbout;
  }
}
