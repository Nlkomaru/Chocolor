"use client";

import {
    Button,
    FileUpload,
    Float,
    Heading,
    Text,
    useFileUploadContext,
    VStack,
} from "@chakra-ui/react";
import { LuFileImage, LuX } from "react-icons/lu";
import { sva } from "@/styled-system/css";

// スタイルバリアントの定義
const imageUploadStyles = sva({
    slots: ["container", "preview"],
    base: {
        container: {
            width: "100%",
            padding: "1rem",
        },
        preview: {
            // width: "100%",
            // height: "100%",
            objectFit: "cover",
            borderRadius: "md",
        },
    },
});

// アップロードされたファイルのプレビューリスト
const UploadPreview = () => {
    const fileUpload = useFileUploadContext();
    const file = fileUpload.acceptedFiles[0];
    const styles = imageUploadStyles();

    if (!file) return null;

    return (
        <FileUpload.ItemGroup display="flex" justifyContent="center">
            <FileUpload.Item
                display="flex" /* Center the preview icon/image horizontally & vertically */
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
                <FileUpload.ItemPreviewImage className={styles.preview} />
                <Float placement="top-end">
                    <FileUpload.ItemDeleteTrigger
                        boxSize="6"
                        layerStyle="fill.solid"
                        bg="red.500"
                        color="white"
                        borderRadius="full"
                        _hover={{ bg: "red.600" }}
                    >
                        <LuX />
                    </FileUpload.ItemDeleteTrigger>
                </Float>
            </FileUpload.Item>
        </FileUpload.ItemGroup>
    );
};

interface ImageUploadProps {
    title: string;
    description: string;
    colorScheme?: string;
    accept: string;
    maxFiles?: number;
    onFilesChange?: (file: File) => void;
}

export const ImageUpload = ({
    title,
    description,
    colorScheme = "blue",
    accept,
    maxFiles = 1,
    onFilesChange,
}: ImageUploadProps) => {
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
                    onFileChange={(details) => {
                        // ファイル変更時のコールバック
                        if (onFilesChange) {
                            onFilesChange(details.acceptedFiles[0] ?? null);
                        }
                    }}
                >
                    {/* Visually hide the native file input element to avoid the default "Choose File" button showing up */}
                    <FileUpload.HiddenInput style={{ display: "none" }} />
                    <FileUpload.Trigger asChild>
                        <Button
                            variant="outline"
                            colorScheme={colorScheme}
                            size="lg"
                            p={6}
                            w="full" /* Let the button take full width for better touch area */
                        >
                            <LuFileImage />
                            画像をアップロード
                        </Button>
                    </FileUpload.Trigger>
                    <Text fontSize="xs" color="gray.400" mt={2}>
                        JPG, PNG, GIF対応（最大5MB）
                    </Text>
                    <UploadPreview />
                </FileUpload.Root>
            </VStack>
        </div>
    );
};
