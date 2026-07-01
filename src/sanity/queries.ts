import { groq } from "next-sanity";

const projectFields = groq`
  "slug": slug.current,
  featured,
  order,
  title,
  oneliner,
  categories,
  chips,
  role,
  affiliation,
  date,
  tools,
  heroImage,
  heroCaption,
  researchQuestion,
  objective,
  data[]{ label, href },
  methodology,
  maps[]{ image, caption, alt },
  findings,
  webMap,
  arcgisEmbedUrl
`;

export const PROJECTS_QUERY = groq`
  *[_type == "project"] | order(order asc, date desc){${projectFields}}
`;

export const PROJECT_QUERY = groq`
  *[_type == "project" && slug.current == $slug][0]{${projectFields}}
`;

export const SITE_QUERY = groq`
  *[_type == "siteSettings"][0]{
    name, role, description, location, languages,
    "resumeUrl": resume.asset->url,
    homeKicker, homeHeadline, homeIntro, skills,
    email, linkedinLabel, linkedinUrl, githubLabel, githubUrl, contactHeadline
  }
`;

export const ABOUT_QUERY = groq`
  *[_type == "aboutPage"][0]{
    headshot,
    headline,
    bio,
    educationDegree, educationDetail, educationDate,
    skillsMatrix[]{ group, items }
  }
`;
