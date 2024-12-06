import { useQuery } from "@tanstack/react-query";
import { getUserById, getUsers } from "@/app/(profile)/users/api";
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
