import type { Meta, StoryObj } from "@storybook/react";
import { Home } from "lucide-react";
import { css } from "../../../styled-system/css";
import { Title } from "./title";

const meta: Meta<typeof Title> = {
    title: "Atoms/Title",
    component: Title,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    args: {
        label: "ホーム",
        icon: <Home />,
        current: false,
    },
};
export default meta;

export type Story = StoryObj<typeof Title>;

export const Default: Story = {
    render: () => (
        <div
            className={css({
                width: "320px",
            })}
        >
            <Title />
        </div>
    ),
};
