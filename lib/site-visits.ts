import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import { neon } from "@neondatabase/serverless";
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
const DATABASE_URL =
  process.env.POSTGRES_URL?.trim() ??
  process.env.DATABASE_URL?.trim() ??
  "";

type SiteVisitDbRow = {
  id: string;
  full_name: string;
  phone_number: string;
  email_address: string;
  preferred_date: string;
  preferred_slot: string;
  visitors: number;
  purpose: string;
  notes: string;
  consent: boolean;
  status: SiteVisitStatus;
  created_at: string;
};

let neonClient: ReturnType<typeof neon> | null = null;
let schemaPromise: Promise<void> | null = null;

export function getVisitSlotOptions() {
  return [...VISIT_SLOT_OPTIONS];
}

export function getVisitPurposeOptions() {
  return [...VISIT_PURPOSE_OPTIONS];
}

export function getVisitBackendLabel() {
  return hasDatabaseConfig() ? "Hosted database" : "Local development fallback";
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

export async function readSiteVisitRequests(): Promise<SiteVisitRequest[]> {
  const client = getNeonClient();
  if (client) {
    await ensureSchema(client);
    const rows = (await client`
      SELECT
        id,
        full_name,
        phone_number,
        email_address,
        preferred_date,
        preferred_slot,
        visitors,
        purpose,
        notes,
        consent,
        status,
        created_at
      FROM site_visit_requests
      ORDER BY created_at DESC
    `) as SiteVisitDbRow[];

    return rows.map(mapDbRowToVisit);
  }

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

export async function appendSiteVisitRequest(
  input: SiteVisitInput,
): Promise<SiteVisitRequest> {
  const visit: SiteVisitRequest = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
    ...input,
  };

  const client = getNeonClient();
  if (client) {
    await ensureSchema(client);
    await client`
      INSERT INTO site_visit_requests (
        id,
        full_name,
        phone_number,
        email_address,
        preferred_date,
        preferred_slot,
        visitors,
        purpose,
        notes,
        consent,
        status,
        created_at
      ) VALUES (
        ${visit.id},
        ${visit.fullName},
        ${visit.phoneNumber},
        ${visit.emailAddress},
        ${visit.preferredDate},
        ${visit.preferredSlot},
        ${visit.visitors},
        ${visit.purpose},
        ${visit.notes},
        ${visit.consent},
        ${visit.status},
        ${visit.createdAt}
      )
    `;
    return visit;
  }

  const visits = await readSiteVisitRequests();
  visits.unshift(visit);

  await mkdir(path.dirname(VISIT_FILE_PATH), { recursive: true });
  await writeFile(VISIT_FILE_PATH, JSON.stringify(visits, null, 2), "utf8");

  return visit;
}

export async function updateSiteVisitStatus(
  id: string,
  status: SiteVisitStatus,
): Promise<SiteVisitRequest | null> {
  const client = getNeonClient();
  if (client) {
    await ensureSchema(client);
    const rows = (await client`
      UPDATE site_visit_requests
      SET status = ${status}
      WHERE id = ${id}
      RETURNING
        id,
        full_name,
        phone_number,
        email_address,
        preferred_date,
        preferred_slot,
        visitors,
        purpose,
        notes,
        consent,
        status,
        created_at
    `) as SiteVisitDbRow[];

    return rows[0] ? mapDbRowToVisit(rows[0] as SiteVisitDbRow) : null;
  }

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

function hasDatabaseConfig() {
  return Boolean(DATABASE_URL);
}

function getNeonClient() {
  if (!hasDatabaseConfig()) {
    return null;
  }

  if (!neonClient) {
    neonClient = neon(DATABASE_URL);
  }

  return neonClient;
}

async function ensureSchema(client: ReturnType<typeof neon>) {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      await client`
        CREATE TABLE IF NOT EXISTS site_visit_requests (
          id text PRIMARY KEY,
          full_name text NOT NULL,
          phone_number text NOT NULL,
          email_address text NOT NULL,
          preferred_date text NOT NULL,
          preferred_slot text NOT NULL,
          visitors integer NOT NULL,
          purpose text NOT NULL,
          notes text NOT NULL,
          consent boolean NOT NULL,
          status text NOT NULL,
          created_at text NOT NULL
        )
      `;

      await client`
        CREATE INDEX IF NOT EXISTS site_visit_requests_created_at_idx
        ON site_visit_requests (created_at DESC)
      `;
    })();
  }

  await schemaPromise;
}

function mapDbRowToVisit(row: SiteVisitDbRow): SiteVisitRequest {
  return {
    id: row.id,
    fullName: row.full_name,
    phoneNumber: row.phone_number,
    emailAddress: row.email_address,
    preferredDate: row.preferred_date,
    preferredSlot: row.preferred_slot,
    visitors: row.visitors,
    purpose: row.purpose,
    notes: row.notes,
    consent: row.consent,
    status: row.status,
    createdAt: row.created_at,
  };
}

function toText(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}
