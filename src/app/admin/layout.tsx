import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Edit site",
  // The editor should never be indexed by search engines.
  robots: { index: false, follow: false },
};

// next-sanity provides a viewport tuned for the Studio (no user zoom jank).
export { viewport } from "next-sanity/studio";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
