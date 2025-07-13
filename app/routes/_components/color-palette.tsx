import { HStack } from "@chakra-ui/react";
import type { ColorTransform } from "app/type";
import { ColorTransform as ColorTransformComponent } from "./color-transform";

interface Props {
    colorTransform: ColorTransform;
}

export const ColorPalette = ({ colorTransform }: Props) => {
    return (
        <HStack align="start" gap={6} height="100%">
            {colorTransform.palette.map((color, index) => (
                <ColorTransformComponent
                    key={color.before}
                    image_id={colorTransform.id}
                    index={index}
                    beforeColor={color.before}
                    afterColor={color.after}
                />
            ))}
        </HStack>
    );
};
