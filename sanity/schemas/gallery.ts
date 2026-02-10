import { defineType, defineArrayMember } from "sanity";
import { ImagesIcon } from "@sanity/icons";

const GALLERY_SECTIONS = [
  { id: "gallery-our-day", title: "Our Day", slug: "our-day", order: 0 },
  { id: "gallery-family", title: "Family", slug: "family", order: 1 },
  { id: "gallery-friends", title: "Friends", slug: "friends", order: 2 },
  { id: "gallery-bride", title: "Bride", slug: "bride", order: 3 },
  { id: "gallery-groom", title: "Groom", slug: "groom", order: 4 },
] as const;

const galleryImage = defineType({
  name: "galleryImage",
  type: "object",
  fields: [
    {
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
    },
    { name: "alt", type: "string", title: "Alt text" },
    { name: "caption", type: "string", title: "Caption" },
    { name: "order", type: "number", title: "Order", initialValue: 0 },
  ],
  preview: {
    select: { caption: "caption", alt: "alt" },
    prepare({ caption, alt }) {
      return { title: caption || alt || "Image" };
    },
  },
});

export { galleryImage };

export const gallery = defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  icon: ImagesIcon,
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title" } },
    { name: "order", type: "number", title: "Order", initialValue: 0 },
    {
      name: "images",
      type: "array",
      title: "Images",
      of: [defineArrayMember({ type: "galleryImage" })],
    },
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "Gallery" };
    },
  },
  initialValueTemplates: (prev) => [
    ...prev,
    ...GALLERY_SECTIONS.map(({ id, title, slug, order }) => ({
      id,
      title,
      schemaType: "gallery" as const,
      value: { title, slug: { _type: "slug" as const, current: slug }, order },
    })),
  ],
});
