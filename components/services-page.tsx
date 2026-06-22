"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { useState, type ReactNode } from "react";

const heroImage =
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=80";
const servicesImages = [
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80",
] as const;
const ctaImage =
  "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1800&q=80";

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

const services = [
  {
    title: "Residential Construction",
    description:
      "Premium homes designed for comfort, functionality, and long-term value.",
    image: servicesImages[0],
    icon: HomeIcon,
  },
  {
    title: "Commercial Construction",
    description:
      "Modern office and business spaces built for growth and performance.",
    image: servicesImages[1],
    icon: BriefcaseIcon,
  },
  {
    title: "Renovation & Remodeling",
    description:
      "Transform existing spaces into modern and efficient environments.",
    image: servicesImages[2],
    icon: RefreshIcon,
  },
  {
    title: "Interior Design",
    description:
      "Thoughtful interiors that combine aesthetics with practical living.",
    image: servicesImages[3],
    icon: PaletteIcon,
  },
  {
    title: "Project Management",
    description:
      "Complete planning, execution, and delivery management.",
    image: servicesImages[4],
    icon: ClipboardIcon,
  },
  {
    title: "Consultation & Planning",
    description:
      "Expert guidance from concept to construction.",
    image: servicesImages[5],
    icon: CompassIcon,
  },
] as const;

const processSteps = [
  {
    number: "01",
    title: "Consultation",
    description: "We understand goals, site conditions, budget, and timelines.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
  },
  {
    number: "02",
    title: "Planning",
    description: "We structure the roadmap, approvals, and delivery approach.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
  },
  {
    number: "03",
    title: "Design",
    description: "We shape efficient plans with modern architectural clarity.",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
  },
  {
    number: "04",
    title: "Construction",
    description: "We execute with disciplined coordination and quality checks.",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    number: "05",
    title: "Delivery",
    description: "We complete handover with precision, documentation, and care.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

const serviceReasons = [
  {
    title: "Quality Assurance",
    description:
      "Premium materials, careful supervision, and consistent quality control from start to finish.",
    icon: ShieldIcon,
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Experienced Professionals",
    description:
      "Skilled builders, engineers, designers, and managers focused on dependable execution.",
    icon: TeamIcon,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Transparent Process",
    description:
      "Clear communication, realistic milestones, and a process clients can trust.",
    icon: EyeIcon,
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Timely Delivery",
    description:
      "Organized planning and disciplined scheduling designed to protect your timeline.",
    icon: ClockIcon,
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

const featuredProjects = [
  {
    name: "Skyline Residences",
    location: "Noida, Uttar Pradesh",
    status: "Ready to Move",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "The Commerce Tower",
    location: "Bengaluru, Karnataka",
    status: "Under Construction",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "Urban Courtyard Homes",
    location: "Mumbai, Maharashtra",
    status: "New Launch",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

const faqItems = [
  {
    question: "How long does construction take?",
    answer:
      "Timelines depend on project size, approvals, site conditions, and scope. We provide a detailed schedule during planning so you always know what to expect.",
  },
  {
    question: "Do you provide custom solutions?",
    answer:
      "Yes. We tailor design and execution around your goals, budget, space, and long-term requirements.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Pricing is based on project scope, material selection, finishes, site conditions, and delivery requirements. We keep the process transparent from the beginning.",
  },
  {
    question: "Can I track project progress?",
    answer:
      "Absolutely. We maintain clear communication and milestone updates so you can follow progress with confidence.",
  },
] as const;

export function ServicesPage() {
  return (
    <div className="overflow-hidden bg-white text-slate-900">
      <HeroSection />
      <main>
        <IntroSection />
        <MainServicesSection />
        <ProcessSection />
        <WhyServicesSection />
        <FeaturedWorkSection />
        <FaqSection />
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
            Home / Services
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-[0.18em] text-slate-950 sm:text-5xl lg:text-7xl">
            OUR SERVICES
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg lg:text-xl">
            Delivering quality construction and innovative real estate solutions for modern living.
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
              alt="Luxury construction and modern architecture"
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

function IntroSection() {
  return (
    <SectionWrap>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.28 }}
        className="mx-auto max-w-4xl text-center"
      >
        <SectionEyebrow>What We Build</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          What We Build
        </h2>
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
          From residential developments to commercial spaces, we provide end-to-end solutions with quality, transparency, and modern execution.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {[
            "Premium Quality",
            "Modern Design",
            "Trusted Team",
            "On-Time Delivery",
          ].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-[0_10px_30px_rgba(37,99,235,0.05)]"
            >
              {badge}
            </span>
          ))}
        </div>
      </motion.div>
    </SectionWrap>
  );
}

function MainServicesSection() {
  return (
    <SectionWrap>
      <motion.div
        variants={staggerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div variants={sectionVariants} className="max-w-3xl">
          <SectionEyebrow>Core Services</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Our Core Services
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                variants={sectionVariants}
                whileHover={{ y: -8, scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-transparent bg-gradient-to-br from-blue-100 via-white to-blue-50 p-[1px] shadow-[0_18px_60px_rgba(37,99,235,0.08)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(37,99,235,0.12)]"
              >
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1280px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.16)_0%,rgba(15,23,42,0.78)_100%)]" />
                </div>

                <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-[1.7rem] bg-white/95 p-6 backdrop-blur-[2px] transition-colors duration-300 group-hover:bg-transparent">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 shadow-lg shadow-blue-700/10 transition duration-300 group-hover:bg-white/15 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 transition-colors duration-300 group-hover:text-blue-50">
                    {service.description}
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800 group-hover:bg-white group-hover:text-blue-700"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
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
        <SectionEyebrow>Our Process</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          How We Work
        </h2>

        <div className="relative mt-12">
          <div className="absolute left-6 top-6 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-blue-200 via-blue-300 to-blue-100 md:left-0 md:right-0 md:top-10 md:h-px md:w-auto" />

          <div className="grid items-stretch gap-8 md:grid-cols-5 md:gap-5">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
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
                        {step.number}
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

function WhyServicesSection() {
  return (
    <SectionWrap>
      <motion.div
        variants={staggerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <motion.div variants={sectionVariants} className="max-w-3xl">
          <SectionEyebrow>Why Choose Our Services</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Why Clients Choose Our Services
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {serviceReasons.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                variants={sectionVariants}
                whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.25 }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-[0_16px_50px_rgba(37,99,235,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(37,99,235,0.12)]"
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
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition duration-300 group-hover:scale-105 group-hover:bg-white/15 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950 transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 transition-colors duration-300 group-hover:text-blue-50">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </SectionWrap>
  );
}

function FeaturedWorkSection() {
  return (
    <SectionWrap>
      <motion.div
        variants={staggerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div variants={sectionVariants} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <SectionEyebrow>Featured Work</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Recent Work Highlights
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex w-fit items-center justify-center rounded-full border border-blue-100 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 shadow-[0_10px_30px_rgba(37,99,235,0.06)] transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
          >
            View All Projects
          </Link>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <motion.article
              key={project.name}
              variants={sectionVariants}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white shadow-[0_18px_60px_rgba(37,99,235,0.06)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.1)_0%,rgba(15,23,42,0.32)_100%)]" />
              </div>
              <div className="p-6">
                <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
                  {project.status}
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">{project.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{project.location}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </SectionWrap>
  );
}

function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

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
            const open = activeIndex === index;

            return (
              <motion.div
                key={item.question}
                layout
                className="overflow-hidden rounded-[1.5rem] border border-blue-100 bg-white shadow-[0_16px_48px_rgba(37,99,235,0.05)]"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setActiveIndex((current) => (current === index ? null : index))}
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
            alt="Luxury building exterior at dusk"
            fill
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.9)_0%,rgba(15,23,42,0.74)_55%,rgba(15,23,42,0.92)_100%)]" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <SectionEyebrow className="text-blue-200">Ready to Begin</SectionEyebrow>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready To Start Your Project?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                Work with a team focused on quality, trust, and long-term value.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-blue-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800"
              >
                Get Consultation
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
              >
                Contact Us
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
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M20 12a8 8 0 0 1-13.6 5.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4 12a8 8 0 0 1 13.6-5.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M15 3.8h3.2V7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 20.2H5.8V17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 4.5c-4.1 0-7.5 3.2-7.5 7.2 0 3.7 2.8 7 7.6 7h1.2c1 0 1.7-.8 1.7-1.7 0-.7-.5-1.3-1.2-1.4l-1.1-.2c-.6-.1-1.1-.7-1.1-1.3 0-.8.6-1.4 1.4-1.4H15c2 0 3.5-1.5 3.5-3.5 0-2.9-3.1-4.7-6.5-4.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="10" r="1" fill="currentColor" />
      <circle cx="10.8" cy="7.8" r="1" fill="currentColor" />
      <circle cx="13.8" cy="7.6" r="1" fill="currentColor" />
    </svg>
  );
}

function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="6" y="4.5" width="12" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9 4.5a1.5 1.5 0 0 1 3 0 1.5 1.5 0 0 1 3 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 10h6M9 13h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m14.5 9.5-1 5-5 1 1-5 5-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 4.5V2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 3.8 18.5 6.5v5.2c0 4.1-2.5 6.9-6.5 8.3-4-1.4-6.5-4.2-6.5-8.3V6.5L12 3.8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9.5 12.2 11 13.7l3.5-3.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TeamIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M8.25 11.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M15.75 10.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4.75 18.5c.2-2.9 2.1-4.75 5.5-4.75s5.3 1.85 5.5 4.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13.3 18.5c.2-2.05 1.55-3.4 4-3.4 2 0 3.2.95 3.85 2.35"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4.5 12c1.9-3.6 5-5.5 7.5-5.5S17.6 8.4 19.5 12c-1.9 3.6-5 5.5-7.5 5.5S6.4 15.6 4.5 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 8.5V12l2.5 1.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="m6.5 9 5.5 6 5.5-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
