"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const CONTACTS = [
  { name: "Margaret", tel: "08163760270" },
  { name: "Ademola", tel: "07073748560" },
];

export function RsvpSection() {
  return (
    <motion.section
      id="rsvp"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden bg-[#101922] py-28 md:py-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(139,74,92,0.12),transparent)]" aria-hidden />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-block"
        >
          <h2 className="font-display text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            R<span className="text-rose">S</span>VP
          </h2>
          <span className="mt-2 block h-0.5 w-16 bg-rose/60 mx-auto rounded-full" aria-hidden />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-6 font-body text-neutral-300"
        >
          Please contact us to confirm your attendance.
        </motion.p>
        <ul className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
          {CONTACTS.map(({ name, tel }, i) => (
            <motion.li
              key={tel}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: "easeOut" }}
            >
              <motion.a
                href={`tel:${tel}`}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-body font-medium text-white shadow-lg transition-colors hover:border-rose/40 hover:bg-white/10"
              >
                <Phone className="size-4 text-rose/80" />
                <span>{name}</span>
                <span className="text-neutral-400">—</span>
                <span className="tabular-nums">{tel}</span>
              </motion.a>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
