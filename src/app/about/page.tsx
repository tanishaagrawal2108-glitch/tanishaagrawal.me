import type { Metadata } from "next";
import { Kicker } from "@/components/kicker";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Finance & Environmental Studies student on the CPA track, bridging spatial and fiscal analysis — suitability modeling, cartography, and web GIS in ArcGIS Pro and ArcGIS Online.",
};

const MATRIX: { group: string; items: string[] }[] = [
  { group: "GIS & Mapping", items: ["ArcGIS Pro", "ArcGIS Online", "QGIS", "Spatial Analyst"] },
  { group: "Programming", items: ["Python", "SQL", "JavaScript", "arcpy"] },
  { group: "Spatial Analysis", items: ["Suitability Modeling", "Raster Analysis", "Remote Sensing", "Spatial Statistics"] },
  { group: "Finance & Quant", items: ["Financial Analysis", "Quantitative Methods", "CPA track"] },
];

export default function AboutPage() {
  return (
    <section className="mx-auto grid max-w-[1280px] items-start gap-14 px-6 pb-10 pt-14 sm:px-10 md:grid-cols-[0.85fr_1.15fr]">
      {/* Headshot + facts (sticky on desktop) */}
      <div className="md:sticky md:top-[90px]">
        <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-xl border border-hairline hatch-strong">
          {/* TODO(tanisha): drop a headshot at /public/images/headshot.jpg and set src below. */}
          {/* <Image src="/images/headshot.jpg" alt="Tanisha Agrawal" fill sizes="(max-width:768px) 100vw, 480px" className="object-cover" /> */}
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#8c8c84]">
            [ headshot ]
          </span>
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
          I work where finance, the environment, and geography meet.
        </h1>
        <div className="flex flex-col gap-[18px] text-[17.5px] leading-[1.7] text-body">
          <p className="m-0">
            I&rsquo;m a final-year student completing a BS in Finance and
            Environmental Studies, on the CPA track. That combination is
            deliberate: I&rsquo;m drawn to questions where fiscal data and
            environmental systems intersect — and where a map makes the answer
            legible.
          </p>
          <p className="m-0">
            My spatial work spans suitability modeling, raster and terrain
            analysis, cartography, and web GIS in ArcGIS Pro and ArcGIS Online.
            My quantitative side brings Python, SQL, and financial analysis to
            bear on the same problems — so a habitat-connectivity model and a
            county fiscal-capacity map come from the same toolkit.
          </p>
          <p className="m-0">
            I&rsquo;m especially interested in roles that bridge spatial and
            fiscal analysis — like the GIS &amp; Mapping work at a state revenue
            and fiscal affairs office — where rigorous data work directly
            supports public decisions.
          </p>
        </div>

        <div className="mt-11 border-t border-hairline pt-7">
          <Kicker className="mb-[18px] text-[11px] tracking-[0.12em]">
            Education
          </Kicker>
          <div className="flex justify-between gap-5 pb-4">
            <div>
              <div className="text-[17px] font-semibold text-ink">
                BS, Finance &amp; Environmental Studies
              </div>
              <div className="mt-1 text-[14.5px] text-muted-ink">
                CPA track · bilingual
              </div>
            </div>
            <div className="whitespace-nowrap font-mono text-[13px] text-faint-2">
              Exp. Dec 2026
            </div>
          </div>
        </div>

        <div className="mt-9 border-t border-hairline pt-7">
          <Kicker className="mb-5 text-[11px] tracking-[0.12em]">
            Skills &amp; tools matrix
          </Kicker>
          <div className="grid grid-cols-1 gap-x-9 gap-y-7 sm:grid-cols-2">
            {MATRIX.map((col) => (
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
