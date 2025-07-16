import { sva } from "styled-system/css";

export const settingStyle = sva({
    slots: ["container", "heading", "text"],
    base: {
        container: {
            mb: "8",
        },
        heading: {
            fontSize: "lg",
            marginBottom: "4",
        },
        text: {
            marginBottom: "4",
        },
    },
});
