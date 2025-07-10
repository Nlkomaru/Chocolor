import type { Meta, StoryObj } from "@storybook/react";
import { DirectorySelector } from "./directory-selector";

const meta: Meta<typeof DirectorySelector> = {
    title: "root/DirectorySelector",
    component: DirectorySelector,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component:
                    "ディレクトリを選択して画像ファイルを表示するコンポーネント。File System Access APIをサポートしているブラウザでは、モダンなディレクトリピッカーを使用し、サポートしていない場合はフォールバックとして従来のinput要素を使用します。",
            },
        },
    },
};

export default meta;
export type Story = StoryObj<typeof DirectorySelector>;

export const Default: Story = {};

export const WithDocumentation: Story = {
    parameters: {
        docs: {
            description: {
                story: "デフォルトの状態。ボタンをクリックしてディレクトリを選択できます。選択された画像ファイルは自動的にフィルタリングされ、.imageignore パターンに一致するファイルは除外されます。",
            },
        },
    },
};
