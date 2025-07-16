import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import type { ImageEntry } from "app/type/store";
import { useImageData } from "app/utils/use-image-data";
// import { usePaletteGeneration } from "app/utils/use-palette-generation";
import { ColorPalette } from "./color-palette";
import { imageItemStyles } from "./image-item.styles";

interface Props extends ImageEntry {}

export const ImageItem = ({ path, url, id }: Props) => {
    const styles = imageItemStyles();
    const imageData = useImageData(url);
    // const { data: imagePalette, isGeneratingPalette } = usePaletteGeneration({
    //     id,
    //     url,
    //     path,
    // });
    const imagePalette = null;
    const isGeneratingPalette = false;

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
                {path}
            </Text>

            <HStack align="start" gap={6}>
                <Image src={url} alt={path} className={styles.image} />

                <Stats
                    imageData={imageData}
                    isGeneratingPalette={isGeneratingPalette}
                />

                <ColorPalette data={imagePalette} />
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
