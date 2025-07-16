import { HStack } from "@chakra-ui/react";
import { imagePaletteAtom } from "app/state/palette";
import type { ImagePalette } from "app/type/store";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { ColorTransform as ColorTransformComponent } from "../atoms/color-transform";

export const ColorPalette = ({ imageId }: { imageId: string }) => {
    const paletteAtom = useMemo(() => imagePaletteAtom(imageId), [imageId]);
    const imagePalette = useAtomValue(paletteAtom) as ImagePalette | null;
    return (
        <HStack align="start" gap={2} height="100%">
            {/*
                palette（色変換前後の配列）をループして ColorTransformComponent を生成
            */}
            {imagePalette?.palette.map((paletteEntry, idx) => (
                <ColorTransformComponent
                    key={`${imageId}-${paletteEntry.before}-${idx}`}
                    image_id={imageId}
                    index={idx}
                    beforeColor={paletteEntry.before}
                    afterColor={paletteEntry.after}
                />
            ))}
        </HStack>
    );
};
