import pandacss from "@pandacss/dev/postcss";
import autoprefixer from "autoprefixer";
import { defineConfig, loadEnv, type UserConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }): UserConfig => {
    const env = loadEnv(mode, process.cwd(), "");
    process.env = { ...process.env, ...env };
    return {
        css: {
            postcss: {
                plugins: [autoprefixer, pandacss],
            },
        },
        plugins: [tsconfigPaths()],
        build: {
            sourcemap: false, // ソースマップ警告を回避
            rollupOptions: {
                onwarn(warning, warn) {
                    // "use client"ディレクティブの警告を抑制
                    if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
                        return;
                    }
                    warn(warning);
                },
            },
        },
    };
});
