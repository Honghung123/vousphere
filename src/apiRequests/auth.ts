import http, { isClient } from "@/lib/http";
import {
    LoginRequestDTO,
    LoginResponseDTO,
    RegisterRequestDTO,
    RegisterResponseDTO,
    SlideSessionResponseDTO,
} from "@/schemaValidations/auth.schema";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

type CustomOptions = {
    baseUrl?: string | undefined;
};

const authApiRequest = {
    login: async (payload: LoginRequestDTO) => {
        const baseHeaders = {
            "Content-Type": "application/json",
            Authorization: "",
        };
        if (isClient()) {
            const sessionToken = localStorage.getItem("sessionToken");
            if (sessionToken) {
                baseHeaders.Authorization = `Bearer ${sessionToken}`;
            }
        }

        const fullUrl = `${BASE_URL}/users/login`;
        console.log(payload);
        // const res = await fetch(fullUrl, {
        //     method: "POST",
        //     headers: {
        //         ...baseHeaders,
        //     },
        //     body: JSON.stringify(payload),
        // });
        // const result = await res.json();

        // return result as LoginResponseDTO;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            id: 1,
            email: "admin@gmail.com",
            name: "admin",
            username: "admin",
            phone: "1234567890",
            status: true,
            role: {
                id: 1,
                name: payload.email === "admin@gmail.com" ? "admin" : "counterpart",
                description: "admin",
            },
        };
    },
    register: async (body: RegisterRequestDTO) => {
        const baseHeaders = {
            "Content-Type": "application/json",
            Authorization: "",
        };
        if (isClient()) {
            const sessionToken = localStorage.getItem("sessionToken");
            if (sessionToken) {
                baseHeaders.Authorization = `Bearer ${sessionToken}`;
            }
        }
        const fullUrl = `${BASE_URL}/users/register`;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // const res = await fetch(fullUrl, {
        //     method: "POST",
        //     headers: {
        //         ...baseHeaders,
        //     },
        //     body: JSON.stringify(payload),
        // });
        // const result = await res.json();

        // return result as LoginResponseDTO;
        return true;
    },
};

export default authApiRequest;
