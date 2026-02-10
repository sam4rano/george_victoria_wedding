import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { GallerySection } from "@/components/sections/GallerySection";
import { DatePlaceSection } from "@/components/sections/DatePlaceSection";
import { RsvpSection } from "@/components/sections/RsvpSection";
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
        <DatePlaceSection />
        <RsvpSection />
        <Footer />
      </main>
    </div>
  );
}
