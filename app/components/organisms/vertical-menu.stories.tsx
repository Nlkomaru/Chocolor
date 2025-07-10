import type { Meta, StoryObj } from "@storybook/react";
import { FOOTER_LINKS, NAVIGATION_LINKS } from "../../lib/links";
import { VerticalMenu } from "./vertical-menu";


const overridedNavbarItems = NAVIGATION_LINKS.map((item) => {
    if (item.label === NAVIGATION_LINKS[3].label) {
        return { ...item, disabled: true };
    }
    return item;
});

const meta: Meta<typeof VerticalMenu> = {
    title: "Organisms/VerticalMenu",
    component: VerticalMenu,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
    },
    args: {
        navbarItems: overridedNavbarItems,
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
