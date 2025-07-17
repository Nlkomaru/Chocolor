import type { Meta, StoryObj } from "@storybook/react";
import { imagePaletteAtom } from "app/state/palette";
import { ImageGallery } from "./image-gallery";

const meta: Meta<typeof ImageGallery> = {
    title: "root/ImageGallery",
    component: ImageGallery,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        jotai: {
            atoms: {
                palette1: imagePaletteAtom("1"),
                palette2: imagePaletteAtom("2"),
                palette3: imagePaletteAtom("3"),
            },
            values: {
                palette1: {
                    id: "1",
                    name: "storybook-img1",
                    imagePath: "https://picsum.photos/200/200?random=1",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    palette: [
                        { before: "#ff0000", after: "#ff0000" },
                        { before: "#00ff00", after: "#00ff00" },
                        { before: "#0000ff", after: "#0000ff" },
                    ],
                },
                palette2: {
                    id: "2",
                    name: "storybook-img2",
                    imagePath: "https://picsum.photos/200/200?random=2",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    palette: [
                        { before: "#ff0000", after: "#ff0000" },
                        { before: "#00ff00", after: "#00ff00" },
                        { before: "#0000ff", after: "#0000ff" },
                        { before: "#ffff00", after: "#777777" },
                    ],
                },
                palette3: {
                    id: "3",
                    name: "storybook-img3",
                    imagePath: "https://picsum.photos/200/200?random=3",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    palette: [
                        { before: "#ff0000", after: "#ff0000" },
                        { before: "#00ff00", after: "#00ff00" },
                        { before: "#0000ff", after: "#0000ff" },
                        { before: "#ffff00", after: "#777777" },
                        { before: "#00ffff", after: "#000000" },
                    ],
                },
            },
        },
    },
    args: {
        images: ["1", "2", "3"],
    },
};

export default meta;
export type Story = StoryObj<typeof ImageGallery>;

export const Default: Story = {
    args: {
        images: ["1", "2", "3"],
    },
};

export const Empty: Story = {
    args: {
        images: [],
    },
};

export const SingleImage: Story = {
    args: {
        images: ["1"],
    },
};
