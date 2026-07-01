import type { Metadata } from "next";
import { Kicker } from "@/components/kicker";
import { getSiteContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open to GIS-analyst and spatial × fiscal roles. Reach Tanisha Agrawal by email, LinkedIn, or GitHub.",
};

export default async function ContactPage() {
  const site = await getSiteContent();

  const links = [
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "LinkedIn", value: site.linkedin.label, href: site.linkedin.url },
    { label: "GitHub", value: site.github.label, href: site.github.url },
  ];

  return (
    <section className="mx-auto flex min-h-[calc(100vh-67px)] max-w-[1000px] flex-col justify-center px-6 py-20 sm:px-10">
      <Kicker className="mb-[22px] text-[12px] tracking-[0.14em]">Contact</Kicker>
      <h1 className="mb-10 max-w-[16em] text-balance font-display text-[38px] font-normal leading-[1.08] tracking-[-0.018em] sm:text-[52px]">
        {site.contactHeadline}
      </h1>
      <div className="flex flex-col border-t border-line">
        {links.map((l) => {
          const external = l.href.startsWith("http");
          return (
            <a
              key={l.label}
              href={l.href}
              {...(external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className="group flex items-center justify-between gap-5 border-b border-line py-6"
            >
              <span className="w-[100px] flex-none font-mono text-[11px] uppercase tracking-[0.1em] text-faint sm:w-[120px]">
                {l.label}
              </span>
              <span className="flex-1 font-display text-[20px] text-ink group-hover:text-brand sm:text-[26px]">
                {l.value}
              </span>
              <span className="text-[20px] text-brand">↗</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
