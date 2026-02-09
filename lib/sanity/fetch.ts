import { client } from "./client";
import { defaultGalleryQuery } from "./queries";
import type { Gallery } from "@/types/sanity";

export async function getDefaultGallery(): Promise<Gallery | null> {
  if (!client) return null;
  const result = await client.fetch<Gallery | null>(defaultGalleryQuery);
  return result;
}
