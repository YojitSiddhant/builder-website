import {
  adminCookieOptions,
  createAdminSession,
  getAdminCredentials,
} from "@/lib/admin-auth";
import crypto from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "").trim();
  const { password: expectedPassword, secret } = getAdminCredentials();

  if (!expectedPassword || !secret) {
    return NextResponse.redirect(new URL("/admin/login?error=config", request.url));
  }

  if (!safeCompare(password, expectedPassword)) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url));
  }

  const response = NextResponse.redirect(new URL("/admin/visits", request.url));
  response.cookies.set(
    "builder_admin_session",
    createAdminSession(),
    adminCookieOptions(),
  );
  return response;
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}
