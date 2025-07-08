"use client";

import { sva } from "../../../styled-system/css";
import type { MenuButtonProps } from "../atoms/menu-button";
import { Title } from "../atoms/title";
import { type FooterItem, MenuFooter } from "../molecules/menu-footer";
import { MenuNavbar } from "../molecules/menu-navbar";

// Container style
const verticalMenuStyles = sva({
    slots: ["container"],
    base: {
        container: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
        },
    },
});

export interface VerticalMenuProps {
    className?: string;
    navbarItems?: MenuButtonProps[];
    footerItems?: FooterItem[];
}

export const VerticalMenu = ({ className }: VerticalMenuProps) => {
    const classes = verticalMenuStyles();

    return (
        <div className={`${classes.container} ${className || ""}`}>
            <Title />
            <MenuNavbar />
            <MenuFooter />
        </div>
    );
};
