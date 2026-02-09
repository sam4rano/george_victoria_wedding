import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { GallerySection } from "@/components/sections/GallerySection";
import { Footer } from "@/components/sections/Footer";
import { getDefaultGallery } from "@/lib/sanity/fetch";

async function GalleryData() {
  const gallery = await getDefaultGallery();
  return <GallerySection gallery={gallery} />;
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Suspense
          fallback={
            <section className="bg-[var(--color-dominant)] py-16 md:py-24">
              <div className="mx-auto max-w-6xl px-4 text-center font-body text-[var(--color-neutral-500)]">
                Loading gallery…
              </div>
            </section>
          }
        >
          <GalleryData />
        </Suspense>
        <Footer />
      </main>
    </div>
  );
}
