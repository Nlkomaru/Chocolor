import type { Meta, StoryObj } from "@storybook/react";
import { Home, Image as ImageIcon, Settings } from "lucide-react";
import { MenuNavbar } from "./menu-navbar";

const meta: Meta<typeof MenuNavbar> = {
    title: "Molecules/MenuNavbar",
    component: MenuNavbar,
    parameters: { layout: "padded" },
};
export default meta;

export type Story = StoryObj<typeof MenuNavbar>;

export const Default: Story = {};
