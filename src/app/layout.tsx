import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { getSiteContent } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContent();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.role}`,
      template: `%s — ${site.name}`,
    },
    description: site.description,
    keywords: [
      "GIS analyst",
      "spatial analysis",
      "suitability modeling",
      "cartography",
      "web GIS",
      "remote sensing",
      "ArcGIS Pro",
      "ArcGIS Online",
      site.name,
    ],
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: site.url,
      siteName: `${site.name} — Portfolio`,
      title: `${site.name} — ${site.role}`,
      description: site.description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} — ${site.role}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${site.role}`,
      description: site.description,
      images: ["/og.png"],
    },
    alternates: { canonical: site.url },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
