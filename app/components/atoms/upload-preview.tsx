"use client";

import { FileUpload, Float, useFileUploadContext } from "@chakra-ui/react";
import { X } from "lucide-react";
import { sva } from "../../../styled-system/css";

// Define simple style for the preview image
const previewStyles = sva({
    slots: ["root"],
    base: {
        root: {
            objectFit: "cover",
            borderRadius: "md",
            maxWidth: "100%",
            maxHeight: "100%",
        },
    },
});

/**
 * UploadPreview
 * Shows a thumbnail preview of the first accepted file inside a FileUpload.Root context.
 * Relies on Chakra-UI's FileUpload context (useFileUploadContext) being present higher in the tree.
 */
export const UploadPreview = () => {
    const fileUpload = useFileUploadContext();
    const file = fileUpload.acceptedFiles[0];

    if (!file) return null;
    const styles = previewStyles();

    return (
        <FileUpload.ItemGroup display="flex" justifyContent="center">
            <FileUpload.Item
                display="flex"
                alignItems="center"
                justifyContent="center"
                p="2"
                file={file}
                key={file.name}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                mx="auto"
            >
                {/* Preview image */}
                <FileUpload.ItemPreviewImage className={styles.root} />

                {/* Delete button shown on hover */}
                <Float placement="top-end">
                    <FileUpload.ItemDeleteTrigger
                        boxSize="6"
                        layerStyle="fill.solid"
                        bg="red.500"
                        color="white"
                        borderRadius="full"
                        _hover={{ bg: "red.600" }}
                    >
                        <X />
                    </FileUpload.ItemDeleteTrigger>
                </Float>
            </FileUpload.Item>
        </FileUpload.ItemGroup>
    );
};
