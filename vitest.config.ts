import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { defineConfig, mergeConfig } from "vitest/config";

const dirname =
    typeof __dirname !== "undefined"
        ? __dirname
        : path.dirname(fileURLToPath(import.meta.url));

import viteConfig from "./vite.config";

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            extends: true,
            reporters: process.env.GITHUB_ACTIONS
                ? ["dot", "github-actions"]
                : ["dot"],
            outputFile: {
                json: "./vitest-report.json",
            },
            // Use `workspace` field in Vitest < 3.2
            projects: [
                {
                    plugins: [
                        storybookTest({
                            // The location of your Storybook config, main.js|ts
                            configDir: path.join(dirname, ".storybook"),
                            // This should match your package.json script to run Storybook
                            // The --ci flag will skip prompts and not open a browser
                            storybookScript: "pnpm run dev:storybook --ci",
                        }),
                    ],
                    test: {
                        name: "storybook",
                        // Enable browser mode
                        browser: {
                            enabled: true,
                            // Make sure to install Playwright
                            provider: "playwright",
                            headless: true,
                            instances: [{ browser: "firefox" }],
                            viewport: {
                                width: 1920,
                                height: 1080,
                            },
                        },
                        setupFiles: ["./.storybook/vitest.setup.ts"],
                    },
                },
            ],
        },
    }),
);
