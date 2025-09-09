import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'
import { JWTsecret } from "@/constants/constants";
import { Order, orderSchema, payloadSchema, PayloadSchema } from "./types";
import sortOrderByPrice from "@/helpers/orders/sortByPrice";
import fillOrders from "@/helpers/orders/fillOrders";
import { cookies } from "next/headers";
import updateBalance from "@/helpers/orders/updateBalance";
import { asks , bids } from "@/constants/constants";
import client from "@/redis/client"

export async function POST(
    request: NextRequest
) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
        return NextResponse.json({ error: "auth key not found" }, { status: 409 })
    }
    let parsedPayload: PayloadSchema;
    try {
        console.info(accessToken)
        const josePayload = await jose.jwtVerify(accessToken, JWTsecret)
        const payload = josePayload.payload
        const result = payloadSchema.safeParse(payload);
        
        if (!result.success) {
            return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
        }
        parsedPayload = result.data;
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
    }
    console.info(bids)
    const body = await request.json();
    const data = body.data
    console.info(data)
    const parsedBody = orderSchema.safeParse(data);

    if (!parsedBody.success) {
        return new NextResponse(JSON.stringify(parsedBody.error.format()), {
            status: 400,
            headers: { "Content-type": "application/json" }
        })
    }
    // const itemId = context.params.itemId
    const { name } = parsedPayload;
    const { itemId, price, quantity, side } = parsedBody.data;
    
    // Filling order before going to the order book
    const remainingQuantity: number = await fillOrders(name, { itemId, price, quantity, side });

    // pushing left quantities to the orderbook

    if (remainingQuantity > 0) {
        if (side === "bid") {
            bids[itemId].push({ name, price, quantity: remainingQuantity });
            sortOrderByPrice(bids[itemId])
        }
        else {
            asks[itemId].push({ name, price, quantity: remainingQuantity });
            sortOrderByPrice(bids[itemId])
        }
    }
    return NextResponse.json({ message: "Order received" }, { status: 200 });
}