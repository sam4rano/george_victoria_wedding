"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const SECTION_IDS = [
  "hero",
  "gallery",
  "family",
  "friends",
  "bride",
  "groom",
  "date",
  "share",
  "rsvp",
] as const;

const NAV_LINKS: { id: (typeof SECTION_IDS)[number]; label: string }[] = [
  { id: "hero", label: "Home" },
  { id: "gallery", label: "Our Day" },
  { id: "family", label: "Family" },
  { id: "friends", label: "Friends" },
  { id: "bride", label: "Bride" },
  { id: "groom", label: "Groom" },
  { id: "date", label: "Date & Place" },
  { id: "share", label: "Share" },
  { id: "rsvp", label: "RSVP" },
];

const SIDEBAR_WIDTH = "w-52 md:w-56";

export function Sidebar() {
  const [activeId, setActiveId] = useState<(typeof SECTION_IDS)[number]>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateActive = useCallback(() => {
    const threshold = 120;
    let current: (typeof SECTION_IDS)[number] = "hero";
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= threshold) current = id;
    }
    setActiveId(current);
  }, []);

  useEffect(() => {
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  const handleLinkClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        className={cn(
          "fixed left-4 top-4 z-[60] flex size-11 items-center justify-center rounded-lg bg-rose text-white shadow-lg",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2",
          "md:hidden"
        )}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full flex-col bg-rose text-white",
          SIDEBAR_WIDTH,
          "transition-transform duration-200 ease-out md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        role="navigation"
        aria-label="Main"
      >
        <div className="flex flex-col gap-0 p-4 pt-6 md:pt-8">
          <Link
            href="#hero"
            onClick={handleLinkClick}
            className="mb-6 flex items-center justify-center border-b border-white/20 pb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
          >
            <span className="font-display text-2xl font-medium italic tracking-tight md:text-3xl">
              G & V
            </span>
          </Link>
          <nav className="flex flex-1 flex-col gap-0">
            {NAV_LINKS.map(({ id, label }) => {
              const isActive = activeId === id;
              return (
                <Link
                  key={id}
                  href={`#${id}`}
                  onClick={handleLinkClick}
                  className={cn(
                    "block border-b border-white/10 py-3.5 text-center font-body text-sm font-semibold uppercase tracking-wider transition-colors",
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

export const SIDEBAR_WIDTH_CLASS = SIDEBAR_WIDTH;
