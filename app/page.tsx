import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { GallerySection } from "@/components/sections/GallerySection";
import { DatePlaceSection } from "@/components/sections/DatePlaceSection";
import { ShareSection } from "@/components/sections/ShareSection";
import { RsvpSection } from "@/components/sections/RsvpSection";
import { Footer } from "@/components/sections/Footer";
import { Sidebar } from "@/components/sections/Sidebar";
import { getDefaultGallery, getGalleryBySlug } from "@/lib/sanity/fetch";

const GALLERY_SECTIONS = [
  { slug: null as string | null, id: "gallery", title: "Our Day" },
  { slug: "family", id: "family", title: "Family" },
  { slug: "friends", id: "friends", title: "Friends" },
  { slug: "bride", id: "bride", title: "Bride" },
  { slug: "groom", id: "groom", title: "Groom" },
] as const;

async function GalleriesData() {
  const [defaultGallery, familyGallery, friendsGallery, brideGallery, groomGallery] = await Promise.all([
    getDefaultGallery(),
    getGalleryBySlug("family"),
    getGalleryBySlug("friends"),
    getGalleryBySlug("bride"),
    getGalleryBySlug("groom"),
  ]);

  const galleries = [
    defaultGallery,
    familyGallery,
    friendsGallery,
    brideGallery,
    groomGallery,
  ];

  return (
    <>
      {GALLERY_SECTIONS.map((section, i) => (
        <GallerySection
          key={section.id}
          gallery={galleries[i]}
          sectionId={section.id}
          title={section.title}
          variant={i % 2 === 0 ? "center" : "left"}
          altBg={i % 2 === 1}
          large={section.id === "gallery"}
        />
      ))}
    </>
  );
}

function GalleryFallback() {
  return (
    <>
      {GALLERY_SECTIONS.map(({ id, title }) => (
        <section key={id} id={id} className="bg-off-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 text-center font-body text-neutral-600">
            Loading {title}…
          </div>
        </section>
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Sidebar />
      <main className="pl-0 md:pl-56">
        <Hero />
        <Suspense fallback={<GalleryFallback />}>
          <GalleriesData />
        </Suspense>
        <DatePlaceSection />
        <ShareSection />
        <RsvpSection />
        <Footer />
      </main>
    </div>
  );
}
