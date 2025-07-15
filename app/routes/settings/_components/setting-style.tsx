import { sva } from "styled-system/css";

export const settingStyle = sva({
    slots: ["container", "heading", "text"],
    base: {
        container: {
            padding: "2rem",
        },
        heading: {
            marginTop: "4",
        },
        text: {
            marginBottom: "2",
        },
    },
});
