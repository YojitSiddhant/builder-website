import type { Metadata } from "next";
import { GalleryPage } from "@/components/gallery-page";
import { makePageMetadata } from "@/lib/site";

export const metadata: Metadata = makePageMetadata({
  title: "Project Gallery & Construction Work",
  description:
    "Explore Builder's premium gallery of completed projects, interiors, architecture, and construction excellence.",
  path: "/gallery",
});

export default function GalleryRoutePage() {
  return <GalleryPage />;
}
