"use client";
import { getRandomUser } from "@/app/(profile)/users/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
    const [value, setValue] = useState("");
    const debounced = useDebouncedCallback(
        async (value) => {
            // Fetch data
            console.log("Value: ", value);
            const data = await getRandomUser();
            console.log(data);
        },
        500,
        // The maximum time func is allowed to be delayed before it's invoked:
        { maxWait: 500 }
    );
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debounced.cancel(); // Cancel the previous timer
        setValue(e.target.value);
        debounced(e.target.value);
    };
    // When the component goes to be unmounted, we will fetch data if the input has changed.
    useEffect(
        () => () => {
            debounced.flush();
        },
        [debounced]
    );
    const categories = [{ name: "Electronics" }, { name: "Computers" }, { name: "Video Games" }];

    return (
        <form action="/search" method="GET">
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Select name="category">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem key={"All"} value={"all"}>
                            All
                        </SelectItem>
                        {categories.map((category: { name: string }) => (
                            <SelectItem key={category.name} value={category.name}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Input
                    name="q"
                    type="text"
                    placeholder="Search..."
                    className="md:w-[100px] lg:w-[300px]"
                    value={value}
                    onChange={handleValueChange}
                />
                <Button>
                    <SearchIcon />
                </Button>
            </div>
        </form>
    );
}
