import {
    converter,
    differenceCiede2000,
    type Lab,
    parse,
    type Rgb,
} from "culori";
import { Jimp } from "jimp";
import type { ImagePalette } from "../type/store";

const lab = converter("lab");
const rgb = converter("rgb");

const writePixelRgb = (data: Buffer, idx: number, rgbColor: Rgb) => {
    data[idx + 0] = Math.round((rgbColor.r ?? 0) * 255.0);
    data[idx + 1] = Math.round((rgbColor.g ?? 0) * 255.0);
    data[idx + 2] = Math.round((rgbColor.b ?? 0) * 255.0);
    data[idx + 3] = Math.round((rgbColor.alpha ?? 1) * 255.0);
};

export const recolor = async (
    palette: ImagePalette,
    resize = true,
    threshold = 15,
    progressCallback?: (progress: number) => void,
): Promise<string> => {
    const image = await Jimp.read(palette.url);

    if (resize) {
        image.resize({ w: 800 });
    }

    const processedPalette = palette.palette
        .map((p) => {
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
        })
        .filter((p): p is { beforeLab: Lab; afterLab: Lab } => p !== null);

    let percentage = 0;

    // Pre-compute the CIEDE2000 deltaE function once for reuse
    const deltaE = differenceCiede2000();

    // console.log removed to improve performance

    // ------------------------------------------------------------
    // Fast flat-array scan (RGBA as 4 bytes per pixel)
    // ------------------------------------------------------------
    const { data, width, height } = image.bitmap;
    const totalPixels = width * height;

    for (
        let idx = 0, pixelIndex = 0;
        idx < data.length;
        idx += 4, pixelIndex++
    ) {
        // Convert 8-bit integers to normalized 0-1 floats
        const pixelRgb: Rgb = {
            mode: "rgb",
            r: data[idx] / 255.0,
            g: data[idx + 1] / 255.0,
            b: data[idx + 2] / 255.0,
            alpha: data[idx + 3] / 255.0,
        };

        // Progress update roughly every 16 384 pixels (~1 % for 1600×1000 image)
        if ((pixelIndex & 0x3fff) === 0) {
            const newPercentage = Math.round((pixelIndex / totalPixels) * 100);
            if (
                Math.floor(newPercentage / 10) !== Math.floor(percentage / 10)
            ) {
                percentage = newPercentage;
                progressCallback?.(percentage);
            }
        }

        const pixelLab = lab(pixelRgb);

        let minDistance = Number.POSITIVE_INFINITY;
        let bestMatch: { beforeLab: Lab; afterLab: Lab } | null = null;

        for (const entry of processedPalette) {
            const distance = deltaE(pixelLab, entry.beforeLab);
            if (distance < minDistance) {
                minDistance = distance;
                bestMatch = entry;
            }
        }

        if (bestMatch && minDistance < threshold) {
            const weight = 1 - minDistance / threshold;

            // Interpolate in Lab space
            const newLab: Lab = {
                mode: "lab",
                l: pixelLab.l * (1 - weight) + bestMatch.afterLab.l * weight,
                a: pixelLab.a * (1 - weight) + bestMatch.afterLab.a * weight,
                b: pixelLab.b * (1 - weight) + bestMatch.afterLab.b * weight,
                alpha: pixelLab.alpha ?? 1,
            };

            const newRgb = rgb(newLab);
            // Inline write to avoid function-call overhead
            data[idx + 0] = Math.round((newRgb.r ?? 0) * 255);
            data[idx + 1] = Math.round((newRgb.g ?? 0) * 255);
            data[idx + 2] = Math.round((newRgb.b ?? 0) * 255);
            data[idx + 3] = Math.round((newRgb.alpha ?? 1) * 255);
        }
    }

    const src: string = await image.getBase64("image/png");
    return src;
};
