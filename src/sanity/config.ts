"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./env";
import { schemaTypes } from "./schema";
import { structure } from "./structure";

/** Embedded Studio config — mounted at /admin. */
export const sanityConfig = defineConfig({
  name: "default",
  title: "Tanisha Agrawal — Portfolio",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
});
