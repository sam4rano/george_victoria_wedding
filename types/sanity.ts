export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata?: {
    dimensions?: { width: number; height: number };
  };
}

export interface GalleryImage {
  _key: string;
  alt?: string | null;
  caption?: string | null;
  order?: number;
  asset: SanityImageAsset | null;
}

export interface Gallery {
  _id: string;
  title: string | null;
  slug: string | null;
  order?: number;
  images: GalleryImage[];
}

export interface GalleryListItem {
  _id: string;
  title: string | null;
  slug: string | null;
  imageCount: number;
}
