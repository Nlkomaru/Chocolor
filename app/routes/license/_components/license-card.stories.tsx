import type { Meta, StoryObj } from "@storybook/react";
import { LicenseCard } from "./license-card";

const meta: Meta<typeof LicenseCard> = {
    title: "License/LicenseCard",
    component: LicenseCard,
    tags: ["autodocs"],
    args: {
        pkg: "react@18.2.0",
        repository: "https://github.com/facebook/react",
        publisher: "Facebook",
    },
};

export default meta;

export const Primary: StoryObj<typeof LicenseCard> = {};
