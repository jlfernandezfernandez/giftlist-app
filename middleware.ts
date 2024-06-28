// middleware.ts
import { NextResponse } from "next/server";

export default function middleware(req: {
  nextUrl: { pathname: any };
  cookies: { get: (arg0: string) => any };
  url: string | URL | undefined;
}) {
  const { pathname } = req.nextUrl;
  const isAuthPage = pathname.startsWith("/login");
  const isProtectedRoute = pathname.startsWith("/profile");

  if (isAuthPage) {
    if (req.cookies.get("next-auth.session-token")) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
    return NextResponse.next();
  }

  if (isProtectedRoute) {
    if (!req.cookies.get("next-auth.session-token")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/login"],
};
