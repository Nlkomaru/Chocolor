import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "jotai";
import type { FC } from "react";
import { DebugPanel } from "./debug-panel";

const meta: Meta<typeof DebugPanel> = {
    title: "Settings/DebugPanel",
    component: DebugPanel,
    parameters: {
        layout: "padded",
    },
    decorators: [
        (Story: FC) => (
            <Provider>
                <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <Story />
                </div>
            </Provider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof DebugPanel>;

// デフォルトの設定
export const Default: Story = {
    name: "デフォルト",
};
