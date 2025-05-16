import { signupSchema, SignupSchema } from "@/zod/signupScheama";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { sign } from "crypto";
import { Prisma } from "@prisma/client";


export async function POST(req: Request) {

    try {
        const body = await req.json();
        const result = signupSchema.safeParse(body);

        if (!result.success) {
            return new Response(JSON.stringify(result.error.format()), {
                status: 400,
                headers: { 'Content-type': 'application/json' },
            });
        }

        const { name, password } = result.data;

        const hash = await bcrypt.hash(password,10);

        try {
            // db reg logic here
        await prisma.user.create({
            data: {
                name : name,
                password : hash
            }
        });
        } catch (error) {
            return new Response(JSON.stringify({error : 'User already exists'}),{
                status: 409,
                headers : {'Content-type' : 'application/json'}
            })
        }
        

        return new Response(JSON.stringify({ message: 'User created successfully' }), {
            status: 201,
            headers: { 'Content-type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), {
            status: 400,
            headers: { 'Content-type': 'application/json' },
        });
    }
}