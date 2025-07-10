import type { Meta, StoryObj } from "@storybook/react";
import { ImageGallery } from "./image-gallery";

const meta: Meta<typeof ImageGallery> = {
    title: "root/ImageGallery",
    component: ImageGallery,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    args: {
        images: [
            {
                path: "example/image1.jpg",
                url: "https://picsum.photos/200/200?random=1",
            },
            {
                path: "example/nested/image2.png",
                url: "https://picsum.photos/200/200?random=2",
            },
            {
                path: "assets/sample.webp",
                url: "https://picsum.photos/200/200?random=3",
            },
        ],
    },
};

export default meta;
export type Story = StoryObj<typeof ImageGallery>;

export const Default: Story = {};

export const Empty: Story = {
    args: {
        images: [],
    },
};

export const SingleImage: Story = {
    args: {
        images: [
            {
                path: "single/image.jpg",
                url: "https://picsum.photos/200/200?random=4",
            },
        ],
    },
};

export const ManyImages: Story = {
    args: {
        images: Array.from({ length: 10 }, (_, i) => ({
            path: `gallery/image${i + 1}.jpg`,
            url: `https://picsum.photos/200/200?random=${i + 10}`,
        })),
    },
};
