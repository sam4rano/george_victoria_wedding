"use client";

import Link from "next/link";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Our Day", href: "#gallery" },
  { label: "Family", href: "#family" },
  { label: "Friends", href: "#friends" },
  { label: "Bride", href: "#bride" },
  { label: "Groom", href: "#groom" },
  { label: "Date & Place", href: "#date" },
  { label: "Share", href: "#share" },
  { label: "RSVP", href: "#rsvp" },
] as const;

export function Navbar() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (y) => {
      setVisible(y <= 80 || y < lastY);
      setLastY(y);
    });
    return () => unsubscribe();
  }, [scrollY, lastY]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -120 }}
      transition={{ type: "spring", stiffness: 380, damping: 30, delay: 0.15 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "border-b border-neutral-200 bg-dominant/90 backdrop-blur-md"
      )}
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6"
        aria-label="Main"
      >
        <Link
          href="#hero"
          onClick={closeMobile}
          className={cn(
            "font-display text-xl font-medium italic",
            "text-rose transition-opacity hover:opacity-90"
          )}
        >
          George & Victoria
        </Link>
        <ul className="hidden items-center gap-6 md:flex md:gap-8">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "font-body text-sm font-medium uppercase tracking-wider",
                  "text-neutral-600 transition-colors duration-200 hover:text-rose",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex size-10 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 hover:text-rose focus:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-neutral-200 bg-dominant/98 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-0 py-2">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMobile}
                    className={cn(
                      "block px-4 py-3 font-body text-sm font-medium uppercase tracking-wider",
                      "text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-rose",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-rose"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
