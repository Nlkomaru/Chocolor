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
import { registerAPCACheck } from "./a11y";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

import "@fontsource/zen-kaku-gothic-new/500.css";

const apca = registerAPCACheck("silver");

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
            test: "error",
            context: "body",
            config: {
                checks: [...apca.checks],
                rules: [
                    {
                        id: "autocomplete-valid",
                        selector: '*:not([autocomplete="nope"])',
                    },
                    {
                        id: "image-alt",
                        enabled: false,
                    },
                    {
                        id: "color-contrast",
                        enabled: false,
                    },
                    {
                        id: "color-contrast-enhanced",
                        enabled: false,
                    },
                    ...apca.rules,
                ],
            },
            options: {},
        },
    },
    decorators: [
        (Story, { globals }) => (
            <Provider forcedTheme={globals.theme}>
                <JotaiProvider>
                    <div
                        style={{
                            backgroundColor: "var(--chakra-colors-bg)",
                            padding: "1rem",
                        }}
                    >
                        <Story />
                    </div>
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
