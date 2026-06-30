import type { Metadata } from "next";
import { ProjectsPage } from "@/components/projects-page";
import { makePageMetadata } from "@/lib/site";

export const metadata: Metadata = makePageMetadata({
  title: "Completed Projects & Developments",
  description:
    "Explore premium residential and commercial developments crafted for modern living.",
  path: "/projects",
});

export default function ProjectsRoutePage() {
  return <ProjectsPage />;
}
