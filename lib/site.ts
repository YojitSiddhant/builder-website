import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://builder-website-nu.vercel.app";

export const siteConfig = {
  name: "Builder",
  description:
    "Premium residential and commercial construction, interiors, renovations, and project delivery in Bhopal.",
  url: siteUrl,
  locale: "en_IN",
  keywords: [
    "builder",
    "construction company",
    "real estate",
    "interior design",
    "renovation",
    "residential construction",
    "commercial construction",
    "Bhopal",
    "Madhya Pradesh",
  ],
  contact: {
    phone: "+91 94250 80418",
    email: "contact@example.com",
    address: "219, E-3, Arera Colony, Bhopal, Madhya Pradesh 462016",
  },
} as const;

export function makePageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
