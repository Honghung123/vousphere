"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { PasswordInput } from "@/components/ui/password-input";
import { CreateUserRequestSchema, CreateUserRequestDTO } from "@/schemaValidations/account.schema";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubscriptionRequestDTO, SubscriptionRequestSchema } from "@/schemaValidations/common.schema";

export function SubscriptionForm() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const createUserForm = useForm<SubscriptionRequestDTO>({
        resolver: zodResolver(SubscriptionRequestSchema),
        defaultValues: {
            name: "Alysa",
            address: "123 Main Street, Anytown, USA",
        },
    });
    async function onSubmit(values: SubscriptionRequestDTO) {
        if (loading) return;
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // const result = await authApiRequest.login(values);
            // console.log(result);
            // const user: UserType = result as UserType;
            toast({
                description: "Login successfully",
                duration: 2000,
                className: "bg-green-500 text-white",
            });
            createUserForm.reset();
        } catch (error: any) {
            handleErrorApi({
                error,
                setError: createUserForm.setError,
            });
        } finally {
            setLoading(false);
        }
    }
    return (
        <Form {...createUserForm}>
            <form onSubmit={createUserForm.handleSubmit(onSubmit)} className="space-y-2 max-w-[600px]" noValidate>
                <FormField
                    control={createUserForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter name" {...field} className="!mt-0" />
                            </FormControl>
                            {/* <FormDescription>* This is the field requiring you to fill.</FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={createUserForm.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the address" type="email" {...field} className="!mt-0" />
                            </FormControl>
                            {/* <FormDescription>* This is the field requiring you to fill.</FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={createUserForm.control}
                    name="area"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Area</FormLabel>
                            <Select onValueChange={field.onChange} {...field}>
                                <FormControl>
                                    <SelectTrigger className="w-full !mt-0">
                                        <SelectValue placeholder="Select an area" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="1">Admin</SelectItem>
                                    <SelectItem value="2">Counterpart</SelectItem>
                                    <SelectItem value="3">Player</SelectItem>
                                </SelectContent>
                            </Select>
                            {/* <FormDescription>* This is the field requiring you to fill.</FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={createUserForm.control}
                    name="lat"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lat</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="Enter your password" className="mt-0" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    defaultValue="123456"
                />
                <div className="!mt-3 flex justify-center items-center gap-5 ">
                    <Button type="submit" className="block">
                        Create
                        {loading && <span className="ml-2 animate-spin">⌛</span>}
                    </Button>
                </div>
            </form>
        </Form>
    );
}