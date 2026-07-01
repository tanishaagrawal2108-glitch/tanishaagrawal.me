import { defineArrayMember, defineField, defineType } from "sanity";
import { CAPABILITIES } from "@/content/site";

/** A portfolio project / map. This is what Tanisha adds one of per project. */
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      description: "The web address for this project, e.g. /work/my-project.",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Feature on home page",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers show first.",
      initialValue: 100,
    }),
    defineField({
      name: "oneliner",
      title: "One-line description",
      type: "text",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categories",
      title: "Capabilities (filters)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { list: CAPABILITIES.map((c) => ({ title: c, value: c })) },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "chips",
      title: "Skill chips",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "affiliation", title: "Affiliation", type: "string" }),
    defineField({ name: "date", title: "Date", type: "string" }),
    defineField({
      name: "tools",
      title: "Tools",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      description: "The large banner map at the top. Optional.",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroCaption",
      title: "Hero caption",
      type: "string",
      description: "Short description of the hero map.",
    }),
    defineField({
      name: "researchQuestion",
      title: "Research question",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "objective", title: "Objective", type: "text", rows: 3 }),
    defineField({
      name: "data",
      title: "Data sources",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Link (URL)", type: "url" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "methodology",
      title: "Methodology / workflow steps",
      type: "array",
      of: [defineArrayMember({ type: "text" })],
    }),
    defineField({
      name: "maps",
      title: "Maps & results",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Map image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Shown under the figure, e.g. 'Fig. 1 — …'.",
            }),
            defineField({
              name: "alt",
              title: "Alt text (accessibility)",
              type: "string",
              description: "Describe the map for screen readers.",
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "caption", media: "image" } },
        }),
      ],
    }),
    defineField({
      name: "findings",
      title: "Findings",
      type: "array",
      of: [defineArrayMember({ type: "text" })],
    }),
    defineField({
      name: "webMap",
      title: "Has a live ArcGIS web map",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "arcgisEmbedUrl",
      title: "ArcGIS embed URL",
      type: "url",
      description:
        "From ArcGIS Online → Share → Embed. Leave blank to show a placeholder.",
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "oneliner", media: "heroImage" },
  },
});
