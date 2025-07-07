import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies();
    const token = cookieStore.get('refreshToken')?.value;

    if (token) {
        try {
            await prisma.refreshTokens.delete({ where: { token } });
        } catch (err) {
            console.error('Failed to logout', err);
        }
    }

    const res = NextResponse.json({ message: "Logged out successfully" });
    res.cookies.set('refreshToken', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 0
    });

    return res;
}

export async function GET() {
    return NextResponse.json({ message: 'Logged out' });
}