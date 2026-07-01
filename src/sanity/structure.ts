import type { StructureResolver } from "sanity/structure";

/**
 * Custom Studio layout: "Site Settings" and "About Page" are single editable
 * documents (not lists), and projects are a normal add/edit list.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      S.listItem()
        .title("About Page")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
    ]);
