import "../app/app.css";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview, StoryContext } from "@storybook/react-vite";
import { createStore, Provider as JotaiProvider } from "jotai";
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
import React, { useEffect, useState } from "react";

const apca = registerAPCACheck("silver");

export const parameters = {
    screenshot: {
        provider: {
            name: "storycap",
        },
    },
};

const withJotai = (Story: Function, context: StoryContext) => {
    const { atoms, values } = context.parameters.jotai ?? {};
    const [store] = useState(createStore());

    useEffect(() => {
        if (atoms == null) {
            return;
        }
        for (const atomName of Object.keys(atoms)) {
            const atom = atoms[atomName];
            const value = values[atomName];
            store.set(atom, value);
        }
    }, [store, atoms, values]);

    if (atoms == null) {
        return <Story />;
    }

    return (
        <JotaiProvider store={store}>
            <Story />
        </JotaiProvider>
    );
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
                <div
                    style={{
                        backgroundColor: "var(--chakra-colors-bg)",
                        padding: "1rem",
                    }}
                >
                    <Story />
                </div>
            </Provider>
        ),
        withThemeByClassName({
            defaultTheme: "light",
            themes: { light: "", dark: "dark" },
        }),
        withRouter,
        withJotai,
    ],
};

export default preview;
