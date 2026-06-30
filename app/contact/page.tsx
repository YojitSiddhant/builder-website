import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";
import { makePageMetadata } from "@/lib/site";

export const metadata: Metadata = makePageMetadata({
  title: "Contact Builder",
  description:
    "Reach Builder for project enquiries, site visits, consultations, and callback requests.",
  path: "/contact",
});

export default function ContactRoutePage() {
  return <ContactPage />;
}
