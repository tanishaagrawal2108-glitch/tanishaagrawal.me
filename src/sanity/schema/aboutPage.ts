import { defineArrayMember, defineField, defineType } from "sanity";

/** The About page: headline, bio paragraphs, headshot, education, skills matrix. */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "headshot",
      title: "Headshot",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "headline", title: "Headline", type: "text", rows: 2 }),
    defineField({
      name: "bio",
      title: "Bio paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text" })],
      description: "Each entry is one paragraph.",
    }),
    defineField({
      name: "educationDegree",
      title: "Education — degree",
      type: "string",
    }),
    defineField({
      name: "educationDetail",
      title: "Education — detail",
      type: "string",
    }),
    defineField({
      name: "educationDate",
      title: "Education — date",
      type: "string",
    }),
    defineField({
      name: "skillsMatrix",
      title: "Skills & tools matrix",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "group", title: "Group name", type: "string" }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              options: { layout: "tags" },
            }),
          ],
          preview: { select: { title: "group" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
