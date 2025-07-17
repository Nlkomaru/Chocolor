import { HStack, Slider } from "@chakra-ui/react";
import { generateColorPalette } from "app/lib/image";
import { imagePaletteAtom } from "app/state/palette";
import { settingAtom } from "app/state/setting";
import type { ImagePalette } from "app/type/store";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";

export const PaletteSizeSlider = ({ imageId }: { imageId: string }) => {
    const [imagePalette, setImagePalette] = useAtom(
        imagePaletteAtom(imageId),
    ) as [ImagePalette, (imagePalette: ImagePalette) => void];
    const setting = useAtomValue(settingAtom);
    const [isRegenerating, setIsRegenerating] = useState(false);

    // paletteSizeが変更されたときにpaletteを再生成する関数
    const handlePaletteSizeChange = async (newSize: number) => {
        if (!imagePalette?.url) return;

        try {
            setIsRegenerating(true);
            // 新しいpaletteを生成
            const newPalette = await generateColorPalette(
                imagePalette.url,
                newSize,
            );

            // imagePaletteを更新（paletteSizeと新しいpaletteの両方）
            setImagePalette({
                ...imagePalette,
                paletteSize: newSize,
                palette: newPalette,
                updatedAt: new Date().toISOString(),
            });
        } catch (error) {
            console.error("パレット再生成エラー:", error);
            // エラーが発生してもpaletteSizeは更新する
            setImagePalette({ ...imagePalette, paletteSize: newSize });
        } finally {
            setIsRegenerating(false);
        }
    };

    return (
        <Slider.Root
            minW="160px"
            value={[imagePalette?.paletteSize || setting.paletteSize]}
            max={10}
            disabled={isRegenerating}
            onValueChange={(e) => handlePaletteSizeChange(e.value[0])}
        >
            <HStack justify="space-between" w="full">
                <Slider.Label>Palette Size</Slider.Label>
                <Slider.ValueText />
            </HStack>
            <Slider.Control>
                <Slider.Track>
                    <Slider.Range />
                </Slider.Track>
                <Slider.Thumbs rounded="full" />
            </Slider.Control>
        </Slider.Root>
    );
};
