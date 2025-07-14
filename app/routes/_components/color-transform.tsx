import {
    ColorPicker,
    HStack,
    Portal,
    parseColor,
    VStack,
} from "@chakra-ui/react";
import { pictureDataAtom } from "app/store/palette";
import type { StoreData } from "app/type/store";
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
    const [data, setData] = useAtom(pictureDataAtom(image_id));

    // afterカラーを更新する関数
    const updateAfterColor = useCallback(
        (newColor: string) => {
            setData((prev: StoreData) => ({
                ...prev,
                pictureData: prev.pictureData.map((picture) =>
                    picture.id === image_id
                        ? {
                              ...picture,
                              palette: picture.palette.map((color, i) =>
                                  i === index
                                      ? { ...color, after: newColor }
                                      : color,
                              ),
                          }
                        : picture,
                ),
                updatedAt: new Date().toISOString(),
            }));
        },
        [setData, index, image_id],
    );

    return (
        <VStack align="center" className={styles.container}>
            {/* Before Color */}
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
                                {data.favoriteColor.map((item: string) => (
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

            {beforeColor !== afterColor ? (
                <ArrowDown />
            ) : (
                <Equal className={styles.equal} />
            )}

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
        </VStack>
    );
};
