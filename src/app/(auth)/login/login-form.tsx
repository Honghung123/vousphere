"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginRequestSchema, LoginRequestDTO } from "@/schemaValidations/auth.schema";
import { useToast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { PasswordInput } from "@/components/ui/password-input";
import { useDispatch } from "react-redux";
import authApiRequest from "@/apiRequests/auth";
import { storeUserState } from "@/lib/redux/features/user/userSlice";
import { UserType } from "@/lib/definitions";
import { hasRole, ROLE_ADMIN, ROLE_COUNTERPART } from "@/components/shared/authenticatedRoutes";

export function LoginForm() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    const loginForm = useForm<LoginRequestDTO>({
        resolver: zodResolver(LoginRequestSchema),
        defaultValues: {
            email: "admin@gmail.com",
            password: "adminpass",
        },
    });
    async function onSubmit(values: LoginRequestDTO) {
        if (loading) return;
        setLoading(true);
        try {
            const result = await authApiRequest.login(values);
            console.log(result);
            const user: UserType = result as UserType;
            dispatch(storeUserState(user));
            toast({
                description: "Login successfully",
                duration: 2000,
                className: "bg-green-500 text-white",
            });
            if (hasRole(user.role?.name, ROLE_ADMIN)) {
                router.push("/admin");
            } else if (hasRole(user.role?.name, ROLE_COUNTERPART)) {
                router.push("/counterpart");
            } else {
                router.refresh();
            }
        } catch (error: any) {
            handleErrorApi({
                error,
                setError: loginForm.setError,
            });
        } finally {
            setLoading(false);
        }
    }
    return (
        <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-2 max-w-[600px]" noValidate>
                <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email" type="email" {...field} />
                            </FormControl>
                            {/* <FormDescription>* This is the field requiring you to fill.</FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    defaultValue="123456"
                />

                <Button type="submit" className="!mt-3 block m-auto">
                    Đăng nhập
                    {loading && <span className="ml-2 animate-spin">⌛</span>}
                </Button>
            </form>
        </Form>
    );
}
