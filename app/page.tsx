import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { makePageMetadata } from "@/lib/site";

export const metadata: Metadata = makePageMetadata({
  title: "Premium Construction & Interiors in Bhopal",
  description:
    "Discover Builder's residential construction, commercial projects, interiors, and renovation services in Bhopal and across Madhya Pradesh.",
  path: "/",
});

export default function Home() {
  return <HomePage />;
}
