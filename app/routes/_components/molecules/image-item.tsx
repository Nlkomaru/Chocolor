import { HStack, Image, Text, VStack } from "@chakra-ui/react";
import { imagePaletteAtom } from "app/state/palette";
import type { ImagePalette } from "app/type/store";
import { useImageData } from "app/utils/use-image-data";
import { usePaletteGeneration } from "app/utils/use-palette-generation";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { sva } from "styled-system/css";
import { PaletteSizeSlider } from "../atoms/palette-size-slider";
import { Stats } from "../atoms/stats";
import { ColorPalette } from "./color-palette";

const imageItemStyles = sva({
    slots: ["container", "image", "statsContainer", "statsTitle", "statValue"],
    base: {
        container: {
            gap: 3,
            width: "full",
            padding: "1rem 2rem",
            bgColor: "var(--chakra-colors-bg-default)",
            border: "1px solid var(--chakra-colors-border)",
            borderRadius: "md",
            overflow: "scroll",
            fontWeight: "400",
        },
        image: {
            width: "160px",
            height: "160px",
            objectFit: "cover",
            borderRadius: "sm",
            bgColor: "white",
            flexShrink: 0,
        },
    },
});

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
                {imagePalette?.filePath}
            </Text>

            <HStack align="start" w="full" gap={6}>
                <Image
                    src={imagePalette?.url || ""}
                    alt={id}
                    className={styles.image}
                />

                <Stats
                    imageId={id}
                    imageData={imageData}
                    isGeneratingPalette={
                        isGenerating || imagePalette?.palette.length === 0
                    }
                />

                <VStack align="start" minW="160px">
                    <PaletteSizeSlider imageId={id} />
                </VStack>

                <ColorPalette imageId={id} />
            </HStack>
        </VStack>
    );
};
