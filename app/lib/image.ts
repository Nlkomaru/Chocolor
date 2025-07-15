import { Jimp } from "jimp";
import type { ImageData } from "../type/color";

// RGB色を16進数に変換
function rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// RGB値から輝度を計算（相対輝度）
function calculateBrightness(r: number, g: number, b: number): number {
    // ITU-R BT.709の重み付けを使用した相対輝度の計算
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// 色の距離を計算（ユークリッド距離）
function colorDistance(
    color1: [number, number, number],
    color2: [number, number, number],
): number {
    const [r1, g1, b1] = color1;
    const [r2, g2, b2] = color2;
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

// K-meansクラスタリングで代表色を抽出
function extractDominantColors(
    pixels: [number, number, number][],
    k = 6,
): [number, number, number][] {
    if (pixels.length === 0) return [];

    // 初期のクラスタ中心点を均等に分散して選択（決定的な初期化）
    const centroids: [number, number, number][] = [];
    for (let i = 0; i < k; i++) {
        const index = Math.floor((pixels.length / k) * i);
        centroids.push([...pixels[index]]);
    }

    const maxIterations = 20;

    for (let iteration = 0; iteration < maxIterations; iteration++) {
        // 各ピクセルを最も近いクラスタに割り当て
        const clusters: [number, number, number][][] = Array.from(
            { length: k },
            () => [],
        );

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

            clusters[closestCluster].push(pixel);
        }

        // 新しいクラスタ中心点を計算
        let converged = true;
        for (let j = 0; j < centroids.length; j++) {
            if (clusters[j].length === 0) continue;

            const newCentroid: [number, number, number] = [
                Math.round(
                    clusters[j].reduce((sum, pixel) => sum + pixel[0], 0) /
                        clusters[j].length,
                ),
                Math.round(
                    clusters[j].reduce((sum, pixel) => sum + pixel[1], 0) /
                        clusters[j].length,
                ),
                Math.round(
                    clusters[j].reduce((sum, pixel) => sum + pixel[2], 0) /
                        clusters[j].length,
                ),
            ];

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

// 画像からカラーパレットを生成
export async function generateColorPalette(
    url: string,
): Promise<{ before: string; after: string }[]> {
    const img = await Jimp.read(url);

    // 画像をサンプリングしてピクセルデータを取得（パフォーマンス向上のため）
    const sampleSize = Math.min(img.width * img.height, 10000); // 最大10,000ピクセル
    const pixels: [number, number, number][] = [];

    // 均等にサンプリング
    const stepX = Math.max(1, Math.floor(img.width / Math.sqrt(sampleSize)));
    const stepY = Math.max(1, Math.floor(img.height / Math.sqrt(sampleSize)));

    for (let y = 0; y < img.height; y += stepY) {
        for (let x = 0; x < img.width; x += stepX) {
            const color = img.getPixelColor(x, y);
            const r = (color >> 24) & 0xff;
            const g = (color >> 16) & 0xff;
            const b = (color >> 8) & 0xff;
            const a = color & 0xff;

            // 透明度が低い場合は無視
            if (a < 128) continue;

            pixels.push([r, g, b]);
        }
    }

    // K-meansクラスタリングで代表色を抽出
    const dominantColors = extractDominantColors(pixels, 6);

    // 明度順にソート（明るい順）
    const sortedColors = dominantColors.sort(([r1, g1, b1], [r2, g2, b2]) => {
        const brightness1 = calculateBrightness(r1, g1, b1);
        const brightness2 = calculateBrightness(r2, g2, b2);
        return brightness2 - brightness1; // 降順（明るい順）
    });

    // 代表色を16進数に変換してパレットを作成
    return sortedColors.map(([r, g, b]) => {
        const hexColor = rgbToHex(r, g, b);
        return {
            before: hexColor,
            after: hexColor, // 初期状態では同じ色
        };
    });
}

export async function getImageInfo(url: string): Promise<ImageData> {
    // Read the file into a Jimp image instance
    const img = await Jimp.read(url);

    // Extract basic information and per-pixel RGBA values
    const imageData: ImageData = {
        info: {
            width: img.width,
            height: img.height,
            // Jimp sets mime after reading; fallback to empty string if undefined
            format: img.mime || "",
        },
        // color: Array.from({ length: img.width }, (_, x) =>
        //     Array.from({ length: img.height }, (_, y) => {
        //         const rgb = intToRGBA(img.getPixelColor(x, y));
        //         return rgb as RGBA;
        //     }),
        // ),
        color: [],
    };

    return imageData;
}
