import Link from "next/link";
import { Cta } from "@/components/cta";
import { Globe } from "@/components/globe";
import { Kicker } from "@/components/kicker";
import { ProjectCard } from "@/components/project-card";
import { featuredProjects } from "@/content/projects";
import { SKILLS } from "@/content/site";

export default function HomePage() {
  return (
    <>
      {/* Hero — the map (globe) is the hero, full-bleed alongside the pitch. */}
      <section className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-8 sm:px-10 lg:min-h-[calc(100vh-67px)] lg:grid-cols-[1.05fr_0.95fr] lg:py-0">
        <div className="lg:py-12">
          <Kicker className="mb-[26px]">Spatial &amp; Data Analyst</Kicker>
          <h1 className="mb-[26px] text-balance font-display text-[38px] font-normal leading-[1.06] tracking-[-0.018em] sm:text-[48px] lg:text-[60px]">
            I turn environmental and financial data into maps that inform
            decisions.
          </h1>
          <p className="mb-9 max-w-[30em] text-[18px] leading-[1.65] text-body-2">
            Finance &amp; Environmental Studies student on the CPA track, working
            at the bridge between spatial analysis and fiscal data — suitability
            modeling, cartography, and web GIS.
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <Cta href="/work" variant="primary">
              View Work <span className="text-base">→</span>
            </Cta>
            <Cta href="/resume" variant="secondary">
              Resume
            </Cta>
          </div>
        </div>
        <Globe />
      </section>

      {/* Selected work */}
      <section className="mx-auto max-w-[1280px] px-6 pb-24 pt-3.5 sm:px-10">
        <div className="mb-[34px] flex items-baseline justify-between border-t border-hairline pt-[22px]">
          <h2 className="font-display text-[30px] font-normal tracking-[-0.01em]">
            Selected work
          </h2>
          <Link
            href="/work"
            className="text-sm font-semibold text-brand hover:opacity-80"
          >
            All projects →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Tools & capabilities strip */}
      <section className="border-y border-hairline bg-surface">
        <div className="mx-auto grid max-w-[1280px] items-center gap-6 px-6 py-[52px] sm:px-10 md:grid-cols-[0.8fr_2.2fr] md:gap-10">
          <Kicker className="text-[12px] tracking-[0.14em]">
            Tools &amp; capabilities
          </Kicker>
          <div className="flex flex-wrap gap-2.5">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-lg border border-hairline bg-paper px-4 py-[9px] text-[15px] font-medium text-ink-2"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
