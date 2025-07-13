import type { Meta, StoryObj } from "@storybook/react";
import { NAVIGATION_LINKS } from "app/lib/links";
import type { MenuButtonProps } from "../atoms/menu-button";
import { MenuNavbar } from "./menu-navbar";

//settingだけdisable
const disabledLinks: MenuButtonProps | undefined = NAVIGATION_LINKS[3];

const items: MenuButtonProps[] = NAVIGATION_LINKS.map((link) => ({
    ...link,
    disabled: disabledLinks?.id === link.id,
}));

const meta: Meta<typeof MenuNavbar> = {
    title: "Molecules/MenuNavbar",
    component: MenuNavbar,
    tags: ["autodocs"],
    parameters: { layout: "padded" },
    args: {
        items: items,
    },
};
export default meta;

export type Story = StoryObj<typeof MenuNavbar>;

export const Default: Story = {};
