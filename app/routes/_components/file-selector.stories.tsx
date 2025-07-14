import type { Meta, StoryObj } from "@storybook/react";
import { FileSelector } from "./file-selector";

const meta: Meta<typeof FileSelector> = {
    title: "root/FileSelector",
    component: FileSelector,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "画像ファイルを選択するコンポーネント。Chakra UIのFileUploadコンポーネントを使用し、ドラッグ＆ドロップやボタンクリックでファイルを選択できます。画像ファイルのみをフィルタリングし、選択された画像のサムネイルを表示します。",
            },
        },
    },
};

export default meta;
export type Story = StoryObj<typeof FileSelector>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: "デフォルトの状態。ファイル選択エリアとボタンが表示されます。画像ファイルをドラッグ＆ドロップするか、ボタンをクリックしてファイルを選択できます。",
            },
        },
    },
};

export const WithDocumentation: Story = {
    parameters: {
        docs: {
            description: {
                story: "対応している画像形式：PNG, JPG, JPEG, GIF, WebP, BMP, SVG。複数ファイルの選択に対応しており、最大100ファイルまで選択できます。",
            },
        },
    },
};
