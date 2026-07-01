import type { SchemaTypeDefinition } from "sanity";
import { aboutPage } from "./aboutPage";
import { project } from "./project";
import { siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  aboutPage,
  project,
];
