import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import { OrderSchema, orderSchema, payloadSchema, PayloadSchema } from "@/zod/zodScheama";
import { Order } from "@/types/types";
import sortOrderByPrice from "@/helpers/orders/sortByPrice";
import fillOrders from "@/helpers/orders/fillOrders";

export const bids: { [itemId: number]: Order[] } = [];
export const asks: { [itemId: number]: Order[] } = [];

export async function POST(
    request: NextRequest
) {

    const accessToken = request.headers.get('Authorization')?.split(" ")[1]
    if (!accessToken) {
        return NextResponse.json({ error: "auth key not found" }, { status: 409 })
    }
    let parsedPayload: PayloadSchema;
    try {
        const payload = jwt.verify(accessToken, "jwt_access_token_secret");
        const result = payloadSchema.safeParse(payload);
        if (!result.success) {
            return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
        }
        parsedPayload = result.data;
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
    }

    const body = await request.json();
    const parsedBody = orderSchema.safeParse(body);

    if (!parsedBody.success) {
        return new NextResponse(JSON.stringify(parsedBody.error.format()), {
            status: 400,
            headers: { "Content-type": "application/json" }
        })
    }
    // const itemId = context.params.itemId
    const { name } = parsedPayload;
    const { itemId, price, quantity, side } = parsedBody.data;

    // Main logic
    const  remainingQuantity :number = await fillOrders(name ,{itemId, price, quantity , side});


    if(remainingQuantity > 0 ){
        if (side === "bid") {
            bids[itemId].push({name , price , quantity: remainingQuantity});
            sortOrderByPrice(bids[itemId],"bid")
        }
        else {
            asks[itemId].push({name , price , quantity : remainingQuantity});
            sortOrderByPrice(bids[itemId],"ask")
        }
    }
   





    return NextResponse.json({ message: "Order received" }, { status: 200 });
}