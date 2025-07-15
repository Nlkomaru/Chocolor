import { generateColorPalette } from "app/lib/image";
import { imagePaletteAtom } from "app/store/palette";
import { settingAtom } from "app/store/setting";
import type { Setting } from "app/type/setting";
import type { ImagePalette } from "app/type/store";
import { useAtom, useAtomValue } from "jotai";
import { useRef, useState } from "react";

interface UsePaletteGenerationProps {
    id: string;
    url: string;
    path: string;
}

export const usePaletteGeneration = ({
    id,
    url,
    path,
}: UsePaletteGenerationProps) => {
    const [imagePalette, setImagePalette] = useAtom(imagePaletteAtom(id));
    const setting: Setting = useAtomValue(settingAtom);
    const [isGeneratingPalette, setIsGeneratingPalette] =
        useState<boolean>(false);
    const hasStartedRef = useRef<boolean>(false);

    // パレット生成関数（useCallbackなし）
    const generatePalette = async () => {
        // 実行時に状態をチェック
        if (isGeneratingPalette || hasStartedRef.current || imagePalette) {
            return;
        }

        hasStartedRef.current = true;

        try {
            setIsGeneratingPalette(true);

            const palette = await generateColorPalette(url);
            const now = new Date().toISOString();

            const newImagePalette: ImagePalette = {
                id,
                imagePath: path,
                bin: setting.paletteSize,
                createdAt: now,
                updatedAt: now,
                palette,
            };

            setImagePalette(newImagePalette);
        } catch (error) {
            console.error("パレット生成エラー:", error);
        } finally {
            setIsGeneratingPalette(false);
        }
    };

    // データが存在しない場合に直接実行
    if (!imagePalette && !hasStartedRef.current && !isGeneratingPalette) {
        generatePalette();
    }

    return {
        data: imagePalette,
        isGeneratingPalette,
    };
};
