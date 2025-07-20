import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const isAdmin = request.cookies.get("isAdmin")?.value;

  if (
    url.pathname.startsWith("/app/admin") &&
    !url.pathname.startsWith("/app/admin/login")
  ) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/app/admin/login", request.url));
    }
  }

  return NextResponse.next();
}
