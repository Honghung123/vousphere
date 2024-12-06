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
    DropdownMenuSub,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import CustomShadcnPagination from "@/components/shared/custom-pagination";
import { ChevronDown, LucideSettings, Search, UserPlus2 } from "lucide-react";

const users = [
    {
        id: 1,
        username: "johndoe",
        email: "johndoe@example.com",
        role: "Admin",
        status: "Active",
    },
    {
        id: 2,
        username: "janesmith",
        email: "janesmith@example.com",
        role: "User",
        status: "Suspended",
    },
    {
        id: 3,
        username: "bobwilson",
        email: "bobwilson@example.com",
        role: "Editor",
        status: "Active",
    },
    {
        id: 4,
        username: "sarahjones",
        email: "sarahjones@example.com",
        role: "User",
        status: "Active",
    },
    {
        id: 5,
        username: "mikeanderson",
        email: "mikeanderson@example.com",
        role: "Admin",
        status: "Active",
    },
    {
        id: 6,
        username: "emilydavis",
        email: "emilydavis@example.com",
        role: "Editor",
        status: "Suspended",
    },
    {
        id: 7,
        username: "davidlee",
        email: "davidlee@example.com",
        role: "User",
        status: "Active",
    },
    {
        id: 8,
        username: "jessicabrown",
        email: "jessicabrown@example.com",
        role: "Admin",
        status: "Active",
    },
    {
        id: 9,
        username: "thomaswhite",
        email: "thomaswhite@example.com",
        role: "Editor",
        status: "Active",
    },
    {
        id: 10,
        username: "amandagreen",
        email: "amandagreen@example.com",
        role: "User",
        status: "Suspended",
    },
    {
        id: 11,
        username: "jacksonlee",
        email: "jacksonlee@example.com",
        role: "Admin",
        status: "Active",
    },
    {
        id: 12,
        username: "oliviaroberts",
        email: "oliviaroberts@example.com",
        role: "User",
        status: "Active",
    },
];

export default function UserManagement() {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
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
    return (
        <div className="rounded-sm">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-4xl font-bold">User Management</h1>
                <Button>
                    Create User <UserPlus2 className="h-4 w-4" />
                </Button>
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
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>Email</DropdownMenuItem>
                                        <DropdownMenuItem>Message</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>More...</DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuItem>
                                New Team
                                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuItem>Delete User</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative w-full max-w-md">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="pr-10 rounded-full !bg-white" // Extra padding to accommodate the button
                        onChange={handleSearch}
                    />
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 px-2">
                        <Search className="w-4 h-4" />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No.</TableHead>
                            <TableHead>Username</TableHead>
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
                                <TableCell className="font-medium">{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell className="content-center">
                                    <Badge
                                        variant={user.status === "Active" ? "default" : "destructive"}
                                        className="rounded-full"
                                    >
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <LucideSettings />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                            <DropdownMenuItem>
                                                {user.status === "Active" ? "Suspend Account" : "Activate Account"}
                                            </DropdownMenuItem>
                                            {user.role !== "Admin" && (
                                                <DropdownMenuItem>
                                                    {user.role === "Editor" ? "Demote to User" : "Promote to Editor"}
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem>Delete User</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
