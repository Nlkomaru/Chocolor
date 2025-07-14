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
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
            favoriteColor: ["#E53E3E"],
            pictureData: [
                {
                    id: "1",
                    imagePath: "path/to/image.png",
                    bin: 1,
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
                        {
                            before: "#FC8181",
                            after: "#FEB2B2",
                        },
                        {
                            before: "#FED7D7",
                            after: "#FED7D7",
                        },
                        {
                            before: "#FFCDD2",
                            after: "#FFBABA",
                        },
                    ],
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

export const EmptyPictureData: Story = {
    args: {
        data: {
            id: "story-2",
            name: "空のデータ",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z",
            favoriteColor: [],
            pictureData: [],
        },
    },
    parameters: {
        docs: {
            description: {
                story: "pictureDataが空の場合。何も表示されません。",
            },
        },
    },
};
