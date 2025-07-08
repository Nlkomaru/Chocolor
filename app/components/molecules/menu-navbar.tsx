"use client";

import { VStack } from "@chakra-ui/react";
import { NAVIGATION_LINKS } from "~/lib/links";
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

export type NavbarItem = MenuButtonProps;

export const MenuNavbar = ({
    items = NAVIGATION_LINKS,
    className,
}: {
    items?: NavbarItem[];
    className?: string;
}) => {
    const classes = menuNavbarStyles();

    return (
        <div className={`${classes.container} ${className || ""}`}>
            <VStack gap={2} align="stretch">
                {items.map(({ ...buttonProps }) => (
                    <MenuButton key={buttonProps.label} {...buttonProps} />
                ))}
            </VStack>
        </div>
    );
};
