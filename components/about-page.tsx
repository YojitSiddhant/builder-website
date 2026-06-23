"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  IoBusinessOutline,
  IoCheckmarkCircleOutline,
  IoCompassOutline,
  IoEyeOutline,
  IoHeartOutline,
  IoLeafOutline,
  IoLayersOutline,
  IoLocateOutline,
  IoPencilOutline,
  IoPeopleOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { makeHoverImage } from "./hover-image";

const heroImage =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80";
const introImage =
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80";
const whyImage =
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80";

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

const whoCards = [
  {
    title: "Experienced Team",
    description:
      "A collaborative group of builders, designers, and project managers with real-world execution experience.",
    icon: TeamIcon,
    image: makeHoverImage({
      title: "Experienced Team",
      variant: "about-who-experienced-team",
      theme: "team",
    }),
  },
  {
    title: "Modern Planning",
    description:
      "Careful site planning, efficient layouts, and future-ready thinking guide every project from day one.",
    icon: PlanningIcon,
    image: makeHoverImage({
      title: "Modern Planning",
      variant: "about-who-modern-planning",
      theme: "planning",
    }),
  },
  {
    title: "Trusted Delivery",
    description:
      "We stay transparent on timelines and quality so every handover feels dependable and professional.",
    icon: DeliveryIcon,
    image: makeHoverImage({
      title: "Trusted Delivery",
      variant: "about-who-trusted-delivery",
      theme: "delivery",
    }),
  },
] as const;

const missionVision = [
  {
    title: "Our Mission",
    description:
      "To deliver high-quality residential and commercial projects with honesty, innovation, and timely execution.",
    icon: TargetIcon,
    image: makeHoverImage({
      title: "Our Mission",
      variant: "about-mission",
      theme: "mission",
    }),
  },
  {
    title: "Our Vision",
    description:
      "To become a trusted real estate brand known for modern design, reliable construction, and long-term customer satisfaction.",
    icon: HorizonIcon,
    image: makeHoverImage({
      title: "Our Vision",
      variant: "about-vision",
      theme: "design",
    }),
  },
] as const;

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 500, suffix: "+", label: "Happy Clients" },
  { value: 20, suffix: "+", label: "Locations" },
] as const;

const values = [
  {
    title: "Quality Construction",
    description: "Strong structures, premium finishes, and disciplined execution at every stage.",
    icon: BuildingIcon,
    image: makeHoverImage({
      title: "Quality Construction",
      variant: "about-value-quality-construction",
      theme: "construction",
    }),
  },
  {
    title: "Transparent Process",
    description: "Clear updates, honest communication, and a process clients can follow with confidence.",
    icon: TransparencyIcon,
    image: makeHoverImage({
      title: "Transparent Process",
      variant: "about-value-transparent-process",
      theme: "planning",
    }),
  },
  {
    title: "On-Time Delivery",
    description: "Reliable planning and coordinated teams that keep the schedule moving in the right direction.",
    icon: ClockIcon,
    image: makeHoverImage({
      title: "On-Time Delivery",
      variant: "about-value-on-time-delivery",
      theme: "delivery",
    }),
  },
  {
    title: "Customer Satisfaction",
    description: "We build long-term relationships by listening carefully and delivering with care.",
    icon: HeartIcon,
    image: makeHoverImage({
      title: "Customer Satisfaction",
      variant: "about-value-customer-satisfaction",
      theme: "trust",
    }),
  },
  {
    title: "Modern Design",
    description: "Elegant architecture and thoughtful layouts shaped for contemporary living.",
    icon: DraftingIcon,
    image: makeHoverImage({
      title: "Modern Design",
      variant: "about-value-modern-design",
      theme: "design",
    }),
  },
  {
    title: "Sustainable Planning",
    description: "Practical decisions that support efficiency, comfort, and long-term value.",
    icon: LeafIcon,
    image: makeHoverImage({
      title: "Sustainable Planning",
      variant: "about-value-sustainable-planning",
      theme: "planning",
    }),
  },
] as const;

const features = [
  "Premium Quality",
  "Experienced Team",
  "Transparent Pricing",
  "Modern Architecture",
  "Long-Term Value",
] as const;

export function AboutPage() {
  return (
    <div className="overflow-hidden bg-white text-slate-900">
      <HeroSection />
      <main>
        <CompanyIntroSection />
        <WhoWeAreSection />
        <MissionVisionSection />
        <StatsSection />
        <CoreValuesSection />
        <WhyChooseUsSection />
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
            Home / About
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-[0.18em] text-slate-950 sm:text-5xl lg:text-7xl">
            ABOUT
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg lg:text-xl">
            Creating trusted spaces with quality construction, modern design, and customer-first values.
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
              alt="Luxury building exterior with modern architecture"
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

function CompanyIntroSection() {
  return (
    <SectionWrap>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-3 shadow-[0_24px_80px_rgba(37,99,235,0.08)]"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
            <Image
              src={introImage}
              alt="Premium residential architecture with clean modern lines"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/12 via-transparent to-transparent" />
          </div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="max-w-xl"
        >
          <SectionEyebrow>Company Intro</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Building Dreams Into Reality
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            Builder is a trusted real estate and construction company focused on creating premium residential and commercial spaces. We combine thoughtful planning, modern architecture, quality materials, and transparent communication to deliver projects that stand the test of time.
          </p>

          <div className="mt-8">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full bg-blue-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-700/25"
            >
              Explore Projects
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </SectionWrap>
  );
}

function WhoWeAreSection() {
  return (
    <SectionWrap>
      <motion.div
        variants={staggerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div variants={sectionVariants} className="max-w-3xl">
          <SectionEyebrow>Who We Are</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            A team committed to reliable spaces and modern lifestyles.
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            We are a team of experienced builders, designers, engineers, and project managers committed to delivering spaces that match modern lifestyles. From planning to possession, our goal is to make every project smooth, reliable, and valuable for our clients.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {whoCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                variants={sectionVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white p-6 shadow-[0_18px_60px_rgba(37,99,235,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(37,99,235,0.12)]"
              >
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.18)_0%,rgba(15,23,42,0.75)_100%)]" />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition duration-300 group-hover:scale-105 group-hover:bg-white/15 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950 transition-colors duration-300 group-hover:text-white">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 transition-colors duration-300 group-hover:text-blue-50">
                    {card.description}
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

function MissionVisionSection() {
  return (
    <SectionWrap>
      <motion.div
        variants={staggerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid gap-6 lg:grid-cols-2"
      >
        {missionVision.map((item) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              variants={sectionVariants}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white p-8 shadow-[0_20px_60px_rgba(37,99,235,0.06)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(37,99,235,0.12)]"
            >
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.18)_0%,rgba(15,23,42,0.78)_100%)]" />
              </div>
              <div className="relative z-10">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white transition duration-300 group-hover:bg-white/15">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-slate-600 transition-colors duration-300 group-hover:text-blue-50">
                  {item.description}
                </p>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </SectionWrap>
  );
}

function StatsSection() {
  return (
    <SectionWrap>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <SectionEyebrow>Company Stats</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Trusted numbers that reflect our work.
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </motion.div>
    </SectionWrap>
  );
}

function CoreValuesSection() {
  return (
    <SectionWrap>
      <motion.div
        variants={staggerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <motion.div variants={sectionVariants} className="max-w-3xl">
          <SectionEyebrow>Core Values</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            What Drives Us
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.article
                key={value.title}
                variants={sectionVariants}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.25 }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-[0_16px_50px_rgba(37,99,235,0.05)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(37,99,235,0.12)]"
              >
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <Image
                    src={value.image}
                    alt={value.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.18)_0%,rgba(15,23,42,0.75)_100%)]" />
                </div>
                <div className="relative z-10">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-white transition duration-300 group-hover:bg-white/15">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-950 transition-colors duration-300 group-hover:text-white">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 transition-colors duration-300 group-hover:text-blue-50">
                    {value.description}
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

function WhyChooseUsSection() {
  return (
    <SectionWrap>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.22 }}
        className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
            <Image
              src={whyImage}
              alt="Modern premium architectural facade with clean structure"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/12 via-transparent to-transparent" />
          </div>
        </motion.div>

        <div className="max-w-xl">
          <SectionEyebrow>Why Choose Us</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Why Choose Builder?
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            We focus on trust, quality, and clear communication. Every project is planned carefully, built with precision, and delivered with a commitment to customer satisfaction.
          </p>

          <motion.ul
            variants={staggerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-8 space-y-4"
          >
            {features.map((feature) => (
              <motion.li
                key={feature}
                variants={sectionVariants}
                className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-[0_10px_30px_rgba(37,99,235,0.04)]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-slate-700">{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
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
          className="relative overflow-hidden rounded-[2.5rem] bg-white px-6 py-16 text-slate-950 shadow-[0_30px_90px_rgba(37,99,235,0.12)] ring-1 ring-blue-100 sm:px-10 lg:px-16 lg:py-20"
        >
          <div className="absolute inset-0 bg-white" />
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <SectionEyebrow className="text-blue-700">Get In Touch</SectionEyebrow>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Let&apos;s Build Your Dream Space
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Connect with us today and take the first step toward your future home or commercial project.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full bg-blue-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-700/25"
              >
                Explore Projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-7 py-3.5 text-sm font-semibold text-blue-700 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
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

function SectionWrap({
  children,
}: {
  children: ReactNode;
}) {
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

function StatCard({
  stat,
}: {
  stat: { value: number; suffix: string; label: string };
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1200;
    const start = performance.now();
    let frame = 0;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(stat.value * easeOutCubic(progress)));

      if (progress < 1) {
        frame = window.requestAnimationFrame(step);
      }
    };

    frame = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(frame);
  }, [inView, stat.value]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="rounded-[1.5rem] border border-white/80 bg-white p-6 text-center shadow-[0_16px_48px_rgba(15,23,42,0.06)]"
    >
      <div className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
        {count}
        {stat.suffix}
      </div>
      <div className="mt-3 text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
        {stat.label}
      </div>
    </motion.article>
  );
}

function TeamIcon({ className }: { className?: string }) {
  return <IoPeopleOutline className={className} />;
}

function PlanningIcon({ className }: { className?: string }) {
  return <IoLayersOutline className={className} />;
}

function DeliveryIcon({ className }: { className?: string }) {
  return <IoCheckmarkCircleOutline className={className} />;
}

function TargetIcon({ className }: { className?: string }) {
  return <IoLocateOutline className={className} />;
}

function HorizonIcon({ className }: { className?: string }) {
  return <IoCompassOutline className={className} />;
}

function BuildingIcon({ className }: { className?: string }) {
  return <IoBusinessOutline className={className} />;
}

function TransparencyIcon({ className }: { className?: string }) {
  return <IoEyeOutline className={className} />;
}

function ClockIcon({ className }: { className?: string }) {
  return <IoTimeOutline className={className} />;
}

function HeartIcon({ className }: { className?: string }) {
  return <IoHeartOutline className={className} />;
}

function DraftingIcon({ className }: { className?: string }) {
  return <IoPencilOutline className={className} />;
}

function LeafIcon({ className }: { className?: string }) {
  return <IoLeafOutline className={className} />;
}

function CheckIcon({ className }: { className?: string }) {
  return <IoCheckmarkCircleOutline className={className} />;
}
