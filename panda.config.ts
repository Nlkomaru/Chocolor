import { defineConfig, defineGlobalStyles } from "@pandacss/dev";

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
        extend: {},
    },
    jsxFramework: "react",

    // The output directory for your css system
    outdir: "styled-system",
});
