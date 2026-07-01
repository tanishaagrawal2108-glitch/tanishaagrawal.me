import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Build an optimized CDN URL for a Sanity image (auto format + quality). */
export function urlForImage(source: SanityImageSource): string {
  return builder.image(source).auto("format").fit("max").url();
}
