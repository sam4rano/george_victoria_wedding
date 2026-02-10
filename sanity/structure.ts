import type { StructureResolver } from "sanity/structure";
import { ImagesIcon } from "@sanity/icons";

const GALLERY_SECTIONS = [
  { title: "Our Day", filter: 'slug.current == "our-day"' },
  { title: "Family", filter: 'slug.current == "family"' },
  { title: "Friends", filter: 'slug.current == "friends"' },
  { title: "Bride", filter: 'slug.current == "bride"' },
  { title: "Groom", filter: 'slug.current == "groom"' },
] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Galleries")
        .icon(ImagesIcon)
        .child(
          S.list()
            .title("Galleries")
            .items([
              ...GALLERY_SECTIONS.map(({ title, filter }) =>
                S.listItem()
                  .title(title)
                  .child(
                    S.documentList()
                      .title(title)
                      .filter(`_type == "gallery" && ${filter}`)
                      .defaultOrdering([{ field: "order", direction: "asc" }])
                      .child((documentId) =>
                        S.document().documentId(documentId).schemaType("gallery")
                      )
                  )
              ),
              S.divider(),
              S.listItem()
                .title("All galleries")
                .child(
                  S.documentList()
                    .title("All galleries")
                    .filter('_type == "gallery"')
                    .defaultOrdering([{ field: "order", direction: "asc" }])
                    .child((documentId) =>
                      S.document().documentId(documentId).schemaType("gallery")
                    )
                ),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "gallery"),
    ]);
