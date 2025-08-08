import * as z from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .refine((val) => !/\s{2,}/.test(val), {
            message: "Name cannot contain multiple consecutive spaces",
        }),
    email: z
        .email()
        .trim()
        .nonempty("Email is required"),
    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
});  
