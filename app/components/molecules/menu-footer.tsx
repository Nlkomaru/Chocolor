"use client";

import { Link } from "react-router";
import { FOOTER_LINKS } from "~/lib/links";
import { sva } from "../../../styled-system/css";

export interface FooterItem {
    id: string;
    label: string;
    path: string;
}

// Footer全体のスタイル
const menuFooterCustomStyles = sva({
    slots: ["container", "column", "row", "text"],
    base: {
        container: {
            paddingLeft: "2rem",
            paddingRight: "1rem",
            paddingTop: "1rem",
            paddingBottom: "1rem",
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
            fontWeight: 400,
            lineHeight: "16px",
            wordWrap: "break-word",
        },
    },
});

export const MenuFooter = ({
    items = FOOTER_LINKS,
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
                No right reserved Written by{" "}
                <Link to="https://github.com/nlkomaru">Nikomaru</Link>
            </div>
        </div>
    );
};
