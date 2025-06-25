import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'
import { JWTsecret } from "@/constants/constants";


export default async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
    console.log("got access token ")
  try {
    console.log("verifying")
    jose.jwtVerify(accessToken,JWTsecret);
    console.log(" verified ")
    return NextResponse.next();
  } catch (err) {
    console.log(err)
    // Maybe redirect to API route to refresh token
    
    console.log("didn't verified")
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/profile/:path*"],
};