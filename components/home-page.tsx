"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

const heroSlides = [
  {
    title: "Luxury Building",
    eyebrow: "Residential Excellence",
    image: "/home/slide-luxury-building.svg",
  },
  {
    title: "Modern Apartment",
    eyebrow: "Urban Living",
    image: "/home/slide-modern-apartment.svg",
  },
  {
    title: "Commercial Tower",
    eyebrow: "Business Destinations",
    image: "/home/slide-commercial-tower.svg",
  },
  {
    title: "Interior Architecture",
    eyebrow: "Refined Details",
    image: "/home/slide-interior-architecture.svg",
  },
] as const;

const introValues = [
  {
    title: "Quality",
    description: "Superior materials and careful execution from foundation to finish.",
  },
  {
    title: "Transparency",
    description: "Clear communication, honest timelines, and dependable delivery.",
  },
  {
    title: "Innovation",
    description: "Future-ready spaces shaped by modern design thinking.",
  },
] as const;

const projects = [
  {
    name: "Skyline Heights",
    location: "Sector 62, Noida",
    status: "Ready to Move",
    image: "/home/project-skyline-heights.svg",
  },
  {
    name: "Emerald Towers",
    location: "Whitefield, Bengaluru",
    status: "Under Construction",
    image: "/home/project-emerald-towers.svg",
  },
  {
    name: "Urban Residency",
    location: "Andheri West, Mumbai",
    status: "New Launch",
    image: "/home/project-urban-residency.svg",
  },
] as const;

const trustFeatures = [
  {
    title: "Premium Quality",
    description: "Strong structures, thoughtful detailing, and premium finishes throughout.",
  },
  {
    title: "On-Time Delivery",
    description: "Disciplined scheduling and execution that respects your milestones.",
  },
  {
    title: "Modern Architecture",
    description: "Elegant spaces planned for light, function, and long-term value.",
  },
  {
    title: "Customer Satisfaction",
    description: "A relationship-first approach with support that continues after handover.",
  },
] as const;

const services = [
  {
    title: "Residential",
    description: "Apartments, villas, and gated communities designed for everyday comfort.",
  },
  {
    title: "Commercial",
    description: "Workplaces, retail spaces, and mixed-use developments built to perform.",
  },
  {
    title: "Renovation",
    description: "Transformations that upgrade value while preserving structural integrity.",
  },
  {
    title: "Interior Design",
    description: "Refined interior planning that balances luxury, flow, and usability.",
  },
] as const;

const processSteps = [
  {
    number: "01",
    title: "Consultation",
    description: "We understand your goals, budget, and site requirements in detail.",
  },
  {
    number: "02",
    title: "Planning",
    description: "We map the project with architectural and execution clarity.",
  },
  {
    number: "03",
    title: "Construction",
    description: "Skilled teams deliver the build with care and consistent oversight.",
  },
  {
    number: "04",
    title: "Delivery",
    description: "The final handover is clean, documented, and ready for occupancy.",
  },
] as const;

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Homeowner",
    rating: 5,
    review:
      "They delivered exactly what they promised. The quality, communication, and finish exceeded our expectations.",
    image: "/home/avatar-aarav.svg",
  },
  {
    name: "Priya Nair",
    role: "Investor",
    rating: 5,
    review:
      "Professional from start to finish. The team kept every milestone clear and the project looked exceptional at handover.",
    image: "/home/avatar-priya.svg",
  },
  {
    name: "Rohan Kapoor",
    role: "Business Owner",
    rating: 5,
    review:
      "A dependable builder with a premium approach. The commercial space came together beautifully and on schedule.",
    image: "/home/avatar-rohan.svg",
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
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);

  useEffect(() => {
    if (heroPaused) return;

    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [heroPaused]);

  useEffect(() => {
    if (testimonialPaused) return;

    const timer = window.setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [testimonialPaused]);

  return (
    <div className="-mt-8 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.45),_transparent_40%),linear-gradient(180deg,_#ffffff_0%,_#f4f8ff_42%,_#ffffff_100%)] text-slate-900">
      <HeroSection
        activeSlide={heroIndex}
        setActiveSlide={setHeroIndex}
        paused={heroPaused}
        setPaused={setHeroPaused}
      />
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-24 px-4 py-24 sm:px-6 lg:px-8">
        <IntroSection />
        <FeaturedProjects />
        <TrustSection />
        <ServicesSection />
        <ProcessSection />
        <TestimonialsSection
          activeIndex={testimonialIndex}
          setActiveIndex={setTestimonialIndex}
          paused={testimonialPaused}
          setPaused={setTestimonialPaused}
        />
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
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-white text-slate-900 shadow-[0_35px_90px_rgba(37,99,235,0.1)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[100svh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.image}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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

        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-7xl flex-col justify-center gap-12 px-4 py-20 sm:px-6 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-700 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Premium Builder & Realty
            </div>

            <motion.h1
              id="home-hero-title"
              className="mt-8 text-5xl font-semibold leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl xl:text-8xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              BUILDING TOMORROW,
              <span className="block text-blue-100">DELIVERING TRUST</span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-2xl text-lg leading-8 text-blue-50 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
            >
              Premium residential and commercial spaces designed for modern living.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col gap-4 sm:flex-row"
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

          <div className="flex items-end justify-start lg:justify-end">
            <motion.div
              className="w-full max-w-md rounded-[2rem] border border-blue-100 bg-white/95 p-6 shadow-2xl shadow-blue-900/10 backdrop-blur-xl sm:p-8"
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-600">
                    Experience
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">Building with confidence</p>
                </div>
                <div className="rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-right">
                  <p className="text-xs uppercase tracking-[0.28em] text-blue-500">Live</p>
                  <p className="text-sm font-medium text-slate-900">{slide.eyebrow}</p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4">
                {[
                  { value: "10+", label: "Years Experience" },
                  { value: "150+", label: "Projects" },
                  { value: "500+", label: "Happy Clients" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-sm"
                  >
                    <div className="flex items-end justify-between gap-4">
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
          <div className="hidden rounded-full border border-blue-100 bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-blue-600 backdrop-blur md:inline-flex">
            {slide.title}
          </div>
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

        <div className="absolute right-6 top-24 hidden rounded-full border border-blue-100 bg-white/90 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-blue-600 backdrop-blur md:block">
          Pause on hover
        </div>

        {paused ? (
          <div className="pointer-events-none absolute inset-0 bg-white/5" aria-hidden="true" />
        ) : null}
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <SectionShell eyebrow="Who We Are" title="Crafting Landmarks That Inspire">
      <p className="mx-auto max-w-3xl text-center text-base leading-8 text-slate-600 sm:text-lg">
        We create modern residential and commercial developments with quality construction,
        thoughtful planning, and timely delivery.
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
            className="group rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.1)]"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition-transform duration-300 group-hover:scale-105">
              <div className="h-6 w-6 rounded-lg border-2 border-current" />
            </div>
            <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

function FeaturedProjects() {
  return (
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
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900">
                {project.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{project.location}</p>
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
  );
}

function TrustSection() {
  return (
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
            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <div className="h-5 w-5 rounded-full border-2 border-current" />
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-slate-900">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

function ServicesSection() {
  return (
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
            className="group rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#fbf8f3_100%)] p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)] transition-shadow duration-300 hover:shadow-[0_28px_60px_rgba(15,23,42,0.1)]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition-transform duration-300 group-hover:scale-105">
              <ServiceGlyph index={index} />
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-slate-900">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

function ProcessSection() {
  return (
    <SectionShell eyebrow="Process" title="Our Process">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {processSteps.map((step, index) => (
          <motion.div
            key={step.number}
            variants={sectionReveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: index * 0.1 }}
            className="relative rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.05)]"
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
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-semibold text-white">
              {step.number}
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-slate-900">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

function TestimonialsSection({
  activeIndex,
  setActiveIndex,
  paused,
  setPaused,
}: {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  paused: boolean;
  setPaused: Dispatch<SetStateAction<boolean>>;
}) {
  const testimonial = testimonials[activeIndex];

  return (
    <SectionShell eyebrow="Reviews" title="What Clients Say">
      <div
        className="relative overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonial.name}
            className="grid gap-8 lg:grid-cols-[auto,1fr]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex justify-center lg:justify-start">
              <div className="relative h-28 w-28 overflow-hidden rounded-full ring-8 ring-blue-100">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-3 flex items-center gap-1 text-blue-500">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <StarIcon key={index} className="h-5 w-5" />
                ))}
              </div>
              <p className="text-xl leading-8 text-slate-700 sm:text-2xl">
                {testimonial.review}
              </p>
              <div className="mt-6">
                <p className="text-lg font-semibold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {testimonials.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-label={`Show testimonial from ${item.name}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={[
                "h-2.5 rounded-full transition-all duration-300",
                index === activeIndex ? "w-10 bg-blue-600" : "w-2.5 bg-blue-200 hover:bg-blue-400",
              ].join(" ")}
            />
          ))}
        </div>

        {paused ? (
          <div className="pointer-events-none absolute inset-0 bg-white/5" aria-hidden="true" />
        ) : null}
      </div>
    </SectionShell>
  );
}

function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden rounded-none bg-blue-950 text-white"
    >
      <div className="absolute inset-0">
        <Image
          src="/home/cta-banner.svg"
          alt="Dream project background"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,_rgba(30,64,175,0.86)_0%,_rgba(37,99,235,0.66)_55%,_rgba(255,255,255,0.18)_100%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-100">
          Start your next chapter
        </p>
        <h2
          id="final-cta-title"
          className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl"
        >
          Ready To Build Your Dream Project?
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-blue-700 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
          >
            Book Consultation
          </Link>
          <a
            href="tel:+10000000000"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/15"
          >
            Call Now
          </a>
        </div>
      </div>
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
      <div className="mb-10 flex flex-col gap-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700">
          {eyebrow}
        </p>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-4xl lg:mx-0 lg:text-5xl">
            {title}
          </h2>
          {action ? <div className="flex justify-center lg:justify-end">{action}</div> : null}
        </div>
      </div>
      <div className="space-y-8">{children}</div>
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

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9L12 2.5Z" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <path
        d={direction === "left" ? "M14.5 6.5 9 12l5.5 5.5" : "M9.5 6.5 15 12l-5.5 5.5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HouseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4.5 11.25 12 4.5l7.5 6.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 10.75V19.5h11V10.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TowerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="7" y="3.5" width="10" height="17" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 6.5h4M10 10h4M10 13.5h4M10 17h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HammerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="m14 4 6 6-2 2-3-3-6.3 6.3a2 2 0 0 1-2.8 0l-.2-.2 8.1-8.1-2-2 2.2-2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PenToolIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4.5 18.5 16.2 6.8a2 2 0 0 1 2.8 0l-5.2 5.2 2.7 2.7-4 4H6.5l-2 2-1-2.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
