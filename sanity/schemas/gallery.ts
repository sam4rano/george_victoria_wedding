import { defineType, defineArrayMember } from "sanity";
import { ImagesIcon } from "@sanity/icons";

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
});
