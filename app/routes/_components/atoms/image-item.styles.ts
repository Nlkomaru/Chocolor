import { sva } from "../../../../styled-system/css";

export const imageItemStyles = sva({
    slots: ["container", "image", "statsContainer", "statsTitle", "statValue"],
    base: {
        container: {
            gap: 3,
            width: "full",
            padding: "1rem 2rem",
            bgColor: "var(--chakra-colors-bg-default)",
            border: "1px solid var(--chakra-colors-border)",
            borderRadius: "md",
        },
        image: {
            width: "160px",
            height: "160px",
            objectFit: "cover",
            borderRadius: "sm",
            bgColor: "white",
            flexShrink: 0,
        },
        statsContainer: {
            gap: 4,
            alignItems: "flex-start",
            flex: 1,
        },
        statsTitle: {
            fontSize: "lg",
            fontWeight: "600",
            textAlign: "left",
            color: "var(--chakra-colors-fg-default)",
        },
        statValue: {
            fontSize: "sm",
            color: "var(--chakra-colors-fg-muted)",
        },
    },
});
