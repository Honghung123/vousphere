"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DarkModeToggle } from "@/components/utility/mode-toggle";
import Image from "next/image";

export default function UserSection() {
    const session = {
        user: {
            name: "John Doe",
            email: "johndoe@gmail.com",
            role: "user",
            image: "https://wutheringlab.com/wp-content/uploads/Shorekeeper-icon.webp",
        },
    };
    if (!session)
        return (
            <Link href="/api/auth/signin">
                <Button>Sign In</Button>
            </Link>
        );
    return (
        <div className="flex gap-2 items-center">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center">
                        <Button className="relative w-8 h-8 rounded-full ml-2 !p-0 overflow-hidden bg-slate-400">
                            <Image
                                src="https://wutheringlab.com/wp-content/uploads/Shorekeeper-icon.webp"
                                width={32}
                                height={32}
                                alt="Shorekeeper"
                            />
                        </Button>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{session.user.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuItem>
                        <Link className="w-full" href="/user/profile">
                            Profile
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Link className="w-full" href="/user/orders">
                            Order History
                        </Link>
                    </DropdownMenuItem>

                    {session.user.role === "admin" && (
                        <DropdownMenuItem>
                            <Link className="w-full" href="/admin/overview">
                                Admin
                            </Link>
                        </DropdownMenuItem>
                    )}

                    <DropdownMenuItem className="p-0 mb-1">
                        <form action={"/login"} className="w-full">
                            <Button className="w-full py-4 px-2 h-4 justify-start" variant="ghost">
                                Sign Out
                            </Button>
                        </form>
                    </DropdownMenuItem>
                    <DarkModeToggle />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
