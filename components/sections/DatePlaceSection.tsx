"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { CalendarPlus, Download } from "lucide-react";

const DATE = "Saturday, 14 February 2026";
const EVENTS = [
  { time: "7:00 AM", label: "Traditional / Engagement", venue: "Redeem Event Hall, opposite Admus Hotel, Ede, Osun State" },
  { time: "11:00 AM", label: "Church Service", venue: "Christ Apostolic Church, No 1, Talafia, Ede, Osun State" },
  { time: "Reception follows", label: "Reception", venue: "Redeem Event Hall, opposite Admus Hotel, Ede, Osun State" },
];
const DRESS_CODE = "Navy Blue, White & Gold";
const VERSE = "For where two or three gather in My name, there am I with them.";
const VERSE_REF = "Matthew 18:20";

const CALENDAR_TITLE = "George & Victoria — Wedding";
const CALENDAR_START = "20260214T100000Z";
const CALENDAR_END = "20260214T140000Z";
const CALENDAR_LOCATION = "Christ Apostolic Church, No 1, Talafia, Ede, Osun State";
const CALENDAR_DETAILS = "Traditional 7am @ Redeem Event Hall. Church 11am. Reception at Redeem Event Hall. Dress: Navy Blue, White & Gold.";
const ADD_TO_CALENDAR_URL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(CALENDAR_TITLE)}&dates=${CALENDAR_START}/${CALENDAR_END}&details=${encodeURIComponent(CALENDAR_DETAILS)}&location=${encodeURIComponent(CALENDAR_LOCATION)}`;

function buildIcsContent(): string {
  const crlf = "\r\n";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//George & Victoria//Wedding//EN",
    "BEGIN:VEVENT",
    `DTSTART:${CALENDAR_START}`,
    `DTEND:${CALENDAR_END}`,
    `SUMMARY:${CALENDAR_TITLE}`,
    `DESCRIPTION:${CALENDAR_DETAILS.replace(/\n/g, "\\n")}`,
    `LOCATION:${CALENDAR_LOCATION}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join(crlf);
}

export function DatePlaceSection() {
  const handleDownloadIcs = useCallback(() => {
    const ics = buildIcsContent();
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "george-victoria-wedding.ics";
    link.click();
    URL.revokeObjectURL(url);
  }, []);
  return (
    <motion.section
      id="date"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#101922] py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr,1.2fr] lg:gap-16 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8"
          >
            <h2 className="font-display text-2xl font-medium text-white md:text-3xl">
              Date & Place
            </h2>
            <p className="mt-4 font-body text-lg font-medium text-neutral-200">
              {DATE}
            </p>
            <p className="mt-6 font-body text-sm text-neutral-400">
              <span className="font-medium text-white">Dress code:</span> {DRESS_CODE}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <motion.a
                href={ADD_TO_CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-white/15"
              >
                <CalendarPlus className="size-4" />
                Google Calendar
              </motion.a>
              <motion.button
                type="button"
                onClick={handleDownloadIcs}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-white/15"
              >
                <Download className="size-4" />
                .ics download
              </motion.button>
            </div>
            <blockquote className="mt-8 border-l-2 border-rose/50 pl-4 font-display text-base italic text-neutral-300">
              &ldquo;{VERSE}&rdquo; <cite className="not-italic text-neutral-400">— {VERSE_REF}</cite>
            </blockquote>
          </motion.div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-white/20 via-white/10 to-transparent" aria-hidden />
            <ul className="space-y-0">
              {EVENTS.map((event, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-6 pl-6 pb-10 last:pb-0"
                >
                  <span className="absolute left-0 top-2.5 size-2.5 shrink-0 rounded-full border-2 border-rose/70 bg-[#101922]" aria-hidden />
                  <div className="min-w-0 flex-1 break-words">
                    <p className="font-body text-sm font-semibold uppercase tracking-wider text-rose/90">{event.time}</p>
                    <p className="mt-1 font-body font-medium text-white">{event.label}</p>
                    <p className="mt-1 font-body text-sm text-neutral-400">{event.venue}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
