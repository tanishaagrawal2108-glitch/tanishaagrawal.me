import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArcgisEmbed } from "@/components/arcgis-embed";
import { Kicker } from "@/components/kicker";
import { ProjectGallery } from "@/components/project-gallery";
import { getAdjacent, getProject, getProjects } from "@/lib/content";

// Pre-render known projects at build; render newly-added ones on first request.
export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.oneliner,
    openGraph: {
      title: `${project.title} — Tanisha Agrawal`,
      description: project.oneliner,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const { prev, next } = await getAdjacent(slug);

  return (
    <>
      {/* Full-bleed hero map */}
      <div className="relative flex min-h-[440px] items-end overflow-hidden border-b border-hairline hatch-strong h-[62vh]">
        {project.heroImage && (
          <Image
            src={project.heroImage}
            alt={project.heroCaption}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(250,250,248,0.92),rgba(250,250,248,0.1)_55%)]" />
        <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-11 sm:px-10">
          <Link
            href="/work"
            className="mb-5 inline-block font-mono text-[12px] tracking-[0.06em] text-brand hover:opacity-80"
          >
            ← Back to work
          </Link>
          <div className="mb-[18px] flex flex-wrap gap-[7px]">
            {project.chips.map((chip) => (
              <span
                key={chip}
                className="whitespace-nowrap rounded-full border border-brand/30 bg-brand/[0.06] px-2.5 py-1 font-mono text-[11px] tracking-[0.02em] text-brand"
              >
                {chip}
              </span>
            ))}
          </div>
          <h1 className="m-0 max-w-[18em] text-balance font-display text-[32px] font-normal leading-[1.08] tracking-[-0.018em] sm:text-[40px] lg:text-[48px]">
            {project.title}
          </h1>
        </div>
        {project.heroCaption && (
          <span className="absolute left-1/2 top-5 hidden max-w-[80vw] -translate-x-1/2 text-center font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#8c8c84] sm:block">
            {project.heroCaption}
          </span>
        )}
      </div>

      {/* Meta row */}
      <section className="mx-auto grid max-w-[1280px] grid-cols-2 gap-6 border-b border-hairline px-6 py-9 sm:px-10 md:grid-cols-4">
        <Meta label="Role" value={project.role} />
        <Meta label="Affiliation" value={project.affiliation} />
        <Meta label="Date" value={project.date} />
        <div>
          <MetaLabel>Tools</MetaLabel>
          <div className="flex flex-wrap gap-[5px]">
            {project.tools.map((t) => (
              <span
                key={t}
                className="rounded-[5px] border border-hairline bg-surface-2 px-2 py-0.5 text-[12.5px] text-ink-2"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Research question + objective */}
      <section className="mx-auto grid max-w-[1280px] gap-14 px-6 py-[52px] sm:px-10 md:grid-cols-2">
        <div>
          <Kicker className="mb-3.5 text-[11px] tracking-[0.12em]">
            Research question
          </Kicker>
          <p className="m-0 font-display text-[25px] leading-[1.35] text-ink">
            {project.researchQuestion}
          </p>
        </div>
        <div>
          <Kicker className="mb-3.5 text-[11px] tracking-[0.12em]">
            Objective
          </Kicker>
          <p className="m-0 text-[17px] leading-[1.65] text-body">
            {project.objective}
          </p>
        </div>
      </section>

      {/* Data + methodology */}
      <section className="border-y border-hairline bg-surface">
        <div className="mx-auto grid max-w-[1280px] gap-14 px-6 py-12 sm:px-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <Kicker className="mb-[18px] text-[11px] tracking-[0.12em]">
              Data
            </Kicker>
            <div className="flex flex-col">
              {project.data.map((d) => (
                <a
                  key={d.label}
                  href={d.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center justify-between gap-3 border-b border-hairline py-3.5 text-[14.5px] text-ink-2 hover:text-brand"
                >
                  {d.label}
                  <span className="whitespace-nowrap text-[13px] text-brand">
                    source ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <Kicker className="mb-[18px] text-[11px] tracking-[0.12em]">
              Methodology / Workflow
            </Kicker>
            <ol className="flex list-none flex-col gap-[18px] p-0">
              {project.methodology.map((m, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-brand/40 font-mono text-[12px] text-brand">
                    {i + 1}
                  </span>
                  <p className="m-0 mt-0.5 text-[15.5px] leading-[1.6] text-body">
                    {m}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Maps & results (with lightbox) */}
      {project.maps.length > 0 && <ProjectGallery maps={project.maps} />}

      {/* Live ArcGIS web map */}
      {project.webMap && (
        <ArcgisEmbed url={project.arcgisEmbedUrl} title={project.title} />
      )}

      {/* Findings */}
      {project.findings.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-6 pb-16 sm:px-10">
          <Kicker className="mb-5 text-[11px] tracking-[0.12em]">Findings</Kicker>
          <ul className="flex list-none flex-col p-0">
            {project.findings.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-[18px] border-t border-hairline py-[18px]"
              >
                <span className="mt-[9px] h-2 w-2 flex-none rounded-full bg-brand" />
                <p className="m-0 max-w-[46em] text-[18px] leading-[1.55] text-ink-2">
                  {f}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Prev / next */}
      <nav
        aria-label="Project pagination"
        className="border-t border-hairline bg-surface"
      >
        <div className="mx-auto flex max-w-[1280px] justify-between gap-6 px-6 py-[30px] sm:px-10">
          <Link href={`/work/${prev.slug}`} className="max-w-[46%] group">
            <div className="mb-[7px] font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint">
              ← Previous
            </div>
            <div className="text-[16px] font-semibold leading-[1.3] text-ink group-hover:text-brand">
              {prev.title}
            </div>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="max-w-[46%] text-right group"
          >
            <div className="mb-[7px] font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint">
              Next →
            </div>
            <div className="text-[16px] font-semibold leading-[1.3] text-ink group-hover:text-brand">
              {next.title}
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
}

function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[7px] font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint">
      {children}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <MetaLabel>{label}</MetaLabel>
      <div className="text-[14.5px] text-ink-2">{value}</div>
    </div>
  );
}
