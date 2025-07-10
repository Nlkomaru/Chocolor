"use client";

import { Button, Text, VStack } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ImageGallery } from "./image-gallery";

/** 画像拡張子のホワイトリスト */
const IMAGE_EXTENSIONS = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".bmp",
    ".svg",
];

/**
 * ファイルパス（またはファイル名）が画像かどうかを判定するユーティリティ。
 * MIME タイプより高速なのでまず拡張子で判定する。
 */
function isImagePath(path: string): boolean {
    return IMAGE_EXTENSIONS.some((ext) => path.toLowerCase().endsWith(ext));
}

/** .imageignore 内のパターン */
const IMAGE_IGNORE_PATTERNS = [
    // 任意の Unity PackageCache 内を一括で除外
    "**Library/PackageCache/**",
    // Unity Packages 直下のファイルも除外
    "**Packages/**",
];

/**
 * 簡易的な glob もどき判定：`**` を無視し、残りの文字列が含まれていればマッチとみなす。
 * 今回のパターンでは十分。
 */
function matchesIgnorePattern(path: string): boolean {
    return IMAGE_IGNORE_PATTERNS.some((pattern) => {
        const regex = new RegExp(pattern.replace(/\*\*/g, ".*"));
        return regex.test(path);
    });
}

/**
 * File System Access API を用いてディレクトリを再帰的に走査し、
 * 画像ファイルのみのパス一覧を返す。
 *
 * @param handle 走査対象のディレクトリハンドル
 * @param prefix 親ディレクトリからの相対パス（内部用）
 */
async function collectImageEntries(
    handle: FileSystemDirectoryHandle,
    prefix = "",
): Promise<{ path: string; url: string }[]> {
    const entries: { path: string; url: string }[] = [];

    // FileSystemDirectoryHandle#entries は async iterable
    for await (const [name, childHandle] of (handle as any).entries()) {
        const currentPath = prefix ? `${prefix}/${name}` : name;

        if (childHandle.kind === "file") {
            if (isImagePath(name) && !matchesIgnorePattern(currentPath)) {
                const file = await (
                    childHandle as FileSystemFileHandle
                ).getFile();
                const url = URL.createObjectURL(file);
                entries.push({ path: currentPath, url });
            }
        } else {
            // サブディレクトリの場合は再帰的に走査
            const childEntries = await collectImageEntries(
                childHandle as FileSystemDirectoryHandle,
                currentPath,
            );
            entries.push(...childEntries);
        }
    }

    return entries;
}

export const DirectorySelector = () => {
    // 選択したディレクトリ名を保持
    const [dirName, setDirName] = useState<string | null>(null);
    // 画像ファイルのパスと ObjectURL のペア
    type ImageEntry = { path: string; url: string };
    const [images, setImages] = useState<ImageEntry[]>([]);

    // File System Access API 未対応ブラウザ用の隠し input
    const fallbackInputRef = useRef<HTMLInputElement | null>(null);

    // webkitdirectory / mozdirectory 属性を付与
    useEffect(() => {
        if (!fallbackInputRef.current) return;
        fallbackInputRef.current.setAttribute("webkitdirectory", "");
        fallbackInputRef.current.setAttribute("mozdirectory", "");
    }, []);

    const handlePickDirectory = useCallback(async () => {
        // まずはモダン API が使えるか確認
        if ("showDirectoryPicker" in window) {
            try {
                // 型安全のために cast して呼ぶ
                const dirHandle = await (
                    window as typeof window & {
                        showDirectoryPicker: () => Promise<FileSystemDirectoryHandle>;
                    }
                ).showDirectoryPicker();

                // ディレクトリ名を保持
                setDirName(dirHandle.name);

                // 画像ファイルだけを収集
                const newImages = await collectImageEntries(dirHandle);

                // 古い ObjectURL を解放してから置き換える
                setImages((prev) => {
                    prev.forEach((img) => URL.revokeObjectURL(img.url));
                    return newImages;
                });
                // TODO: store dirHandle in a jotai atom so other components can access it.
            } catch (err) {
                // User might cancel the picker; simply ignore.
                console.error(err);
            }
        } else {
            // Fallback: 隠し input をクリック
            fallbackInputRef.current?.click();
        }
    }, []);

    // Fallback input の onChange
    const handleFallbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const newImages: ImageEntry[] = [];
        for (const file of Array.from(e.target.files)) {
            if (file.type.startsWith("image/") || isImagePath(file.name)) {
                const relPath = (file as any).webkitRelativePath as
                    | string
                    | undefined;
                const finalPath = relPath || file.name;
                if (!matchesIgnorePattern(finalPath)) {
                    const url = URL.createObjectURL(file);
                    newImages.push({ path: finalPath, url });
                }
            }
        }

        if (newImages.length) {
            const rootDir = newImages[0].path.split("/")[0] ?? null;
            setDirName(rootDir);
            setImages((prev) => {
                prev.forEach((img) => URL.revokeObjectURL(img.url));
                return newImages;
            });
        }
    };

    return (
        <VStack gap="2">
            <Button size="lg" onClick={handlePickDirectory}>
                ディレクトリを選択
            </Button>
            {dirName && <Text>{dirName} を選択しました</Text>}

            {/* サムネイル表示 */}
            {images.length > 0 && <ImageGallery images={images} />}

            {/* 隠し fallback input */}
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore 非標準属性 */}
            <input
                type="file"
                ref={fallbackInputRef}
                style={{ display: "none" }}
                multiple
                onChange={handleFallbackChange}
            />
        </VStack>
    );
};
