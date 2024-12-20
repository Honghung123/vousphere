"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CreateUserForm } from "@/app/(dashboard)/admin/users/user-create-form";

export function CreateUserDialog({ children }: { children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create user</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <CreateUserForm />
                </div>
            </DialogContent>
        </Dialog>
    );
}
