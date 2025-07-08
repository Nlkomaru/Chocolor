"use client";

import { Heading, VStack } from "@chakra-ui/react";
import { Home, Info, Settings } from "lucide-react";
import { sva } from "../../../styled-system/css";
import { MenuButton, type MenuButtonProps } from "../atoms/menu-button";

// Styles for the navbar container
const menuNavbarStyles = sva({
    slots: ["container"],
    base: {
        container: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
        },
    },
});

const defaultItems = [
    {
        id: "home",
        label: "Home",
        icon: <Home />,
        path: "/",
    },
    {
        id: "about",
        label: "About",
        icon: <Info />,
        path: "/about",
    },
    {
        id: "settings",
        label: "Settings",
        icon: <Settings />,
        path: "/settings",
    },
];

export const MenuNavbar = ({
    items = defaultItems,
    className,
}: {
    items?: MenuButtonProps[];
    className?: string;
}) => {
    const classes = menuNavbarStyles();

    return (
        <div className={`${classes.container} ${className || ""}`}>
            <VStack gap={2} align="stretch">
                {items.map(({ id, ...buttonProps }) => (
                    <MenuButton key={id} id={id} {...buttonProps} />
                ))}
            </VStack>
        </div>
    );
};
