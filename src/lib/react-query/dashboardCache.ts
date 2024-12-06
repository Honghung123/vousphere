import { useQuery } from "@tanstack/react-query";
import { commonOptions } from "@/lib/react-query/options";

export function getCachedUsersStatistic() {
    return useQuery({
        queryKey: ["usersStatistic"],
        queryFn: () => {
            return fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
                res.json().then((data) => data.length)
            );
        },
        ...commonOptions,
    });
}
