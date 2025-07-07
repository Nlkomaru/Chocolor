import { intToRGBA } from "@jimp/utils";
import { Jimp } from "jimp";
import type { ImageData, RGBA } from "../type";

export async function getImageInfo(file: File) {
    return new Promise<ImageData>(async (resolve, reject) => {
        const img = await Jimp.read(await file.arrayBuffer());
        const imageData: ImageData = {
            info: {
                width: img.width,
                height: img.height,
                format: img.mime || "",
            },
            color: Array.from({ length: img.width }, (_, x) =>
                Array.from({ length: img.height }, (_, y) => {
                    const rgb = intToRGBA(img.getPixelColor(x, y));
                    return rgb as RGBA;
                }),
            ),
        };
        console.log(imageData);
        resolve(imageData);
    });
}
