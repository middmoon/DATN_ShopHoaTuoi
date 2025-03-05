import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function productMiddleware(request: NextRequest) {
  console.log("Middleware /product");
  return NextResponse.next();
}

function incomeMiddleware(request: NextRequest) {
  console.log("Middleware /income");
  return NextResponse.next();
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const roles = request.cookies.get("roles")?.value;
  const url = request.nextUrl.clone();
  const pathname = request.nextUrl.pathname;

  if (pathname === "/login" && token) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (pathname === "/login") {
    return NextResponse.next();
  }

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (!roles) {
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/dashboard/product")) {
    return productMiddleware(request);
  }

  if (pathname.startsWith("/dashboard/income")) {
    return incomeMiddleware(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/unauthorized"],
};
