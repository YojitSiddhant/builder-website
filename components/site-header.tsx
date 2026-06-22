"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl">
      <div className="relative mx-auto flex w-full max-w-6xl min-w-0 items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] text-blue-700"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 leading-none text-white">
            <BuilderMark className="block h-5 w-5" />
          </span>
          Builder
        </Link>

        <nav aria-label="Primary" className="hidden justify-self-center lg:block">
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

        <details className="group relative lg:hidden">
          <summary
            className="inline-flex h-11 w-11 list-none items-center justify-center rounded-full border border-blue-100 bg-white text-blue-700 shadow-sm transition hover:bg-blue-50 [&::-webkit-details-marker]:hidden"
            aria-label="Toggle navigation"
          >
            <MenuIcon className="h-5 w-5" />
          </summary>

          <div className="absolute left-0 right-0 top-full z-50 mt-3 hidden max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-[1.5rem] border border-blue-100 bg-white p-3 shadow-[0_20px_50px_rgba(37,99,235,0.14)] group-open:block lg:hidden">
            <nav aria-label="Mobile Primary">
              <ul className="grid gap-2">
                {links.map((link) => {
                  const Icon = link.icon;
                  const isActive = isActiveLink(pathname, link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={[
                          "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.2)]"
                            : "text-blue-700 hover:bg-blue-50 hover:text-blue-900",
                        ].join(" ")}
                      >
                        <Icon className={["h-4 w-4 shrink-0", isActive ? "opacity-100" : "opacity-70"].join(" ")} />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </details>

        <div aria-hidden="true" className="hidden lg:block" />
      </div>
    </header>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4 11.5 12 4l8 7.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 10.25V20h11V10.25"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 10.25V16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7.75" r="1" fill="currentColor" />
    </svg>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 3.5 13.9 9l5.5 1.9-5.5 1.9L12 18.3 10.1 12.8 4.6 10.9l5.5-1.9L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M9 6.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect x="4" y="6.5" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M4 12h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8.5 11.5 11 14l2.25-2.25L16.5 16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="9" r="1.2" fill="currentColor" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m5.5 7.5 6.5 5 6.5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BuilderMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M7 5.5h6.1a3 3 0 0 1 0 6H7v-6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M7 12.5h6.7a3.1 3.1 0 1 1 0 6.2H7v-6.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function isActiveLink(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
