import { adminCookieOptions, ADMIN_SESSION_COOKIE } from "@/lib/admin-auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    ...adminCookieOptions(),
    maxAge: 0,
  });
  return response;
}
