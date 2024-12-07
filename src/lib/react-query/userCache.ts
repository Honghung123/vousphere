import { useQuery } from "@tanstack/react-query";
import { commonOptions } from "@/lib/react-query/options";

export function useCachedUserQuery(id: number) {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => getUserById(id),
        throwOnError: true,
        ...commonOptions,
    });
}

export function useCachedUserListQuery() {
    return useQuery({
        queryKey: ["userList"],
        queryFn: getUsers,
        ...commonOptions,
    });
}
function getUserById(id: number): any {
    throw new Error("Function not implemented.");
}

function getUsers(): any {
    throw new Error("Function not implemented.");
}
