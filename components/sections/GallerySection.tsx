"use client";

import { GallerySwiper } from "@/components/gallery/GallerySwiper";
import type { Gallery } from "@/types/sanity";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GalleryVariant = "center" | "left";

interface GallerySectionProps {
  gallery: Gallery | null;
  sectionId: string;
  title: string;
  variant?: GalleryVariant;
  /** Alternate background for visual rhythm (e.g. off-white vs subtle grey) */
  altBg?: boolean;
}

const motionByVariant = {
  center: { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] as const } },
  left: { initial: { opacity: 0, x: -24 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 0.45, delay: 0.08, ease: "easeOut" as const } },
};

export function GallerySection({ gallery, sectionId, title, variant = "center", altBg = false }: GallerySectionProps) {
  const images = gallery?.images ?? [];
  const headingId = `${sectionId}-heading`;
  const motionConfig = motionByVariant[variant];

  return (
    <motion.section
      id={sectionId}
      initial={{ opacity: 0, y: variant === "center" ? 20 : 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "px-4 py-20 md:py-28 lg:px-8 overflow-visible scroll-mt-20",
        altBg ? "bg-neutral-50/80" : "bg-off-white"
      )}
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-6xl overflow-visible">
        <motion.h2
          id={headingId}
          {...motionConfig}
          viewport={{ once: true }}
          className={cn(
            "mb-12 font-display text-4xl font-medium text-neutral-900 md:text-5xl lg:mb-16",
            variant === "center" ? "text-center" : "text-left"
          )}
        >
          {title}
        </motion.h2>
        <GallerySwiper images={images} variant="light" />
      </div>
    </motion.section>
  );
}
