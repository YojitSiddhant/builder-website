"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FaHandshake } from "react-icons/fa6";
import {
  IoBusinessOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoHammerOutline,
  IoEyeOutline,
  IoHomeOutline,
  IoLayersOutline,
  IoMedalOutline,
  IoPencilOutline,
  IoShieldCheckmarkOutline,
  IoSparklesOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { makeHoverImage } from "./hover-image";

const heroSlides = [
  {
    title: "Luxury Building",
    eyebrow: "Residential Excellence",
    headingTop: "BUILDING TOMORROW,",
    headingBottom: "DELIVERING TRUST",
    description: "Premium residential and commercial spaces designed for modern living.",
    cardLabel: "Live",
    cardTitle: "Building with confidence",
    statValue: "10+",
    statLabel: "Years Experience",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Modern Apartment",
    eyebrow: "Urban Living",
    headingTop: "SMART SPACES,",
    headingBottom: "ELEVATED LIVING",
    description: "Contemporary homes with natural light, efficient layouts, and city-ready comfort.",
    cardLabel: "Live",
    cardTitle: "Designed for modern life",
    statValue: "150+",
    statLabel: "Homes Delivered",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Commercial Tower",
    eyebrow: "Business Destinations",
    headingTop: "SPACES THAT GROW",
    headingBottom: "BUSINESS VALUE",
    description: "Commercial developments planned for visibility, performance, and long-term returns.",
    cardLabel: "Live",
    cardTitle: "Built for business growth",
    statValue: "24/7",
    statLabel: "Operational Impact",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Interior Architecture",
    eyebrow: "Refined Details",
    headingTop: "INTERIORS THAT FEEL",
    headingBottom: "POLISHED AND WARM",
    description: "Beautifully detailed interiors that balance elegance, function, and comfort.",
    cardLabel: "Live",
    cardTitle: "Crafted interior detail",
    statValue: "1:1",
    statLabel: "Design Balance",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

const introValues = [
  {
    title: "Quality",
    description: "Superior materials and careful execution from foundation to finish.",
    icon: ShieldCheckIcon,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Transparency",
    description: "Clear communication, honest timelines, and dependable delivery.",
    icon: EyeIcon,
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Innovation",
    description: "Future-ready spaces shaped by modern design thinking.",
    icon: SparkIcon,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

const projects = [
  {
    name: "Skyline Heights",
    location: "Sector 62, Noida",
    status: "Ready to Move",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Emerald Towers",
    location: "Whitefield, Bengaluru",
    status: "Under Construction",
    image:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Urban Residency",
    location: "Andheri West, Mumbai",
    status: "New Launch",
    image:
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

const trustFeatures = [
  {
    title: "Premium Quality",
    description: "Strong structures, thoughtful detailing, and premium finishes throughout.",
    icon: MedalIcon,
    image: makeHoverImage({
      title: "Premium Quality",
      variant: "home-trust-premium-quality",
      theme: "trust",
    }),
  },
  {
    title: "On-Time Delivery",
    description: "Disciplined scheduling and execution that respects your milestones.",
    icon: ClockIcon,
    image: makeHoverImage({
      title: "On-Time Delivery",
      variant: "home-trust-on-time-delivery",
      theme: "delivery",
    }),
  },
  {
    title: "Modern Architecture",
    description: "Elegant spaces planned for light, function, and long-term value.",
    icon: BlueprintIcon,
    image: makeHoverImage({
      title: "Modern Architecture",
      variant: "home-trust-modern-architecture",
      theme: "design",
    }),
  },
  {
    title: "Customer Satisfaction",
    description: "A relationship-first approach with support that continues after handover.",
    icon: HeartHandshakeIcon,
    image: makeHoverImage({
      title: "Customer Satisfaction",
      variant: "home-trust-customer-satisfaction",
      theme: "values",
    }),
  },
] as const;

const services = [
  {
    title: "Residential",
    description: "Apartments, villas, and gated communities designed for everyday comfort.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Commercial",
    description: "Workplaces, retail spaces, and mixed-use developments built to perform.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Renovation",
    description: "Transformations that upgrade value while preserving structural integrity.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Interior Design",
    description: "Refined interior planning that balances luxury, flow, and usability.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

const processSteps = [
  {
    number: "01",
    title: "Consultation",
    description: "We understand your goals, budget, and site requirements in detail.",
    image: makeHoverImage({
      title: "Consultation",
      variant: "home-process-consultation",
      theme: "team",
    }),
  },
  {
    number: "02",
    title: "Planning",
    description: "We map the project with architectural and execution clarity.",
    image: makeHoverImage({
      title: "Planning",
      variant: "home-process-planning",
      theme: "planning",
    }),
  },
  {
    number: "03",
    title: "Construction",
    description: "Skilled teams deliver the build with care and consistent oversight.",
    image: makeHoverImage({
      title: "Construction",
      variant: "home-process-construction",
      theme: "construction",
    }),
  },
  {
    number: "04",
    title: "Delivery",
    description: "The final handover is clean, documented, and ready for occupancy.",
    image: makeHoverImage({
      title: "Delivery",
      variant: "home-process-delivery",
      theme: "delivery",
    }),
  },
] as const;

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
} as const;

export function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  useEffect(() => {
    if (heroPaused) return;

    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [heroPaused]);

  return (
    <div className="-mt-8 overflow-x-clip bg-white text-slate-900">
      <HeroSection
        activeSlide={heroIndex}
        setActiveSlide={setHeroIndex}
        paused={heroPaused}
        setPaused={setHeroPaused}
      />
      <main className="flex w-full flex-col">
        <IntroSection />
        <FeaturedProjects />
        <TrustSection />
        <ServicesSection />
        <ProcessSection />
        <FinalCta />
      </main>
    </div>
  );
}

function HeroSection({
  activeSlide,
  setActiveSlide,
  paused,
  setPaused,
}: {
  activeSlide: number;
  setActiveSlide: Dispatch<SetStateAction<number>>;
  paused: boolean;
  setPaused: Dispatch<SetStateAction<boolean>>;
}) {
  const slide = heroSlides[activeSlide];

  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative w-full overflow-hidden bg-blue-950 text-slate-900 shadow-[0_35px_90px_rgba(37,99,235,0.1)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[100svh]">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={slide.image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(16,72,162,0.78)_0%,_rgba(37,99,235,0.4)_45%,_rgba(255,255,255,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.7),_transparent_34%)]" />

        <div className="relative mx-auto flex min-h-[88svh] w-full max-w-7xl flex-col justify-center gap-10 px-4 py-12 sm:px-6 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              id="home-hero-title"
              className="mt-8 text-5xl font-semibold leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl xl:text-8xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {slide.headingTop}
              <span className="block text-blue-100">{slide.headingBottom}</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-blue-50 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
            >
              {slide.description}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: "easeOut" }}
            >
              <Link
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Explore Projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/90 px-7 py-4 text-sm font-semibold text-blue-700 backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>

          <div className="flex items-end justify-center lg:justify-end">
            <motion.div
              className="w-full max-w-md rounded-[2rem] border border-blue-100 bg-white/95 p-6 text-center shadow-2xl shadow-blue-900/10 backdrop-blur-xl sm:p-8"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
            >
              <div className="flex flex-col items-center gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
                    {slide.eyebrow}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{slide.cardTitle}</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4">
                {[
                  { value: slide.statValue, label: slide.statLabel },
                  { value: slide.title === "Commercial Tower" ? "150+" : "500+", label: slide.title === "Commercial Tower" ? "Corporate Sites" : slide.title === "Interior Architecture" ? "Design Touchpoints" : "Projects" },
                  { value: slide.title === "Modern Apartment" ? "500+" : "24/7", label: slide.title === "Modern Apartment" ? "Happy Residents" : slide.title === "Interior Architecture" ? "Finishing Precision" : "Support" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-blue-100 bg-white px-5 py-4 text-center shadow-sm"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-3xl font-semibold text-blue-700">{item.value}</p>
                      <p className="text-sm text-slate-500">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-8 z-20 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="ml-auto flex items-center gap-3">
            <ArrowButton
              direction="left"
              onClick={() =>
                setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length)
              }
            />
            <ArrowButton
              direction="right"
              onClick={() => setActiveSlide((current) => (current + 1) % heroSlides.length)}
            />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-20 z-20 mx-auto flex w-full max-w-7xl items-center justify-center gap-3 px-4 sm:px-6 lg:px-8">
          {heroSlides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Show slide ${index + 1}: ${item.title}`}
              aria-pressed={index === activeSlide}
              onClick={() => setActiveSlide(index)}
              className={[
                "h-2.5 rounded-full transition-all duration-300",
                index === activeSlide ? "w-10 bg-blue-600" : "w-2.5 bg-blue-200 hover:bg-blue-400",
              ].join(" ")}
            />
          ))}
        </div>

        {paused ? <div className="pointer-events-none absolute inset-0 bg-white/5" aria-hidden="true" /> : null}
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <SectionBand>
      <SectionShell eyebrow="Who We Are" title="Crafting Landmarks That Inspire">
        <p className="mx-auto max-w-3xl text-center text-base leading-8 text-slate-600 sm:text-lg">
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {introValues.map((item, index) => (
            <motion.div
              key={item.title}
              variants={sectionReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)]"
            >
              <div className="absolute inset-0 opacity-0 transition duration-500 ease-out group-hover:opacity-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover scale-105 transition-transform duration-700 ease-out group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.12)_0%,rgba(15,23,42,0.78)_100%)] transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div className="relative z-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition-all duration-300 group-hover:scale-105 group-hover:bg-white/15 group-hover:text-white">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900 transition-colors duration-300 group-hover:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 transition-colors duration-300 group-hover:text-blue-50">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionShell>
    </SectionBand>
  );
}

function FeaturedProjects() {
  return (
    <SectionBand>
      <SectionShell
        id="projects"
        eyebrow="Portfolio"
        title="Our Featured Developments"
        action={
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-full border border-blue-100 bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
          >
            View All Projects
          </Link>
        }
      >
        <div className="grid gap-7 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              variants={sectionReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(4,9,18,0.05)_0%,_rgba(4,9,18,0.55)_100%)]" />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
                  {project.status}
                </span>
              </div>

              <div className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">{project.location}</p>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <BuildingIcon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </SectionShell>
    </SectionBand>
  );
}

function TrustSection() {
  return (
    <SectionBand>
      <SectionShell eyebrow="Why Us" title="Why Homeowners Trust Us">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trustFeatures.map((item, index) => (
            <motion.div
              key={item.title}
              variants={sectionReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)]"
            >
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.18)_0%,rgba(15,23,42,0.75)_100%)]" />
              </div>
              <div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white transition duration-300 group-hover:bg-white/15">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-slate-900 transition-colors duration-300 group-hover:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 transition-colors duration-300 group-hover:text-blue-50">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionShell>
    </SectionBand>
  );
}

function ServicesSection() {
  return (
    <SectionBand>
      <SectionShell eyebrow="Services" title="What We Build">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((item, index) => (
            <motion.div
              key={item.title}
              variants={sectionReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#fbf8f3_100%)] p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(15,23,42,0.1)]"
            >
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.22)_0%,rgba(15,23,42,0.78)_100%)]" />
              </div>
              <div className="relative z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition-transform duration-300 group-hover:scale-105 group-hover:bg-white/15 group-hover:text-white">
                  <ServiceGlyph index={index} />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-slate-900 transition-colors duration-300 group-hover:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 transition-colors duration-300 group-hover:text-blue-50">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionShell>
    </SectionBand>
  );
}

function ProcessSection() {
  return (
    <SectionBand>
      <SectionShell eyebrow="Process" title="Our Process">
        <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={sectionReveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.1 }}
              className="relative h-full"
            >
              {index < processSteps.length - 1 ? (
                <motion.span
                  aria-hidden="true"
                  className="absolute right-[-1.5rem] top-1/2 hidden h-px w-12 origin-left bg-gradient-to-r from-blue-300 via-blue-500 to-transparent xl:block"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.8, delay: 0.15 + index * 0.1 }}
                />
              ) : null}
              <article className="group relative flex h-full min-h-[13.5rem] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)]">
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.2)_0%,rgba(15,23,42,0.78)_100%)]" />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-semibold text-white transition duration-300 group-hover:bg-white/15">
                    {step.number}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-slate-900 transition-colors duration-300 group-hover:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 transition-colors duration-300 group-hover:text-blue-50">
                    {step.description}
                  </p>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </SectionShell>
    </SectionBand>
  );
}

function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative w-full overflow-hidden rounded-none bg-white text-slate-900"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(219,234,254,0.55),_transparent_40%),linear-gradient(180deg,_#ffffff_0%,_#f8fbff_100%)]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700">
          Start your next chapter
        </p>
        <h2
          id="final-cta-title"
          className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl text-slate-900"
        >
          Ready To Build Your Dream Project?
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-4 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Book Consultation
          </Link>
          <a
            href="tel:+10000000000"
            className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-7 py-4 text-sm font-semibold text-blue-700 backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
          >
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionBand({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section
      className="relative w-full bg-white"
    >
      <div className="mx-auto w-full px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14 xl:px-16">{children}</div>
    </section>
  );
}

function SectionShell({
  eyebrow,
  title,
  children,
  id,
  action,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  id?: string;
  action?: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-8 flex flex-col gap-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700">
          {eyebrow}
        </p>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {action ? <div className="flex justify-center lg:justify-end">{action}</div> : null}
        </div>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Previous slide" : "Next slide"}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/10 text-white backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/20"
    >
      <ChevronIcon direction={direction} />
    </button>
  );
}

function ServiceGlyph({ index }: { index: number }) {
  switch (index) {
    case 0:
      return <HouseIcon className="h-6 w-6" />;
    case 1:
      return <TowerIcon className="h-6 w-6" />;
    case 2:
      return <HammerIcon className="h-6 w-6" />;
    default:
      return <PenToolIcon className="h-6 w-6" />;
  }
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return <IoShieldCheckmarkOutline className={className} />;
}

function EyeIcon({ className }: { className?: string }) {
  return <IoEyeOutline className={className} />;
}

function SparkIcon({ className }: { className?: string }) {
  return <IoSparklesOutline className={className} />;
}

function MedalIcon({ className }: { className?: string }) {
  return <IoMedalOutline className={className} />;
}

function ClockIcon({ className }: { className?: string }) {
  return <IoTimeOutline className={className} />;
}

function BlueprintIcon({ className }: { className?: string }) {
  return <IoLayersOutline className={className} />;
}

function HeartHandshakeIcon({ className }: { className?: string }) {
  return <FaHandshake className={className} />;
}

function BuildingIcon({ className }: { className?: string }) {
  return <IoBusinessOutline className={className} />;
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return direction === "left" ? (
    <IoChevronBackOutline className="h-5 w-5" />
  ) : (
    <IoChevronForwardOutline className="h-5 w-5" />
  );
}

function HouseIcon({ className }: { className?: string }) {
  return <IoHomeOutline className={className} />;
}

function TowerIcon({ className }: { className?: string }) {
  return <IoBusinessOutline className={className} />;
}

function HammerIcon({ className }: { className?: string }) {
  return <IoHammerOutline className={className} />;
}

function PenToolIcon({ className }: { className?: string }) {
  return <IoPencilOutline className={className} />;
}
