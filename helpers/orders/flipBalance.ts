import prisma from "@/lib/prisma";
export default async function flipBalance(buyer: string, seller: string, itemId: number, price: number, quantity: number) {

    const buyerEntryFound = await prisma.holdings.findUnique({
        where: {
            userName_itemId: {
                userName: buyer,
                itemId: itemId
            }
        }
    })
    if (buyerEntryFound) {
        await prisma.holdings.update({
            where: {
                userName_itemId: {
                    userName: buyer,
                    itemId: itemId
                }
            },
            data: {
                quantity: {
                    increment: quantity
                }
            }
        })

    }
    else {
        await prisma.holdings.create({
            data: {
                userName: buyer,
                itemId: itemId,
                quantity: quantity
            }

        })
    }

    await prisma.users.update({
        where: { name: seller },
        data: {
            Balance: {
                increment: quantity * price
            }
        }
    })
}

