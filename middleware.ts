import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";
import { JWTsecret } from "@/constants/constants"; // Ensure this is a `Uint8Array` or string key

export default async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  // If no token, redirect to /api/refresh with callback
  if (!accessToken) {
    console.log("No access token, redirecting to /api/refresh");
    return redirectToRefresh(req);
  }

  try {
    // Verify token
    await jose.jwtVerify(accessToken, JWTsecret);
    return NextResponse.next();
  } catch (err) {
    console.log("Invalid access token:", err);
    return redirectToRefresh(req);
  }
}

function redirectToRefresh(req: NextRequest) {
  const currentUrl = req.nextUrl.clone();
  const refreshUrl = new URL("/api/refresh", req.url);

  // Optional: pass current path as callback
  refreshUrl.searchParams.set("callback", currentUrl.pathname);

  return NextResponse.redirect(refreshUrl);
}

export const config = {
  matcher: ["/profile/:path*", "/funds/:path*", "/trades/:path*","/api/placeOrder"],
};
