import type { Meta, StoryObj } from "@storybook/react";
import { VerticalMenu } from "./vertical-menu";

const meta: Meta<typeof VerticalMenu> = {
    title: "Organisms/VerticalMenu",
    component: VerticalMenu,
    parameters: {
        layout: "padded",
    },
    args: {},
};

export default meta;

type Story = StoryObj<typeof VerticalMenu>;

export const Default: Story = {};
