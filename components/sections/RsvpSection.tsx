"use client";

import { motion } from "framer-motion";

const CONTACTS = [
  { name: "Margaret", tel: "08163760270" },
  { name: "Ademola", tel: "07073748560" },
];

export function RsvpSection() {
  return (
    <motion.section
      id="rsvp"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="bg-dominant py-16 md:py-24"
    >
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h2
          className="font-display text-3xl font-medium italic md:text-4xl"
          style={{ color: "var(--color-rose, #8b4a5c)" }}
        >
          RSVP
        </h2>
        <p className="mt-4 font-body text-neutral-600">
          Please contact us to confirm your attendance.
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-4">
          {CONTACTS.map(({ name, tel }) => (
            <li key={tel}>
              <a
                href={`tel:${tel}`}
                className="inline-block rounded-lg border border-neutral-300 bg-white px-6 py-3 font-body text-neutral-800 transition hover:border-rose hover:text-rose"
              >
                {name} — {tel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
