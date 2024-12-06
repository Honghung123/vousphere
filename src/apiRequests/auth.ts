import { UserType } from "@/lib/definitions";
import http, { isClient } from "@/lib/http";
import {
    LoginRequestDTO,
    LoginResponseDTO,
    RegisterRequestDTO,
    RegisterResponseDTO,
    SlideSessionResponseDTO,
} from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";

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
                name: "counterpart",
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
    auth: (body: { sessionToken: string; expiresAt: string }) =>
        http.post("/api/auth", body, {
            baseUrl: "",
        }),
    logoutFromNextServerToServer: (sessionToken: string) =>
        http.post<MessageResType>(
            "/auth/logout",
            {},
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`,
                },
            }
        ),
    logoutFromNextClientToNextServer: (force?: boolean | undefined, signal?: AbortSignal | undefined) =>
        http.post<MessageResType>(
            "/api/auth/logout",
            {
                force,
            },
            {
                baseUrl: "",
                signal,
            }
        ),
    slideSessionFromNextServerToServer: (sessionToken: string) =>
        http.post<SlideSessionResponseDTO>(
            "/auth/slide-session",
            {},
            {
                headers: {
                    Authorization: `Bearer ${sessionToken}`,
                },
            }
        ),
    slideSessionFromNextClientToNextServer: () =>
        http.post<SlideSessionResponseDTO>("/api/auth/slide-session", {}, { baseUrl: "" }),
};

export default authApiRequest;
