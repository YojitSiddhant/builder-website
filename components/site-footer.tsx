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
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
            About
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
            Builder is a simple website designed with a clean blue theme and
            placeholder pages for future content.
          </p>
        </section>

        <nav aria-label="Quick Links">
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

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Email: hello@builder.com</li>
            <li>Phone: +1 (000) 000-0000</li>
            <li>Location: Your City, Country</li>
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
            Social Links
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>
              <a className="transition-colors hover:text-blue-700" href="#" aria-label="Facebook">
                Facebook
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-blue-700" href="#" aria-label="Instagram">
                Instagram
              </a>
            </li>
            <li>
              <a className="transition-colors hover:text-blue-700" href="#" aria-label="LinkedIn">
                LinkedIn
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="border-t border-blue-100">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Content coming soon.</p>
          <p>&copy; 2026 Builder</p>
        </div>
      </div>
    </footer>
  );
}
