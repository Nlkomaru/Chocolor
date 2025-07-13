import type { Meta, StoryObj } from "@storybook/react";
import { ImageItem } from "./image-item";

const meta: Meta<typeof ImageItem> = {
    title: "root/ImageItem",
    component: ImageItem,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "画像ファイルの詳細情報を表示するコンポーネント。ファイルパス、サムネイル画像、Stats（幅・高さ・カラーパレット）を横並びレイアウトで表示します。",
            },
        },
    },
    args: {
        path: "example/sample-image.jpg",
        url: "https://picsum.photos/160/160?random=1",
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
    },
};

export const NestedPath: Story = {
    args: {
        path: "assets/images/nested/directory/very-long-filename-image.png",
        url: "https://picsum.photos/160/160?random=2",
    },
    parameters: {
        docs: {
            description: {
                story: "深いディレクトリ構造とファイル名の長い画像の例。パスの表示を確認できます。",
            },
        },
    },
};

export const ShortPath: Story = {
    args: {
        path: "img.jpg",
        url: "https://picsum.photos/160/160?random=3",
    },
    parameters: {
        docs: {
            description: {
                story: "短いファイル名の画像の例。シンプルなケースでのレイアウトを確認できます。",
            },
        },
    },
};

export const LongPath: Story = {
    args: {
        path: "very/deep/nested/directory/structure/with/many/levels/and/a/very/long/filename/that/might/wrap/multiple/lines/image.webp",
        url: "https://picsum.photos/160/160?random=4",
    },
    parameters: {
        docs: {
            description: {
                story: "非常に長いパスの画像の例。テキストの折り返しやレイアウトの対応を確認できます。",
            },
        },
    },
};
