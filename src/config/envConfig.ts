import { z } from "zod";

const configSchema = z.object({
    PORT: z.coerce.number().default(3000),
    API_ENDPOINT: z.string(),
    BASE_URL: z.string(),
    // COOKIE_MODE: z.enum(["true", "false"]).transform((val) => val === "true"),
});

const configServer = configSchema.safeParse({
    API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    BASE_URL: process.env.NEXT_PUBLIC_URL,
    PORT: process.env.NEXT_PUBLIC_PORT || 3000,
});

if (!configServer.success) {
    console.error(configServer.error.issues);
    throw new Error("Some of properties in .env are invalid");
}
const envConfig = configServer.data;
export default envConfig;

// export const API_URL = `${envConfig.PROTOCOL}://${envConfig.DOMAIN}:${envConfig.PORT}`;
