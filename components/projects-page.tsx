"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { useDeferredValue, useMemo, useState, type ReactNode } from "react";
import {
  IoArrowForwardOutline,
  IoChevronForwardOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { makeHoverImage } from "./hover-image";

const heroImage =
  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=80";
const featuredImages = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
] as const;
const ctaImage =
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1800&q=80";

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

const staggerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const filters = [
  "All",
  "Residential",
  "Commercial",
  "Ongoing",
  "Completed",
  "Ready To Move",
] as const;

type Project = {
  name: string;
  location: string;
  type: "Residential" | "Commercial";
  status: "Completed" | "Ongoing" | "Ready To Move" | "New Launch";
  priceRange: string;
  area: string;
  bedrooms?: string;
  description: string;
  image: string;
};

const projects: Project[] = [
  {
    name: "Skyline Heights",
    location: "Bangalore",
    type: "Residential",
    status: "Completed",
    priceRange: "₹75 Lakhs – ₹1.2 Cr",
    area: "1200–2200 sq ft",
    bedrooms: "2–4 BHK",
    description:
      "Premium residences designed with spacious layouts, natural light, and long-term livability.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Emerald Towers",
    location: "Bangalore",
    type: "Residential",
    status: "Ongoing",
    priceRange: "₹90 Lakhs – ₹1.8 Cr",
    area: "1500–2600 sq ft",
    bedrooms: "2–4 BHK",
    description:
      "A contemporary tower with refined interiors, strong build quality, and future-ready design.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Urban Residency",
    location: "Bangalore",
    type: "Residential",
    status: "Ready To Move",
    priceRange: "₹65 Lakhs – ₹1.1 Cr",
    area: "1100–1900 sq ft",
    bedrooms: "2–3 BHK",
    description:
      "Move-in ready homes with practical planning, elegant finishes, and strong location access.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Business Square",
    location: "Whitefield, Bangalore",
    type: "Commercial",
    status: "Completed",
    priceRange: "₹2.5 Cr+",
    area: "2500–5400 sq ft",
    bedrooms: undefined,
    description:
      "Commercial spaces designed for business growth, visibility, and efficient operations.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Golden Avenue",
    location: "Mysore",
    type: "Residential",
    status: "New Launch",
    priceRange: "₹80 Lakhs+",
    area: "1300–2400 sq ft",
    bedrooms: "2–3 BHK",
    description:
      "A premium neighborhood address with timeless architecture and smart planning.",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Infinity Complex",
    location: "Electronic City, Bangalore",
    type: "Commercial",
    status: "Ongoing",
    priceRange: "₹3 Cr+",
    area: "3000–7000 sq ft",
    bedrooms: undefined,
    description:
      "A large-scale commercial complex tailored for growth-oriented businesses and high-value tenants.",
    image:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1600&q=80",
  },
];

const pricingPlans = [
  { type: "2 BHK", area: "1200 sq ft", price: "₹75 Lakhs", popular: false },
  { type: "3 BHK", area: "1600 sq ft", price: "₹95 Lakhs", popular: true },
  { type: "4 BHK", area: "2200 sq ft", price: "₹1.2 Cr", popular: false },
] as const;

const processSteps = [
  {
    title: "Planning",
    description: "We define scope, budget, approvals, and delivery roadmap.",
    image: makeHoverImage({
      title: "Planning",
      variant: "projects-process-planning",
      theme: "planning",
    }),
  },
  {
    title: "Design",
    description: "We shape a premium design language for the project vision.",
    image: makeHoverImage({
      title: "Design",
      variant: "projects-process-design",
      theme: "design",
    }),
  },
  {
    title: "Construction",
    description: "We execute with disciplined coordination and quality checks.",
    image: makeHoverImage({
      title: "Construction",
      variant: "projects-process-construction",
      theme: "construction",
    }),
  },
  {
    title: "Quality Check",
    description: "We review finish, safety, and readiness before handover.",
    image: makeHoverImage({
      title: "Quality Check",
      variant: "projects-process-quality-check",
      theme: "trust",
    }),
  },
  {
    title: "Delivery",
    description: "We complete the project with a structured and polished handoff.",
    image: makeHoverImage({
      title: "Delivery",
      variant: "projects-process-delivery",
      theme: "delivery",
    }),
  },
] as const;

const faqItems = [
  {
    question: "Are prices negotiable?",
    answer:
      "In some cases, pricing can vary based on unit selection, payment structure, and project stage. Our team can guide you with the available options.",
  },
  {
    question: "Is financing available?",
    answer:
      "Yes, financing assistance can be discussed based on the project and your preferred purchase structure.",
  },
  {
    question: "Can I schedule a site visit?",
    answer:
      "Absolutely. You can request a site visit and our team will coordinate availability and next steps.",
  },
  {
    question: "What documents are required?",
    answer:
      "Required documents depend on the project and purchase method. Our team can share a checklist during consultation.",
  },
] as const;

export function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [activeSlide, setActiveSlide] = useState(0);
  const [faqIndex, setFaqIndex] = useState<number | null>(0);

  const filteredProjects = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesFilter =
        activeFilter === "All" ||
        project.type === activeFilter ||
        project.status === activeFilter;

      const matchesSearch =
        query.length === 0 ||
        [
          project.name,
          project.location,
          project.type,
          project.status,
          project.priceRange,
          project.area,
          project.bedrooms ?? "",
          project.description,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, deferredSearch]);

  const featuredImageIndex = activeSlide % featuredImages.length;

  return (
    <div className="overflow-hidden bg-white text-slate-900">
      <HeroSection />
      <main>
        <FilterBar
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          search={search}
          setSearch={setSearch}
        />
        <ProjectsGrid projects={filteredProjects} />
        <FeaturedProject
          image={featuredImages[featuredImageIndex]}
          slideIndex={featuredImageIndex}
          onPrev={() =>
            setActiveSlide((current) => (current - 1 + featuredImages.length) % featuredImages.length)
          }
          onNext={() => setActiveSlide((current) => (current + 1) % featuredImages.length)}
        />
        <PricingSection />
        <ProcessSection />
        <FaqSection faqIndex={faqIndex} setFaqIndex={setFaqIndex} />
        <CtaSection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="overflow-hidden bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[60vh] w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.45em] text-blue-700">
            Home / Projects
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-[0.18em] text-slate-950 sm:text-5xl lg:text-7xl">
            OUR PROJECTS
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg lg:text-xl">
            Explore premium residential and commercial developments crafted for modern living.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-3 shadow-[0_24px_80px_rgba(37,99,235,0.08)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
            <Image
              src={heroImage}
              alt="Luxury residential building"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_45%,rgba(37,99,235,0.08)_100%)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FilterBar({
  activeFilter,
  setActiveFilter,
  search,
  setSearch,
}: {
  activeFilter: (typeof filters)[number];
  setActiveFilter: (value: (typeof filters)[number]) => void;
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <section className="z-30 bg-white px-4 pt-10 pb-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5">
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((filter) => {
            const active = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition duration-300",
                  active
                    ? "bg-blue-700 text-white shadow-lg shadow-blue-700/20"
                    : "border border-blue-100 bg-white text-slate-700 hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-700",
                ].join(" ")}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <label className="relative block w-full max-w-md">
          <span className="sr-only">Search projects</span>
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-blue-500">
            <SearchIcon className="h-5 w-5" />
          </span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-full border border-blue-100 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
          />
        </label>
      </div>
    </section>
  );
}

function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <SectionWrap>
      <motion.div
        variants={staggerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12 }}
      >
        <motion.div variants={sectionVariants} className="flex items-end justify-between gap-4">
          <div>
            <SectionEyebrow>Project Grid</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Premium Developments
            </h2>
          </div>
          <p className="hidden text-sm text-slate-500 sm:block">
            Showing {projects.length} projects
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </SectionWrap>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group rounded-[1.75rem] border border-transparent bg-gradient-to-br from-blue-100 via-white to-blue-50 p-[1px] shadow-[0_18px_60px_rgba(37,99,235,0.08)]"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[1.7rem] bg-white">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 1280px) 100vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.12)_0%,rgba(15,23,42,0.34)_100%)]" />
          <StatusBadge status={project.status} className="absolute left-5 top-5" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
                {project.name}
              </h3>
              <p className="mt-2 text-sm text-slate-500">{project.location}</p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
              {project.type}
            </span>
          </div>

          <div className="mt-5 grid gap-3 text-sm text-slate-600">
            <InfoRow label="Price Range" value={project.priceRange} />
            <InfoRow label="Area" value={project.area} />
            <InfoRow label="Bedrooms" value={project.bedrooms ?? "Commercial"} />
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-600">{project.description}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-blue-100 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
            >
              View Details
            </Link>
            <Link
              href="/contact"
              className="inline-flex flex-1 items-center justify-center rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800"
            >
              Book Visit
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function FeaturedProject({
  image,
  slideIndex,
  onPrev,
  onNext,
}: {
  image: string;
  slideIndex: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <SectionWrap>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-3 shadow-[0_24px_80px_rgba(37,99,235,0.08)]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={image}
                  alt="Featured project showcase"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.28)_100%)]" />

            <div className="absolute bottom-5 left-5 flex gap-2">
              <button
                type="button"
                onClick={onPrev}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-blue-700 shadow-lg shadow-blue-700/10 transition hover:-translate-y-0.5 hover:bg-white"
                aria-label="Previous featured image"
              >
                <ArrowIcon className="h-5 w-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={onNext}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-blue-700 shadow-lg shadow-blue-700/10 transition hover:-translate-y-0.5 hover:bg-white"
                aria-label="Next featured image"
              >
                <ArrowIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-xl">
          <SectionEyebrow>Featured Project</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Skyline Heights
          </h2>
          <div className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
            <KeyStat label="Price" value="Starting from ₹75 Lakhs" />
            <KeyStat label="Location" value="Bangalore" />
            <KeyStat label="Configuration" value="2 / 3 / 4 BHK" />
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
              Amenities
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {["Swimming Pool", "Clubhouse", "Gym", "Garden", "Parking"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_10px_30px_rgba(37,99,235,0.05)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-blue-100 bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Download Brochure
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800"
            >
              Schedule Visit
            </Link>
          </div>
        </div>
      </motion.div>
    </SectionWrap>
  );
}

function PricingSection() {
  return (
    <SectionWrap>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto max-w-4xl"
      >
        <SectionEyebrow>Pricing Plans</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Pricing Plans
        </h2>

        <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white shadow-[0_18px_60px_rgba(37,99,235,0.06)]">
          <table className="min-w-full divide-y divide-blue-100 text-left">
            <thead className="bg-blue-50/60">
              <tr>
                {["Type", "Area", "Price"].map((heading) => (
                  <th key={heading} className="px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {pricingPlans.map((row) => (
                <tr key={row.type} className={row.popular ? "bg-blue-50/60" : "bg-white"}>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-950">{row.type}</span>
                      {row.popular ? (
                        <span className="rounded-full bg-blue-700 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
                          Popular
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-600">{row.area}</td>
                  <td className="px-6 py-5 text-sm font-semibold text-slate-950">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </SectionWrap>
  );
}

function ProcessSection() {
  return (
    <SectionWrap>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionEyebrow>Project Process</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          How We Deliver
        </h2>

        <div className="relative mt-12">
          <div className="absolute left-6 top-6 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-blue-200 via-blue-300 to-blue-100 md:left-0 md:right-0 md:top-10 md:h-px md:w-auto" />

          <div className="grid items-stretch gap-8 md:grid-cols-5 md:gap-5">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                className="relative h-full"
              >
                <article className="group relative flex h-full min-h-[13.5rem] flex-col overflow-hidden rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-[0_16px_45px_rgba(37,99,235,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(37,99,235,0.12)]">
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 20vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.2)_0%,rgba(15,23,42,0.78)_100%)]" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white text-sm font-semibold text-blue-700 shadow-[0_12px_30px_rgba(37,99,235,0.1)] transition duration-300 group-hover:bg-white/15 group-hover:text-white">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <h3 className="pt-1 text-lg font-semibold text-slate-950 transition-colors duration-300 group-hover:text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600 transition-colors duration-300 group-hover:text-blue-50">
                      {step.description}
                    </p>
                  </div>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </SectionWrap>
  );
}

function FaqSection({
  faqIndex,
  setFaqIndex,
}: {
  faqIndex: number | null;
  setFaqIndex: (value: number | null) => void;
}) {
  return (
    <SectionWrap>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-4xl"
      >
        <SectionEyebrow>FAQ</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Frequently Asked Questions
        </h2>

        <div className="mt-10 space-y-4">
          {faqItems.map((item, index) => {
            const open = faqIndex === index;

            return (
              <motion.div
                key={item.question}
                layout
                className="overflow-hidden rounded-[1.5rem] border border-blue-100 bg-white shadow-[0_16px_48px_rgba(37,99,235,0.05)]"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setFaqIndex(open ? null : index)}
                >
                  <span className="text-base font-semibold text-slate-950 sm:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={[
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-100 text-blue-700 transition duration-300",
                      open ? "bg-blue-50 rotate-180" : "bg-white",
                    ].join(" ")}
                  >
                    <ChevronIcon className="h-5 w-5" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-sm leading-7 text-slate-600 sm:text-base">
                        {item.answer}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </SectionWrap>
  );
}

function CtaSection() {
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-16 text-white shadow-[0_30px_90px_rgba(37,99,235,0.16)] sm:px-10 lg:px-16 lg:py-20"
        >
          <Image
            src={ctaImage}
            alt="Premium architecture background"
            fill
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.9)_0%,rgba(15,23,42,0.74)_55%,rgba(15,23,42,0.92)_100%)]" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <SectionEyebrow className="text-blue-200">Get In Touch</SectionEyebrow>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Find Your Perfect Property
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                Connect with our team and schedule your visit.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
              >
                Contact Us
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-blue-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800"
              >
                Book Site Visit
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionWrap({ children }: { children: ReactNode }) {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

function SectionEyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-sm font-semibold uppercase tracking-[0.35em] text-blue-700 ${className}`}>
      {children}
    </p>
  );
}

function StatusBadge({
  status,
  className = "",
}: {
  status: Project["status"];
  className?: string;
}) {
  const tone =
    status === "Completed"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : status === "Ongoing"
        ? "bg-amber-50 text-amber-700 ring-amber-100"
        : status === "Ready To Move"
          ? "bg-blue-50 text-blue-700 ring-blue-100"
          : "bg-slate-100 text-slate-700 ring-slate-200";

  return (
    <span
      className={[
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] ring-1",
        tone,
        className,
      ].join(" ")}
    >
      {status}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-blue-50 pb-3 last:border-b-0 last:pb-0">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-950">{value}</span>
    </div>
  );
}

function KeyStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] border border-blue-100 bg-white p-4 shadow-[0_12px_35px_rgba(37,99,235,0.05)]">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">{label}</p>
      <p className="mt-2 text-sm font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return <IoSearchOutline className={className} />;
}

function ArrowIcon({ className }: { className?: string }) {
  return <IoArrowForwardOutline className={className} />;
}

function ChevronIcon({ className }: { className?: string }) {
  return <IoChevronForwardOutline className={className} />;
}
