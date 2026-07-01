import type { Metadata } from "next";
import { Kicker } from "@/components/kicker";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}, Spatial & Data Analyst — GIS, suitability modeling, cartography and web GIS.`,
};

export default function ResumePage() {
  return (
    <section className="mx-auto max-w-[980px] px-6 pb-20 pt-14 sm:px-10">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Kicker className="mb-3.5 text-[12px] tracking-[0.14em]">Resume</Kicker>
          <h1 className="m-0 font-display text-[40px] font-normal leading-[1.1] tracking-[-0.018em]">
            {site.name}
          </h1>
        </div>
        <a
          href={site.resumeFile}
          download
          className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-[13px] text-[15px] font-semibold text-paper hover:-translate-y-px"
        >
          ↓ Download PDF
        </a>
      </div>

      <div className="overflow-hidden rounded-xl border border-line bg-white">
        <div className="flex items-center justify-between bg-ink-2 px-4 py-2.5">
          <span className="font-mono text-[12px] text-white/85">
            tanisha-agrawal-resume.pdf
          </span>
          <a
            href={site.resumeFile}
            target="_blank"
            rel="noreferrer noopener"
            className="font-mono text-[11px] text-white/60 hover:text-white"
          >
            Open in new tab ↗
          </a>
        </div>
        {/*
          Embedded PDF viewer. The browser's native PDF renderer handles this.
          TODO(tanisha): drop the real file at /public/tanisha-agrawal-resume.pdf
          (a labelled placeholder ships until then).
        */}
        <object
          data={site.resumeFile}
          type="application/pdf"
          aria-label={`${site.name} resume`}
          className="h-[80vh] max-h-[1100px] w-full bg-[#e9e8e3]"
        >
          <div className="flex h-[60vh] flex-col items-center justify-center gap-4 p-10 text-center">
            <p className="text-[15px] text-muted-ink">
              Your browser can&rsquo;t display the embedded PDF.
            </p>
            <a
              href={site.resumeFile}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-[13px] text-[15px] font-semibold text-paper"
            >
              ↓ Download the resume
            </a>
          </div>
        </object>
      </div>
    </section>
  );
}
