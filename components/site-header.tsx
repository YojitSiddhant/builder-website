"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IoBusinessOutline,
  IoHomeOutline,
  IoImageOutline,
  IoInformationCircleOutline,
  IoMailOutline,
  IoMenuOutline,
  IoSparklesOutline,
} from "react-icons/io5";

const links = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/about", label: "About", icon: InfoIcon },
  { href: "/services", label: "Services", icon: SparkIcon },
  { href: "/projects", label: "Projects", icon: BriefcaseIcon },
  { href: "/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/contact", label: "Contact", icon: MailIcon },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const portalTarget = typeof document === "undefined" ? null : document.body;

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const drawerVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.28,
        ease: "easeOut" as const,
        when: "beforeChildren" as const,
        staggerChildren: 0.06,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.98,
      transition: { duration: 0.2, ease: "easeIn" as const },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.24, ease: "easeOut" as const },
    },
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl">
      <div className="relative mx-auto flex w-full max-w-6xl min-w-0 items-center justify-between gap-4 px-4 py-4 sm:px-6 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-6 xl:px-8">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] text-blue-700"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 leading-none text-white">
            <BuilderMark className="block h-5 w-5" />
          </span>
          Builder
        </Link>

        <nav aria-label="Primary" className="hidden justify-self-center xl:block">
          <ul className="flex items-center gap-2 text-sm font-medium text-blue-700">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = isActiveLink(pathname, link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "group inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors",
                      isActive
                        ? "bg-blue-600 text-white shadow-[0_12px_30px_rgba(37,99,235,0.22)]"
                        : "text-blue-700 hover:bg-blue-50 hover:text-blue-900",
                    ].join(" ")}
                  >
                    <Icon
                      className={[
                        "h-4 w-4 shrink-0 transition-all duration-300 ease-out",
                        isActive ? "opacity-100" : "opacity-70 group-hover:translate-x-1 group-hover:opacity-100",
                      ].join(" ")}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="xl:hidden">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-700 shadow-sm transition hover:bg-blue-50"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((current) => !current)}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>

        <div aria-hidden="true" className="hidden xl:block" />
      </div>

      {portalTarget
        ? createPortal(
            <AnimatePresence initial={false}>
              {mobileOpen ? (
                <>
                  <motion.div
                    id="mobile-navigation"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mobile navigation"
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/35 px-4 py-6 backdrop-blur-md xl:hidden"
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    variants={drawerVariants}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="w-full max-w-sm" onClick={(event) => event.stopPropagation()}>
                      <div className="max-h-[calc(100dvh-3rem)] overflow-y-auto rounded-[1.75rem] border border-blue-100 bg-white/96 p-4 shadow-[0_24px_60px_rgba(37,99,235,0.18)] backdrop-blur-2xl">
                        <motion.nav aria-label="Mobile Primary">
                          <motion.ul className="grid gap-2">
                            {links.map((link) => {
                              const Icon = link.icon;
                              const isActive = isActiveLink(pathname, link.href);

                              return (
                                <motion.li key={link.href} variants={itemVariants}>
                                  <Link
                                    href={link.href}
                                    aria-current={isActive ? "page" : undefined}
                                    onClick={() => setMobileOpen(false)}
                                    className={[
                                      "flex items-center justify-center gap-3 rounded-2xl px-4 py-3 text-center text-sm font-medium transition-colors",
                                      isActive
                                        ? "bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.2)]"
                                        : "text-blue-700 hover:bg-blue-50 hover:text-blue-900",
                                    ].join(" ")}
                                  >
                                    <Icon
                                      className={[
                                        "h-4 w-4 shrink-0",
                                        isActive ? "opacity-100" : "opacity-70",
                                      ].join(" ")}
                                    />
                                    <span className="text-center">{link.label}</span>
                                  </Link>
                                </motion.li>
                              );
                            })}
                          </motion.ul>
                        </motion.nav>
                      </div>
                    </div>
                  </motion.div>
                </>
              ) : null}
            </AnimatePresence>,
            portalTarget,
          )
        : null}
    </header>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return <IoHomeOutline className={className} />;
}

function InfoIcon({ className }: { className?: string }) {
  return <IoInformationCircleOutline className={className} />;
}

function SparkIcon({ className }: { className?: string }) {
  return <IoSparklesOutline className={className} />;
}

function BriefcaseIcon({ className }: { className?: string }) {
  return <IoBusinessOutline className={className} />;
}

function ImageIcon({ className }: { className?: string }) {
  return <IoImageOutline className={className} />;
}

function MailIcon({ className }: { className?: string }) {
  return <IoMailOutline className={className} />;
}

function BuilderMark({ className }: { className?: string }) {
  return <IoBusinessOutline className={className} />;
}

function MenuIcon({
  className,
}: {
  className?: string;
}) {
  return <IoMenuOutline className={className} />;
}

function isActiveLink(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
