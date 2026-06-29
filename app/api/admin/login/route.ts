import { adminCookieOptions, createAdminSession, getAdminCredentials } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const { username: expectedUsername, password: expectedPassword, secret } = getAdminCredentials();

  if (!expectedUsername || !expectedPassword || !secret) {
    return NextResponse.redirect(new URL("/admin/login?error=config", request.url));
  }

  if (username !== expectedUsername || password !== expectedPassword) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url));
  }

  const response = NextResponse.redirect(new URL("/admin/visits", request.url));
  response.cookies.set("builder_admin_session", createAdminSession(username), adminCookieOptions());
  return response;
}
