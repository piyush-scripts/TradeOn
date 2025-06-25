import prisma from "@/lib/prisma";

export default async function updateBalance(name : string , side : "ask" | "bid" , price : number , quantity : number, itemId : number){
    if (side === "bid"){
        await prisma.users.update({
            where: { name: name },
            data: {
                Balance: {
                    decrement: quantity * price
                }
            }
        })
    }
    else{
        await prisma.holdings.update({
            where: {
                userName_itemId: {
                    userName: name,
                    itemId: itemId
                }
            },
            data: {
                quantity: {
                    decrement: quantity
                }
            }
        })
    }
}