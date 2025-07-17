import type { Meta, StoryObj } from "@storybook/react";
import { progressAtom, Recolor } from "./recolor";
import { imagePaletteAtom } from "../../state/palette";

const meta: Meta<typeof Recolor> = {
    title: "Atoms/Recolor",
    component: Recolor,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        jotai: {
            atoms: {
                progress: progressAtom,
                imagePalette: imagePaletteAtom("1"),
            },
            values: {
                progress: 0,
                imagePalette: {
                    id: "1",
                    name: "test",
                    url: "https://scorpioides.nikomaru.dev/019808fb-3690-7954-87bf-94d119cb3368.png",
                    filePath: "/test.png",
                    createdAt: "2021-01-01",
                    updatedAt: "2021-01-01",
                    paletteSize: 3,
                    palette: [
                        { "before": "#96866dff", "after": "#96866dff" },
                        { "before": "#553f34ff", "after": "#553f34ff" },
                        { "before": "#121b29ff", "after": "#121b29ff" },
                        { "before": "#121b29ff", "after": "#3D76E0" },
                    ],
                },
            },
        },
    },
};
export default meta;

export type Story = StoryObj<typeof Recolor>;

export const Default: Story = {};