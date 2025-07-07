"use client";

import { Button, FileUpload, Heading, Text, VStack } from "@chakra-ui/react";
import { LuFileImage } from "react-icons/lu";
import { sva } from "../../../styled-system/css"; // panda-cssのsvaを利用するため、パスを修正
import { getImageInfo } from "~/lib/image";
import type { ImageData } from "~/type";
import { UploadPreview } from "../atoms/upload-preview";

// panda-cssのsvaでスタイルバリアントを定義
const imageUploadStyles = sva({
    slots: ["container"],
    base: {
        container: {
            width: "100%",
            padding: "1rem",
        },
    },
});

interface ImageUploadProps {
    title: string;
    type: "target" | "source";
    description: string;
    colorScheme?: string;
    accept: string;
    maxFiles?: number;
    onFilesChange?: (imageData: ImageData) => void;
}

export const ImageUpload = ({
    title,
    type: _type,
    description,
    colorScheme = "blue",
    accept,
    maxFiles = 1,
    onFilesChange,
}: ImageUploadProps) => {
    // svaで生成したスタイルを適用
    const styles = imageUploadStyles();

    return (
        <div className={styles.container}>
            <VStack gap={4}>
                <Heading size="lg">{title}</Heading>
                <Text fontSize="sm" color="gray.600">
                    {description}
                </Text>

                <FileUpload.Root
                    accept={accept}
                    maxFiles={maxFiles}
                    onFileChange={async (details) => {
                        // ファイル変更時のコールバック
                        if (onFilesChange) {
                            const imageData = await getImageInfo(
                                details.acceptedFiles[0] ?? null,
                            );
                            onFilesChange(imageData);
                        }
                    }}
                >
                    {/* Hidden inputはChakraのまま、Buttonや他のUIはそのまま */}
                    <FileUpload.HiddenInput style={{ display: "none" }} />
                    <FileUpload.Trigger asChild>
                        <Button
                            variant="solid"
                            colorScheme={colorScheme}
                            size="lg"
                            p={6}
                            w="full"
                        >
                            <LuFileImage />
                            画像をアップロード
                        </Button>
                    </FileUpload.Trigger>
                    <Text fontSize="xs" color="gray.400" mt={2}>
                        JPG, PNG, WEBP対応 (最大5MB)
                    </Text>
                    <UploadPreview />
                </FileUpload.Root>
            </VStack>
        </div>
    );
};
