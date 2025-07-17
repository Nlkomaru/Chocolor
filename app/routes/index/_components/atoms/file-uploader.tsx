import { FileUpload, Text } from "@chakra-ui/react";
import { imagePaletteAtom } from "app/state/palette";
import { useAtom, useStore } from "jotai";
import { useMemo, useState } from "react";
import { v7 as uuidv7 } from "uuid";
import { sva } from "../../../../../styled-system/css";
import { currentGroupAtom, groupInfoAtom } from "../../../../state/group";

const fileUploaderStyles = sva({
    slots: ["uploadArea"],
    base: {
        uploadArea: {
            width: "full",
            border: "2px dashed",
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
    },
});

export const FileUploader = () => {
    const styles = fileUploaderStyles();
    const [group] = useAtom(currentGroupAtom);
    const groupAtom = useMemo(() => groupInfoAtom(group), [group]);
    const [_groupInfo, setGroupInfo] = useAtom(groupAtom);
    // jotai の store 参照。これを使えば任意の関数内で atom を更新できる
    const store = useStore();
    const [_isProcessing, setIsProcessing] = useState(false);

    const handleFileAccept = async (details: { files: File[] }) => {
        try {
            setIsProcessing(true);

            // 画像ファイルのみをフィルタリング
            const imageFiles = details.files.filter(isImageFile);

            const ids: string[] = [];
            // useStore 経由で atom を直接更新（Hook をループ内で呼ばない）
            for (const file of imageFiles) {
                const id = uuidv7();
                ids.push(id);

                const paletteAtom = imagePaletteAtom(id);
                store.set(paletteAtom, {
                    id,
                    name: file.name,
                    url: URL.createObjectURL(file),
                    filePath: file.name,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    palette: [],
                });
            }

            // atomの状態を更新
            setGroupInfo({
                id: group,
                images: ids,
            });
        } catch (error) {
            console.error("ファイル処理エラー:", error);
            // エラーの場合は空の状態にリセット
            setGroupInfo({
                id: group,
                images: [],
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <FileUpload.Root
            accept="image/*"
            maxFiles={100}
            onFileAccept={handleFileAccept}
        >
            <FileUpload.Dropzone className={styles.uploadArea}>
                <FileUpload.Label>
                    <Text fontSize="lg" fontWeight="medium">
                        画像ファイルを選択またはドラッグ＆ドロップ
                    </Text>
                    <Text fontSize="sm" color="chakra-colors-fg-muted" mt={2}>
                        PNG, JPG, WebP, BMP対応
                    </Text>
                </FileUpload.Label>
            </FileUpload.Dropzone>

            <FileUpload.HiddenInput />
        </FileUpload.Root>
    );
};

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
