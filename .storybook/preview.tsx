import "../app/app.css";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import { Provider as JotaiProvider } from "jotai";
import { themes } from "storybook/theming";
import {
    reactRouterParameters,
    withRouter,
} from "storybook-addon-remix-react-router";
import { Provider } from "../app/components/ui/provider";
import React from "react";

export const parameters = {
    screenshot: {
        provider: {
            name: "storycap",
        },
    },
};
const preview: Preview = {
    parameters: {
        options: {
            storySort: {
                order: ["Organisms", "Molecules", "Atoms"],
            },
        },
        reactRouter: reactRouterParameters({
            location: {
                pathParams: { userId: "42" },
            },
            routing: { path: "/" },
        }),
        docs: {
            theme: themes.light,
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        a11y: {
            test: "todo",
            context: "body",
            config: {
                rules: [
                    {
                        id: "autocomplete-valid",
                        selector: '*:not([autocomplete="nope"])',
                    },
                    {
                        id: "image-alt",
                        enabled: false,
                    },
                ],
            },
            options: {},
        },
    },
    decorators: [
        (Story, { globals }) => (
            <Provider forcedTheme={globals.theme}>
                <JotaiProvider>
                    <Story />
                </JotaiProvider>
            </Provider>
        ),
        withThemeByClassName({
            defaultTheme: "light",
            themes: { light: "", dark: "dark" },
        }),
        withRouter,
    ],
};

export default preview;
