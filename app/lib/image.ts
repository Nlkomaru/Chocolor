import type { ImagePalette } from "app/type/store";
import { Jimp } from "jimp";
import type { ImageData } from "../type/color";

// ブラウザ上で画像サイズだけを取得する簡易ヘルパー
async function getImageInfoInBrowser(url: string): Promise<ImageData> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve({
                info: {
                    width: img.width,
                    height: img.height,
                    format: "",
                },
                color: [],
            });
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = url;
    });
}

export async function getImageInfo(
    imagePalette: ImagePalette,
): Promise<ImageData> {
    if (!imagePalette) {
        throw new Error("Image not found");
    }

    const url = imagePalette.url;

    // blob: や data: スキームの場合はブラウザ API で取得
    if (url.startsWith("blob:") || url.startsWith("data:")) {
        return await getImageInfoInBrowser(url);
    }

    // それ以外（http/https/file など）は Jimp で処理
    const img = await Jimp.read(url);

    const imageData: ImageData = {
        info: {
            width: img.width,
            height: img.height,
            format: img.mime || "",
        },
        color: [],
    };

    return imageData;
}
