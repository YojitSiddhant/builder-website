import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "builder_admin_session";
const ADMIN_SESSION_TTL_MS = 1000 * 60 * 60 * 8;

type AdminSessionPayload = {
  exp: number;
};

export function getAdminCredentials() {
  const password =
    process.env.ADMIN_PASSWORD?.trim() ??
    (process.env.NODE_ENV === "production" ? "" : "123");
  const secret =
    process.env.ADMIN_SESSION_SECRET?.trim() ??
    (process.env.NODE_ENV === "production" ? "" : "dev-admin-session-secret");

  return { password, secret };
}

export function hasAdminCredentials() {
  const { password, secret } = getAdminCredentials();
  return Boolean(password && secret);
}

export function createAdminSession() {
  const { secret } = getAdminCredentials();
  const payload: AdminSessionPayload = {
    exp: Date.now() + ADMIN_SESSION_TTL_MS,
  };
  return signPayload(payload, secret);
}

export function verifyAdminSession(token: string | undefined) {
  const { secret } = getAdminCredentials();

  if (!token || !secret) {
    return false;
  }

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return false;
  }

  const expectedSignature = signValue(encodedPayload, secret);
  if (!safeCompare(signature, expectedSignature)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as AdminSessionPayload;
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export async function requireAdmin() {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  return verifyAdminSession(token);
}

export async function getAdminCookieStore() {
  return await cookies();
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
}

function signPayload(payload: AdminSessionPayload, secret: string) {
  const encodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = signValue(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

function signValue(value: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}
