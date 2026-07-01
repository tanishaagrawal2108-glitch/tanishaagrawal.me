import Link from "next/link";

export function SiteFooter({
  name,
  email,
  linkedinUrl,
  githubUrl,
}: {
  name: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
}) {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-end justify-between gap-10 px-6 pb-14 pt-16 sm:px-10">
        <div className="max-w-[30em]">
          <h2 className="mb-3.5 font-display text-[34px] font-normal leading-[1.15] tracking-[-0.01em]">
            Let&rsquo;s map something that matters.
          </h2>
          <Link
            href="/contact"
            className="text-[15px] font-semibold text-brand hover:opacity-80"
          >
            Get in touch &rarr;
          </Link>
        </div>
        <div className="flex gap-7 text-sm text-muted-ink">
          <a href={`mailto:${email}`} className="hover:text-brand">
            Email
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-brand"
          >
            LinkedIn
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-brand"
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-[18px] font-mono text-[11px] tracking-[0.04em] text-faint sm:px-10">
          <span>&copy; {new Date().getFullYear()} {name}</span>
          <span>Spatial &amp; Data Analyst</span>
        </div>
      </div>
    </footer>
  );
}
