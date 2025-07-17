import { generateColorPalette } from "app/lib/image";
import { imagePaletteAtom } from "app/state/palette";
import { settingAtom } from "app/state/setting";
import type { ImagePalette } from "app/type/store";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * 画像 ID を受け取り、palette が空の場合に自動で生成して atom を更新するフック
 */
export function usePaletteGeneration(imageId: string) {
    // 対象の imagePaletteAtom をメモ化
    const paletteAtom = useMemo(() => imagePaletteAtom(imageId), [imageId]);
    const [_, setImagePalette] = useAtom(paletteAtom);
    const imagePalette = useAtomValue(paletteAtom) as ImagePalette | null;
    const setting = useAtomValue(settingAtom);
    const [isGenerating, setIsGenerating] = useState(false);
    const hasTriedRef = useRef(false);

    useEffect(() => {
        // 既に生成済み or 生成中なら何もしない
        if (!imagePalette || imagePalette.palette.length > 0 || isGenerating) {
            return;
        }
        // 無限ループ防止に一度試行したらフラグを立てる
        if (hasTriedRef.current) return;
        hasTriedRef.current = true;

        const run = async () => {
            try {
                setIsGenerating(true);
                const palette = await generateColorPalette(
                    imagePalette?.url || "",
                    imagePalette?.paletteSize || setting.paletteSize,
                );
                setImagePalette({
                    ...imagePalette,
                    palette,
                    updatedAt: new Date().toISOString(),
                });
            } catch (e) {
                console.error("パレット生成エラー:", e);
            } finally {
                setIsGenerating(false);
            }
        };

        run();
    }, [imagePalette, isGenerating, setImagePalette, setting.paletteSize]);

    return { isGenerating };
}
