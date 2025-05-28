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

        await prisma.users.update({
            where: { name: buyer },
            data: {
                Balance: {
                    decrement: quantity * price
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

        await prisma.users.update({
            where: { name: buyer },
            data: {
                Balance: {
                    decrement: quantity * price
                }
            }
        })
    }

    const sellerEntryFound = await prisma.holdings.findUnique({
        where: {
            userName_itemId: {
                userName: buyer,
                itemId: itemId
            }
        }
    })

    if (sellerEntryFound) {
        await prisma.holdings.update({
            where: {
                userName_itemId: {
                    userName: seller,
                    itemId: itemId
                }
            },
            data: {
                quantity: {
                    decrement: quantity
                }
            }
        })

        await prisma.users.update({
            where: { name: seller },
            data: {
                Balance: {
                    decrement: quantity * price
                }
            }
        })
    } else {
        await prisma.holdings.create({
            data: {
                userName: seller,
                itemId: itemId,
                quantity: quantity
            }

        })

        await prisma.users.update({
            where: { name: seller },
            data: {
                Balance: {
                    decrement: quantity * price
                }
            }
        })
    }

}