"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";
import {
  type ChangeEvent,
  type ChangeEventHandler,
  type FormEvent,
  useState,
} from "react";

type FormState = {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const contactInfo = [
  {
    title: "Office Address",
    lines: ["Business District", "Your City, Country"],
    icon: OfficeIcon,
  },
  {
    title: "Phone",
    lines: ["+91 XXXXX XXXXX"],
    icon: PhoneIcon,
  },
  {
    title: "Email",
    lines: ["contact@builder.com"],
    icon: MailIcon,
  },
  {
    title: "Working Hours",
    lines: ["Mon - Sat", "9:00 AM - 6:00 PM"],
    icon: ClockIcon,
  },
] as const;

const formDefaults: FormState = {
  fullName: "",
  phoneNumber: "",
  emailAddress: "",
  projectType: "",
  budget: "",
  timeline: "",
  message: "",
  consent: false,
};

const faqItems = [
  {
    question: "How long does construction take?",
    answer:
      "Timelines vary by scope, approvals, and project size. After consultation, we provide a clear schedule with milestones and delivery checkpoints.",
  },
  {
    question: "Do you provide consultation?",
    answer:
      "Yes. We offer initial consultations to understand your requirements, site conditions, budget, and ideal project timeline.",
  },
  {
    question: "Can I customize my project?",
    answer:
      "Absolutely. We work closely with clients to adapt layouts, finishes, and design details so the final space fits the vision and practical needs.",
  },
  {
    question: "How do payments work?",
    answer:
      "Payments are usually structured by agreed milestones. We keep the process transparent so you know what is due at each stage of the project.",
  },
] as const;

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

export function ContactPage() {
  const [form, setForm] = useState<FormState>(formDefaults);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const budgetOptions = [
    "Under 25 Lakhs",
    "25 - 50 Lakhs",
    "50 Lakhs - 1 Crore",
    "1 Crore +",
  ];

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;
      setForm((current) => ({ ...current, [name]: checked } as FormState));
    } else {
      setForm((current) => ({ ...current, [name]: value } as FormState));
    }

    if (errors[name as keyof FormState]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name as keyof FormState];
        return next;
      });
    }
    if (submitState === "success") {
      setSubmitState("idle");
    }
  }

  function validate(values: FormState): FormErrors {
    const nextErrors: FormErrors = {};

    if (!values.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!values.phoneNumber.trim()) nextErrors.phoneNumber = "Phone number is required.";
    if (!values.emailAddress.trim()) nextErrors.emailAddress = "Email address is required.";
    if (!values.projectType) nextErrors.projectType = "Please choose a project type.";
    if (!values.budget) nextErrors.budget = "Please select a budget range.";
    if (!values.timeline.trim()) nextErrors.timeline = "Timeline is required.";
    if (!values.message.trim()) nextErrors.message = "Tell us a little about your project.";
    if (!values.consent) nextErrors.consent = "Please agree to be contacted.";

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmitState("success");
      setForm(formDefaults);
    }, 1200);
  }

  return (
    <div id="top" className="overflow-x-clip bg-white text-slate-900">
      <Hero />

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="border-t border-blue-50 bg-white px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">
              Contact Details
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Let’s make your next project easy to start.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-[1.75rem] border border-blue-100 bg-white p-6 shadow-[0_14px_35px_rgba(37,99,235,0.08)] transition-shadow hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)]"
                >
                  <motion.div
                    whileHover={{ rotate: 6, scale: 1.05 }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200"
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <div className="mt-4 space-y-1 text-base leading-7 text-slate-600">
                    {item.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="relative min-h-[420px] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(37,99,235,0.12)]"
          >
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
              alt="Luxury building exterior"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-blue-900/55 to-blue-700/30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_30%)]" />
          </motion.div>

          <motion.div
            id="enquiry-form"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-[0_20px_60px_rgba(37,99,235,0.08)] sm:p-8"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">
                Enquiry Form
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Tell us about your project.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                We’ll review your details and get back with a thoughtful response, tailored next steps, and a transparent process.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  error={errors.fullName}
                  placeholder="Your full name"
                />
                <Field
                  label="Phone Number"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  error={errors.phoneNumber}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <Field
                label="Email Address"
                name="emailAddress"
                value={form.emailAddress}
                onChange={handleChange}
                error={errors.emailAddress}
                placeholder="you@example.com"
                type="email"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                  label="Project Type"
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  error={errors.projectType}
                  options={["Residential", "Commercial", "Renovation", "Interior"]}
                />
                <SelectField
                  label="Budget"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  error={errors.budget}
                  options={budgetOptions}
                />
              </div>

              <Field
                label="Timeline"
                name="timeline"
                value={form.timeline}
                onChange={handleChange}
                error={errors.timeline}
                placeholder="e.g. 6 to 9 months"
              />

              <TextareaField
                label="Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                error={errors.message}
                placeholder="Share your project vision, location, size, or any specific requirements."
              />

              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-blue-100 bg-white p-4 text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-600"
                />
                <span>
                  I agree to be contacted
                  {errors.consent ? (
                    <span className="mt-1 block text-xs text-rose-600">{errors.consent}</span>
                  ) : null}
                </span>
              </label>

              <AnimatePresence mode="wait">
                {submitState === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-medium text-blue-700"
                  >
                    Thanks for reaching out. Our team will contact you soon.
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <motion.button
                type="submit"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {isSubmitting ? "Sending..." : "Send Enquiry"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">
              Location
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Visit Our Office
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="relative overflow-hidden rounded-[2rem] border border-blue-100 shadow-[0_20px_60px_rgba(37,99,235,0.1)]">
              <div className="aspect-[16/10] min-h-[360px] w-full">
                <iframe
                  title="Builder office map"
                  src="https://www.google.com/maps?q=India&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-start p-0 sm:bottom-6 sm:left-6 sm:right-auto sm:p-0">
                <div className="w-full max-w-lg rounded-[1.5rem] border border-white/20 bg-white/95 p-5 text-center shadow-[0_15px_40px_rgba(37,99,235,0.12)] backdrop-blur-sm sm:min-w-[360px]">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
                    Builder Headquarters
                  </p>
                  <div className="mt-4 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-900">Office timing</p>
                      <p className="mt-1">Mon - Sat, 9:00 AM - 6:00 PM</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-slate-900">Quick contact</p>
                      <p className="mt-1">+91 XXXXX XXXXX</p>
                      <p>contact@builder.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-[0_20px_60px_rgba(37,99,235,0.08)] sm:p-8">
              <h3 className="text-2xl font-semibold text-slate-950">
                We’re easy to reach.
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-600">
                Whether you want to discuss a new build, renovation, or a commercial project, our office is ready to guide you through the next step.
              </p>

              <div className="mt-6 space-y-4">
                <InfoRow title="Address" text="Business District, Your City, Country" />
                <InfoRow title="Call" text="+91 XXXXX XXXXX" />
                <InfoRow title="Email" text="contact@builder.com" />
              </div>

              <div className="mt-8 rounded-[1.5rem] border border-blue-100 bg-white p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
                  Response time
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-950">
                  We usually respond within one business day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto w-full max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <motion.article
                  key={item.question}
                  layout
                  className="overflow-hidden rounded-[1.5rem] border border-blue-100 bg-white shadow-[0_18px_45px_rgba(37,99,235,0.06)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq((current) => (current === index ? null : index))}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="text-lg font-semibold text-slate-950">
                      {item.question}
                    </span>
                    <span
                      className={[
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white text-blue-600 transition-transform duration-300",
                        isOpen ? "rotate-45" : "rotate-0",
                      ].join(" ")}
                    >
                      <PlusIcon className="h-5 w-5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-6 text-sm leading-7 text-slate-600 sm:px-6">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="bg-white px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-blue-100 shadow-[0_24px_70px_rgba(37,99,235,0.12)]">
            <Image
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80"
              alt="Modern architecture"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/85 via-blue-900/70 to-blue-700/40" />

            <div className="relative flex min-h-[420px] items-center px-6 py-16 sm:px-10 lg:px-16">
              <div className="max-w-3xl text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-100">
                  Final Step
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  Ready To Start Your Project?
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-blue-50/90 sm:text-lg">
                  Let us help you turn ideas into a finished space with a process that feels clear, premium, and dependable from start to finish.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <motion.a
                    href="tel:+911234567890"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-blue-700 shadow-lg shadow-black/10 transition"
                  >
                    Call Now
                  </motion.a>
                  <motion.a
                    href="#enquiry-form"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition"
                  >
                    Book Consultation
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
      <Image
        src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80"
        alt="Luxury building background"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/85 via-blue-900/70 to-blue-800/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_35%)]" />

      <motion.div
        initial="hidden"
        animate="show"
        variants={heroVariants}
        className="relative z-10 mx-auto w-full max-w-4xl text-center text-white"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-100/90">
          Home / Contact
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Let’s Build Something Extraordinary
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-blue-50/90 sm:text-lg">
          We&apos;re here to answer your questions and help bring your vision to life.
        </p>
      </motion.div>
    </section>
  );
}

function Field({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
  name: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <input
        {...props}
        className={[
          "w-full rounded-2xl border bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100",
          error ? "border-rose-300" : "border-blue-100",
        ].join(" ")}
      />
      {error ? <span className="mt-2 block text-sm text-rose-600">{error}</span> : null}
    </label>
  );
}

function SelectField({
  label,
  error,
  options,
  ...props
}: {
  label: string;
  error?: string;
  name: string;
  value: string;
  options: string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <select
        {...props}
        className={[
          "w-full rounded-2xl border bg-white px-4 py-3.5 text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100",
          error ? "border-rose-300" : "border-blue-100",
        ].join(" ")}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <span className="mt-2 block text-sm text-rose-600">{error}</span> : null}
    </label>
  );
}

function TextareaField({
  label,
  error,
  ...props
}: {
  label: string;
  error?: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>
      <textarea
        {...props}
        rows={5}
        className={[
          "w-full rounded-2xl border bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100",
          error ? "border-rose-300" : "border-blue-100",
        ].join(" ")}
      />
      {error ? <span className="mt-2 block text-sm text-rose-600">{error}</span> : null}
    </label>
  );
}

function InfoRow({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white px-4 py-4">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-600">
        {title}
      </p>
      <p className="mt-2 text-sm leading-7 text-slate-700">{text}</p>
    </div>
  );
}

function OfficeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5 19h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M7.5 19V6.8a1.3 1.3 0 0 1 1.3-1.3h6.4a1.3 1.3 0 0 1 1.3 1.3V19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10 7.8h1.2M12.8 7.8H14M10 10.8h1.2M12.8 10.8H14M10 13.8h1.2M12.8 13.8H14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M8 4.8h2.1c.5 0 .9.3 1 .8l.7 2.7c.1.4 0 .8-.3 1.1l-1.2 1.1c.8 1.8 2.2 3.2 4 4l1.1-1.2c.3-.3.7-.4 1.1-.3l2.7.7c.5.1.8.5.8 1V18c0 .6-.5 1-1 1C10.8 19 5 13.2 5 6.8c0-.6.4-1 1-1h2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect
        x="4"
        y="6"
        width="16"
        height="12"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m5.5 7.5 6.5 5 6.5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 8.5V12l2.4 1.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 6v12M6 12h12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
