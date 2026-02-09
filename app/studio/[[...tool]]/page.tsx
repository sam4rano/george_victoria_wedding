"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

export default function StudioPage() {
  return (
    <div
      style={{
        height: "100vh",
        maxHeight: "100dvh",
        overscrollBehavior: "none",
        overflow: "auto",
      }}
    >
      <NextStudio config={config} />
    </div>
  );
}
