import prisma from "@/lib/prisma";
export default async function flipBalance(orderrer: string, nonorderrer: string, itemId: number,quantity: number,side:"ask"|"bid") {
//bidder = yes = orderrer
    const orderrerEntryFound = await prisma.holdings.findUnique({
        where: {
            userName_itemId: {
                userName: orderrer,
                itemId: itemId
            }
        }
    })
    console.info(orderrerEntryFound)

    if (orderrerEntryFound) {
        await prisma.holdings.update({
            where: {
                userName_itemId: {
                    userName: orderrer,
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
                userName: orderrer,
                itemId: itemId,
                quantity: quantity,
                itemSupporting:side 
            }

        })
    }
// Non orderrer changes
// asker = no = nonorderrer
        const nonorderrerEntryFound = await prisma.holdings.findUnique({
        where: {
            userName_itemId: {
                userName: nonorderrer,
                itemId: itemId
            }
        }
    })
    console.info(nonorderrerEntryFound)
        if (nonorderrerEntryFound) {
        await prisma.holdings.update({
            where: {
                userName_itemId: {
                    userName: nonorderrer,
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
                userName: orderrer,
                itemId: itemId,
                quantity: quantity,
                itemSupporting:side 
            }

        })
    }
    console.info("seller updated")
}

