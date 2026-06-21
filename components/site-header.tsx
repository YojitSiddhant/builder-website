"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.35em] text-blue-700"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            B
          </span>
          Builder
        </Link>

        <nav aria-label="Primary" className="justify-self-center overflow-x-auto">
          <ul className="flex min-w-max items-center gap-2 text-sm font-medium text-blue-700">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === link.href
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "inline-flex items-center rounded-full px-4 py-2 transition-colors",
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-blue-700 hover:bg-blue-50 hover:text-blue-900",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div aria-hidden="true" />
      </div>
    </header>
  );
}
