import type { Meta, StoryObj } from "@storybook/react";
import { Home, Search, Settings } from "lucide-react";
import { type FooterItem, MenuFooter } from "./menu-footer";

const items = [
    {
        id: "open-source",
        label: "Open Source License",
        path: "/license",
    },
    {
        id: "privacy-policy",
        label: "Privacy Policy",
        path: "/privacy",
    },
    {
        id: "github",
        label: "Github",
        path: "https://github.com/nikomaru",
    },
];


const meta: Meta<typeof MenuFooter> = {
    title: "Molecules/MenuFooter",
    component: MenuFooter,
    parameters: {
        layout: "padded",
    },
    args: {
        items: items as FooterItem[],
    },
};
export default meta;

export type Story = StoryObj<typeof MenuFooter>;

export const Default: Story = {};
