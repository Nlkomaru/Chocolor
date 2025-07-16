import { cloudflare } from "@cloudflare/vite-plugin";
import pandacss from "@pandacss/dev/postcss";
import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// @ts-ignore
export default defineConfig({
    css: {
        postcss: {
            // @ts-ignore
            plugins: [pandacss, autoprefixer],
        },
    },
    plugins: [
        cloudflare({ viteEnvironment: { name: "ssr" } }),
        reactRouter(),
        tsconfigPaths(),
    ],
});
