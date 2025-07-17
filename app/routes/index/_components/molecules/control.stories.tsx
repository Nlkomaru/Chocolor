import type { Meta, StoryObj } from "@storybook/react";
import { Control } from "./control";
import { imagePaletteAtom } from "app/state/palette";
import type { ImagePalette } from "app/type/store";

const baseId = "storybook-image";

// 共通のサンプルパレット
const samplePalette: ImagePalette = {
    id: baseId,
    name: "storybook-img.png",
    url: "https://picsum.photos/200/200?random=1",
    filePath: "/images/storybook-img.png",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    paletteSize: 3,
    palette: [
        { before: "#ff0000", after: "#ff0000" },
        { before: "#00ff00", after: "#00ff00" },
        { before: "#0000ff", after: "#0000ff" },
    ],
};

const meta: Meta<typeof Control> = {
    title: "Index/Molecules/Control",
    component: Control,
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component: "Control コンポーネントの Story" ,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Control>;

export const Default: Story = {
    args: {
        id: baseId,
        imageData: { imageData: null, isLoading: false, error: null },
        isGenerating: false,
        imagePalette: samplePalette,
    },
    parameters: {
        jotai: {
            atoms: { palette: imagePaletteAtom(baseId) },
            values: { palette: samplePalette },
        },
    },
};

export const EmptyPalette: Story = {
    args: {
        id: "empty-img",
        imageData: { imageData: null, isLoading: false, error: null },
        isGenerating: false,
        imagePalette: {
            ...samplePalette,
            id: "empty-img",
            url: "https://picsum.photos/200/200?random=2",
            filePath: "/images/empty.png",
            palette: [],
        },
    },
    parameters: {
        jotai: {
            atoms: { palette: imagePaletteAtom("empty-img") },
            values: {
                palette: {
                    ...samplePalette,
                    id: "empty-img",
                    url: "https://picsum.photos/200/200?random=2",
                    filePath: "/images/empty.png",
                    palette: [],
                },
            },
        },
    },
};
