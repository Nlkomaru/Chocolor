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
        disabled: true,
    },

    {
        label: "Settings",
        path: "/settings",
        icon: <Settings />,
        id: "settings",
        disabled: true,
    },
    {
        label: "About",
        path: "/about",
        icon: <Info />,
        id: "about",
        disabled: true,
    },
];

export const FOOTER_LINKS: FooterItem[] = [
    {
        id: "open-source",
        label: "Open Source License",
        path: "/license",
        openInNewTab: false,
    },
    {
        id: "refrence-paper",
        label: "Reference Paper",
        path: "https://www.ohadf.com/papers/ChangFriedLiuDiVerdiFinkelstein_SIGGRAPH2015_small.pdf",
        openInNewTab: true,
    },
    {
        id: "storybook",
        label: "Storybook",
        path: "https://storybook.chocolor.nikomaru.dev",
        openInNewTab: true,
    },
    {
        id: "github",
        label: "Github",
        path: "https://github.com/nlkomaru/chocolor",
        openInNewTab: true,
    },
];
