"use client";

import { Button, FileUpload, Heading, Text, VStack } from "@chakra-ui/react";
import { FileImage } from "lucide-react";
import { getImageInfo } from "~/lib/image";
import type { ImageData } from "~/type";
import { sva } from "../../../styled-system/css"; // panda-cssのsvaを利用するため、パスを修正
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
    accept: string;
    maxFiles?: number;
    onImageChange?: (details: ImageData) => void;
}

export const ImageUpload = ({
    title,
    type: _type,
    description,
    accept,
    maxFiles = 1,
    onImageChange,
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
                        if (onImageChange) {
                            const imageData = await getImageInfo(
                                details.acceptedFiles[0] ?? null,
                            );
                            onImageChange(imageData);
                        }
                    }}
                >
                    {/* Hidden inputはChakraのまま、Buttonや他のUIはそのまま */}
                    <FileUpload.HiddenInput style={{ display: "none" }} />
                    <FileUpload.Trigger asChild>
                        <Button variant="solid" size="lg" p={6} w="full">
                            <FileImage />
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
