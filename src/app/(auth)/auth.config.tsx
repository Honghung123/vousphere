import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isAuthenticated = !!auth?.user;
            if (isAuthenticated) return true;
            const path: string = nextUrl.pathname;
            console.log("Request path: " + path);
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
