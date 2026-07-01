import type { Metadata } from "next";
import Image from "next/image";
import { Kicker } from "@/components/kicker";
import { getAbout, getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Finance & Environmental Studies student on the CPA track, bridging spatial and fiscal analysis — suitability modeling, cartography, and web GIS in ArcGIS Pro and ArcGIS Online.",
};

export default async function AboutPage() {
  const [about, site] = await Promise.all([getAbout(), getSiteContent()]);

  return (
    <section className="mx-auto grid max-w-[1280px] items-start gap-14 px-6 pb-10 pt-14 sm:px-10 md:grid-cols-[0.85fr_1.15fr]">
      {/* Headshot + facts (sticky on desktop) */}
      <div className="md:sticky md:top-[90px]">
        <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-xl border border-hairline hatch-strong">
          {about.headshotUrl ? (
            <Image
              src={about.headshotUrl}
              alt={site.name}
              fill
              sizes="(max-width:768px) 100vw, 480px"
              className="object-cover"
            />
          ) : (
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8c8c84]">
              [ headshot ]
            </span>
          )}
        </div>
        <div className="mt-[22px] flex flex-col gap-2.5">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint">
            Based in
          </div>
          <div className="text-[15px] text-ink-2">{site.location}</div>
          <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint">
            Languages
          </div>
          <div className="text-[15px] text-ink-2">{site.languages}</div>
        </div>
      </div>

      {/* Bio + education + matrix */}
      <div>
        <Kicker className="mb-[18px] text-[12px] tracking-[0.14em]">About</Kicker>
        <h1 className="mb-7 text-balance font-display text-[32px] font-normal leading-[1.12] tracking-[-0.018em] sm:text-[40px]">
          {about.headline}
        </h1>
        <div className="flex flex-col gap-[18px] text-[17.5px] leading-[1.7] text-body">
          {about.bio.map((para, i) => (
            <p key={i} className="m-0">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-11 border-t border-hairline pt-7">
          <Kicker className="mb-[18px] text-[11px] tracking-[0.12em]">
            Education
          </Kicker>
          <div className="flex justify-between gap-5 pb-4">
            <div>
              <div className="text-[17px] font-semibold text-ink">
                {about.educationDegree}
              </div>
              <div className="mt-1 text-[14.5px] text-muted-ink">
                {about.educationDetail}
              </div>
            </div>
            <div className="whitespace-nowrap font-mono text-[13px] text-faint-2">
              {about.educationDate}
            </div>
          </div>
        </div>

        <div className="mt-9 border-t border-hairline pt-7">
          <Kicker className="mb-5 text-[11px] tracking-[0.12em]">
            Skills &amp; tools matrix
          </Kicker>
          <div className="grid grid-cols-1 gap-x-9 gap-y-7 sm:grid-cols-2">
            {about.skillsMatrix.map((col) => (
              <div key={col.group}>
                <div className="mb-3 text-[14px] font-semibold text-ink">
                  {col.group}
                </div>
                <div className="flex flex-wrap gap-[7px]">
                  {col.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-hairline bg-surface-2 px-[11px] py-[5px] text-[13px] text-body"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
