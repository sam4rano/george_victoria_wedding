export const galleriesListQuery = `*[_type == "gallery"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  "imageCount": count(images)
}`;

export const galleryBySlugQuery = `*[_type == "gallery" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  order,
  images[] | order(order asc) {
    _key,
    alt,
    caption,
    order,
    "asset": image.asset-> {
      _id,
      url,
      metadata {
        dimensions { width, height }
      }
    }
  }
}`;

export const defaultGalleryQuery = `*[_type == "gallery"] | order(order asc)[0] {
  _id,
  title,
  "slug": slug.current,
  order,
  images[] | order(order asc) {
    _key,
    alt,
    caption,
    order,
    "asset": image.asset-> {
      _id,
      url,
      metadata {
        dimensions { width, height }
      }
    }
  }
}`;
