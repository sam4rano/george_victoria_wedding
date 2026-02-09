import { cn } from "@/lib/utils";

const COUPLE_NAMES = "George & Victoria";
const WEDDING_DATE = "Our Wedding Day";

export function Hero() {
  return (
    <section
      className={cn(
        "relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden",
        "bg-[var(--color-dominant)] px-6 py-20"
      )}
      aria-label="Welcome"
    >
      <div
        className={cn(
          "flex flex-col items-center gap-4 text-center",
          "animate-[fadeSlideUp_1s_ease-out_both]"
        )}
      >
        <p className="font-body text-sm font-medium uppercase tracking-[0.3em] text-[var(--color-neutral-500)]">
          {WEDDING_DATE}
        </p>
        <h1 className="font-display text-5xl font-medium italic tracking-tight text-[var(--color-accent)] sm:text-7xl md:text-8xl">
          {COUPLE_NAMES}
        </h1>
      </div>
    </section>
  );
}
