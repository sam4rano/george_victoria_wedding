"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const COUPLE_NAMES = "George & Victoria";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className={cn(
        "border-t border-neutral-200 bg-neutral-50",
        "px-6 py-12 text-center font-body text-sm text-neutral-500"
      )}
      role="contentinfo"
    >
      <p className="font-display text-lg italic" style={{ color: "var(--color-rose, #8b4a5c)" }}>
        {COUPLE_NAMES}
      </p>
      <p className="mt-2">With love</p>
    </motion.footer>
  );
}
