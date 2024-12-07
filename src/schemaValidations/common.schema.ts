import z from "zod";

export const SubscriptionRequestSchema = z.object({
    name: z
        .string({
            required_error: "Invalid name",
        })
        .trim()
        .min(2, {
            message: "Name is invalid",
        })
        .max(70, {
            message: "Name must not exceed 70 characters",
        })
        .regex(/\w+\s\w+/, { message: "Name is too short" }),
    area: z.string(),
    address: z.string(),
    lat: z.string(),
    long: z.string(),
    status: z.boolean(),
});

export type SubscriptionRequestDTO = z.infer<typeof SubscriptionRequestSchema>;
