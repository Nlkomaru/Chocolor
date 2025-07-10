"use client";

import { Box } from "@chakra-ui/react";
import { sva } from "../../../styled-system/css";
import { Title } from "../atoms/title";
import { type FooterItem, MenuFooter } from "../molecules/menu-footer";
import { MenuNavbar, type NavbarItem } from "../molecules/menu-navbar";

// Container style
const verticalMenuStyles = sva({
    slots: ["container"],
    base: {
        container: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            justifyContent: "space-between",
            bgColor: {
                _light: "var(--chakra-colors-potato-100)/40",
                _dark: "var(--chakra-colors-wafer-950)",
            },
        },
    },
});

export interface VerticalMenuProps {
    className?: string;
    navbarItems?: NavbarItem[];
    footerItems?: FooterItem[];
}

export const VerticalMenu = ({
    className,
    navbarItems = [],
    footerItems = [],
}: VerticalMenuProps) => {
    const classes = verticalMenuStyles();

    return (
        <div className={`${classes.container} ${className || ""}`}>
            <Title />
            <MenuNavbar items={navbarItems} />
            {/* footerItemの数が0でも表示する */}

            <Box mt="auto">
                <MenuFooter items={footerItems} />
            </Box>
        </div>
    );
};
