"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      <SiteHeader />
      <main className="flex w-full min-w-0 flex-1 flex-col overflow-x-clip">
        {children}
      </main>
      <WhatsAppFloatingButton />
      <SiteFooter />
    </div>
  );
}

function WhatsAppFloatingButton() {
  const phoneNumber = "919425080418";
  const message = encodeURIComponent(
    "Hi Builder, I would like to enquire about your services."
  );
  const href = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group inline-flex items-center gap-3 rounded-full bg-[#25D366] p-3 text-white shadow-[0_18px_45px_rgba(37,211,102,0.32)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(37,211,102,0.42)] lg:px-4 lg:py-3"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#25D366] transition-transform duration-300 group-hover:scale-105">
          <FaWhatsapp className="h-7 w-7" />
        </span>
        <span className="hidden whitespace-nowrap text-sm font-semibold lg:inline">
          WhatsApp Us
        </span>
      </Link>
    </div>
  );
}
