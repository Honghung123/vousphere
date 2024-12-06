import { Calendar, CalendarDays, FileQuestionIcon, Home } from "lucide-react";

export const counterpartNavMain = [
    {
        title: "Dashboard",
        url: "/counterpart",
        icon: Home,
        isActive: false,
    },
    {
        title: "Event",
        url: "/counterpart/event",
        icon: CalendarDays,
        isActive: true,
        items: [
            {
                title: "Event Overview",
                url: "/counterpart/event",
                icon: Calendar,
            },
            {
                title: "Questions",
                url: "/counterpart/event/kahoot",
                icon: FileQuestionIcon,
            },
        ],
    },
    // {
    //     title: "Settings",
    //     url: "/counterpart/settings",
    //     icon: Settings,
    //     items: [
    //         {
    //             title: "General Settings",
    //             url: "/counterpart/general-settings",
    //             icon: Settings,
    //         },
    //     ],
    // },
];
