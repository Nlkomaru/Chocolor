import { Text, VStack } from "@chakra-ui/react";
import { imagePaletteAtom } from "app/state/palette";
import { settingAtom } from "app/state/setting";
import type { ImagePalette } from "app/type/store";
import type { useImageData } from "app/utils/use-image-data";
import { useAtomValue } from "jotai";
import { sva } from "styled-system/css";

const imageItemStyles = sva({
    slots: ["statsContainer", "statsTitle", "statValue"],
    base: {
        statsContainer: {
            gap: 4,
            minW: "160px",
            alignItems: "flex-start",
        },
        statsTitle: {
            fontSize: "lg",
            fontWeight: "600",
            textAlign: "left",
            color: "var(--chakra-colors-fg-default)",
        },
        statValue: {
            fontSize: "sm",
            color: "var(--chakra-colors-fg-muted)",
        },
    },
});

export const Stats = ({
    imageId,
    imageData,
    isGeneratingPalette,
}: {
    imageId: string;
    imageData: ReturnType<typeof useImageData>;
    isGeneratingPalette: boolean;
}) => {
    const imagePalette = useAtomValue(
        imagePaletteAtom(imageId),
    ) as ImagePalette;
    const setting = useAtomValue(settingAtom);
    const styles = imageItemStyles();
    return (
        <VStack className={styles.statsContainer} align="start">
            <Text className={styles.statsTitle}>Stats</Text>

            <VStack align="start" gap={1} minW="160px">
                <Text className={styles.statValue}>
                    Width: {imageData?.imageData?.info.width || "..."}
                </Text>
                <Text className={styles.statValue}>
                    Height: {imageData?.imageData?.info.height || "..."}
                </Text>
                {isGeneratingPalette ? (
                    <Text
                        className={styles.statValue}
                        color="var(--chakra-colors-fg-muted)"
                    >
                        パレット生成中...
                    </Text>
                ) : (
                    <Text className={styles.statValue}>
                        PaletteSize:{" "}
                        {imagePalette?.paletteSize || setting.paletteSize}
                    </Text>
                )}
            </VStack>
        </VStack>
    );
};
