"use client";

import { FileUpload, Text, VStack } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";
import { sva } from "../../../styled-system/css";
import { fileSelectionAtom } from "../../store/setting";
import type { ImageEntry } from "../../type/store";
import { generateFileHash } from "../../utils/file-hash";
import { ImageGallery } from "./image-gallery";

// panda-cssのsvaでスタイルバリアントを定義
const fileSelectorStyles = sva({
    slots: ["container", "uploadArea", "fileList"],
    base: {
        container: {
            gap: "1rem",
            alignItems: "center",
            width: "100%",
        },
        uploadArea: {
            border: "2px dashed",
            margin: "0 auto",
            borderColor: "chakra-colors-border-default",
            borderRadius: "md",
            padding: "2rem",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.2s",
            _hover: {
                borderColor: "chakra-colors-border-emphasized",
                backgroundColor: "chakra-colors-bg-subtle",
            },
        },
        fileList: {
            width: "100%",
        },
    },
});

/** 画像拡張子のホワイトリスト */
const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".bmp"];

/**
 * ファイル名が画像かどうかを判定するユーティリティ
 */
function isImageFile(file: File): boolean {
    // MIMEタイプでチェック
    if (file.type.startsWith("image/")) {
        return true;
    }

    // 拡張子でチェック
    return IMAGE_EXTENSIONS.some((ext) =>
        file.name.toLowerCase().endsWith(ext),
    );
}

export const FileSelector = () => {
    // jotaiのatomを使用してファイル選択状態を管理
    const [fileSelection, setFileSelection] = useAtom(fileSelectionAtom);
    // ファイル処理中の状態を管理
    const [isProcessing, setIsProcessing] = useState(false);

    const styles = fileSelectorStyles();

    const handleFileAccept = async (details: { files: File[] }) => {
        try {
            setIsProcessing(true);

            // 画像ファイルのみをフィルタリング
            const imageFiles = details.files.filter(isImageFile);

            // 古い ObjectURL を解放
            fileSelection.images.forEach((img) => URL.revokeObjectURL(img.url));

            // 各ファイルごとにユニークなハッシュIDを生成
            const newImages: ImageEntry[] = await Promise.all(
                imageFiles.map(async (file) => {
                    const uniqueId = await generateFileHash(file);
                    return {
                        path: file.name,
                        url: URL.createObjectURL(file),
                        id: uniqueId,
                    };
                }),
            );

            // atomの状態を更新
            setFileSelection({
                selectedCount: imageFiles.length,
                images: newImages,
            });
        } catch (error) {
            console.error("ファイル処理エラー:", error);
            // エラーの場合は空の状態にリセット
            setFileSelection({
                selectedCount: 0,
                images: [],
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <VStack className={styles.container}>
            {isProcessing && (
                <Text color="var(--chakra-colors-fg-muted)">
                    ファイルを処理中...
                </Text>
            )}

            {fileSelection.selectedCount > 0 && !isProcessing && (
                <Text>
                    {fileSelection.selectedCount}個の画像ファイルを選択しました
                </Text>
            )}

            {/* 選択された画像のサムネイル表示 */}
            {fileSelection.images.length > 0 && (
                <div className={styles.fileList}>
                    <ImageGallery images={fileSelection.images} />
                </div>
            )}

            <FileUploader onFileAccept={handleFileAccept} />
        </VStack>
    );
};

const FileUploader = ({
    onFileAccept,
}: {
    onFileAccept: (details: { files: File[] }) => Promise<void>;
}) => {
    const styles = fileSelectorStyles();

    return (
        <FileUpload.Root
            accept="image/*"
            onFileAccept={onFileAccept}
            maxFiles={100}
        >
            <FileUpload.Dropzone className={styles.uploadArea}>
                <FileUpload.Label>
                    <Text fontSize="lg" fontWeight="medium">
                        画像ファイルを選択またはドラッグ＆ドロップ
                    </Text>
                    <Text fontSize="sm" color="chakra-colors-fg-muted" mt={2}>
                        PNG, JPG, GIF, WebP, BMP, SVG対応
                    </Text>
                </FileUpload.Label>
            </FileUpload.Dropzone>

            <FileUpload.HiddenInput />
        </FileUpload.Root>
    );
};
