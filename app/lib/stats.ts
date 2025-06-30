import { Jimp } from "jimp";

export const getStats = async (sourceFile: File, targetFile: File) => {
    const sourceImage = await Jimp.read(await sourceFile.arrayBuffer());
    const targetImage = await Jimp.read(await targetFile.arrayBuffer());

    const sourceStats = {
        width: sourceImage.width,
        height: sourceImage.height,
    };
    const targetStats = {
        width: targetImage.width,
        height: targetImage.height,
    };

    return { sourceStats, targetStats };
};
