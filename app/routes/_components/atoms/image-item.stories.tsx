import type { Meta, StoryObj } from "@storybook/react";
import { ImageItem } from "./image-item";
import { imagePaletteAtom } from "app/state/palette";

const meta: Meta<typeof ImageItem> = {
    title: "root/ImageItem",
    component: ImageItem,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        jotai: {
            atoms: {
                palette: imagePaletteAtom("storybook-image"),
            },
            values: {
                palette: {
                    id: "storybook-image",
                    name: "storybook-img",
                    imagePath: "https://picsum.photos/200/200?random=1",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    palette: [
                        { before: "#ff0000", after: "#ff0000" },
                        { before: "#00ff00", after: "#00ff00" },
                        { before: "#0000ff", after: "#0000ff" },
                    ],
                },
            },
        },
        docs: {
            description: {
                component:
                    "画像ファイルの詳細情報を表示するコンポーネント。ファイルパス、サムネイル画像、Stats（幅・高さ・カラーパレット）を横並びレイアウトで表示します。",
            },
        },
    },
    args: {
        id: "storybook-image",
    },
};

export default meta;
export type Story = StoryObj<typeof ImageItem>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: "デフォルトの状態。ファイルパス、画像サムネイル、Stats（幅・高さ・カラーパレット）が表示されます。",
            },
        },
        jotai: {
            atoms: {
                palette: imagePaletteAtom("storybook-image"),
            },
            values: {
                palette: {
                    id: "storybook-image",
                    name: "storybook-img",
                    imagePath: "https://picsum.photos/200/200?random=1",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    palette: [
                        { before: "#ff0000", after: "#ff0000" },
                        { before: "#00ff00", after: "#00ff00" },
                        { before: "#0000ff", after: "#0000ff" },
                    ],
                },
            },
        },
    },
};

