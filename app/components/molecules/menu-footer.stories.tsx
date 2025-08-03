import type { Meta, StoryObj } from "@storybook/react";
import { FOOTER_LINKS } from "../../lib/links";
import { type FooterItem, MenuFooter } from "./menu-footer";

const meta: Meta<typeof MenuFooter> = {
    title: "Molecules/MenuFooter",
    component: MenuFooter,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    args: {
        items: FOOTER_LINKS as FooterItem[],
    },
};
export default meta;

export type Story = StoryObj<typeof MenuFooter>;

export const Default: Story = {};
