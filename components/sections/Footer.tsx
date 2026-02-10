"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const COUPLE_NAMES = "George & Victoria";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      role="contentinfo"
      className={cn(
        "border-t border-white/10 bg-[#101922] py-10 text-center font-body text-sm text-neutral-400"
      )}
    >
      <p className="font-display text-xl italic text-rose">
        {COUPLE_NAMES}
      </p>
      <p className="mt-2 font-body text-sm text-neutral-400">With love</p>
    </motion.footer>
  );
}
