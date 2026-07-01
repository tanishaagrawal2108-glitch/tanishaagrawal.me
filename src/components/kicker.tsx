import { cn } from "@/lib/utils";

/** The mono, upper-case, letter-spaced label used above section headings. */
export function Kicker({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "span" | "p";
}) {
  return (
    <Tag
      className={cn(
        "font-mono text-brand uppercase text-[12px] tracking-[0.14em]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
