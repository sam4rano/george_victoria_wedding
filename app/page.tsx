import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { GallerySection } from "@/components/sections/GallerySection";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { getDefaultGallery } from "@/lib/sanity/fetch";

async function GalleryData() {
  const gallery = await getDefaultGallery();
  return <GallerySection gallery={gallery} />;
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Suspense
          fallback={
            <section id="gallery" className="bg-dominant py-16 md:py-24">
              <div className="mx-auto max-w-6xl px-4 text-center font-body text-neutral-500">
                Loading gallery…
              </div>
            </section>
          }
        >
          <GalleryData />
        </Suspense>
        <section id="date" className="bg-neutral-50 py-16 md:py-24">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="font-display text-3xl font-medium italic text-[var(--color-rose,#8b4a5c)] md:text-4xl">
              Date & Place
            </h2>
            <p className="mt-4 font-body text-neutral-500">
              Details coming soon.
            </p>
          </div>
        </section>
        <section id="rsvp" className="bg-dominant py-16 md:py-24">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="font-display text-3xl font-medium italic text-[var(--color-rose,#8b4a5c)] md:text-4xl">
              RSVP
            </h2>
            <p className="mt-4 font-body text-neutral-500">
              RSVP form coming soon.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
