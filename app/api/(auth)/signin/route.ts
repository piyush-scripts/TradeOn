import { signupSchema, SignupSchema } from "../signup/types";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import { loadEnvConfig } from "@next/env";
import { NextResponse } from "next/server";

const projectDir = process.cwd()
loadEnvConfig(projectDir)



export async function POST(req: Request) {
    const cookiestore = await cookies();

    const body = await req.json();
    const result = signupSchema.safeParse(body);

    if (!result.success) {
        return new Response(JSON.stringify(result.error.format()), {
            status: 400,
            headers: { "Content-type": "application/json" }
        })
    }

    const { name, password } = result.data;

    try {
        const user = await prisma.users.findUnique({ where: { name } })
        if (user) {
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (isValidPassword) {
                const refreshToken =  jwt.sign({ name }, "jwt_refresh_token_secret", { expiresIn: '7d' })
                const accessToken =  jwt.sign({ name }, "jwt_access_token_secret", { expiresIn: "15m" })

                await prisma.refreshTokens.create({
                    data: {
                        token: refreshToken,
                        userName: user.name,
                        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    },
                })

                cookiestore.set("refreshToken", refreshToken, {
                    httpOnly: true,
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60,
                    secure: true,
                    sameSite: "strict",
                })

                cookiestore.set("accessToken", accessToken, {
                    httpOnly: true,
                    path: "/",
                    maxAge: 15 * 60,
                    secure: true,
                    sameSite: "strict",
                })

                return NextResponse.json({"Refresh Token" : refreshToken,"Access Token" : accessToken} )
            }
        }


    } catch (error) {
        console.log(error)
    }

}