import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "jotai";
import type { FC } from "react";
import SettingPage from "./page";

const meta: Meta<typeof SettingPage> = {
    title: "Pages/SettingPage",
    component: SettingPage,
    parameters: {
        layout: "fullscreen",
    },
    decorators: [
        (Story: FC) => (
            <Provider>
                <div
                    style={{
                        padding: "2rem",
                        maxWidth: "800px",
                        margin: "0 auto",
                    }}
                >
                    <Story />
                </div>
            </Provider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof SettingPage>;

// デフォルトの設定ページ
export const Default: Story = {
    name: "デフォルト",
};
