"use client";

import { GallerySwiper } from "@/components/gallery/GallerySwiper";
import type { Gallery } from "@/types/sanity";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GallerySectionProps {
  gallery: Gallery | null;
}

const SECTION_TITLE = "Our Day";

export function GallerySection({ gallery }: GallerySectionProps) {
  const images = gallery?.images ?? [];

  return (
    <motion.section
      id="gallery"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "bg-dominant py-16 md:py-24",
        "px-4"
      )}
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="gallery-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            "font-display text-4xl font-medium italic",
            "mb-10 text-center md:text-5xl"
          )}
          style={{ color: "var(--color-rose, #8b4a5c)" }}
        >
          {SECTION_TITLE}
        </motion.h2>
        <GallerySwiper images={images} />
      </div>
    </motion.section>
  );
}
