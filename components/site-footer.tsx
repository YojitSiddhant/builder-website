import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";
import {
  IoBusinessOutline,
  IoHomeOutline,
  IoImageOutline,
  IoInformationCircleOutline,
  IoMailOutline,
  IoSparklesOutline,
} from "react-icons/io5";

const quickLinks = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/about", label: "About", icon: InfoIcon },
  { href: "/services", label: "Services", icon: SparkIcon },
  { href: "/projects", label: "Projects", icon: BriefcaseIcon },
  { href: "/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/contact", label: "Contact", icon: MailIcon },
  { href: "/admin/visits", label: "Visits Admin", icon: BriefcaseIcon },
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
                <Link
                  className="inline-flex items-center justify-center gap-2 transition-colors hover:text-blue-700"
                  href={link.href}
                >
                  <link.icon className="h-4 w-4 shrink-0" />
                  <span>{link.label}</span>
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
            <li>Email: contact@example.com</li>
            <li>Phone: +91 94250 80418</li>
            <li>Location: 219, E-3, Arera Colony, Bhopal, Madhya Pradesh 462016</li>
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
          <p>
            Design and developed by{" "}
            <a
              href="https://techvantalabs.com/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-blue-700 transition-colors hover:text-blue-900"
            >
              TechVanta Labs
            </a>
          </p>
          <p>&copy; 2026 TechVanta Labs Pvt Ltd. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return <FaFacebookF className={className} />;
}

function InstagramIcon({ className }: { className?: string }) {
  return <FaInstagram className={className} />;
}

function LinkedInIcon({ className }: { className?: string }) {
  return <FaLinkedinIn className={className} />;
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
