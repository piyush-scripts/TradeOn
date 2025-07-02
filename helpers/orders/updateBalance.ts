import prisma from "@/lib/prisma";

export default async function updateBalance(name: string, price: number, quantity: number) {

    await prisma.users.update({
        where: { name: name },
        data: {
            Balance: {
                decrement: quantity * price
            }
        }
    })
}
