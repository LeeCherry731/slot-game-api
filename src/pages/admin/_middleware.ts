// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  // return NextResponse.redirect(new URL("/about-2", request.url));
  const jwt = req.cookies.OursiteJWT;
  //@ts-ignore
  if (!jwt) return NextResponse.rewrite(new URL("/login", req.url));

  const secret = process.env.TOKEN_SECRET;
  //  return NextResponse.rewrite(new URL("/about-2", request.url));
  try {
    const isJwt = verify(jwt, secret);
    //@ts-ignore
    if (!isJwt) return NextResponse.rewrite(new URL("/login", req.url));
    //@ts-ignore
    NextResponse.next();
  } catch (e) {
    //@ts-ignore
    return NextResponse.rewrite(new URL("/login", req.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  //   matcher: "/about/:path*",
  //   matcher: "/admin/:path*",
  //   matcher: ["/about/:path*", "/dashboard/:path*"],
  matcher: "/admin/:path*",
};
