import { cn } from "@/lib/utils";

const COUPLE_NAMES = "George & Victoria";

export function Footer() {
  return (
    <footer
      className={cn(
        "border-t border-[var(--color-neutral-200)] bg-[var(--color-neutral-50)]",
        "px-6 py-12 text-center font-body text-sm text-[var(--color-neutral-500)]"
      )}
      role="contentinfo"
    >
      <p className="font-display text-lg italic text-[var(--color-accent)]">
        {COUPLE_NAMES}
      </p>
      <p className="mt-2">With love</p>
    </footer>
  );
}
