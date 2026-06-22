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

const themeMap: Record<
  HoverTheme,
  { bgA: string; bgB: string; accent: string; secondary: string; glow: string }
> = {
  home: { bgA: "#eff6ff", bgB: "#dbeafe", accent: "#2563eb", secondary: "#93c5fd", glow: "#bfdbfe" },
  services: { bgA: "#f8fafc", bgB: "#e0f2fe", accent: "#1d4ed8", secondary: "#60a5fa", glow: "#dbeafe" },
  projects: { bgA: "#f1f5f9", bgB: "#dbeafe", accent: "#1d4ed8", secondary: "#38bdf8", glow: "#bfdbfe" },
  about: { bgA: "#eff6ff", bgB: "#e2e8f0", accent: "#1d4ed8", secondary: "#93c5fd", glow: "#dbeafe" },
  residential: { bgA: "#eff6ff", bgB: "#dbeafe", accent: "#2563eb", secondary: "#60a5fa", glow: "#bfdbfe" },
  commercial: { bgA: "#f8fafc", bgB: "#dbeafe", accent: "#1d4ed8", secondary: "#38bdf8", glow: "#bae6fd" },
  construction: { bgA: "#f8fafc", bgB: "#e2e8f0", accent: "#1d4ed8", secondary: "#94a3b8", glow: "#cbd5e1" },
  planning: { bgA: "#f8fafc", bgB: "#e0f2fe", accent: "#0284c7", secondary: "#38bdf8", glow: "#bae6fd" },
  delivery: { bgA: "#eff6ff", bgB: "#dbeafe", accent: "#2563eb", secondary: "#818cf8", glow: "#c7d2fe" },
  team: { bgA: "#eff6ff", bgB: "#dbeafe", accent: "#1d4ed8", secondary: "#60a5fa", glow: "#bfdbfe" },
  trust: { bgA: "#f8fafc", bgB: "#dbeafe", accent: "#1d4ed8", secondary: "#38bdf8", glow: "#bfdbfe" },
  design: { bgA: "#eff6ff", bgB: "#e0f2fe", accent: "#2563eb", secondary: "#22d3ee", glow: "#bae6fd" },
  values: { bgA: "#f8fafc", bgB: "#dbeafe", accent: "#1d4ed8", secondary: "#60a5fa", glow: "#c7d2fe" },
  mission: { bgA: "#eff6ff", bgB: "#dbeafe", accent: "#1d4ed8", secondary: "#38bdf8", glow: "#bfdbfe" },
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

function shapeByTheme(theme: HoverTheme, accent: string, secondary: string) {
  switch (theme) {
    case "home":
    case "residential":
      return `
        <g opacity="0.9" stroke="${accent}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M220 660V430l250-170 250 170v230" />
          <path d="M320 660V520h200v140" />
          <path d="M650 660V420l160-110 160 110v240" />
        </g>
      `;
    case "commercial":
      return `
        <g opacity="0.9" fill="${accent}">
          <rect x="180" y="300" width="170" height="400" rx="24" opacity="0.8" />
          <rect x="390" y="240" width="210" height="460" rx="24" opacity="0.92" />
          <rect x="640" y="340" width="190" height="360" rx="24" opacity="0.72" />
          <rect x="870" y="280" width="160" height="420" rx="24" opacity="0.62" />
        </g>
      `;
    case "construction":
      return `
        <g opacity="0.9" stroke="${accent}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M240 690l140-140 110 110 180-180 180 180" />
          <path d="M260 540h430" />
          <path d="M770 690l110-110 160 160" />
          <path d="M1020 690H240" />
        </g>
      `;
    case "planning":
      return `
        <g opacity="0.92" stroke="${accent}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <rect x="240" y="220" width="520" height="460" rx="36" />
          <path d="M340 320h320M340 410h220M340 500h280" />
          <path d="M860 260l180-80" />
          <path d="M860 520l180 80" />
        </g>
      `;
    case "delivery":
      return `
        <g opacity="0.9" stroke="${accent}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M220 560h220l90-120h220l110 120h110" />
          <circle cx="360" cy="650" r="54" fill="${secondary}" stroke="none" />
          <circle cx="860" cy="650" r="54" fill="${secondary}" stroke="none" />
          <path d="M310 470h220M560 470h160" />
        </g>
      `;
    case "team":
      return `
        <g opacity="0.92" fill="${accent}">
          <circle cx="340" cy="390" r="74" opacity="0.9" />
          <circle cx="560" cy="340" r="84" opacity="0.76" />
          <circle cx="790" cy="390" r="74" opacity="0.88" />
          <path d="M230 680c0-110 90-180 170-180s170 70 170 180" opacity="0.85" />
          <path d="M460 680c0-120 100-200 200-200s200 80 200 200" opacity="0.7" />
        </g>
      `;
    case "trust":
      return `
        <g opacity="0.9" stroke="${accent}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M310 280h320l160 160-160 160H310L170 440 310 280Z" />
          <path d="m340 440 100 100 190-210" />
        </g>
      `;
    case "design":
      return `
        <g opacity="0.9" stroke="${accent}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M250 650c150-230 260-330 430-410" />
          <path d="M370 650c110-180 210-260 360-320" />
          <path d="M520 690c110-100 210-160 360-200" />
          <circle cx="810" cy="250" r="54" fill="${secondary}" stroke="none" opacity="0.8" />
        </g>
      `;
    case "values":
      return `
        <g opacity="0.9" stroke="${accent}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M220 620h320l120-300 120 220h220" />
          <path d="M290 520h220M610 460h180M770 540h140" />
        </g>
      `;
    case "mission":
      return `
        <g opacity="0.92" stroke="${accent}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M520 220 300 360l80 300h280l80-300-220-140Z" />
          <path d="m520 320 48 96 106 16-77 74 18 105-95-50-95 50 18-105-77-74 106-16 48-96Z" />
        </g>
      `;
    default:
      return "";
  }
}

export function makeHoverImage({ title, variant, theme }: HoverImageOptions) {
  const palette = themeMap[theme];
  const seed = hashString(`${variant}:${title}`);
  const circleX = 180 + (seed % 220);
  const circleY = 190 + (seed % 160);
  const rectX = 700 + (seed % 130);
  const rectY = 180 + (seed % 180);
  const rotation = seed % 18;
  const subtitle = theme.replace(/-/g, " ").toUpperCase();
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="${escapeXml(title)}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${palette.bgA}" />
          <stop offset="100%" stop-color="${palette.bgB}" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="${palette.glow}" stop-opacity="0.95" />
          <stop offset="100%" stop-color="${palette.glow}" stop-opacity="0" />
        </radialGradient>
        <filter id="blur"><feGaussianBlur stdDeviation="28" /></filter>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)" />
      <circle cx="${circleX}" cy="${circleY}" r="210" fill="${palette.secondary}" opacity="0.18" filter="url(#blur)" />
      <circle cx="${1100 - (seed % 180)}" cy="${220 + (seed % 240)}" r="170" fill="${palette.glow}" opacity="0.16" filter="url(#blur)" />
      <g transform="translate(${rectX} ${rectY}) rotate(${rotation})">
        <rect x="-140" y="-100" width="280" height="200" rx="40" fill="${palette.accent}" opacity="0.11" />
      </g>
      <g opacity="0.35" stroke="${palette.accent}" stroke-width="4">
        <path d="M80 140h1040M80 760h1040M120 180v520M1080 180v520" opacity="0.2" />
      </g>
      ${shapeByTheme(theme, palette.accent, palette.secondary)}
      <g opacity="0.85" font-family="Inter, Arial, sans-serif">
        <text x="88" y="784" font-size="58" font-weight="700" fill="${palette.accent}" letter-spacing="2">${escapeXml(title)}</text>
        <text x="88" y="834" font-size="24" font-weight="600" fill="${palette.accent}" opacity="0.65" letter-spacing="5">${subtitle}</text>
        <text x="88" y="872" font-size="16" font-weight="600" fill="${palette.accent}" opacity="0.4">${escapeXml(variant)}</text>
      </g>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
