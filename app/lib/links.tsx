import { History, Home, Info, Settings } from "lucide-react";
import type { MenuButtonProps } from "../components/atoms/menu-button";
import type { FooterItem } from "../components/molecules/menu-footer";

export const NAVIGATION_LINKS: MenuButtonProps[] = [
    {
        label: "Home",
        path: "/",
        icon: <Home />,
        id: "home",
    },
    {
        label: "History",
        path: "/history",
        icon: <History />,
        id: "history",
    },
    {
        label: "About",
        path: "/about",
        icon: <Info />,
        id: "about",
    },
    {
        label: "Settings",
        path: "/settings",
        icon: <Settings />,
        id: "settings",
    },
];

export const FOOTER_LINKS: FooterItem[] = [
    {
        id: "open-source",
        label: "Open Source License",
        path: "/license",
    },
    {
        id: "privacy-policy",
        label: "Privacy Policy",
        path: "/privacy",
    },
    {
        id: "github",
        label: "Github",
        path: "https://github.com/nlkomaru/chocolor",
    },
];
