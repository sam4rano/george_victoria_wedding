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
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface GallerySwiperProps {
  images: GalleryImage[];
  variant?: "light" | "dark";
  slideSize?: "default" | "large";
}

const navClasses = {
  light:
    "rounded-full bg-neutral-200/90 text-neutral-700 shadow-md transition hover:bg-neutral-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 disabled:opacity-40",
  dark:
    "rounded-full bg-white/25 text-white shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:opacity-40",
};

const paginationClasses = {
  light:
    "[&_.swiper-pagination-bullet]:bg-neutral-400 [&_.swiper-pagination-bullet-active]:bg-neutral-700",
  dark:
    "[&_.swiper-pagination-bullet]:bg-white/40 [&_.swiper-pagination-bullet-active]:bg-white",
};

const slideSizeClasses = {
  default: "w-[280px]! sm:w-[320px]! md:w-[360px]!",
  large: "w-[320px]! sm:w-[400px]! md:w-[480px]! lg:w-[520px]!",
};

export function GallerySwiper({ images, variant = "dark", slideSize = "default" }: GallerySwiperProps) {
  const navCls = navClasses[variant];
  const paginationCls = paginationClasses[variant];
  const filtered = images.filter((img) => img.asset?.url);
  const isLarge = slideSize === "large";
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
        transition={{ duration: 0.3 }}
        className="font-body text-center text-neutral-500"
      >
        No photos yet. Check back soon.
      </motion.p>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-5xl overflow-visible px-4 py-4"
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
              .width(isLarge ? 1040 : 800)
              .height(isLarge ? 780 : 600)
              .fit("max")
              .url();

            return (
              <SwiperSlide
                key={item._key}
                className={cn(slideSizeClasses[slideSize], "cursor-pointer")}
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="group relative block aspect-4/3 w-full overflow-hidden rounded-xl shadow-lg ring-neutral-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  aria-label={`View image ${index + 1}: ${alt}`}
                >
                  <Image
                    src={imageUrl}
                    alt={alt}
                    fill
                    sizes={isLarge ? "(max-width: 640px) 320px, (max-width: 768px) 400px, (max-width: 1024px) 480px, 520px" : "(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"}
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  <span
                    className="absolute inset-0 bg-neutral-900/0 transition-colors duration-300 group-hover:bg-neutral-900/10"
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
          className={`gallery-swiper-prev absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center md:left-2 ${navCls}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next image"
          className={`gallery-swiper-next absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center md:right-2 ${navCls}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
        <div className={`gallery-swiper-pagination mt-4 flex justify-center gap-1.5 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet-active]:w-6 [&_.swiper-pagination-bullet-active]:rounded-full ${paginationCls}`} />
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
                  className="inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 font-body text-sm font-medium text-dominant hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl px-5 py-3 font-body text-sm font-medium text-dominant hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
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
