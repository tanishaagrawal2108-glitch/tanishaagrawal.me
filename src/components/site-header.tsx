"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { nav } from "@/content/site";

export function SiteHeader({ name }: { name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/80 backdrop-blur-[14px]">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 py-[17px] sm:px-10"
      >
        <Link
          href="/"
          className="flex items-baseline gap-[9px] font-display text-[21px] font-medium tracking-[-0.01em]"
        >
          {name}
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-brand"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "text-sm font-medium tracking-[0.005em] transition-opacity hover:opacity-100",
                isActive(item.href) ? "text-brand opacity-100" : "opacity-70",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={cn(
              "h-0.5 w-5 bg-ink transition-transform",
              open && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "h-0.5 w-5 bg-ink transition-opacity",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "h-0.5 w-5 bg-ink transition-transform",
              open && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-hairline bg-paper md:hidden"
        >
          <div className="mx-auto flex max-w-[1280px] flex-col px-6 py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center border-b border-hairline text-[17px] font-medium last:border-b-0",
                  isActive(item.href) ? "text-brand" : "text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
