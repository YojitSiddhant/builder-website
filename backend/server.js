import "dotenv/config";
import crypto from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { neon } from "@neondatabase/serverless";

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 120,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

const PORT = Number(process.env.PORT ?? 3001);
const NODE_ENV = process.env.NODE_ENV ?? "development";
const DATABASE_URL = process.env.DATABASE_URL?.trim() ?? "";
const BACKEND_API_TOKEN = process.env.BACKEND_API_TOKEN?.trim() ?? "";
const VISIT_FILE_PATH = path.join(process.cwd(), "data", "site-visits.json");

const VISIT_SLOT_OPTIONS = [
  "Morning - 9:00 AM to 12:00 PM",
  "Afternoon - 12:00 PM to 3:00 PM",
  "Evening - 3:00 PM to 6:00 PM",
];

const VISIT_PURPOSE_OPTIONS = [
  "Initial site visit",
  "Project consultation",
  "Design discussion",
  "Progress review",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s()-]{8,20}$/;

/** @type {ReturnType<typeof neon> | null} */
let neonClient = null;
/** @type {Promise<void> | null} */
let schemaPromise = null;

app.get("/healthz", (_request, response) => {
  response.json({
    ok: true,
    service: "builder-backend",
    mode: DATABASE_URL ? "database" : "file-fallback",
    databaseConfigured: Boolean(DATABASE_URL),
    tokenConfigured: Boolean(BACKEND_API_TOKEN),
  });
});

app.post("/api/site-visits", async (request, response) => {
  try {
    const validation = validateSiteVisitInput(request.body);
    if (!validation.ok) {
      response.status(400).json({ error: validation.message });
      return;
    }

    const visit = await appendSiteVisitRequest(validation.data);
    response.status(201).json({
      visit,
      message: "Your site visit request has been sent.",
    });
  } catch (error) {
    handleError(error, response);
  }
});

app.get("/api/site-visits", requireServiceToken, async (_request, response) => {
  try {
    const visits = await readSiteVisitRequests();
    response.json({ visits });
  } catch (error) {
    handleError(error, response);
  }
});

app.patch("/api/site-visits", requireServiceToken, async (request, response) => {
  try {
    const payload = request.body;
    if (!payload || typeof payload !== "object") {
      response.status(400).json({ error: "Request body must be valid JSON." });
      return;
    }

    const { id, status } = /** @type {{ id?: unknown; status?: unknown }} */ (payload);
    if (typeof id !== "string" || typeof status !== "string") {
      response.status(400).json({ error: "Request id and status are required." });
      return;
    }

    if (!isValidStatus(status)) {
      response.status(400).json({ error: "Invalid status." });
      return;
    }

    const visit = await updateSiteVisitStatus(id, status);
    if (!visit) {
      response.status(404).json({ error: "Visit request not found." });
      return;
    }

    response.json({
      visit,
      message: "Visit status updated.",
    });
  } catch (error) {
    handleError(error, response);
  }
});

app.use((_request, response) => {
  response.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Builder backend listening on http://0.0.0.0:${PORT}`);
});

async function readSiteVisitRequests() {
  const client = getNeonClient();
  if (client) {
    await ensureSchema(client);
    const rows = /** @type {SiteVisitDbRow[]} */ (
      await client`
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
      `
    );

    return rows.map(mapDbRowToVisit);
  }

  if (NODE_ENV === "production") {
    throw new Error("DATABASE_URL is required in production.");
  }

  return await readVisitFile();
}

async function appendSiteVisitRequest(input) {
  const visit = {
    id: crypto.randomUUID(),
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

  if (NODE_ENV === "production") {
    throw new Error("DATABASE_URL is required in production.");
  }

  const visits = await readVisitFile();
  visits.unshift(visit);
  await writeVisitFile(visits);
  return visit;
}

async function updateSiteVisitStatus(id, status) {
  const client = getNeonClient();
  if (client) {
    await ensureSchema(client);
    const rows = /** @type {SiteVisitDbRow[]} */ (
      await client`
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
      `
    );

    return rows[0] ? mapDbRowToVisit(rows[0]) : null;
  }

  if (NODE_ENV === "production") {
    throw new Error("DATABASE_URL is required in production.");
  }

  const visits = await readVisitFile();
  const nextVisits = visits.map((visit) => (visit.id === id ? { ...visit, status } : visit));
  const updatedVisit = nextVisits.find((visit) => visit.id === id) ?? null;

  if (!updatedVisit) {
    return null;
  }

  await writeVisitFile(nextVisits);
  return updatedVisit;
}

function validateSiteVisitInput(input) {
  if (!input || typeof input !== "object") {
    return { ok: false, message: "Invalid request payload." };
  }

  const values = /** @type {Record<string, unknown>} */ (input);

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
  if (fullName.length < 2) return { ok: false, message: "Please enter your full name." };

  if (!phoneNumber) return { ok: false, message: "Phone number is required." };
  if (!PHONE_PATTERN.test(phoneNumber)) {
    return { ok: false, message: "Enter a valid phone number." };
  }

  if (!emailAddress) return { ok: false, message: "Email address is required." };
  if (!EMAIL_PATTERN.test(emailAddress)) {
    return { ok: false, message: "Enter a valid email address." };
  }

  if (!preferredDate) return { ok: false, message: "Please choose a visit date." };
  if (preferredDate < getTodayLocalDate()) {
    return { ok: false, message: "Visit date cannot be in the past." };
  }

  if (!preferredSlot) return { ok: false, message: "Please choose a preferred time slot." };
  if (!VISIT_SLOT_OPTIONS.includes(preferredSlot)) {
    return { ok: false, message: "Please select a valid time slot." };
  }

  if (!Number.isInteger(visitors) || visitors < 1 || visitors > 20) {
    return { ok: false, message: "Visitors must be between 1 and 20." };
  }

  if (!purpose) return { ok: false, message: "Please tell us the purpose of the visit." };
  if (!VISIT_PURPOSE_OPTIONS.includes(purpose)) {
    return { ok: false, message: "Please select a valid visit purpose." };
  }

  if (!notes) return { ok: false, message: "Please add a few visit details." };
  if (notes.length < 15) return { ok: false, message: "Please add a little more detail." };

  if (!consent) return { ok: false, message: "Please agree to be contacted." };

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

function getTodayLocalDate() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
}

function toText(value) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function getNeonClient() {
  if (!DATABASE_URL) {
    if (NODE_ENV === "production") {
      return null;
    }

    return null;
  }

  if (!neonClient) {
    neonClient = neon(DATABASE_URL);
  }

  return neonClient;
}

async function ensureSchema(client) {
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

function mapDbRowToVisit(row) {
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

async function readVisitFile() {
  try {
    const raw = await readFile(VISIT_FILE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch (error) {
    const code = error?.code;
    if (code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function writeVisitFile(visits) {
  await mkdir(path.dirname(VISIT_FILE_PATH), { recursive: true });
  await writeFile(VISIT_FILE_PATH, JSON.stringify(visits, null, 2), "utf8");
}

function requireServiceToken(request, response, next) {
  if (!BACKEND_API_TOKEN) {
    if (NODE_ENV === "production") {
      response.status(503).json({ error: "Backend token is not configured." });
      return;
    }

    next();
    return;
  }

  const token = request.get("x-backend-token") ?? "";
  if (!safeCompare(token, BACKEND_API_TOKEN)) {
    response.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}

function isValidStatus(status) {
  return ["new", "reviewed", "confirmed", "completed"].includes(status);
}

function safeCompare(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function handleError(error, response) {
  console.error(error);
  response.status(500).json({
    error: error instanceof Error ? error.message : "Internal server error",
  });
}
