import { Kicker } from "./kicker";

/**
 * Live ArcGIS Online web-map block. Renders a responsive 16:9 iframe when
 * `url` is set; otherwise a documented placeholder telling the author exactly
 * what to paste in (the project's `arcgisEmbedUrl` in content/projects.ts).
 */
export function ArcgisEmbed({
  url,
  title,
}: {
  url: string | null;
  title: string;
}) {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pb-14 sm:px-10">
      <Kicker className="mb-4 text-[11px] tracking-[0.12em]">
        Live ArcGIS web map
      </Kicker>

      {url ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-line">
          <iframe
            src={url}
            title={`Interactive ArcGIS web map — ${title}`}
            loading="lazy"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      ) : (
        <div
          className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-xl border border-line bg-[#e8ebea] [background-image:linear-gradient(rgba(14,110,106,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(14,110,106,0.06)_1px,transparent_1px)] [background-size:36px_36px]"
          role="img"
          aria-label="Placeholder for an interactive ArcGIS Online web map"
        >
          <div className="max-w-[32em] px-6 text-center">
            <div className="mb-2.5 text-[30px]" aria-hidden>
              🗺
            </div>
            <p className="font-mono text-[12px] leading-relaxed tracking-[0.04em] text-[#5a6a68]">
              Interactive ArcGIS Online web map — 16:9 responsive embed.
              <br />
              <span className="text-[#8a9a98]">
                Paste the share URL into{" "}
                <code>arcgisEmbedUrl</code> for this project.
              </span>
            </p>
          </div>
          <span className="absolute left-3.5 top-3.5 rounded-full bg-paper/85 px-[11px] py-[5px] font-mono text-[10.5px] uppercase tracking-[0.08em] text-brand">
            Interactive
          </span>
        </div>
      )}
    </section>
  );
}
