import { getImageInfo } from "app/lib/image";
import { imagePaletteAtom } from "app/state/palette";
import type { ImageData } from "app/type/color";
import type { ImagePalette } from "app/type/store";
import { useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";

/**
 * 画像データを取得するカスタムフック
 */
export function useImageData(id: string) {
    const [imageData, setImageData] = useState<ImageData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const paletteAtom = useMemo(() => imagePaletteAtom(id), [id]);
    const imagePalette = useAtomValue(paletteAtom) as ImagePalette | null;
    const url = imagePalette?.url;
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                if (!url || !imagePalette) {
                    throw new Error("Image not found in atom");
                }

                const imgData = await getImageInfo({
                    ...imagePalette,
                    url,
                });
                setImageData(imgData);
            } catch (err) {
                console.error("画像情報取得エラー:", err);
                setError(err instanceof Error ? err.message : "不明なエラー");
            } finally {
                setIsLoading(false);
            }
        };

        fetchImageData();
    }, [url, imagePalette]);

    return { imageData, isLoading, error };
}
