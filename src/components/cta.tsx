import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "text";

const base = "inline-flex items-center gap-2 transition-transform";

const variants: Record<Variant, string> = {
  primary:
    "rounded-lg bg-brand px-[26px] py-[14px] text-[15px] font-semibold text-paper hover:-translate-y-px",
  secondary:
    "rounded-lg border border-line px-6 py-[14px] text-[15px] font-semibold text-ink hover:bg-surface",
  text: "text-sm font-semibold text-brand hover:opacity-80",
};

/** A navigation call-to-action rendered as a real link (prefetches, keyboard-friendly). */
export function Cta({
  href,
  variant = "primary",
  children,
  className,
}: {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const classes = cn(base, variants[variant], className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
