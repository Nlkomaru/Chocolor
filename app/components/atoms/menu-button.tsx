"use client";

import { Button } from "@chakra-ui/react";
import * as React from "react";
import { Link, useLocation } from "react-router";
import { sva } from "../../../styled-system/css";

// Styles for an individual menu button using a single 'root' slot
const menuButtonStyles = sva({
    slots: ["root", "label"],
    base: {
        root: {
            display: "flex",
            width: "20rem",
            height: "4rem",
            minWidth: "4rem",
            justifyContent: "center",
            alignItems: "center",
            gap: "4rem",
            borderRadius: "0 100rem 100rem 0",
        },
        label: {
            display: "flex",
            alignItems: "center",
            gap: "2rem",
        },
    },
});

export interface MenuButtonProps {
    id: string;
    label: string;
    icon?: React.ReactNode;
    path?: string;
    disabled?: boolean;
    current?: boolean;
    className?: string;
}

/**
 * MenuButton – Atom component representing a single item in a menu.
 * This was formerly rendered directly by VerticalMenu; extracting it as an atom
 * allows composition inside molecules like MenuNavbar / MenuFooter.
 */
export const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
    function MenuButton({ id, label, icon, path, disabled, className }, ref) {
        const classes = menuButtonStyles();
        const location = useLocation();
        return (
            <Button
                ref={ref}
                className={`${classes.root} ${className || ""}`}
                variant={path === location.pathname ? "solid" : "ghost"}
                disabled={disabled}
                size="2xl"
                asChild
            >
                {/* Render icon + label */}
                <Link to={path || "/"}>
                    <span className={classes.label}>
                        {icon}
                        {label}
                    </span>
                </Link>
            </Button>
        );
    },
);
