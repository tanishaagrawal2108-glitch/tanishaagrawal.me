import type { Metadata } from "next";
import { Kicker } from "@/components/kicker";
import { WorkGrid } from "@/components/work-grid";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Spatial analysis, suitability modeling, cartography and web GIS — selected projects spanning environmental and fiscal questions.",
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <>
      <section className="mx-auto max-w-[1280px] px-6 pb-7 pt-14 sm:px-10">
        <Kicker className="mb-[18px] text-[12px] tracking-[0.14em]">
          Portfolio
        </Kicker>
        <h1 className="mb-2 font-display text-[40px] font-normal leading-[1.08] tracking-[-0.018em] sm:text-[46px]">
          Work
        </h1>
        <p className="mb-[34px] max-w-[40em] text-[17px] leading-[1.6] text-[#5a5a54]">
          Spatial analysis, suitability modeling, cartography and web GIS —
          selected projects spanning environmental and fiscal questions.
        </p>
      </section>
      <section className="mx-auto max-w-[1280px] px-6 pb-24 sm:px-10">
        <WorkGrid projects={projects} />
      </section>
    </>
  );
}
