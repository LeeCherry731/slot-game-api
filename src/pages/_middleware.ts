// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/login")) {
    // return NextResponse.redirect(new URL("/about-2", request.url));
    const jwt = req.cookies.OursiteJWT;
    //@ts-ignore
    if (!jwt) return NextResponse.next();

    const secret = process.env.TOKEN_SECRET;
    //  return NextResponse.rewrite(new URL("/about-2", request.url));
    try {
      const isJwt = verify(jwt, secret);
      //@ts-ignore
      if (!isJwt) return NextResponse.next();
      //@ts-ignore
      if (isJwt) {
        //@ts-ignore
        return NextResponse.rewrite(
          //@ts-ignore
          new URL("/admin/dashboard", req.url)
        );
      }
    } catch (e) {
      //@ts-ignore
      return NextResponse.next();
    }
  }
}
