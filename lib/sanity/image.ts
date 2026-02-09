import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(
  source: { _ref?: string; _id?: string; asset?: { _ref?: string } } | null | undefined
) {
  if (!builder) throw new Error("Sanity client not configured");
  return builder.image(source as Parameters<typeof builder.image>[0]);
}
