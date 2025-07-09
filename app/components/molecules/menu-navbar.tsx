"use client";

import { VStack } from "@chakra-ui/react";
import { useLocation } from "react-router";
import { sva } from "../../../styled-system/css";
import { NAVIGATION_LINKS } from "../../lib/links";
import { MenuButton, type MenuButtonProps } from "../atoms/menu-button";

// Styles for the navbar container
const menuNavbarStyles = sva({
    slots: ["container"],
    base: {
        container: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            fontSize: "lg",
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
    const location = useLocation();
    return (
        <div className={`${classes.container} ${className || ""}`}>
            <VStack gap={2} align="stretch">
                {items.map(({ ...buttonProps }) => (
                    <MenuButton
                        key={buttonProps.label}
                        {...buttonProps}
                        current={buttonProps.path === location.pathname}
                    />
                ))}
            </VStack>
        </div>
    );
};
