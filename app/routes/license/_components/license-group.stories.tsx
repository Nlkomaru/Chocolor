import type { Meta, StoryObj } from "@storybook/react";
import { LicenseGroup } from "./license-group";

const meta: Meta<typeof LicenseGroup> = {
    title: "License/LicenseGroup",
    component: LicenseGroup,
    tags: ["autodocs"],
    args: {
        license: "MIT",
        packages: [
            [
                "react@18.2.0",
                {
                    licenses: "MIT",
                    repository: "https://github.com/facebook/react",
                    publisher: "Facebook",
                },
            ],
            [
                "lodash@4.17.21",
                {
                    licenses: "MIT",
                    repository: "https://github.com/lodash/lodash",
                    publisher: "John-David Dalton",
                },
            ],
            [
                "typescript@5.0.2",
                {
                    licenses: "MIT",
                    repository: "https://github.com/Microsoft/TypeScript",
                    publisher: "Microsoft Corp.",
                },
            ],
        ],
    },
};

export default meta;

export const Primary: StoryObj<typeof LicenseGroup> = {};

export const WithoutPublisher: StoryObj<typeof LicenseGroup> = {
    args: {
        license: "Apache-2.0",
        packages: [
            [
                "webpack@5.88.0",
                {
                    licenses: "Apache-2.0",
                    repository: "https://github.com/webpack/webpack",
                },
            ],
            [
                "babel-core@6.26.3",
                {
                    licenses: "Apache-2.0",
                    repository: "https://github.com/babel/babel",
                },
            ],
        ],
    },
};

export const SinglePackage: StoryObj<typeof LicenseGroup> = {
    args: {
        license: "BSD-3-Clause",
        packages: [
            [
                "d3@7.8.4",
                {
                    licenses: "BSD-3-Clause",
                    repository: "https://github.com/d3/d3",
                    publisher: "Mike Bostock",
                },
            ],
        ],
    },
};
