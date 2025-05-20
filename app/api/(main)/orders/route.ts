import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { OrderSchema, orderSchema, payloadSchema, PayloadSchema } from "@/zod/zodScheama";




export async function POST(request: NextRequest) {

    const accessToken = request.headers.get('Authorization')?.split(" ")[1]
    if (!accessToken) {
        return NextResponse.json({ error: "auth key not found" }, { status: 409 })
    }
        let parsedPayload;
        try {
            const payload = await jwt.verify(accessToken, "jwt_access_token_secret");
            const result = await payloadSchema.safeParse(payload);
            if (!result.success) {
                return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
              }
              parsedPayload = result.data;
        } catch (error) {
            console.error(error)
            return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
        }
    
    const body = await request.json();
    const parsedBody = await orderSchema.safeParse(body);

    if (!parsedBody.success) {
        return new NextResponse(JSON.stringify(parsedBody.error.format()), {
            status: 400,
            headers: { "Content-type": "application/json" }
        })
    }
        const { name } = parsedPayload;
        const {price , quantity , side} = parsedBody.data;

        // Main logic
        

    
     
        return NextResponse.json({ message: "Order received",
            name , price , quantity , side
         }, { status: 200 });
}