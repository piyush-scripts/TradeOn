import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import axios from "axios";



export default async function middleware(req: NextRequest) {
    const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  try {
    const decoded = jwt.verify(accessToken, "jwt_access_token_secret");    
    return NextResponse.next();
  } catch (err) {
    // Maybe redirect to API route to refresh token
    
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/profile/:path*"],
};
