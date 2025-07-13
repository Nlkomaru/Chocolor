import {
    ColorPicker,
    HStack,
    Portal,
    parseColor,
    VStack,
} from "@chakra-ui/react";
import { ArrowDown, Equal } from "lucide-react";
import { sva } from "../../../styled-system/css";

interface Props {
    image_id: string;
    index: number;
    beforeColor: string;
    afterColor: string;
}

const colorPickerStyle = sva({
    slots: ["container", "colorBox", "colorLabel", "arrow", "equal"],
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
    },
});

export const ColorTransform = ({ beforeColor, afterColor }: Props) => {
    const styles = colorPickerStyle();

    return (
        <VStack align="center" className={styles.container}>
            {/* Before Color */}
            <ColorPicker.Root
                defaultValue={parseColor(beforeColor)}
                disabled={true}
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

            {beforeColor !== afterColor ? (
                <ArrowDown />
            ) : (
                <Equal className={styles.equal} />
            )}

            <ColorPicker.Root
                defaultValue={parseColor(afterColor)}
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
