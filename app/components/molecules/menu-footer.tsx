"use client";

import { HStack, Icon } from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { sva } from "../../../styled-system/css";
import { FOOTER_LINKS } from "../../lib/links";
import { ColorSwitch } from "../atoms/color-switch";

export interface FooterItem {
    id: string;
    label: string;
    path: string;
    openInNewTab: boolean;
}

// Footer全体のスタイル
const menuFooterCustomStyles = sva({
    slots: ["container", "column", "row", "text", "colorSwitch", "link"],
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
            fontSize: "md",
            gap: "8px",
        },
        row: {
            // rowは不要だが、拡張性のためslotを用意
        },
        text: {
            textAlign: "left",
            fontSize: "sm",
            color: "var(--chakra-colors-fg-muted)",
            lineHeight: "1.5",
        },
        colorSwitch: {
            paddingLeft: "1rem",
        },
        link: {
            borderBottom: "2px dotted {colors.gray.500}",
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
                {items.map(({ id, label, path, openInNewTab }) => (
                    <Link
                        key={id}
                        id={id}
                        to={path}
                        target={openInNewTab ? "_blank" : "_self"}
                        rel={openInNewTab ? "noopener noreferrer" : undefined}
                    >
                        <HStack gap="0.5rem">
                            {label}
                            {openInNewTab && (
                                <Icon as={ExternalLink} size="sm" />
                            )}
                        </HStack>
                    </Link>
                ))}
            </div>
            <HStack>
                <div className={classes.text}>
                    No right reserved
                    <br />
                    Written by{" "}
                    <Link
                        className={classes.link}
                        to="https://github.com/nlkomaru"
                    >
                        Nikomaru
                    </Link>{" "}
                    in 2025
                </div>
                <div className={classes.colorSwitch}>
                    <ColorSwitch />
                </div>
            </HStack>
        </div>
    );
};
