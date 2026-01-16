// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Ana sayfa hariç her şeyi kapat
  if (
    pathname !== "/" &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
 