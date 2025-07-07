// app/api/refresh-token/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as jose from "jose";
import { JWTsecret, alg } from "@/constants/constants";

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
  const tokenMatch = await prisma.refreshTokens.findFirst({
    where: { token: refreshToken },
  });

  if (!tokenMatch) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

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
