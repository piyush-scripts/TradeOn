import { NextResponse } from "next/server";
import db from "@/db/client";
import { cookies } from "next/headers";
import { JWTsecret } from "@/constants/constants";
import { payloadSchema } from "../placeOrder/types";
import * as jose from 'jose'
import { Holdings } from "@/db/schema";
import {eq} from 'drizzle-orm'

export async function GET(){
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    let userName: string | undefined;
    if (!accessToken) {
        return NextResponse.json({ error: "auth key not found" }, { status: 409 })
    }
    try {
        console.info(accessToken)
        const josePayload = await jose.jwtVerify(accessToken, JWTsecret)
        const payload = josePayload.payload
        const result = payloadSchema.safeParse(payload);
        if (!result.success) {
            return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
        }
        userName = result.data.name;
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
    }
    const holdings = await db.select().from(Holdings).where(eq(Holdings.userName, userName));
    return NextResponse.json({holdings},{status: 201})
}