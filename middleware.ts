import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// List of protected routes (add more as needed)
const protectedRoutes = ["/admin", "/profile", "/address", "/checkout"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) {
      // Redirect to /auth with callbackUrl
      const callbackUrl = encodeURIComponent(pathname);
      return NextResponse.redirect(
        new URL(`/auth?callbackUrl=${callbackUrl}`, request.url)
      );
    }

    // For admin, check role
    if (pathname.startsWith("/admin")) {
      try {
        const JWT_SECRET = new TextEncoder().encode(
          process.env.JWT_SECRET || "your-secret-key-change-in-production"
        );
        const { payload } = await jwtVerify(token, JWT_SECRET);

        if (payload.role !== "admin") {
          return NextResponse.redirect(
            new URL(
              `/auth?callbackUrl=${encodeURIComponent(pathname)}`,
              request.url
            )
          );
        }
      } catch (error) {
        console.error("JWT verification error in middleware:", error);
        return NextResponse.redirect(
          new URL(
            `/auth?callbackUrl=${encodeURIComponent(pathname)}`,
            request.url
          )
        );
      }
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
    "/address/:path*",
    "/checkout/:path*",
  ],
};
