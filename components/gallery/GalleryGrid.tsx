"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { urlFor } from "@/lib/sanity/image";
import type { GalleryImage } from "@/types/sanity";
import { cn } from "@/lib/utils";

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const filtered = images.filter((img) => img.asset?.url);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const open = lightboxIndex !== null;
  const current = open && filtered[lightboxIndex] ? filtered[lightboxIndex] : null;

  const close = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : i === 0 ? filtered.length - 1 : i - 1));
  }, [filtered.length]);
  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, close, goPrev, goNext]);

  if (filtered.length === 0) {
    return (
      <p className="font-body text-center text-neutral-500">
        No photos yet. Check back soon.
      </p>
    );
  }

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4",
          "max-w-6xl mx-auto px-4"
        )}
      >
        {filtered.map((item, index) => {
          const alt = item.alt || item.caption || "Gallery image";
          const imageUrl = urlFor(item.asset).width(800).height(600).fit("max").url();

          return (
            <button
              key={item._key}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className={cn(
                "group relative aspect-4/3 overflow-hidden rounded-lg",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                "transition-transform duration-300 ease-out hover:scale-[1.02]"
              )}
              aria-label={`View image ${index + 1}: ${alt}`}
            >
              <Image
                src={imageUrl}
                alt={alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover"
              />
              <span
                className={cn(
                  "absolute inset-0 bg-neutral-900/0 transition-colors duration-300",
                  "group-hover:bg-neutral-900/10"
                )}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={(open) => !open && close()}>
        <DialogContent
          className="max-w-4xl border-0 bg-transparent p-0 shadow-none"
          showCloseButton={true}
        >
          {current?.asset?.url && (
            <>
              <DialogTitle className="sr-only">
                {current.alt || current.caption || "Gallery image"}
              </DialogTitle>
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-neutral-900">
                <Image
                  src={urlFor(current.asset).width(1200).height(900).fit("max").url()}
                  alt={current.alt || current.caption || "Gallery image"}
                  fill
                  className="object-contain"
                />
              </div>
              {(current.caption || current.alt) && (
                <p className="mt-2 text-center font-body text-sm text-dominant">
                  {current.caption || current.alt}
                </p>
              )}
              <div className="mt-4 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={goPrev}
                  className="rounded-md px-4 py-2 font-body text-sm text-dominant hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-md px-4 py-2 font-body text-sm text-dominant hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
