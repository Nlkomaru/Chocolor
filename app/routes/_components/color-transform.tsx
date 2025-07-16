import {
    ColorPicker,
    HStack,
    Portal,
    parseColor,
    VStack,
} from "@chakra-ui/react";
import { imagePaletteAtom } from "app/store/palette";
import type { ImagePalette } from "app/type/store";
import { useAtom } from "jotai";
import { ArrowDown, Check, Equal } from "lucide-react";
import { useCallback } from "react";
import { sva } from "../../../styled-system/css";

interface Props {
    image_id: string;
    index: number;
    beforeColor: string;
    afterColor: string;
}

const colorPickerStyle = sva({
    slots: [
        "container",
        "colorBox",
        "colorLabel",
        "arrow",
        "equal",
        "disabledColorBox",
    ],
    base: {
        container: {
            gap: 3,
            alignItems: "center",
            padding: "0.5rem",
            height: "100%",
        },
        colorBox: {
            width: "40px",
            height: "40px",
            borderRadius: "md",
            border: "2px solid var(--chakra-colors-border-default)",
            boxShadow: "sm",
        },
        colorLabel: {
            fontSize: "xs",
            fontWeight: "500",
            textAlign: "center",
            color: "var(--chakra-colors-fg-muted)",
        },
        arrow: {
            fontSize: "lg",
            color: "var(--chakra-colors-fg-muted)",
            fontWeight: "bold",
        },
        equal: {
            fontSize: "lg",
            color: "var(--chakra-colors-fg-muted)",
            fontWeight: "bold",
            transform: "rotate(90deg)",
        },
        disabledColorBox: {
            _hover: {
                cursor: "not-allowed",
            },
        },
    },
});

export const ColorTransform = ({
    beforeColor,
    afterColor,
    index,
    image_id,
}: Props) => {
    const styles = colorPickerStyle();
    const [imagePalette, setImagePalette] = useAtom(imagePaletteAtom(image_id));

    // afterカラーを更新する関数
    const updateAfterColor = useCallback(
        (newColor: string) => {
            if (imagePalette) {
                const updatedPalette: ImagePalette = {
                    ...imagePalette,
                    palette: imagePalette.palette.map((color, i) =>
                        i === index ? { ...color, after: newColor } : color,
                    ),
                    updatedAt: new Date().toISOString(),
                };
                setImagePalette(updatedPalette);
            }
        },
        [imagePalette, setImagePalette, index],
    );

    return (
        <VStack align="center" className={styles.container}>
            {/* Before Color */}
            <BeforeColorPicker
                beforeColor={beforeColor}
                image_id={image_id}
                index={index}
                favoriteColor={[]}
            />

            {beforeColor !== afterColor ? (
                <ArrowDown />
            ) : (
                <Equal className={styles.equal} />
            )}

            <AfterColorPicker
                afterColor={afterColor}
                image_id={image_id}
                index={index}
                updateAfterColor={updateAfterColor}
            />
        </VStack>
    );
};

const BeforeColorPicker = ({
    beforeColor,
    image_id,
    index,
    favoriteColor,
}: {
    beforeColor: string;
    image_id: string;
    index: number;
    favoriteColor: string[];
}) => {
    return (
        <ColorPicker.Root
            defaultValue={parseColor(beforeColor)}
            // disabled={true}
            id={`before-color-${image_id}-${index}`}
            size="lg"
            maxW="200px"
        >
            <ColorPicker.Control>
                <ColorPicker.Trigger>
                    <ColorPicker.ValueSwatch />
                </ColorPicker.Trigger>
            </ColorPicker.Control>
            <Portal>
                <ColorPicker.Positioner>
                    <ColorPicker.Content>
                        <ColorPicker.SwatchGroup>
                            {favoriteColor.map((item: string) => (
                                <ColorPicker.SwatchTrigger
                                    key={item}
                                    value={item}
                                >
                                    <ColorPicker.Swatch
                                        boxSize="4.5"
                                        value={item}
                                    >
                                        <ColorPicker.SwatchIndicator>
                                            <Check />
                                        </ColorPicker.SwatchIndicator>
                                    </ColorPicker.Swatch>
                                </ColorPicker.SwatchTrigger>
                            ))}
                        </ColorPicker.SwatchGroup>
                    </ColorPicker.Content>
                </ColorPicker.Positioner>
            </Portal>
        </ColorPicker.Root>
    );
};

const AfterColorPicker = ({
    afterColor,
    image_id,
    index,
    updateAfterColor,
}: {
    afterColor: string;
    image_id: string;
    index: number;
    updateAfterColor: (newColor: string) => void;
}) => {
    return (
        <ColorPicker.Root
            value={parseColor(afterColor)}
            maxW="200px"
            id={`after-color-${image_id}-${index}`}
            size="lg"
            onValueChange={(details) => {
                updateAfterColor(details.value.toString("hex"));
            }}
        >
            <ColorPicker.Control>
                <ColorPicker.Trigger>
                    <ColorPicker.ValueSwatch />
                </ColorPicker.Trigger>
            </ColorPicker.Control>
            <Portal>
                <ColorPicker.Positioner>
                    <ColorPicker.Content>
                        <ColorPicker.Area />
                        <HStack>
                            <ColorPicker.EyeDropper
                                size="sm"
                                variant="outline"
                            />
                            <ColorPicker.Sliders />
                        </HStack>
                        <ColorPicker.ChannelInput channel="hex" />
                    </ColorPicker.Content>
                </ColorPicker.Positioner>
            </Portal>
        </ColorPicker.Root>
    );
};
