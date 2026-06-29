import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type SiteVisitStatus = "new" | "reviewed" | "confirmed" | "completed";

export type SiteVisitRequest = {
  id: string;
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  preferredDate: string;
  preferredSlot: string;
  visitors: number;
  purpose: string;
  notes: string;
  consent: boolean;
  status: SiteVisitStatus;
  createdAt: string;
};

export type SiteVisitInput = Omit<
  SiteVisitRequest,
  "id" | "status" | "createdAt"
>;

export type SiteVisitValidationResult =
  | { ok: true; data: SiteVisitInput }
  | { ok: false; message: string };

const VISIT_FILE_PATH = path.join(process.cwd(), "data", "site-visits.json");

const VISIT_SLOT_OPTIONS = [
  "Morning - 9:00 AM to 12:00 PM",
  "Afternoon - 12:00 PM to 3:00 PM",
  "Evening - 3:00 PM to 6:00 PM",
] as const;

const VISIT_PURPOSE_OPTIONS = [
  "Initial site visit",
  "Project consultation",
  "Design discussion",
  "Progress review",
] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s()-]{8,20}$/;

export function getVisitSlotOptions() {
  return [...VISIT_SLOT_OPTIONS];
}

export function getVisitPurposeOptions() {
  return [...VISIT_PURPOSE_OPTIONS];
}

export function getTodayLocalDate() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

export function validateSiteVisitInput(input: unknown): SiteVisitValidationResult {
  if (!input || typeof input !== "object") {
    return { ok: false, message: "Invalid request payload." };
  }

  const values = input as Partial<Record<keyof SiteVisitInput, unknown>>;

  const fullName = toText(values.fullName);
  const phoneNumber = toText(values.phoneNumber);
  const emailAddress = toText(values.emailAddress);
  const preferredDate = toText(values.preferredDate);
  const preferredSlot = toText(values.preferredSlot);
  const purpose = toText(values.purpose);
  const notes = toText(values.notes);
  const visitors = Number(values.visitors);
  const consent =
    values.consent === true ||
    values.consent === "true" ||
    values.consent === "on" ||
    values.consent === 1;

  if (!fullName) return { ok: false, message: "Full name is required." };
  if (fullName.length < 2) {
    return { ok: false, message: "Please enter your full name." };
  }

  if (!phoneNumber) return { ok: false, message: "Phone number is required." };
  if (!PHONE_PATTERN.test(phoneNumber)) {
    return { ok: false, message: "Enter a valid phone number." };
  }

  if (!emailAddress) return { ok: false, message: "Email address is required." };
  if (!EMAIL_PATTERN.test(emailAddress)) {
    return { ok: false, message: "Enter a valid email address." };
  }

  if (!preferredDate) {
    return { ok: false, message: "Please choose a visit date." };
  }

  if (preferredDate < getTodayLocalDate()) {
    return { ok: false, message: "Visit date cannot be in the past." };
  }

  if (!preferredSlot) {
    return { ok: false, message: "Please choose a preferred time slot." };
  }

  if (!VISIT_SLOT_OPTIONS.includes(preferredSlot as (typeof VISIT_SLOT_OPTIONS)[number])) {
    return { ok: false, message: "Please select a valid time slot." };
  }

  if (!Number.isInteger(visitors) || visitors < 1 || visitors > 20) {
    return { ok: false, message: "Visitors must be between 1 and 20." };
  }

  if (!purpose) {
    return { ok: false, message: "Please tell us the purpose of the visit." };
  }

  if (!VISIT_PURPOSE_OPTIONS.includes(purpose as (typeof VISIT_PURPOSE_OPTIONS)[number])) {
    return { ok: false, message: "Please select a valid visit purpose." };
  }

  if (!notes) return { ok: false, message: "Please add a few visit details." };
  if (notes.length < 15) {
    return { ok: false, message: "Please add a little more detail." };
  }

  if (!consent) {
    return { ok: false, message: "Please agree to be contacted." };
  }

  return {
    ok: true,
    data: {
      fullName,
      phoneNumber,
      emailAddress,
      preferredDate,
      preferredSlot,
      visitors,
      purpose,
      notes,
      consent,
    },
  };
}

export async function readSiteVisitRequests() {
  try {
    const raw = await readFile(VISIT_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed as SiteVisitRequest[];
  } catch (error) {
    const code = (error as NodeJS.ErrnoException | undefined)?.code;
    if (code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function appendSiteVisitRequest(input: SiteVisitInput) {
  const visit: SiteVisitRequest = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
    ...input,
  };

  const visits = await readSiteVisitRequests();
  visits.unshift(visit);

  await mkdir(path.dirname(VISIT_FILE_PATH), { recursive: true });
  await writeFile(VISIT_FILE_PATH, JSON.stringify(visits, null, 2), "utf8");

  return visit;
}

export async function updateSiteVisitStatus(id: string, status: SiteVisitStatus) {
  const visits = await readSiteVisitRequests();
  const nextVisits = visits.map((visit) =>
    visit.id === id ? { ...visit, status } : visit,
  );
  const updatedVisit = nextVisits.find((visit) => visit.id === id);

  if (!updatedVisit) {
    return null;
  }

  await mkdir(path.dirname(VISIT_FILE_PATH), { recursive: true });
  await writeFile(VISIT_FILE_PATH, JSON.stringify(nextVisits, null, 2), "utf8");

  return updatedVisit;
}

function toText(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}
