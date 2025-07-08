import type { Meta, StoryObj } from "@storybook/react";
import { FileText, Home, Image as ImageIcon, Settings } from "lucide-react";
import { VerticalMenu } from "./vertical-menu";

const meta: Meta<typeof VerticalMenu> = {
    title: "Organisms/VerticalMenu",
    component: VerticalMenu,
    parameters: {
        layout: "padded",
    },
    args: {
        navbarItems: [
            {
                id: "home",
                label: "ホーム",
                icon: <Home />,
                path: "/",
            },
            {
                id: "image-processing",
                label: "画像処理",
                icon: <ImageIcon />,
                path: "/image-processing",
                current: true,
            },
            {
                id: "settings",
                label: "設定",
                icon: <Settings />,
                path: "/settings",
            },
            {
                id: "docs",
                label: "ドキュメント",
                icon: <FileText />,
                path: "/docs",
                disabled: true,
            },
        ],
        footerItems: [
            {
                id: "settings",
                label: "設定",
                path: "/settings",
            },
        ],
    },
};

export default meta;

type Story = StoryObj<typeof VerticalMenu>;

export const Default: Story = {};
