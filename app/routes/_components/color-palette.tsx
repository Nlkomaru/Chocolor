import { HStack } from "@chakra-ui/react";
import type { ImagePalette } from "app/type/store";
import { ColorTransform as ColorTransformComponent } from "./color-transform";

interface Props {
    data: ImagePalette | null;
}

export const ColorPalette = ({ data }: Props) => {
    // dataまたはpalette が存在しない、または空の場合は何も描画しない
    if (!data || !data.palette || data.palette.length === 0) {
        return null;
    }

    return (
        <HStack align="start" gap={2} height="100%">
            {/*
                palette（色変換前後の配列）をループして ColorTransformComponent を生成
            */}
            {data.palette.map((color, index) => (
                <ColorTransformComponent
                    key={`${data.id}-${color.before}-${index}`}
                    image_id={data.id}
                    index={index}
                    beforeColor={color.before}
                    afterColor={color.after}
                />
            ))}
        </HStack>
    );
};
