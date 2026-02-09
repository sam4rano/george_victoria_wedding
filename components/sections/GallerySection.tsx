import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import type { Gallery } from "@/types/sanity";
import { cn } from "@/lib/utils";

interface GallerySectionProps {
  gallery: Gallery | null;
}

const SECTION_TITLE = "Our Day";

export function GallerySection({ gallery }: GallerySectionProps) {
  const images = gallery?.images ?? [];

  return (
    <section
      className={cn(
        "bg-[var(--color-dominant)] py-16 md:py-24",
        "px-4"
      )}
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="gallery-heading"
          className={cn(
            "font-display text-4xl font-medium italic text-[var(--color-accent)]",
            "mb-10 text-center md:text-5xl"
          )}
        >
          {SECTION_TITLE}
        </h2>
        <GalleryGrid images={images} />
      </div>
    </section>
  );
}
