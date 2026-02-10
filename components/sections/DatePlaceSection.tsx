"use client";

import { motion } from "framer-motion";

const DATE = "Saturday, 14 February 2026";
const EVENTS = [
  { time: "7:00 AM", label: "Traditional / Engagement", venue: "Redeem Event Hall, opposite Admus Hotel, Ede, Osun State" },
  { time: "11:00 AM", label: "Church Service", venue: "Christ Apostolic Church, No 1, Talafia, Ede, Osun State" },
  { time: "Reception follows", label: "Reception", venue: "Redeem Event Hall, opposite Admus Hotel, Ede, Osun State" },
];
const DRESS_CODE = "Navy Blue, White & Gold";
const VERSE = "For where two or three gather in My name, there am I with them.";
const VERSE_REF = "Matthew 18:20";

export function DatePlaceSection() {
  return (
    <motion.section
      id="date"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="bg-neutral-50 py-16 md:py-24"
    >
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h2
          className="font-display text-3xl font-medium italic md:text-4xl"
          style={{ color: "var(--color-rose, #8b4a5c)" }}
        >
          Date & Place
        </h2>
        <p className="mt-6 font-body text-lg font-medium text-neutral-900">{DATE}</p>
        <ul className="mt-8 space-y-6 text-left">
          {EVENTS.map((event, i) => (
            <li key={i} className="border-b border-neutral-200 pb-6 last:border-0 last:pb-0">
              <p className="font-body font-medium text-neutral-900">{event.time}</p>
              <p className="mt-1 font-body text-neutral-700">{event.label}</p>
              <p className="mt-1 font-body text-sm text-neutral-500">{event.venue}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-body text-neutral-600">
          <span className="font-medium">Dress code:</span> {DRESS_CODE}
        </p>
        <blockquote className="mt-8 font-display italic text-neutral-600">
          &ldquo;{VERSE}&rdquo; <cite className="not-italic">— {VERSE_REF}</cite>
        </blockquote>
      </div>
    </motion.section>
  );
}
