import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-blue-100 bg-blue-50/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 text-center sm:px-6 lg:grid-cols-4 lg:px-8">
        <section className="flex flex-col items-center">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
            About
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
            Builder is a simple website designed with a clean blue theme and
            placeholder pages for future content.
          </p>
        </section>

        <nav aria-label="Quick Links" className="flex flex-col items-center">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link className="transition-colors hover:text-blue-700" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="flex flex-col items-center">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Email: hello@builder.com</li>
            <li>Phone: +1 (000) 000-0000</li>
            <li>Location: Your City, Country</li>
          </ul>
        </section>

        <section className="flex flex-col items-center">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
            Social Links
          </h2>
          <ul className="mt-4 flex items-center justify-center gap-4 text-sm text-slate-600">
            <li>
              <a
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-700 transition-transform transition-colors hover:-translate-y-0.5 hover:bg-blue-600 hover:text-white"
                href="#"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-700 transition-transform transition-colors hover:-translate-y-0.5 hover:bg-blue-600 hover:text-white"
                href="#"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-200 bg-white text-blue-700 transition-transform transition-colors hover:-translate-y-0.5 hover:bg-blue-600 hover:text-white"
                href="#"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="border-t border-blue-100">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Content coming soon.</p>
          <p>&copy; 2026 Builder</p>
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.5 21v-7h2.4l.4-3H13.5V9.1c0-.9.3-1.5 1.6-1.5h1.2V5a17 17 0 0 0-2-.1c-2 0-3.4 1.2-3.4 3.5V11H8.4v3H11v7h2.5Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M6.5 9H4v11h2.5V9ZM5.25 4.25A1.5 1.5 0 1 0 5.25 7a1.5 1.5 0 0 0 0-2.75ZM20 20h-2.5v-5.3c0-1.3-.1-2.9-1.9-2.9s-2.2 1.5-2.2 2.8V20H11V9h2.4v1.5h.1c.3-.7 1.3-1.7 3-1.7 2.6 0 3.5 1.7 3.5 4.4V20Z" />
    </svg>
  );
}
