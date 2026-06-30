import type { Metadata } from "next";
import { ServicesPage } from "@/components/services-page";
import { makePageMetadata } from "@/lib/site";

export const metadata: Metadata = makePageMetadata({
  title: "Construction, Renovation & Interior Services",
  description:
    "Explore Builder's residential construction, commercial construction, renovation, interior design, project management, and planning services.",
  path: "/services",
});

export default function ServicesRoutePage() {
  return <ServicesPage />;
}
