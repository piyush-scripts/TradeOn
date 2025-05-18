import { NextRequest,NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import prisma from "@/lib/prisma";

export async function POST(req:NextRequest) {
    const cookiestore = await cookies();
    const userToken = cookiestore.get('refreshToken')?.value

    if(!userToken) return NextResponse.json({error : "Unauthorized"},{status:401})
    const tokenMatch = await prisma.refreshTokens.findFirst({where:{token:userToken}})
    if(!tokenMatch) return NextResponse.json({error: "Forbidden"},{status:403})
    
    const accessToken = await jwt.sign(tokenMatch.userName,"jwt_access_token_secret",{expiresIn : "15m"})

    return NextResponse.json({"AccessToken" : accessToken})
}