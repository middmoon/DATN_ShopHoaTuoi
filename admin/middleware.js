import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // return NextResponse.redirect(new URL('/home', request.url))
  console.log(`request.nextUrl.pathname:::::::: ${request.nextUrl.pathname}`);
}

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*",
// };
