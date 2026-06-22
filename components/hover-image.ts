type HoverTheme =
  | "home"
  | "services"
  | "projects"
  | "about"
  | "residential"
  | "commercial"
  | "construction"
  | "planning"
  | "delivery"
  | "team"
  | "trust"
  | "design"
  | "values"
  | "mission";

type HoverImageOptions = {
  title: string;
  variant: string;
  theme: HoverTheme;
};

const hoverImageQueries: Record<string, string> = {
  "home-intro-quality": "luxury residential facade",
  "home-intro-transparency": "architect reviewing floor plans",
  "home-intro-innovation": "modern architectural detail",
  "home-trust-premium-quality": "premium apartment exterior",
  "home-trust-on-time-delivery": "construction site crane skyline",
  "home-trust-modern-architecture": "contemporary house exterior",
  "home-trust-customer-satisfaction": "happy homeowners modern house",
  "home-process-consultation": "architect client meeting",
  "home-process-planning": "site plan and blueprint",
  "home-process-construction": "building under construction",
  "home-process-delivery": "completed house handover",
  "services-main-residential": "residential apartment building",
  "services-main-commercial": "commercial office tower",
  "services-main-renovation": "home renovation interior",
  "services-main-interior": "modern interior design living room",
  "services-main-project-management": "project management desk blueprint",
  "services-main-consultation-planning": "architectural consultation meeting",
  "services-process-consultation": "property consultation meeting",
  "services-process-planning": "architectural planning desk",
  "services-process-design": "architectural design sketch",
  "services-process-construction": "construction workers building",
  "services-process-delivery": "property handover keys",
  "services-why-quality": "quality construction details",
  "services-why-professionals": "construction team planning",
  "services-why-transparent-process": "blueprint and reports",
  "services-why-timely-delivery": "construction schedule clock",
  "about-who-experienced-team": "construction team collaboration",
  "about-who-modern-planning": "site planning blueprint",
  "about-who-trusted-delivery": "project handover agreement",
  "about-mission": "architecture vision board",
  "about-vision": "modern city development",
  "about-value-quality-construction": "strong concrete structure",
  "about-value-transparent-process": "architect reviewing plans",
  "about-value-on-time-delivery": "timely project management",
  "about-value-customer-satisfaction": "happy family home",
  "about-value-modern-design": "modern interior architecture",
  "about-value-sustainable-planning": "sustainable building design",
  "projects-process-planning": "project planning blueprint",
  "projects-process-design": "building design sketches",
  "projects-process-construction": "active construction site",
  "projects-process-quality-check": "quality inspection construction",
  "projects-process-delivery": "final property handover",
};

const themeFallbackQueries: Record<HoverTheme, string> = {
  home: "modern residential architecture",
  services: "architecture and construction",
  projects: "real estate project development",
  about: "construction company team",
  residential: "residential building exterior",
  commercial: "commercial office building",
  construction: "construction site and structure",
  planning: "architectural planning and blueprint",
  delivery: "property handover and completion",
  team: "construction team collaboration",
  trust: "trusted construction quality",
  design: "modern interior and exterior design",
  values: "modern homes and quality living",
  mission: "real estate vision and goals",
};

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

function buildQuery({ title, variant, theme }: HoverImageOptions) {
  return hoverImageQueries[variant] ?? `${title} ${themeFallbackQueries[theme]}`;
}

export function makeHoverImage(options: HoverImageOptions) {
  const query = buildQuery(options);
  const seed = hashString(options.variant);
  return `https://source.unsplash.com/featured/1600x900/?${encodeURIComponent(query)}&sig=${seed}`;
}
