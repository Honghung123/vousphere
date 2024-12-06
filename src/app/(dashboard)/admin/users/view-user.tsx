 import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { UserType } from "@/lib/definitions";
import { Ban } from "lucide-react";
import React from "react";

export default function ViewUser({ children, user }: { children: React.ReactNode; user: UserType }) {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild className="cursor-pointer">
                    {children}
                </DialogTrigger>
                <DialogContent className="max-w-[425px] sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>User info</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <Card>
                            <CardContent className="grid p-4">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    <div className="font-medium">ID:</div>
                                    <div>{user.id}</div>
                                    <div className="font-medium">Username:</div>
                                    <div>{user.username}</div>
                                    <div className="font-medium">Full Name:</div>
                                    <div>{user.name}</div>
                                    <div className="font-medium">Email:</div>
                                    <div>{user.email}</div>
                                    <div className="font-medium">Phone:</div>
                                    <div>{user.phone}</div>
                                    <div className="font-medium">Role:</div>
                                    <div>{user!.role!.name}</div>
                                    <div className="font-medium">Status:</div>
                                    <div>
                                        <Badge
                                            variant={user.status ? "default" : "destructive"}
                                            className="rounded-full"
                                        >
                                            {user.status ? "Active" : "Suspended"}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <Button className="bg-sky-600">Activate user</Button>
                        <Button className="bg-lime-600">Update</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
