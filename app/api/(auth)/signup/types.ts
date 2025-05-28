import { z } from 'zod'

export const signupSchema = z.object({
    name: z.string().min(3, "Usernam must have 3 characters"),
    // email : z.string().email("Invalid email"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(32, "Password must be less than 32 characters")
});

export type SignupSchema = z.infer<typeof signupSchema>