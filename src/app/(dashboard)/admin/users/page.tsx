"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import CustomShadcnPagination from "@/components/shared/custom-pagination";
import { Ban, ChevronDown, Eye, LockKeyholeOpen, LucideSettings, Search, UserPlus2 } from "lucide-react";
import { CreateUserDialog } from "@/app/(dashboard)/admin/users/create-user";
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
import { useToast } from "@/hooks/use-toast";
import ViewUser from "@/app/(dashboard)/admin/users/view-user";

const users = [
    {
        id: 1,
        name: "John Doe",
        username: "johndoe",
        email: "johndoe@example.com",
        phone: "1234567890",
        role: {
            id: 1,
            name: "admin",
            description: "Admin",
        },
        status: true,
    },
    {
        id: 2,
        name: "Jane Smith",
        username: "janesmith",
        email: "janesmith@example.com",
        role: {
            id: 2,
            name: "user",
            description: "User",
        },
        phone: "9876543210",
        status: false,
    },
    {
        id: 3,
        name: "Bob Wilson",
        username: "bobwilson",
        email: "bobwilson@example.com",
        role: {
            id: 3,
            name: "counterpart",
            description: "Counterpart",
        },

        phone: "5555555555",
        status: true,
    },
];

export default function UserManagement() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { toast } = useToast();
    const [usersPerPage] = useState(10);
    const filteredUsers = useMemo(() => {
        return users.filter((user) => user.username.toLowerCase().includes(search.toLowerCase()));
    }, [search]);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };
    const resolveRoleBadge = (role: string) => {
        switch (role.toLowerCase()) {
            case "admin":
                return <Badge variant="default">Admin</Badge>;
            case "user":
                return <Badge className="bg-amber-600">User</Badge>;
            case "counterpart":
                return <Badge className="bg-blue-600">Counterpart</Badge>;
            default:
                return null;
        }
    };
    async function handleStatusChange(id: number, status: boolean) {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
        toast({
            title: "Success",
            description: "User status updated successfully",
            className: "bg-green-500 text-white",
        });
    }
    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div className="rounded-sm">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl md:text-4xl font-bold">User Management</h1>
                <CreateUserDialog>
                    <Button>
                        Create User <UserPlus2 className="h-4 w-4" />
                    </Button>
                </CreateUserDialog>
            </div>
            <div className="flex items-center justify-between my-2 gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                            Sort by:
                            <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        {/* <DropdownMenuItem>Role</DropdownMenuItem> */}

                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Role</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>Admin</DropdownMenuItem>
                                        <DropdownMenuItem>Counterpart</DropdownMenuItem>
                                        {/* <DropdownMenuSeparator /> */}
                                        <DropdownMenuItem>User</DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuItem>Name</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative w-full max-w-md">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="pr-10 rounded-full " // Extra padding to accommodate the button
                        onChange={handleSearch}
                    />
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 px-2">
                        <Search className="w-4 h-4" />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto rounded-md border ">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No.</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead> Actions </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentUsers.length === 0 && (
                            <TableCell colSpan={6} className="text-center">
                                No users found
                            </TableCell>
                        )}
                        {currentUsers.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{resolveRoleBadge(user.role.name)}</TableCell>
                                <TableCell className="content-center">
                                    <Badge variant={user.status ? "default" : "destructive"} className="rounded-full">
                                        {user.status ? "Active" : "Suspended"}
                                    </Badge>
                                </TableCell>
                                <TableCell className="flex gap-3">
                                    <Dialog>
                                        <DialogTrigger asChild className="cursor-pointer">
                                            {user.status ? (
                                                <Ban size={24} strokeWidth={3} color="red" />
                                            ) : (
                                                <LockKeyholeOpen size={24} strokeWidth={3} color="lime" />
                                            )}
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>
                                                    {user.status ? "Suspend account" : "Activate account"}
                                                </DialogTitle>
                                                <DialogDescription>
                                                    {user.status
                                                        ? "Are you sure you want to suspend this user?"
                                                        : "Are you sure you want to activate this user?"}
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button onClick={() => handleStatusChange(user.id, !user.status)}>
                                                        {user.status ? "Suspend" : "Activate"}
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <ViewUser user={user}>
                                        <Eye size={25} strokeWidth={3} color="blue" />
                                    </ViewUser>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
                Showing {indexOfFirstUser + 1} to {indexOfLastUser} of {filteredUsers.length} users
            </div>
            <div className="flex items-center justify-center mt-3">
                <CustomShadcnPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
