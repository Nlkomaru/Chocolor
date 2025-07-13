import { Jimp } from "jimp";
import type { ImageData } from "../type";

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
