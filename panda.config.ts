import { defineGlobalStyles, defineTextStyles } from "@chakra-ui/react";
import { defineConfig } from "@pandacss/dev";

const textStyles = defineTextStyles({
    body: {
        description: "The body text style - used in paragraphs",
        value: {
            fontFamily: "Poppins, Zen Kaku Gothic New, Fluent Emoji Color",
            fontSize: {
                base: "md",
                md: "md",
                lg: "lg",
            },
            lineHeight: "1.8",
            fontWeight: "400",
        },
    },
});

const globalCss = defineGlobalStyles({
    // リセットスタイル - 白色の縁を削除
    "html, body": {
        margin: 0,
        padding: 0,
        height: "100%",
        boxSizing: "border-box",
    },
    "*, *::before, *::after": {
        boxSizing: "inherit",
    },
    //linkのスタイルを削除
    a: {
        textDecoration: "none",
        color: "inherit",
    },
});

// @ts-ignore
export default defineConfig({
    // @ts-ignore
    globalCss,
    preflight: true,

    // Where to look for your css declarations
    include: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
        extend: {
            // @ts-ignore
            textStyles,
        },
    },
    jsxFramework: "react",

    // The output directory for your css system
    outdir: "styled-system",
});
