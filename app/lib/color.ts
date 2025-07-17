import {
    type Color,
    converter,
    differenceCiede2000,
    formatHex8,
    type Rgb,
} from "culori";
// Replace value & type imports for Jimp to avoid clashes in type positions
import { Jimp } from "jimp";

// Pre-compute the CIEDE2000 distance function once for reuse
const distanceMetric = differenceCiede2000();

const rgb = converter("rgb");

// RGB値から輝度を計算（相対輝度）
function calculateBrightness(color: Color): number {
    const rgbColor = rgb(color);
    // ITU-R BT.709の重み付けを使用した相対輝度の計算
    return 0.2126 * rgbColor.r + 0.7152 * rgbColor.g + 0.0722 * rgbColor.b;
}

// 色の距離を計算 CIE DE2000
function colorDistance(color1: Color, color2: Color): number {
    const distance = distanceMetric(color1, color2);
    return Number.parseFloat(distance.toFixed(2));
}

// K-meansクラスタリングで代表色を抽出
function extractDominantColors(pixels: Rgb[], k: number): Color[] {
    if (pixels.length === 0) return [];

    // 初期のクラスタ中心点を均等に分散して選択（決定的な初期化）
    const centroids: Rgb[] = [];
    for (let i = 0; i < k; i++) {
        const index = Math.floor((pixels.length / k) * i);
        centroids.push(pixels[index]);
    }

    const maxIterations = 20;

    for (let iteration = 0; iteration < maxIterations; iteration++) {
        // 各ピクセルを最も近いクラスタに割り当て
        const clusters: Rgb[][] = Array.from({ length: k }, () => []);

        for (const pixel of pixels) {
            let minDistance = Number.POSITIVE_INFINITY;
            let closestCluster = 0;

            for (let j = 0; j < centroids.length; j++) {
                const distance = colorDistance(pixel, centroids[j]);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCluster = j;
                }
            }

            clusters[closestCluster].push({
                r: pixel.r,
                g: pixel.g,
                b: pixel.b,
                alpha: pixel.alpha ?? 1.0,
                mode: "rgb",
            });
        }

        // 新しいクラスタ中心点を計算
        let converged = true;
        for (let j = 0; j < centroids.length; j++) {
            if (clusters[j].length === 0) continue;

            const newCentroid: Rgb = {
                r:
                    clusters[j].reduce((sum, pixel) => sum + pixel.r, 0) /
                    clusters[j].length,
                g:
                    clusters[j].reduce((sum, pixel) => sum + pixel.g, 0) /
                    clusters[j].length,
                b:
                    clusters[j].reduce((sum, pixel) => sum + pixel.b, 0) /
                    clusters[j].length,
                alpha:
                    clusters[j].reduce(
                        (sum, pixel) => sum + (pixel.alpha ?? 1.0),
                        0,
                    ) / clusters[j].length,
                mode: "rgb",
            };

            if (colorDistance(centroids[j], newCentroid) > 1) {
                converged = false;
            }

            centroids[j] = newCentroid;
        }

        if (converged) break;
    }

    // 空のクラスタを除外
    return centroids.filter((_centroid, index) => {
        const cluster = pixels.filter((pixel) => {
            let minDistance = Number.POSITIVE_INFINITY;
            let closestCluster = 0;

            for (let j = 0; j < centroids.length; j++) {
                const distance = colorDistance(pixel, centroids[j]);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCluster = j;
                }
            }

            return closestCluster === index;
        });

        return cluster.length > 0;
    });
}

// ------------------------
// Utility helpers
// ------------------------

/**
 * Calculate the sampling steps so that at most `maxSamples` pixels are collected.
 * This keeps the amount of data fed into k-means under control for performance.
 */
function getSamplingSteps(width: number, height: number, maxSamples: number) {
    // If the image is already small we take every pixel.
    if (width * height <= maxSamples) {
        return { stepX: 1, stepY: 1 };
    }

    // We want roughly sqrt(maxSamples) points along each axis.
    const side = Math.sqrt(maxSamples);
    return {
        stepX: Math.max(1, Math.floor(width / side)),
        stepY: Math.max(1, Math.floor(height / side)),
    };
}

/**
 * Uniformly sample pixels from the image without the overhead of `getPixelColor`.
 * Reading directly from the underlying bitmap buffer is considerably faster.
 */
function samplePixels(img: any, maxSamples = 10_000): Rgb[] {
    const { width, height, data } = img.bitmap;

    const pixels: Rgb[] = [];
    const { stepX, stepY } = getSamplingSteps(width, height, maxSamples);

    for (let y = 0; y < height; y += stepY) {
        for (let x = 0; x < width; x += stepX) {
            const idx = (width * y + x) * 4; // RGBA is 4 bytes per pixel
            const r = data[idx] / 255;
            const g = data[idx + 1] / 255;
            const b = data[idx + 2] / 255;
            const a = data[idx + 3] / 255;

            pixels.push({ r, g, b, alpha: a, mode: "rgb" });

            // Early-exit once we reach maxSamples to avoid unnecessary iterations.
            if (pixels.length >= maxSamples) {
                return pixels;
            }
        }
    }

    return pixels;
}

/**
 * Sort colors by perceived brightness (descending).
 */
function sortByBrightness(colors: Color[]): Color[] {
    return colors.sort(
        (c1, c2) => calculateBrightness(c2) - calculateBrightness(c1),
    );
}

/**
 * Convert a list of colors to a palette object that can be edited later on.
 */
function toPalette(colors: Color[]) {
    return colors.map((color) => {
        const hex = formatHex8(color);
        return { before: hex, after: hex } as const;
    });
}

// 画像からカラーパレットを生成
export async function generateColorPalette(
    url: string,
    k = 3,
): Promise<{ before: string; after: string }[]> {
    // ---- 1. Load & sample pixels
    const img = await Jimp.read(url);
    const pixels = samplePixels(img);

    // ---- 2. Run k-means to get `k` dominant colors
    const dominantColors = extractDominantColors(pixels, k);

    // ---- 3. Sort & format the result
    const sorted = sortByBrightness(dominantColors);
    return toPalette(sorted);
}
