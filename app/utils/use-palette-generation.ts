import { generateColorPalette } from "app/lib/image";
import {
    addPictureToGroupAtom,
    paletteGenerationAtom,
    pictureDataAtom,
} from "app/store/palette";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect } from "react";

interface UsePaletteGenerationProps {
    id: string;
    url: string;
    path: string;
    groupId?: string; // グループIDを追加（オプション）
}

export const usePaletteGeneration = ({
    id,
    url,
    path,
    groupId,
}: UsePaletteGenerationProps) => {
    const [data, setData] = useAtom(pictureDataAtom(id));
    const paletteGeneration = useAtomValue(paletteGenerationAtom);
    const setPaletteGeneration = useSetAtom(paletteGenerationAtom);

    const isGeneratingPalette = paletteGeneration[id] || false;

    const generatePalette = useCallback(async () => {
        const existingPicture = data.pictureData.find((p) => p.id === id);
        if (existingPicture || isGeneratingPalette) {
            return;
        }

        try {
            setPaletteGeneration((prev) => ({
                ...prev,
                [id]: true,
            }));

            const palette = await generateColorPalette(url);
            const now = new Date().toISOString();

            const newPictureData = {
                id,
                imagePath: path,
                bin: data.pictureData.length + 1,
                palette,
            };

            setData((prev) => ({
                ...prev,
                name: prev.name || path,
                createdAt: prev.createdAt || now,
                updatedAt: now,
                pictureData: [...prev.pictureData, newPictureData],
            }));
        } catch (error) {
            console.error("パレット生成エラー:", error);
        } finally {
            setPaletteGeneration((prev) => ({
                ...prev,
                [id]: false,
            }));
        }
    }, [
        id,
        url,
        path,
        data.pictureData,
        isGeneratingPalette,
        setData,
        setPaletteGeneration,
    ]);

    useEffect(() => {
        generatePalette();
    }, [generatePalette]);

    // グループIDが渡されている場合、groupIdにpictureIdを追加
    const addPictureToGroup = useSetAtom(addPictureToGroupAtom);
    useEffect(() => {
        if (groupId) {
            addPictureToGroup({ groupId, pictureId: id });
        }
    }, [groupId, id, addPictureToGroup]);

    return {
        data,
        isGeneratingPalette,
    };
};
