import { NextRequest, NextResponse } from "next/server";
import { asks, bids } from "@/constants/constants";


export async function GET(
    request: NextRequest
) {
    try {
        const { searchParams } = new URL(request.url)
        const itemId = Number(searchParams.get('itemId'))
        const side = searchParams.get('side')

        if (side === "ask") {
            const price: number | undefined =104 - bids[itemId][0]?.price
            const available: number | undefined = bids[itemId][0]?.quantity

            if (!price || !available) { return NextResponse.json({ price: 52, available: 0 }) }

            return NextResponse.json({ price: price, quantity: available })

        }

        else if (side === "bid") {
            const price: number | undefined =104 - asks[itemId][0]?.price
            const available: number | undefined = asks[itemId][0]?.quantity

            if (!price || !available) { return NextResponse.json({ price: 52, available: 0 }) }

            return NextResponse.json({ price: price, quantity: available })
        }


    } catch (error) {
        console.error(error)
        return NextResponse.json({message : "Cant fetch price."})
    }

}