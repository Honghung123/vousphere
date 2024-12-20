import {
    Calendar,
    CalendarDays,
    FileQuestionIcon,
    Gamepad2,
    Home,
    MessageCircleQuestion,
    PictureInPicture2Icon,
    Settings,
    Shapes,
    UserSquare2Icon,
    VoicemailIcon,
} from "lucide-react";

export const adminNavMain = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: Home,
        isActive: false,
    },
    {
        title: "User management",
        url: "/admin/users",
        icon: UserSquare2Icon,
        isActive: false,
    },
    {
        title: "Game management",
        url: "/admin/games",
        icon: Gamepad2,
        isActive: true,
        items: [
            {
                title: "Collections",
                url: "/admin/games/collection",
                icon: Shapes,
            },
            {
                title: "Realtime Quiz",
                url: "/admin/games/realtime-quiz",
                icon: MessageCircleQuestion,
            },
        ],
    },
];
