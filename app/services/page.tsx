import type { Metadata } from "next";
import { ServicesPage } from "@/components/services-page";

export const metadata: Metadata = {
  title: "Builder Services",
  description:
    "Explore Builder's residential construction, commercial construction, renovation, interior design, project management, and planning services.",
};

export default function ServicesRoutePage() {
  return <ServicesPage />;
}
