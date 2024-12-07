"use client";
import { CardSkeleton } from "@/app/(dashboard)/skeletons";
import { useCachedUserQuery } from "@/lib/react-query/userCache";
import { getQueryParams } from "@/lib/utils";
import { useParams } from "next/navigation";

export default function UserDetails() {
    const userId = getQueryParams<number>(useParams(), "id");
    const { data, isLoading, isError, isPaused } = useCachedUserQuery(userId); // Get query status
    if (isError || data === null) return new Error("Error getting user data");
    if (isLoading || isPaused || !data) return <CardSkeleton />; // isLoading is true when api in queryFn was calling and data doesn't exist in cache
    return (
        <div>
            <h1>User Details</h1>
            <p>User ID: {data?.id}</p>
            <p>Todo name: {data?.name}</p>
            <p>Todo name: {data?.username}</p>
            <p>Status: {data?.email}</p>
        </div>
    );
}
