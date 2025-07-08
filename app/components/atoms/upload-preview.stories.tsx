import { Button, FileUpload, VStack } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { UploadPreview } from "./upload-preview";

const meta: Meta<typeof UploadPreview> = {
    title: "Atoms/UploadPreview",
    component: UploadPreview,
    decorators: [
        (Story) => (
            <FileUpload.Root accept="image/*">
                <VStack gap={4}>
                    {/* Trigger to upload an image so that the preview can display */}
                    <FileUpload.HiddenInput style={{ display: "none" }} />
                    <FileUpload.Trigger asChild>
                        <Button variant="outline">画像をアップロード</Button>
                    </FileUpload.Trigger>
                    <Story />
                </VStack>
            </FileUpload.Root>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof UploadPreview>;

export const Default: Story = {};
