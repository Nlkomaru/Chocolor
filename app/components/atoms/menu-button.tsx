"use client";

import { Button } from "@chakra-ui/react";
import * as React from "react";
import { Link } from "react-router";
import { sva } from "../../../styled-system/css";

// Styles for an individual menu button using a single 'root' slot
const menuButtonStyles = sva({
    slots: ["root", "label"],
    base: {
        root: {
            display: "flex",
            width: "280px",
            height: "3rem",
            minWidth: "4rem",
            justifyContent: "flex-start",
            gap: "2rem",
            paddingLeft: "1rem",
            borderRadius: "0 100rem 100rem 0",
        },
        label: {
            display: "flex",
            paddingLeft: "1rem",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "lg",
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
    function MenuButton(
        { label, icon, path, disabled, className, current },
        ref,
    ) {
        const classes = menuButtonStyles();
        return (
            <Button
                ref={ref}
                className={`${classes.root} ${className || ""}`}
                variant={current ? "solid" : "ghost"}
                disabled={disabled}
                size="xl"
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
