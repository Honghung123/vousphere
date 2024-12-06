"use client";
import { CardSkeleton } from "@/app/(dashboard)/skeletons";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCachedUserListQuery } from "@/lib/react-query/userCache";

export default function UserPage() {
    // const { toast } = useToast();
    const { data, isLoading, isFetching, isError, isFetched, isPaused } = useCachedUserListQuery();
    if (isError) return new Error("Error fetching user data");
    if (isLoading || isPaused || !data) return <CardSkeleton />; // Isloading is true when api in queryFn was calling and data doesn't exist in cache
    if (isFetched) {
        console.log("User has been fetched");
    }
    if (isFetching) {
        console.log(
            "isFetching is true when data exists in cache and the api in queryFn is calling to update the data"
        );
    }
    return (
        <div>
            <h1>User</h1>
            {data.map((user) => (
                <div key={user.id}>
                    <p>User ID: {user?.id}</p>
                    <p>Todo name: {user?.name}</p>
                    <p>Todo name: {user?.username}</p>
                    <p>Status: {user?.email}</p>
                    <Button variant={"outline"}>
                        <Link href={`/user/user-details/${user.id}`}>View profile</Link>
                    </Button>
                </div>
            ))}
        </div>
    );
}
