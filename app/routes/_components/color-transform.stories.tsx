import type { Meta, StoryObj } from "@storybook/react";
import { ColorTransform } from "./color-transform";

const meta: Meta<typeof ColorTransform> = {
    title: "root/ColorTransform",
    component: ColorTransform,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "画像の色変換を表示するコンポーネント。変換前の色（beforeColor）と変換後の色（afterColor）を矢印で繋いで表示します。",
            },
        },
    },
    args: {
        image_id: "1",
        index: 0,
        beforeColor: "#FF0000",
        afterColor: "#00FF00",
    },
};

export default meta;
export type Story = StoryObj<typeof ColorTransform>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: "デフォルトの状態。赤から緑への色変換を表示します。",
            },
        },
    },
};

export const BlueToYellow: Story = {
    args: {
        beforeColor: "#0066CC",
        afterColor: "#FFCC00",
    },
    parameters: {
        docs: {
            description: {
                story: "青から黄色への色変換の例。",
            },
        },
    },
};

export const DarkToLight: Story = {
    args: {
        beforeColor: "#2D3748",
        afterColor: "#F7FAFC",
    },
    parameters: {
        docs: {
            description: {
                story: "ダークからライトカラーへの変換の例。",
            },
        },
    },
};

export const SimilarColors: Story = {
    args: {
        beforeColor: "#E53E3E",
        afterColor: "#FC8181",
    },
    parameters: {
        docs: {
            description: {
                story: "類似した色の間での微細な変換の例。",
            },
        },
    },
};

export const EqualColors: Story = {
    args: {
        beforeColor: "#000000",
        afterColor: "#000000",
    },
};
