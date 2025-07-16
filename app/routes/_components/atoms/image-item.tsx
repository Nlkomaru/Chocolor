import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { imagePaletteAtom } from "app/state/palette";
import type { ImagePalette } from "app/type/store";
import { useImageData } from "app/utils/use-image-data";
import { usePaletteGeneration } from "app/utils/use-palette-generation";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { ColorPalette } from "../molecules/color-palette";
import { imageItemStyles } from "./image-item.styles";

interface Props {
    id: string;
}

export const ImageItem = ({ id }: Props) => {
    const styles = imageItemStyles();
    const paletteAtom = useMemo(() => imagePaletteAtom(id), [id]);
    const imageData = useImageData(id);
    // 画像のパレットを（未生成なら）自動生成
    const { isGenerating } = usePaletteGeneration(id);
    const imagePalette = useAtomValue(paletteAtom) as ImagePalette | null;

    return (
        <VStack align="start" className={styles.container}>
            {/* ファイルパス */}
            <Text
                fontSize="md"
                overflowWrap="anywhere"
                textOverflow="ellipsis"
                whiteSpace="pre-line"
                width="full"
                fontWeight="400"
                color="var(--chakra-colors-fg-default)"
            >
                {imagePalette?.imagePath}
            </Text>

            <HStack align="start" gap={6}>
                <Image
                    src={imagePalette?.imagePath || ""}
                    alt={id}
                    className={styles.image}
                />

                <Stats
                    imageData={imageData}
                    isGeneratingPalette={
                        isGenerating || imagePalette?.palette.length === 0
                    }
                />

                <ColorPalette imageId={id} />
            </HStack>
        </VStack>
    );
};

const Stats = ({
    imageData,
    isGeneratingPalette,
}: {
    imageData: ReturnType<typeof useImageData>;
    isGeneratingPalette: boolean;
}) => {
    const styles = imageItemStyles();

    return (
        <VStack align="start" className={styles.statsContainer}>
            <Text className={styles.statsTitle}>Stats</Text>

            <VStack align="start" gap={1} width="120px">
                <Text className={styles.statValue}>
                    Width: {imageData?.imageData?.info.width || "..."}
                </Text>
                <Text className={styles.statValue}>
                    Height: {imageData?.imageData?.info.height || "..."}
                </Text>
                {isGeneratingPalette && (
                    <Text
                        className={styles.statValue}
                        color="var(--chakra-colors-fg-muted)"
                    >
                        パレット生成中...
                    </Text>
                )}
            </VStack>
        </VStack>
    );
};
