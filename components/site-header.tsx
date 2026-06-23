"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
