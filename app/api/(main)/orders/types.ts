import { z } from 'zod'


export type Order = {
    name: string,
    price: number,
    quantity: number,
}

export const orderSchema = z.object({
    itemId : z.number(),
    price: z.number(),
    quantity: z.number(),
    side: z.enum(["bid", "ask"]),
})

export type OrderSchema = z.infer<typeof orderSchema>


export const payloadSchema = z.object({
    name: z.string(),
    iat: z.number(),
    exp: z.number()
})

export type PayloadSchema = z.infer<typeof payloadSchema>

