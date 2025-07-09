import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: [
        "../app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
        "../app/components/**/*.mdx",
        "../app/routes/**/_components/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],
    addons: [
        "@chromatic-com/storybook",
        "@storybook/addon-vitest",
        "@storybook/addon-a11y",
        "@storybook/addon-docs",
        "@storybook/addon-themes",
        "storybook-addon-remix-react-router",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {
            builder: {
                viteConfigPath: "vite.storybook.config.ts",
            },
        },
    },
    viteFinal: async (config) => {
        config.esbuild = {
            ...config.esbuild,
            jsx: "automatic",
        };
        return config;
    },
};
export default config;
