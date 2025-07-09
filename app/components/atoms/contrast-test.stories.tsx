import type { Meta, StoryObj } from "@storybook/react";
import { ContrastTest } from "./contrast-test";

const meta: Meta<typeof ContrastTest> = {
    title: "Atoms/ContrastTest",
    component: ContrastTest,
    parameters: {
        layout: "padded",
    },
    args: {
        variant: "good",
    },
};

export default meta;

export type Story = StoryObj<typeof ContrastTest>;

export const GoodContrast: Story = {
    args: {
        variant: "good",
    },
};

export const BadContrast: Story = {
    args: {
        variant: "bad",
    },
};