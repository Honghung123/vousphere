"use client";

import PageNotFound from "@/app/not-found";
import { UserType } from "@/lib/definitions";
import { useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export const hasRole = (role: string | null | undefined, specificRole: string) => {
    if (!role) return false;
    return role.toLowerCase() === specificRole.toLowerCase();
};
export const ROLE_ADMIN = "admin";
export const ROLE_COUNTERPART = "counterpart";

export const AuthenticatedRoute = (Component: any, role: string) => {
    return function AuthRoute(props: any) {
        const authenticatedUser = useAppSelector((state) => state.userState) as { isLoggedIn: boolean; user: UserType };
        const router = useRouter();
        useLayoutEffect(() => {
            if (!authenticatedUser.isLoggedIn) {
                router.push("/login");
            }
        }, [router, authenticatedUser]);
        if (!hasRole(authenticatedUser?.user?.role?.name, role)) return <PageNotFound />;
        if (!authenticatedUser.isLoggedIn) return null;
        return <Component {...props} />;
    };
};
