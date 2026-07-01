"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/content/projects";
import { CAPABILITIES } from "@/content/site";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";

const FILTERS = ["All", ...CAPABILITIES] as const;

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(filter)),
    [filter, projects],
  );

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects by capability"
        className="flex flex-wrap items-center gap-2 border-t border-hairline pt-6"
      >
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={cn(
                "min-h-9 whitespace-nowrap rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors",
                active
                  ? "border-brand bg-brand text-paper"
                  : "border-line text-body hover:border-brand/40",
              )}
            >
              {f}
            </button>
          );
        })}
      </div>

      <p
        className="mb-[22px] mt-6 font-mono text-[11px] tracking-[0.06em] text-faint"
        aria-live="polite"
      >
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </p>

      <div className="grid grid-cols-1 gap-x-7 gap-y-[30px] sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
