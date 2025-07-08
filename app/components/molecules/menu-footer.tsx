"use client";

import { Link } from "react-router";
import { sva } from "../../../styled-system/css";

export interface FooterItem {
    id: string;
    label: string;
    path: string;
}

const defaultItems = [
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
        path: "https://github.com/nikomaru",
    },
];

// Footer全体のスタイル
const menuFooterCustomStyles = sva({
    slots: ["container", "column", "row", "text"],
    base: {
        container: {
            paddingLeft: "30px",
            paddingRight: "30px",
            paddingTop: "40px",
            paddingBottom: "40px",
            position: "absolute",
            left: 0,
            top: 0,
            display: "inline-flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "40px",
        },
        column: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "8px",
        },
        row: {
            // rowは不要だが、拡張性のためslotを用意
        },
        text: {
            textAlign: "center",
            color: "black",
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            lineHeight: "16px",
            wordWrap: "break-word",
        },
    },
});

export const MenuFooter = ({
    items = defaultItems,
    className,
}: {
    items?: FooterItem[];
    className?: string;
}) => {
    const classes = menuFooterCustomStyles();
    return (
        <div className={`${classes.container} ${className || ""}`}>
            <div className={classes.column}>
                {items.map(({ id, label, path }) => (
                    <Link key={id} id={id} to={path}>
                        {label}
                    </Link>
                ))}
            </div>
            <div className={classes.text}>
                No right reserved Written by nikomaru
            </div>
        </div>
    );
};
