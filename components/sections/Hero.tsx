"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const COUPLE_NAMES = "George & Victoria";
const WEDDING_DATE = "Our Wedding Day";

const HERO_IMAGES = [
  "/images/img_one.jpeg",
  "/images/img_four.jpeg",
  "/images/img_six.jpeg",
  "/images/img_seven.jpeg",
];

const ROTATE_INTERVAL_MS = 5000;

export function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className={cn(
        "relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden",
        "px-6 py-20"
      )}
      aria-label="Welcome"
    >
      <div className="absolute inset-0 overflow-hidden">
        {HERO_IMAGES.map((src, i) => (
          <motion.div
            key={src}
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              className="object-cover object-[center_60%]"
              sizes="100vw"
            />
          </motion.div>
        ))}
      </div>
      <div
        className="absolute inset-0 z-[1]"
        style={{ backgroundColor: "rgba(16, 25, 34, 0.5)" }}
        aria-hidden
      />
      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-body text-sm font-medium uppercase tracking-[0.25em] text-white/80"
        >
          {WEDDING_DATE}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "font-display text-5xl font-medium italic tracking-tight text-rose",
            "sm:text-7xl md:text-8xl"
          )}
        >
          {COUPLE_NAMES}
        </motion.h1>
      </div>
    </section>
  );
}
