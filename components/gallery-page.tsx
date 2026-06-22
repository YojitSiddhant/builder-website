"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

const heroImage =
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=80";
const galleryImages = [
  {
    id: 1,
    project: "Skyline Heights",
    location: "Bangalore",
    category: "Exterior",
    image:
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    project: "Urban Residency",
    location: "Bangalore",
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    project: "Emerald Towers",
    location: "Bangalore",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    project: "Business Square",
    location: "Whitefield",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    project: "Construction Detail",
    location: "Noida",
    category: "Construction",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    project: "Completed Courtyard",
    location: "Mysore",
    category: "Completed",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 7,
    project: "Luxury Lobby",
    location: "Bangalore",
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 8,
    project: "Residential Facade",
    location: "Bangalore",
    category: "Exterior",
    image:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 9,
    project: "Modern Living Room",
    location: "Bangalore",
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 10,
    project: "Residential Tower",
    location: "Chennai",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 11,
    project: "Commercial Atrium",
    location: "Hyderabad",
    category: "Commercial",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 12,
    project: "Construction Progress",
    location: "Pune",
    category: "Construction",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 13,
    project: "Ready Home Exterior",
    location: "Bangalore",
    category: "Completed",
    image:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 14,
    project: "Premium Kitchen",
    location: "Mumbai",
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 15,
    project: "Urban Apartment Block",
    location: "Bangalore",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 16,
    project: "Business Facade",
    location: "Whitefield",
    category: "Exterior",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 17,
    project: "Quality Check",
    location: "Noida",
    category: "Construction",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 18,
    project: "Completed Tower",
    location: "Bangalore",
    category: "Completed",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
] as const;

const categories = [
  "All",
  "Exterior",
  "Interior",
  "Residential",
  "Commercial",
  "Construction",
  "Completed",
] as const;

const featuredImages = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
] as const;

const beforeAfterItems = [
  {
    title: "Facade Refresh",
    before:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80",
    after:
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Lobby Transformation",
    before:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1600&q=80",
    after:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Living Space Upgrade",
    before:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    after:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

const stats = [
  { value: 150, suffix: "+", label: "Projects" },
  { value: 500, suffix: "+", label: "Clients" },
  { value: 10, suffix: "+", label: "Years" },
  { value: 20, suffix: "+", label: "Locations" },
] as const;

const testimonials = [
  {
    name: "Aarav Mehta",
    image: "/home/avatar-aarav.svg",
    rating: 5,
    review:
      "The gallery reflects the same quality we experienced on-site. Premium finishes, precise execution, and strong design language.",
  },
  {
    name: "Priya Nair",
    image: "/home/avatar-priya.svg",
    rating: 5,
    review:
      "Every image feels polished and professional. It gave us confidence in the builder's attention to detail.",
  },
  {
    name: "Rohan Kapoor",
    image: "/home/avatar-rohan.svg",
    rating: 5,
    review:
      "A great way to preview completed work. The gallery is elegant, easy to explore, and reassuring.",
  },
] as const;

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
    transition: { staggerChildren: 0.08 },
  },
};

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [featuredSlide, setFeaturedSlide] = useState(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFeaturedSlide((current) => (current + 1) % featuredImages.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTestimonialSlide((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return galleryImages;
    return galleryImages.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="overflow-hidden bg-white text-slate-900">
      <HeroSection />
      <main>
        <IntroSection />
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <MasonryGallery items={filteredImages} />
        <FeaturedShowcase
          slide={featuredSlide}
          setSlide={setFeaturedSlide}
        />
        <VideoShowcase />
        <BeforeAfterSection />
        <StatsSection />
        <TestimonialSlider activeIndex={testimonialSlide} />
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
            Home / Gallery
          </p>
          <h1 className="mt-6 text-4xl font-semibold tracking-[0.18em] text-slate-950 sm:text-5xl lg:text-7xl">
            OUR GALLERY
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg lg:text-xl">
            Explore our collection of completed projects, interiors, architecture, and construction excellence.
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
              alt="Luxury architecture background"
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
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-4xl text-center"
      >
        <SectionEyebrow>Gallery Intro</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Designed To Inspire
        </h2>
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
          Discover beautifully crafted spaces, premium finishes, and construction quality through our project gallery.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {[
            "Luxury Living",
            "Modern Design",
            "Premium Quality",
            "Trusted Builder",
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

function CategoryFilter({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: (typeof categories)[number];
  setActiveCategory: (category: (typeof categories)[number]) => void;
}) {
  return (
    <section className="sticky top-[72px] z-30 border-y border-blue-100 bg-white/95 px-4 py-5 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl justify-center">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const active = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition duration-300",
                  active
                    ? "bg-blue-700 text-white shadow-lg shadow-blue-700/20"
                    : "border border-blue-100 bg-white text-slate-700 hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-700",
                ].join(" ")}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MasonryGallery({
  items,
}: {
  items: ReadonlyArray<(typeof galleryImages)[number]>;
}) {
  return (
    <SectionWrap>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="flex items-end justify-between gap-4">
          <div>
            <SectionEyebrow>Main Gallery</SectionEyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Main Image Gallery
            </h2>
          </div>
          <p className="hidden text-sm text-slate-500 sm:block">
            Showing {items.length} images
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <GalleryCard key={item.id} item={item} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </SectionWrap>
  );
}

function GalleryCard({
  item,
  index,
}: {
  item: (typeof galleryImages)[number];
  index: number;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, delay: index * 0.02 }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-[1.75rem] border border-transparent bg-gradient-to-br from-blue-100 via-white to-blue-50 p-[1px] shadow-[0_18px_60px_rgba(37,99,235,0.08)]"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[1.7rem] bg-white">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.project}
            fill
            sizes="(max-width: 1280px) 100vw, 25vw"
            className="object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.02)_0%,rgba(15,23,42,0.42)_100%)] opacity-0 transition duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-slate-950/0 opacity-0 backdrop-blur-[1px] transition duration-500 group-hover:bg-slate-950/35 group-hover:opacity-100">
            <Link
              href="/gallery"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:-translate-y-0.5"
            >
              View Image
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/15"
            >
              View Project
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5">
          <StatusTag>{item.category}</StatusTag>
          <div>
            <h3 className="text-xl font-semibold text-slate-950">{item.project}</h3>
            <p className="mt-2 text-sm text-slate-500">{item.location}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function FeaturedShowcase({
  slide,
  setSlide,
}: {
  slide: number;
  setSlide: (value: number) => void;
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
        <FeaturedSlider slide={slide} setSlide={setSlide} />

        <div className="max-w-xl">
          <SectionEyebrow>Featured Project</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Skyline Heights
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            Experience premium residential living designed with modern architecture and exceptional craftsmanship.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <KeyStat label="Location" value="Bangalore" />
            <KeyStat label="Project Size" value="2.1 Acres" />
            <KeyStat label="Completion Year" value="2025" />
            <KeyStat label="Property Type" value="Residential" />
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-full border border-blue-100 bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
            >
              View Project
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

function FeaturedSlider({
  slide,
  setSlide,
}: {
  slide: number;
  setSlide: (value: number) => void;
}) {
  const count = featuredImages.length;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-3 shadow-[0_24px_80px_rgba(37,99,235,0.08)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={featuredImages[slide]}
              alt="Featured project image"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.25)_100%)]" />

        <div className="absolute bottom-5 left-5 flex gap-2">
          <button
            type="button"
            onClick={() => setSlide((slide - 1 + count) % count)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-blue-700 shadow-lg shadow-blue-700/10 transition hover:-translate-y-0.5"
            aria-label="Previous slide"
          >
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => setSlide((slide + 1) % count)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-blue-700 shadow-lg shadow-blue-700/10 transition hover:-translate-y-0.5"
            aria-label="Next slide"
          >
            <ArrowIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="absolute bottom-5 right-5 flex gap-2">
          {featuredImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSlide(index)}
              className={[
                "h-2.5 rounded-full transition-all duration-300",
                index === slide ? "w-8 bg-white" : "w-2.5 bg-white/55",
              ].join(" ")}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoShowcase() {
  return (
    <SectionWrap>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
      >
        <div>
          <SectionEyebrow>Video Showcase</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Project Walkthrough
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            A quick look at the spaces, finishes, and craftsmanship that define our premium developments.
          </p>
        </div>

        <motion.article
          whileHover={{ y: -6 }}
          className="group overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-3 shadow-[0_24px_80px_rgba(37,99,235,0.08)]"
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem]">
            <Image
              src={featuredImages[0]}
              alt="Project walkthrough thumbnail"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04)_0%,rgba(15,23,42,0.45)_100%)]" />
            <button
              type="button"
              className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-blue-700 shadow-[0_18px_50px_rgba(37,99,235,0.18)] transition duration-300 group-hover:scale-105"
              aria-label="Play walkthrough"
            >
              <PlayIcon className="h-8 w-8 translate-x-0.5" />
            </button>
            <div className="absolute bottom-5 left-5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700 shadow-lg">
              02:34
            </div>
          </div>
        </motion.article>
      </motion.div>
    </SectionWrap>
  );
}

function BeforeAfterSection() {
  return (
    <SectionWrap>
      <motion.div
        variants={staggerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div variants={sectionVariants} className="max-w-3xl">
          <SectionEyebrow>Transformation Showcase</SectionEyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Before / After Comparison
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {beforeAfterItems.map((item) => (
            <BeforeAfterCard key={item.title} item={item} />
          ))}
        </div>
      </motion.div>
    </SectionWrap>
  );
}

function BeforeAfterCard({
  item,
}: {
  item: (typeof beforeAfterItems)[number];
}) {
  const [value, setValue] = useState(50);

  return (
    <motion.article
      variants={sectionVariants}
      whileHover={{ y: -6 }}
      className="overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white shadow-[0_18px_60px_rgba(37,99,235,0.06)]"
    >
      <div className="p-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
          <Image src={item.before} alt={`${item.title} before`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/18">
            <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-700">
              Before
            </span>
          </div>

          <div
            className="absolute inset-y-0 right-0 overflow-hidden border-l border-white/50 shadow-[0_0_0_1px_rgba(255,255,255,0.2)]"
            style={{ width: `${value}%` }}
          >
            <Image src={item.after} alt={`${item.title} after`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/16">
              <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
                After
              </span>
            </div>
          </div>

          <input
            type="range"
            min={10}
            max={90}
            value={value}
            onChange={(event) => setValue(Number(event.target.value))}
            className="absolute inset-x-4 bottom-4 h-1 appearance-none rounded-full bg-white/30"
            aria-label={`${item.title} comparison slider`}
          />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-slate-950">{item.title}</h3>
      </div>
    </motion.article>
  );
}

function StatsSection() {
  return (
    <SectionWrap>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <SectionEyebrow>Gallery Stats</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Built on Scale and Trust
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

function StatCard({ stat }: { stat: { value: number; suffix: string; label: string } }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
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
      className="rounded-[1.5rem] border border-blue-100 bg-white p-6 text-center shadow-[0_16px_48px_rgba(37,99,235,0.06)]"
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

function TestimonialSlider({ activeIndex }: { activeIndex: number }) {
  return (
    <SectionWrap>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-4xl"
      >
        <SectionEyebrow>Client Feedback</SectionEyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Trusted by Clients
        </h2>

        <div className="mt-10 overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-8 shadow-[0_18px_60px_rgba(37,99,235,0.06)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid gap-6 md:grid-cols-[auto_1fr]"
            >
              <div className="flex items-start justify-center md:justify-start">
                <Image
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  width={88}
                  height={88}
                  className="rounded-full border border-blue-100 bg-blue-50 object-cover p-1"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: testimonials[activeIndex].rating }).map((_, index) => (
                    <StarIcon key={index} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-lg leading-8 text-slate-600">
                  {testimonials[activeIndex].review}
                </p>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
                  {testimonials[activeIndex].name}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
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
            src={heroImage}
            alt="Luxury property background"
            fill
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.9)_0%,rgba(15,23,42,0.74)_55%,rgba(15,23,42,0.92)_100%)]" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <SectionEyebrow className="text-blue-200">Get In Touch</SectionEyebrow>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready To Experience Our Projects?
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                Explore our developments and connect with our team.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/15"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-blue-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-800"
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

function StatusTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-blue-700">
      {children}
    </span>
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

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="m8 5 12 7-12 7V5Z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9L12 3Z" />
    </svg>
  );
}
