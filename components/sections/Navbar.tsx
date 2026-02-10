"use client";

import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Our Day", href: "#gallery" },
  { label: "Date & Place", href: "#date" },
  { label: "RSVP", href: "#rsvp" },
] as const;

export function Navbar() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setVisible(y <= 80 || y < lastY);
      setLastY(y);
    });
    return () => unsubscribe();
  }, [scrollY, lastY]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -120 }}
      transition={{ type: "spring", stiffness: 380, damping: 30, delay: 0.15 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "border-b border-white/20 bg-[var(--color-dominant)]/80 backdrop-blur-md"
      )}
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6"
        aria-label="Main"
      >
        <Link
          href="#hero"
          className={cn(
            "font-display text-xl font-medium italic",
            "text-[var(--color-rose,#8b4a5c)] transition-opacity hover:opacity-90"
          )}
        >
          George & Victoria
        </Link>
        <ul className="flex items-center gap-6 md:gap-8">
          {NAV_LINKS.map((item, i) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "font-body text-sm font-medium uppercase tracking-wider",
                  "text-neutral-600 transition-colors hover:text-[var(--color-rose,#8b4a5c)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-rose)] focus-visible:ring-offset-2"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
