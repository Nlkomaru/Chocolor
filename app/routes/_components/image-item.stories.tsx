import type { Meta, StoryObj } from "@storybook/react";
import { ImageItem } from "./image-item";

const meta: Meta<typeof ImageItem> = {
    title: "root/ImageItem",
    component: ImageItem,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    args: {
        path: "example/sample-image.jpg",
        url: "https://picsum.photos/160/160?random=1",
    },
};

export default meta;
export type Story = StoryObj<typeof ImageItem>;

export const Default: Story = {};

export const NestedPath: Story = {
    args: {
        path: "assets/images/nested/directory/very-long-filename-image.png",
        url: "https://picsum.photos/160/160?random=2",
    },
};

export const ShortPath: Story = {
    args: {
        path: "img.jpg",
        url: "https://picsum.photos/160/160?random=3",
    },
};

export const LongPath: Story = {
    args: {
        path: "very/deep/nested/directory/structure/with/many/levels/and/a/very/long/filename/that/might/wrap/multiple/lines/image.webp",
        url: "https://picsum.photos/160/160?random=4",
    },
};
