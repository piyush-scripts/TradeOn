import { NextResponse } from "next/server";
import db from "@/db/client";
import { cookies } from "next/headers";
import { JWTsecret } from "@/constants/constants";
import { payloadSchema } from "../placeOrder/types";
import * as jose from 'jose'
import { users } from "@/db/schema";

export async function GET(){
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
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
            const name = result.data.name;
        } catch (error) {
            console.error(error)
            return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
        }
        const user_data = await db.select().from(users);
        return NextResponse.json({user_data},{status: 201})
}