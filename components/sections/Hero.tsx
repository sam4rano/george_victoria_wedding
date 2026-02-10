"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const COUPLE_NAMES = "George & Victoria";
const WEDDING_DATE = "Our Wedding Day";
const HERO_BACKGROUND = "/images/img_one.jpeg";

export function Hero() {
  return (
    <section
      id="hero"
      className={cn(
        "relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden",
        "px-6 py-20"
      )}
      aria-label="Welcome"
    >
      <Image
        src={HERO_BACKGROUND}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-[var(--color-dominant)]/70"
        aria-hidden
      />
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-body text-sm font-medium uppercase tracking-[0.3em] text-neutral-600"
        >
          {WEDDING_DATE}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "font-display text-5xl font-medium italic tracking-tight",
            "sm:text-7xl md:text-8xl"
          )}
          style={{ color: "var(--color-rose, #8b4a5c)" }}
        >
          {COUPLE_NAMES}
        </motion.h1>
      </div>
    </section>
  );
}
