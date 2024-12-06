import { MobileDesktop } from "@/app/(dashboard)/admin/(charts)/bar-charts";
import BasicLineChart from "@/app/(dashboard)/admin/(charts)/line-chart";
import YearlyBreakup from "@/app/(dashboard)/admin/(charts)/statistics";
import React from "react";

export default function DashboardPage() {
    return (
        <div className="overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <YearlyBreakup />
                <YearlyBreakup />
                <YearlyBreakup />
                <YearlyBreakup />
            </div>
            <BasicLineChart />
        </div>
    );
}
