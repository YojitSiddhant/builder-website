import type { Metadata } from "next";
import { AboutPage } from "@/components/about-page";

export const metadata: Metadata = {
  title: "About Builder",
  description:
    "Learn about Builder, a premium real estate and construction company focused on quality, trust, and modern design.",
};

export default function AboutRoutePage() {
  return <AboutPage />;
}
