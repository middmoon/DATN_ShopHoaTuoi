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
  const token = request.cookies.get("accessToken");

  // console.log(request.cookies.get("roles"));

  const loginUrl = new URL("/login", request.url);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  if (!request.cookies.get("roles")) {
    return NextResponse.redirect("/unauthorized");
  }

  if (request.nextUrl.pathname.startsWith("/dashboard/product")) {
    return productMiddleware(request);
  }

  if (request.nextUrl.pathname.startsWith("/dashboard/income")) {
    return incomeMiddleware(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
