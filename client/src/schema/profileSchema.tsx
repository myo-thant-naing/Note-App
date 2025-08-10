import * as z from "zod";

export const profileSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .refine((val) => !/\s{2,}/.test(val), {
            message: "Name cannot contain multiple consecutive spaces",
        }),
    avator: z.string(),
    email: z
        .email()
        .trim()
        .nonempty("Email is required"),
});  
