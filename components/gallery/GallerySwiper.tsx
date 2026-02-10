"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { urlFor } from "@/lib/sanity/image";
import type { GalleryImage } from "@/types/sanity";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface GallerySwiperProps {
  images: GalleryImage[];
}

export function GallerySwiper({ images }: GallerySwiperProps) {
  const filtered = images.filter((img) => img.asset?.url);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const open = lightboxIndex !== null;
  const current = open && filtered[lightboxIndex] ? filtered[lightboxIndex] : null;

  const close = useCallback(() => setLightboxIndex(null), []);
  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : i === 0 ? filtered.length - 1 : i - 1
    );
  }, [filtered.length]);
  const goNext = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % filtered.length
    );
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
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-body text-center text-neutral-500"
      >
        No photos yet. Check back soon.
      </motion.p>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto max-w-5xl px-4 py-8"
      >
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 80,
            modifier: 1.2,
            slideShadows: true,
          }}
          navigation={{
            prevEl: ".gallery-swiper-prev",
            nextEl: ".gallery-swiper-next",
          }}
          pagination={{
            clickable: true,
            el: ".gallery-swiper-pagination",
          }}
          modules={[EffectCoverflow, Navigation, Pagination]}
          className="overflow-visible!"
        >
          {filtered.map((item, index) => {
            const alt = item.alt || item.caption || "Gallery image";
            const imageUrl = urlFor(item.asset)
              .width(800)
              .height(600)
              .fit("max")
              .url();

            return (
              <SwiperSlide
                key={item._key}
                className="w-[280px]! sm:w-[320px]! md:w-[360px]! cursor-pointer"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="group relative block aspect-4/3 w-full overflow-hidden rounded-xl shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  aria-label={`View image ${index + 1}: ${alt}`}
                >
                  <Image
                    src={imageUrl}
                    alt={alt}
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span
                    className="absolute inset-0 bg-neutral-900/0 transition-colors duration-300 group-hover:bg-neutral-900/15"
                    aria-hidden
                  />
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button
          type="button"
          aria-label="Previous image"
          className="gallery-swiper-prev absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-dominant/90 text-accent shadow-md transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-40 md:left-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next image"
          className="gallery-swiper-next absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-dominant/90 text-accent shadow-md transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-40 md:right-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
        <div className="gallery-swiper-pagination mt-6 flex justify-center gap-1.5 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:bg-neutral-300 [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet-active]:rounded-full [&_.swiper-pagination-bullet-active]:bg-accent" />
      </motion.div>

      <Dialog open={open} onOpenChange={(o) => !o && close()}>
        <DialogContent
          className="max-w-4xl border-0 bg-transparent p-0 shadow-none"
          showCloseButton
        >
          {current?.asset?.url && (
            <>
              <DialogTitle className="sr-only">
                {current.alt || current.caption || "Gallery image"}
              </DialogTitle>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-neutral-900"
              >
                <Image
                  src={urlFor(current.asset)
                    .width(1200)
                    .height(900)
                    .fit("max")
                    .url()}
                  alt={current.alt || current.caption || "Gallery image"}
                  fill
                  className="object-contain"
                />
              </motion.div>
              {(current.caption || current.alt) && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mt-2 text-center font-body text-sm text-dominant"
                >
                  {current.caption || current.alt}
                </motion.p>
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
