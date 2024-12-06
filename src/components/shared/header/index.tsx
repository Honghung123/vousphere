"use client";
import Search from "@/components/shared/header/search";
import Menu from "@/components/shared/header/menu";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { DarkModeToggle } from "@/components/utility/mode-toggle";
import Image from "next/image";
import Link from "next/link";
// import { updateUser, UserState } from "@/lib/redux/features/user/userSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { usePathname } from "next/navigation";
import { MenuIcon, ShieldClose } from "lucide-react";

const APP_NAME = "Vou Playground";
const categories = [{ name: "Electronics" }, { name: "Computers" }, { name: "Video Games" }];

function SelectCategory({ categories: [] }) {
    return (
        <>
            <div className="md:hidden">
                <Drawer direction="right">
                    <DrawerTrigger asChild>
                        <div className="p-2">
                            <MenuIcon />
                        </div>
                    </DrawerTrigger>
                    <DrawerContent className="h-full">
                        <div className="absolute top-2 right-2 p-2">
                            <DrawerTrigger asChild>
                                <ShieldClose />
                            </DrawerTrigger>
                        </div>
                        <DrawerHeader>
                            <DrawerTitle>Select a category</DrawerTitle>
                            <div className="space-y-1">
                                {categories.map((category: { name: string }) => (
                                    <Button
                                        className="w-full justify-start"
                                        variant="ghost"
                                        key={category.name}
                                        asChild
                                    >
                                        <DrawerClose asChild>
                                            <Link href={`/search?category=${category.name}`}>{category.name}</Link>
                                        </DrawerClose>
                                    </Button>
                                ))}
                            </div>
                        </DrawerHeader>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
}

export default function Header() {
    // Initialize the store with the product information
    // const user = useAppSelector((state) => state.userState) as UserState;
    // const dispatch = useAppDispatch();
    // const pathName = usePathname();
    // const updateCurrentUser = () => {
    //     dispatch(updateUser({ id: "", name: "John Doe", age: 30 }));
    // };
    // updateCurrentUser();
    return (
        <>
            <header className="w-full border-b">
                <div className="wrapper flex justify-between items-center mx-auto py-2 md:mx-4 xl:mx-8">
                    <div className="flex-start flex">
                        <Link href="/" className="flex-start">
                            <Image
                                src="https://wutheringlab.com/wp-content/uploads/Shorekeeper-icon.webp"
                                width={48}
                                height={48}
                                alt={`${APP_NAME} logo`}
                            />
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <Search />
                    </div>
                    <div className="flex justify-center items-center">
                        <Menu />
                        <div className="md:hidden">
                            <SelectCategory categories={categories} />
                        </div>
                    </div>
                </div>
                <div className="md:hidden block px-5 pb-2">
                    <Search />
                </div>
            </header>
        </>
    );
}
