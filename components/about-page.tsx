"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const heroImage =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80";
const introImage =
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80";
const whyImage =
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80";
const ctaImage =
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80";

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
  },
  {
    title: "Modern Planning",
    description:
      "Careful site planning, efficient layouts, and future-ready thinking guide every project from day one.",
    icon: PlanningIcon,
  },
  {
    title: "Trusted Delivery",
    description:
      "We stay transparent on timelines and quality so every handover feels dependable and professional.",
    icon: DeliveryIcon,
  },
] as const;

const missionVision = [
  {
    title: "Our Mission",
    description:
      "To deliver high-quality residential and commercial projects with honesty, innovation, and timely execution.",
    icon: TargetIcon,
  },
  {
    title: "Our Vision",
    description:
      "To become a trusted real estate brand known for modern design, reliable construction, and long-term customer satisfaction.",
    icon: HorizonIcon,
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
  },
  {
    title: "Transparent Process",
    description: "Clear updates, honest communication, and a process clients can follow with confidence.",
    icon: TransparencyIcon,
  },
  {
    title: "On-Time Delivery",
    description: "Reliable planning and coordinated teams that keep the schedule moving in the right direction.",
    icon: ClockIcon,
  },
  {
    title: "Customer Satisfaction",
    description: "We build long-term relationships by listening carefully and delivering with care.",
    icon: HeartIcon,
  },
  {
    title: "Modern Design",
    description: "Elegant architecture and thoughtful layouts shaped for contemporary living.",
    icon: DraftingIcon,
  },
  {
    title: "Sustainable Planning",
    description: "Practical decisions that support efficiency, comfort, and long-term value.",
    icon: LeafIcon,
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
    <div className="overflow-hidden bg-[#faf7f0] text-slate-900">
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
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <Image
        src={heroImage}
        alt="Luxury building exterior with warm architectural lighting"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.84)_0%,rgba(15,23,42,0.68)_55%,rgba(15,23,42,0.9)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_42%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.08),transparent_35%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.45em] text-amber-200/90">
          Home / About
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-[0.18em] text-white sm:text-5xl lg:text-7xl">
          ABOUT BUILDER
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg lg:text-xl">
          Creating trusted spaces with quality construction, modern design, and customer-first values.
        </p>
      </motion.div>
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
          className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
            <Image
              src={introImage}
              alt="Premium residential architecture with clean modern lines"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/18 via-transparent to-transparent" />
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
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-950/20"
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
    <SectionWrap tone="muted">
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
                className="group rounded-[1.75rem] border border-white/80 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]"
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-100 transition duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
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
              className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-600">{item.description}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </SectionWrap>
  );
}

function StatsSection() {
  return (
    <SectionWrap tone="muted">
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
                className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{value.description}</p>
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
    <SectionWrap tone="muted">
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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/18 via-transparent to-transparent" />
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
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
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
          className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 px-6 py-16 text-white shadow-[0_30px_90px_rgba(15,23,42,0.24)] sm:px-10 lg:px-16 lg:py-20"
        >
          <Image
            src={ctaImage}
            alt="Luxury architecture with warm interior lighting"
            fill
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.9)_0%,rgba(15,23,42,0.72)_55%,rgba(15,23,42,0.92)_100%)]" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <SectionEyebrow className="text-amber-200/90">Get In Touch</SectionEyebrow>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Let&apos;s Build Your Dream Space
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                Connect with us today and take the first step toward your future home or commercial project.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-amber-100"
              >
                Explore Projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
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
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "muted";
}) {
  return (
    <section
      className={[
        "px-4 py-20 sm:px-6 sm:py-24 lg:px-8",
        tone === "muted" ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.66),rgba(250,247,240,0.96))]" : "",
      ].join(" ")}
    >
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
    <p className={`text-sm font-semibold uppercase tracking-[0.35em] text-amber-700 ${className}`}>
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

function PlanningIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="4.5" y="5" width="15" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 4.5V7m8-2.5V7M4.5 9.5h15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M8 12h8M8 15h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function DeliveryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M4.5 12.75 9 17.25 19.5 6.75"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12a8 8 0 1 1-8-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 4.5V2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HorizonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M4 16.5h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M7 16.5V11l5-3 5 3v5.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="5" y="4.5" width="14" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 8h2M8 11h2M8 14h2M14 8h2M14 11h2M14 14h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function TransparencyIcon({ className }: { className?: string }) {
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
      <path d="M12 8.5V12l2.5 1.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 19.5s-6.5-3.8-8.5-8.1C1.8 8.3 4 5.5 7 5.5c1.7 0 3 .9 5 3 2-2.1 3.3-3 5-3 3 0 5.2 2.8 3.5 5.9C18.5 15.7 12 19.5 12 19.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DraftingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M7 18.5h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m8.5 15 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M15.5 8 18 10.5 10.5 18H8v-2.5L15.5 8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M19.5 4.5c-6.2.1-11 2.4-14.5 6.8-1.4 1.8-1.4 4.6.2 6.3 1.8 1.9 4.8 2 6.8.3 4.3-3.7 6.6-8.5 7.5-13.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8 16c1.3-3.1 3.8-5.6 7.5-7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5.5 12.5 9.5 16.5 18.5 7.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
