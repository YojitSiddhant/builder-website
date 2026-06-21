import type { Metadata } from "next";
import { ProjectsPage } from "@/components/projects-page";

export const metadata: Metadata = {
  title: "Builder Projects",
  description:
    "Explore premium residential and commercial developments crafted for modern living.",
};

export default function ProjectsRoutePage() {
  return <ProjectsPage />;
}
