import { Jimp } from "jimp";
import { ImagePalette } from "../type/store";
import { differenceCiede2000, Lab, Rgb, parse, converter, differenceEuclidean } from "culori";

const lab = converter("lab")
const rgb = converter("rgb")

const readPixelRgb = (data: Buffer, idx: number): Rgb => {
    const r = data[idx + 0] / 255;
    const g = data[idx + 1] / 255;
    const b = data[idx + 2] / 255;
    const a = data[idx + 3] / 255.0;
    return { mode: 'rgb', r, g, b, alpha: a };
};

const writePixelRgb = (data: Buffer, idx: number, rgbColor: Rgb) => {
    data[idx + 0] = Math.round((rgbColor.r ?? 0) * 255);
    data[idx + 1] = Math.round((rgbColor.g ?? 0) * 255);
    data[idx + 2] = Math.round((rgbColor.b ?? 0) * 255);
    data[idx + 3] = Math.round(((rgbColor.alpha ?? 1) * 255.0));
};


export const recolor = async (palette: ImagePalette, resize = true, threshold = 15, progressCallback?: (progress: number) => void): Promise<string> => {

    try {
        const image = await Jimp.read(palette.url);

        const processedPalette = palette.palette.map(p => {
            const beforeRgb = parse(p.before);
            const afterRgb = parse(p.after);

            if (!beforeRgb || !afterRgb) {
                // パースできない不正な色指定はスキップ
                return null;
            }

            return {
                beforeLab: lab(beforeRgb),
                afterLab: lab(afterRgb),
            };
        }).filter((p): p is { beforeLab: Lab; afterLab: Lab } => p !== null);

        let processedPixels = 0;
        let percentage = 0;

        if (resize) {
            image.resize({ w: 600 });
        }

        for (let y = 0; y < image.bitmap.height; y++) {
            for (let x = 0; x < image.bitmap.width; x++) {
                const idx = (image.bitmap.width * y + x) * 4; // RGBA is 4 bytes per pixel
                const pixelRgb = readPixelRgb(image.bitmap.data, idx);
                processedPixels++;

                const newPercentage = Math.round((processedPixels / (image.bitmap.width * image.bitmap.height)) * 100);
                if (Math.floor(newPercentage / 10) !== Math.floor(percentage / 10)) {
                    percentage = newPercentage;  // percentageを更新
                    progressCallback?.(percentage);  // 新しい値を渡す
                }

                const pixelLab = lab(pixelRgb);

                let minDistance = Infinity;
                let bestMatch: { beforeLab: Lab; afterLab: Lab } | null = null;

                for (const entry of processedPalette) {
                    const distance = differenceCiede2000()(pixelLab, entry.beforeLab);
                    if (distance < minDistance) {
                        minDistance = distance;
                        bestMatch = entry;
                    }
                }

                if (bestMatch && minDistance < threshold) {
                    // 距離に基づく重み（0から1）
                    const weight = 1 - (minDistance / threshold);
                    
                    // 元の色と新しい色を補間
                    const newLab: Lab = {
                        mode: 'lab',
                        l: pixelLab.l * (1 - weight) + bestMatch.afterLab.l * weight,
                        a: pixelLab.a * (1 - weight) + bestMatch.afterLab.a * weight,
                        b: pixelLab.b * (1 - weight) + bestMatch.afterLab.b * weight,
                        alpha: pixelLab.alpha ?? 1,
                    };
                    
                    const newRgb = rgb(newLab);
                    writePixelRgb(image.bitmap.data, idx, newRgb);
                }
            }
        }

        const src: string = await image.getBase64("image/png");
        return src;
    } catch (e) {
        console.error("Recolor failed, fallback to original URL or empty string", e);
        // エラー時は元のURLを返すか、空文字を返すか選択できます
        return palette.url;
    }
};