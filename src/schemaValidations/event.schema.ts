import z from "zod";
export const RegisterEventSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(5, {
                message: "Full name is invalid",
            })
            .max(70, {
                message: "Full name must not exceed 70 characters",
            }),
        image: z
            .any()
            .refine((file) => file instanceof File && file.size > 0, {
                message: "File is required",
            })
            .refine((file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), {
                message: "Only .jpg, .png, .jpeg file is supported",
            }),
        voucherCount: z
            .number()
            .min(1, {
                message: "Voucher count must be at least 1",
            })
            .max(100, {
                message: "Voucher count must not exceed 100",
            }),
        startTime: z.string(),
        endTime: z.string(),
    })
    .strict()
    .superRefine(({ startTime, endTime }, ctx) => {
        if (!(startTime > endTime)) {
            ctx.addIssue({
                code: "custom",
                message: "End time must be after the start time",
                path: ["endTime"],
            });
        }
    });

export type RegisterEventDTO = z.infer<typeof RegisterEventSchema>;
