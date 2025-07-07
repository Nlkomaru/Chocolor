import type { Meta, StoryObj } from "@storybook/react";
import { ImageUpload } from "./image-upload";

const meta: Meta<typeof ImageUpload> = {
    title: "Molecules/ImageUpload",
    component: ImageUpload,
    args: {
        title: "ターゲット画像",
        type: "target",
        description: "変換したい画像をアップロードしてください",
        accept: "image/*",
        maxFiles: 1,
    },
};

export default meta;

type Story = StoryObj<typeof ImageUpload>;

export const Default: Story = {};
