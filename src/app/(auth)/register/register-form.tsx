"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { set, useForm } from "react-hook-form";
import { RegisterRequestDTO, RegisterRequestSchema } from "@/schemaValidations/auth.schema";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleErrorApi } from "@/lib/utils";
import { PasswordInput } from "@/components/ui/password-input";
import authApiRequest from "@/apiRequests/auth";

export function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();
    // 1. Define your form.
    const registerForm = useForm<RegisterRequestDTO>({
        resolver: zodResolver(RegisterRequestSchema),
        defaultValues: {
            name: "Software Engineer",
            email: "counterpart@example.com",
            password: "12345678",
            confirmPassword: "12345678",
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: RegisterRequestDTO) {
        if (loading) return;
        setLoading(true);
        try {
            const result = await authApiRequest.register(values);
            if (result) {
                toast({
                    description: "Register successfully",
                    duration: 2000,
                    className: "bg-green-500 text-white",
                });
                router.push("/login");
            }
        } catch (error: any) {
            handleErrorApi({
                error,
                setError: registerForm.setError,
            });
        } finally {
            setLoading(false);
        }
    }

    // 3. Return the form.
    return (
        <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onSubmit)} noValidate>
                <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="mt-3">
                            <FormLabel>Full name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your name" className="!mt-0" {...field} />
                            </FormControl>
                            {/* <FormDescription>This is your public display name.</FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="mt-3">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter your email" className="!mt-0" type="email" {...field} />
                            </FormControl>
                            {/* <FormDescription>This is your public display name.</FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="mt-3">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Enter your password" className="mt-0" {...field} />
                            </FormControl>
                            {/* <FormDescription>This is your public display name.</FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem className="mt-3">
                            <FormLabel>Confirm password</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Enter your password again" className="mt-0" {...field} />
                            </FormControl>
                            {/* <FormDescription>This is your public display name.</FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={loading} className="!mt-3 m-auto block">
                    Register
                    {loading && <span className="animate-ping">⌛</span>}
                </Button>
            </form>
        </Form>
    );
}
