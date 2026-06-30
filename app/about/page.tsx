import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";
import { makePageMetadata } from "@/lib/site";

export const metadata: Metadata = makePageMetadata({
  title: "About Our Company",
  description:
    "Learn about Builder's design-first approach, experienced team, and commitment to quality residential and commercial construction.",
  path: "/about",
});

export default function AboutRoutePage() {
  return <AboutPage />;
}
