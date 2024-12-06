"use client";
import { ArrowUpLeft, UserPlus2, UsersRound } from "lucide-react";

import { Card } from "@/components/ui/card";
import { getCachedUsersStatistic } from "@/lib/react-query/dashboardCache";
import { StatisticDataCardSkeleton } from "@/app/(dashboard)/skeletons";

const YearlyBreakup = () => {
    const { data, isLoading, isError, isPaused } = getCachedUsersStatistic();
    if (isError) return <div>Error</div>;
    if (isLoading || isPaused || !data) return <StatisticDataCardSkeleton items={{ icon: UsersRound }} />; // Isloading is true when api in queryFn was calling and data doesn't exist in cache
    return (
        <Card title="Yearly Breakup" className="w-full h-full p-3">
            <div className="flex justify-between items-center">
                <dl className="space-y-3">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Unique views</dt>
                    <dd className="text-2xl font-light md:text-4xl dark:text-white">192.1k</dd>
                    <dd className="flex items-center space-x-1 text-sm font-medium text-lime-500 dark:text-lime-300">
                        <span>32k increase</span>
                        <ArrowUpLeft />
                    </dd>
                </dl>
                <dl>
                    <UsersRound size={72} stroke="#3b82f6" />
                </dl>
            </div>
        </Card>
    );
};

export default YearlyBreakup;
