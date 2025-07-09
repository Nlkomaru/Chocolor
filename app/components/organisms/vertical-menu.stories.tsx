import type { Meta, StoryObj } from "@storybook/react";
import { FOOTER_LINKS, NAVIGATION_LINKS } from "../../lib/links";
import { VerticalMenu } from "./vertical-menu";

const meta: Meta<typeof VerticalMenu> = {
    title: "Organisms/VerticalMenu",
    component: VerticalMenu,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    args: {
        navbarItems: NAVIGATION_LINKS,
        footerItems: FOOTER_LINKS,
    },
};

export default meta;

type Story = StoryObj<typeof VerticalMenu>;

export const Default: Story = {
    render: (args) => (
        <div style={{ width: "320px", height: "100vh" }}>
            <VerticalMenu {...args} />
        </div>
    ),
};
