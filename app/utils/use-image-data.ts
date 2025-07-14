import { getImageInfo } from "app/lib/image";
import type { ImageData } from "app/type/color";
import { useEffect, useState } from "react";

/**
 * 画像データを取得するカスタムフック
 */
export function useImageData(url: string) {
    const [imageData, setImageData] = useState<ImageData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const imgData = await getImageInfo(url);
                setImageData(imgData);
            } catch (err) {
                console.error("画像情報取得エラー:", err);
                setError(err instanceof Error ? err.message : "不明なエラー");
            } finally {
                setIsLoading(false);
            }
        };

        fetchImageData();
    }, [url]);

    return { imageData, isLoading, error };
}
