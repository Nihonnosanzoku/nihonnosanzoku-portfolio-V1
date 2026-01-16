// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Ana sayfa ve API yolları izinli
  const allowedPaths = ["/", "/api", "/_next", "/404"]; // 404'ü ekledik

  // Eğer izinli değilse ana sayfaya yönlendir
  if (!allowedPaths.some((p) => pathname === p || pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
