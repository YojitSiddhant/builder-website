"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa6";
import { IoChevronUp } from "react-icons/io5";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      <SiteHeader />
      <main className="flex w-full min-w-0 flex-1 flex-col overflow-x-clip">
        {children}
      </main>
      <FloatingActions showScrollTop={showScrollTop} />
      <SiteFooter />
    </div>
  );
}

function FloatingActions({ showScrollTop }: { showScrollTop: boolean }) {
  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {showScrollTop ? <ScrollTopButton /> : null}
      <WhatsAppFloatingButton />
    </div>
  );
}

function ScrollTopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_18px_45px_rgba(37,99,235,0.28)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-blue-700 hover:shadow-[0_22px_55px_rgba(37,99,235,0.36)] sm:h-14 sm:w-14"
    >
      <IoChevronUp className="h-6 w-6 sm:h-7 sm:w-7" />
    </button>
  );
}

function WhatsAppFloatingButton() {
  // wa.me expects the country code and number without spaces or the leading "+".
  const phoneNumber = "919425080418"; // +91 94250 80418
  const message = encodeURIComponent(
    "Hi Builder, I would like to enquire about your services."
  );
  const href = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_45px_rgba(37,211,102,0.32)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_22px_55px_rgba(37,211,102,0.42)] sm:h-16 sm:w-16"
    >
      <FaWhatsapp className="h-7 w-7 text-white" />
    </Link>
  );
}
