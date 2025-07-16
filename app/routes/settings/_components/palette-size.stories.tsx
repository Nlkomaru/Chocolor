import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "jotai";
import type { FC } from "react";
import { PaletteSize } from "./palette-size";

const meta: Meta<typeof PaletteSize> = {
    title: "Settings/PaletteSize",
    component: PaletteSize,
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
type Story = StoryObj<typeof PaletteSize>;

// デフォルトの設定
export const Default: Story = {
    name: "デフォルト",
};
