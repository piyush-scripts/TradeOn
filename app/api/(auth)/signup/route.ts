import { signupSchema, SignupSchema } from "./types";
import bcrypt from "bcryptjs";
import db from "@/db/client";
import { users } from "@/db/schema";


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
        await db.insert(users).values({
                name: name,
                password: hash,
                balance: 50000,
            })
            
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