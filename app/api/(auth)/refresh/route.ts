// /api/refresh-token.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) return NextResponse.redirect(new URL("/signin", req.url));

  const tokenMatch = await prisma.refreshTokens.findFirst({
    where: { token: refreshToken },
  });

  if (!tokenMatch) return NextResponse.redirect(new URL("/signin", req.url));

  const accessToken = jwt.sign(
    { userName: tokenMatch.userName },
    "jwt_access_token_secret",
    { expiresIn: "15m" }
  );

  const res = NextResponse.json({ success: true });
  res.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    path: "/",
    maxAge: 15 * 60,
    secure: true,
    sameSite: "strict",
  });

  return res;
}
