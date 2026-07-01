import Link from "next/link";
import type { Project } from "@/content/projects";
import { MapFrame } from "./map-frame";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex flex-col gap-4 rounded-[10px] outline-offset-4 focus-visible:outline-2 focus-visible:outline-brand"
    >
      <MapFrame
        src={project.heroImage}
        alt={project.heroImage ? project.heroCaption : ""}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
        className="aspect-[4/3] w-full rounded-[10px] border border-hairline transition-transform group-hover:-translate-y-0.5"
      >
        <span className="absolute left-3 top-3 rounded-full bg-paper/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-brand">
          Map
        </span>
        {!project.heroImage && (
          <span className="absolute bottom-4 left-4 right-4 rounded-[5px] bg-paper/80 px-2.5 py-1.5 font-mono text-[10.5px] leading-[1.5] tracking-[0.02em] text-soft">
            {project.heroCaption}
          </span>
        )}
      </MapFrame>
      <div>
        <h3 className="mb-1.5 text-[18px] font-semibold leading-[1.3] tracking-[-0.01em] text-ink group-hover:text-brand">
          {project.title}
        </h3>
        <p className="mb-3 text-[14.5px] leading-[1.55] text-muted-ink">
          {project.oneliner}
        </p>
        <div className="flex flex-wrap gap-[7px]">
          {project.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-line px-[9px] py-1 font-mono text-[10.5px] tracking-[0.02em] text-[#5a5a54]"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
