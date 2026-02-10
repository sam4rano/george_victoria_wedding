import { client } from "./client";
import { defaultGalleryQuery, galleryBySlugQuery } from "./queries";
import type { Gallery } from "@/types/sanity";

export async function getDefaultGallery(): Promise<Gallery | null> {
  if (!client) return null;
  const result = await client.fetch<Gallery | null>(defaultGalleryQuery);
  return result;
}

export async function getGalleryBySlug(slug: string): Promise<Gallery | null> {
  if (!client) return null;
  const result = await client.fetch<Gallery | null>(galleryBySlugQuery, { slug });
  return result;
}
