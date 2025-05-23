"use server"
import { signupSchema, SignupSchema } from "@/zod/zodScheama";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";



export default async function signup({name , password }: SignupSchema) {

    try {

        const hash = await bcrypt.hash(password,10);

        try {
            // db reg logic here
        await prisma.users.create({
            data: {
                name : name,
                password : hash,
                Balance : 50000
            }
        });
        } catch (error) {
            console.log(error)
            return new Response(JSON.stringify({error : 'users already exists'}),{
                status: 409,
                headers : {'Content-type' : 'application/json'}
            })
        }
        

        return new Response(JSON.stringify({ message: 'users created successfully' }), {
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