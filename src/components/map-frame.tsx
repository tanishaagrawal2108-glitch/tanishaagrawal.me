import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A framed map slot. Renders a real optimized image when `src` is provided,
 * otherwise the design's diagonal-hatch placeholder. Overlays (badges,
 * captions) are passed as children.
 */
export function MapFrame({
  src,
  alt,
  className,
  strong = false,
  sizes,
  priority = false,
  children,
}: {
  src?: string;
  alt: string;
  className?: string;
  /** Use the darker hatch (hero / detail figures) vs. the lighter card hatch. */
  strong?: boolean;
  sizes?: string;
  priority?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        !src && (strong ? "hatch-strong" : "hatch"),
        className,
      )}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          priority={priority}
          className="object-cover"
        />
      )}
      {children}
    </div>
  );
}
