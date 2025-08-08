import * as z from "zod";

export const loginSchema = z.object({

    email: z
        .email()
        .trim()
        .nonempty("Email is required"),
    password: z
        .string()
        .trim()
        .nonempty("Password is required")
});  
