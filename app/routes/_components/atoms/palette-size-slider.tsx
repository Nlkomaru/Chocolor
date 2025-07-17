import { HStack, Slider } from "@chakra-ui/react";
import { imagePaletteAtom } from "app/state/palette";
import { settingAtom } from "app/state/setting";
import type { ImagePalette } from "app/type/store";
import { useAtom, useAtomValue } from "jotai";

export const PaletteSizeSlider = ({ imageId }: { imageId: string }) => {
    const [imagePalette, setImagePalette] = useAtom(
        imagePaletteAtom(imageId),
    ) as [ImagePalette, (imagePalette: ImagePalette) => void];
    const setting = useAtomValue(settingAtom);

    return (
        <Slider.Root
            maxW="200px"
            value={[imagePalette?.paletteSize || setting.paletteSize]}
            max={10}
            onValueChange={(e) =>
                setImagePalette({ ...imagePalette, paletteSize: e.value[0] })
            }
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
