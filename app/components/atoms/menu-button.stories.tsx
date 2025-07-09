import type { Meta, StoryObj } from "@storybook/react";
import { Home } from "lucide-react";
import { MenuButton } from "./menu-button";

const meta: Meta<typeof MenuButton> = {
    title: "Atoms/MenuButton",
    component: MenuButton,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    args: {
        label: "ホーム",
        icon: <Home />,
        current: false,
    },
};
export default meta;

export type Story = StoryObj<typeof MenuButton>;

export const Default: Story = {};
export const Current: Story = {
    args: {
        current: true,
    },
};
export const Disabled: Story = {
    args: {
        disabled: true,
    },
};
