// app/api/refresh-token/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import db from "@/db/client";
import * as jose from "jose";
import { JWTsecret, alg } from "@/constants/constants";
import { RefreshTokens, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const url = new URL(req.url);
  const callback = url.searchParams.get("callback") || "/";

  // Redirect to login if no token
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Check if refresh token is valid in DB
  const tokenMatchArr = await db.select().from(RefreshTokens).where(eq(RefreshTokens.token,refreshToken))

  if (!tokenMatchArr) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  const tokenMatch = tokenMatchArr[0];

  const name = tokenMatch.userName;

  // Create new access token (1 min expiry for example)
  const accessToken = await new jose.SignJWT({ name })
    .setProtectedHeader({ alg })
    .setExpirationTime("15m")
    .sign(JWTsecret);

  // Set the new accessToken cookie
  const res = NextResponse.redirect(new URL(callback, req.url));
  res.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    path: "/",
    maxAge: 15*60, // 1 minute
    secure: true,
    sameSite: "strict",
  });
  console.log("refreshed")
  return res;
}
