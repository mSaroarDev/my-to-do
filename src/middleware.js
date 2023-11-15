import { NextResponse } from "next/server";
import { CheckCookieAuth } from "./utils/MiddlewareUtils";

export async function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    return await CheckCookieAuth(req);
  }
  let token = req.cookies.get("token");
  if (token && req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}

// export async function middleware(req) {
//   if (req.nextUrl.pathname.startsWith('/dashboard')) {
//       return await CheckCookieAuth(req)
//   }
// }
