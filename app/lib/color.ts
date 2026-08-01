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
    // Use the raw CIEDE2000 distance without rounding for higher precision.
    return distanceMetric(color1, color2);
}

// K-meansクラスタリングで代表色を抽出
function extractDominantColors(pixels: Rgb[], k: number): Color[] {
    // ------------------------------------------------------------------
    // 1. 前処理 & 画像が空のときの早期リターン
    // ------------------------------------------------------------------
    if (pixels.length === 0) return [];

    // 黒色として扱う固定セントロイド (RGB = 0,0,0)
    const BLACK: Rgb = { r: 0, g: 0, b: 0, alpha: 1, mode: "rgb" };

    // ------------------------------------------------------------------
    // 2. 色ヒストグラムを構築して重み (画素数) を取得
    // ------------------------------------------------------------------
    //   • formatHex8 で 1px=1bin とするとユニーク数が多すぎるので、
    //     32bit RGBA 値でキー化してヒストグラムを作る。
    const histogram = new Map<string, { color: Rgb; count: number }>();

    for (const px of pixels) {
        // 8bit 量子化して文字列化 (早い)
        const key =
            ((px.r * 255) << 24) |
            ((px.g * 255) << 16) |
            ((px.b * 255) << 8) |
            (px.alpha ? px.alpha * 255 : 255);
        const keyStr = key.toString(16);

        const entry = histogram.get(keyStr);
        if (entry) {
            entry.count++;
        } else {
            histogram.set(keyStr, { color: px, count: 1 });
        }
    }

    const labConv = converter("lab");

    // ------------------------------------------------------------------
    // 3. 決定的な初期セントロイド選択 (Pelleg & Moore / σ_a=80)
    // ------------------------------------------------------------------
    const sigmaA = 80; // 80% of distance black→white in Lab

    // 配列に展開
    const bins: { color: Rgb; count: number; weight: number }[] = [];
    histogram.forEach((v) => bins.push({ ...v, weight: v.count }));

    const centroids: Rgb[] = [];

    while (centroids.length < k) {
        // 3-1. 最大重みを持つ bin を選ぶ
        let maxIdx = 0;
        for (let i = 1; i < bins.length; i++) {
            if (bins[i].weight > bins[maxIdx].weight) maxIdx = i;
        }

        centroids.push(bins[maxIdx].color);

        // 3-2. 選択した bin と他 bin の距離で重み減衰
        const chosenLab = labConv(bins[maxIdx].color);

        for (let i = 0; i < bins.length; i++) {
            if (i === maxIdx) continue; // 自身は対象外

            const d = colorDistance(bins[i].color, chosenLab);
            const attenuation = 1 - Math.exp(-(d * d) / (sigmaA * sigmaA));
            bins[i].weight *= attenuation;
        }

        // 選んだ bin の重みを 0 にして再選択防止
        bins[maxIdx].weight = 0;
    }

    // 黒 centroid を先頭に追加 (固定)
    centroids.unshift(BLACK);

    const kPlusOne = centroids.length; // k+1

    // ------------------------------------------------------------------
    // 4. (k+1)-means クラスタリング (黒は固定)
    // ------------------------------------------------------------------
    const maxIterations = 20;

    for (let iter = 0; iter < maxIterations; iter++) {
        const clusters: Rgb[][] = Array.from({ length: kPlusOne }, () => []);

        // 4-1. 各ピクセルを最も近いクラスタに割り当て
        for (const p of pixels) {
            let minDist = Number.POSITIVE_INFINITY;
            let closest = 0;

            for (let cIdx = 0; cIdx < kPlusOne; cIdx++) {
                const d = colorDistance(p, centroids[cIdx]);
                if (d < minDist) {
                    minDist = d;
                    closest = cIdx;
                }
            }

            clusters[closest].push(p);
        }

        // 4-2. 各クラスタの新しい中心を計算
        let converged = true;
        for (let cIdx = 0; cIdx < kPlusOne; cIdx++) {
            // 黒クラスタは固定でスキップ
            if (cIdx === 0) continue;

            const cluster = clusters[cIdx];
            if (cluster.length === 0) continue;

            const newCentroid: Rgb = {
                r: cluster.reduce((s, p) => s + p.r, 0) / cluster.length,
                g: cluster.reduce((s, p) => s + p.g, 0) / cluster.length,
                b: cluster.reduce((s, p) => s + p.b, 0) / cluster.length,
                alpha:
                    cluster.reduce((s, p) => s + (p.alpha ?? 1), 0) /
                    cluster.length,
                mode: "rgb",
            };

            if (colorDistance(centroids[cIdx], newCentroid) > 1) {
                converged = false;
            }

            centroids[cIdx] = newCentroid;
        }

        if (converged) break;
    }

    // ------------------------------------------------------------------
    // 5. 黒クラスタ (インデックス0) を除外して返却
    // ------------------------------------------------------------------
    return centroids.slice(1);
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
