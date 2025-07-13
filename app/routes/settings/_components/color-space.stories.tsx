import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "jotai";
import type { FC } from "react";
import { ColorSpace } from "./color-space";

const meta: Meta<typeof ColorSpace> = {
    title: "Settings/ColorSpace",
    component: ColorSpace,
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
type Story = StoryObj<typeof ColorSpace>;

// デフォルトの設定
export const Default: Story = {
    name: "デフォルト",
};
