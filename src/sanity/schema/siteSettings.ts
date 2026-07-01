import { defineArrayMember, defineField, defineType } from "sanity";

/** Global site content: identity, contact, home hero, and skills strip. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "identity", title: "Identity", default: true },
    { name: "home", title: "Home page" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "identity" }),
    defineField({ name: "role", title: "Role / title", type: "string", group: "identity" }),
    defineField({
      name: "description",
      title: "Short bio / meta description",
      type: "text",
      rows: 3,
      group: "identity",
    }),
    defineField({ name: "location", title: "Based in", type: "string", group: "identity" }),
    defineField({ name: "languages", title: "Languages", type: "string", group: "identity" }),
    defineField({
      name: "resume",
      title: "Resume (PDF)",
      type: "file",
      options: { accept: ".pdf" },
      group: "identity",
    }),

    defineField({
      name: "homeKicker",
      title: "Hero kicker",
      type: "string",
      description: "Small label above the headline.",
      group: "home",
    }),
    defineField({
      name: "homeHeadline",
      title: "Hero headline",
      type: "text",
      rows: 2,
      group: "home",
    }),
    defineField({
      name: "homeIntro",
      title: "Hero intro paragraph",
      type: "text",
      rows: 3,
      group: "home",
    }),
    defineField({
      name: "skills",
      title: "Tools & capabilities",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      group: "home",
    }),

    defineField({ name: "email", title: "Email", type: "string", group: "contact" }),
    defineField({ name: "linkedinLabel", title: "LinkedIn label", type: "string", group: "contact" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url", group: "contact" }),
    defineField({ name: "githubLabel", title: "GitHub label", type: "string", group: "contact" }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url", group: "contact" }),
    defineField({
      name: "contactHeadline",
      title: "Contact page headline",
      type: "text",
      rows: 2,
      group: "contact",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
