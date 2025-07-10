"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { sva } from "../../../../styled-system/css";

// Style definitions for the license card using Panda CSS's sva helper
const licenseCardStyles = sva({
    slots: ["root", "heading", "sub"],
    base: {
        root: {
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            p: "3",
            borderWidth: "1px",
            borderRadius: "md",
            shadow: "sm",
            bg: "{colors.bg.subtle}",
            borderColor: "{colors.border.subtle}",
            width: "100%",
            _hover: {
                shadow: "md",
                textDecoration: "none",
            },
        },
        heading: {
            fontSize: "lg",
            fontWeight: "700",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        sub: {
            fontSize: "sm",
            color: "var(--chakra-colors-fg-muted)",
            fontWeight: "400",
        },
    },
});

// Props definition for the LicenseCard component
export interface LicenseCardProps {
    /** Full package identifier, e.g. "react@18.2.0" */
    pkg: string;
    /** Repository URL */
    repository?: string;
    /** Publisher (author) */
    publisher?: string;
}

/**
 * LicenseCard – displays basic OSS dependency information.
 */
export const LicenseCard = ({
    pkg,
    repository,
    publisher,
}: LicenseCardProps) => {
    const classes = licenseCardStyles();

    // Split the full identifier into name and version for nicer display
    const atIndex = pkg.lastIndexOf("@");
    const name = atIndex > 0 ? pkg.slice(0, atIndex) : pkg;
    const version = atIndex > 0 ? pkg.slice(atIndex + 1) : undefined;

    const content = (
        <>
            <Heading
                as="h3"
                className={classes.heading}
                display="flex"
                alignItems="center"
                gap="4"
                fontWeight="normal"
            >
                {name}
                {repository && <ExternalLink size={16} />}
            </Heading>
            {version && <Text className={classes.sub}>v{version}</Text>}
            {publisher && (
                <Text className={classes.sub}>Author: {publisher}</Text>
            )}
        </>
    );

    return repository ? (
        <Box asChild className={classes.root}>
            <Link to={repository} target="_blank" rel="noopener noreferrer">
                {content}
            </Link>
        </Box>
    ) : (
        <Box as="article" className={classes.root}>
            {content}
        </Box>
    );
};
