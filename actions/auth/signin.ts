"use server"
import { signupSchema } from "@/app/api/(auth)/signup/types";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import * as jose from 'jose'
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { JWTsecret ,alg } from "@/constants/constants";

export default async function handleSignin(formData: FormData) {
    const cookiestore = await cookies();

    const body = {
        name: formData.get("name") as string,
        password: formData.get("password") as string
    };

    console.log("Received formData:", body);

    const result = signupSchema.safeParse(body);

    if (!result.success) {
        console.log("Validation failed:", result.error.flatten());
        return;
    }

    const { name, password } = result.data;
    try {
        const user = await prisma.users.findUnique({ where: { name } })
        if (!user) {
            console.log("User not found");
            return;
        }

        console.log("User found, comparing password");

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            console.log("Invalid password");
            return;
        }

        console.log("Password valid, generating tokens");

        const refreshToken = await new jose.SignJWT({ name }).setExpirationTime('7d').setProtectedHeader({alg}).sign(JWTsecret)
        const accessToken = await new jose.SignJWT({ name }).setExpirationTime('15min').setProtectedHeader({alg}).sign(JWTsecret)

        if(!accessToken || !refreshToken) return NextResponse.json({message :"Token cannot be generated"})

        await prisma.refreshTokens.create({
            data: {
                token: refreshToken,
                userName: user.name,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            },
        })

        console.log("Refresh token inserted:");

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
        
        console.log({ "accessToken": accessToken })
        
    }



    catch (error) {
        console.log(error)
    }

}