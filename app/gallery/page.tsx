import type { Metadata } from "next";
import { GalleryPage } from "@/components/gallery-page";

export const metadata: Metadata = {
  title: "Builder Gallery",
  description:
    "Explore Builder's premium gallery of completed projects, interiors, architecture, and construction excellence.",
};

export default function GalleryRoutePage() {
  return <GalleryPage />;
}
