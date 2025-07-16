import type { Meta, StoryObj } from "@storybook/react";
import { ColorPalette } from "./color-palette";

const meta: Meta<typeof ColorPalette> = {
    title: "root/ColorPalette",
    component: ColorPalette,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "色の配列をグリッド形式で表示するコンポーネント。画像から抽出した色やカラーパレットの表示に使用します。",
            },
        },
    },
    args: {
        data: {
            id: "story-1",
            name: "サンプル画像",
            imagePath: "path/to/image.png",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
            palette: [
                {
                    before: "#E53E3E",
                    after: "#C53030",
                },
                {
                    before: "#B91C1C",
                    after: "#DC2626",
                },
                {
                    before: "#EF4444",
                    after: "#F56565",
                },
            ],
        },
    },
};

export default meta;
export type Story = StoryObj<typeof ColorPalette>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: "デフォルトの状態。赤系統の色を6列のグリッドで表示します。",
            },
        },
    },
};

export const EmptyPalette: Story = {
    args: {
        data: {
            id: "story-2",
            name: "空のデータ",
            imagePath: "path/to/image.png",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
            palette: [],
        },
    },
    parameters: {
        docs: {
            description: {
                story: "paletteが空の場合。何も表示されません。",
            },
        },
    },
};
