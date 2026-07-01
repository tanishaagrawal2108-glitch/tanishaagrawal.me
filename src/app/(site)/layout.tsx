import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteContent } from "@/lib/content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSiteContent();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
      >
        Skip to content
      </a>
      <SiteHeader name={site.name} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter
        name={site.name}
        email={site.email}
        linkedinUrl={site.linkedin.url}
        githubUrl={site.github.url}
      />
    </>
  );
}
