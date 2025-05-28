// NOT USING AS OF NOW
"use server"
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export default async function handleSignout() {
    const cookieStore = await cookies()
    const token = cookieStore.get('refreshToken')?.value

    if(token) {
        try{
            await prisma.refreshTokens.delete({where: {token}}
                
            )}
            
            catch (err) {
                console.error('Failed to logout',err)
            }
    }       
    console.log("Deletion Successful")

    // Clear the refresh token cookie
    cookieStore.set('refreshToken','',{
        httpOnly:true,
        secure:true,
        sameSite:'strict',
        path: '/',
        maxAge: 0
    })
    console.log("Deletion Successful")
}